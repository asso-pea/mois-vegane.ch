#!/usr/bin/env python3

import collections
import datetime
import json
import logging
import os
import smtplib
import sys
from email.mime.text import MIMEText

import arrow
import requests
from jinja2 import Template

logger = logging.getLogger(__name__)

CANTON_MANAGERS = {
    'Vaud': ['marianne.dupieu@asso-pea.ch'],
    'Valais': ['fabien.brunacci@asso-pea.ch'],
    'Fribourg': ['sebastien.noverraz@asso-pea.ch'],
    'Genève': ['clemence.herbillon@asso-pea.ch'],
    'Neuchâtel': ['lclbrosy@gmail.com', 'rbrosy@hotmail.com'],
    'Jura': ['manuelle.beuchat@asso-pea.ch'],
}

DIGEST_TEMPLATE = """Bonjour!

Les personnes suivantes ont demandé à être coachées pour le canton de {{ canton }}.

{% for subscriber in subscribers -%}
{{ subscriber.data.firstname }} {{ subscriber.data.lastname }}: {{ subscriber.data.email }}
{% endfor %}
"""

SUBSCRIBERS_URL = os.environ['SUBSCRIBERS_URL']
MAILERLITE_API_KEY = os.environ['MAILERLITE_API_KEY']
MAILERLITE_GROUP_ID = os.environ['MAILERLITE_GROUP_ID']
MAIL_RELAY = os.environ['MAIL_RELAY']

if 'DRY_RUN' in os.environ:
    DRY_RUN = bool(int(os.environ['DRY_RUN']))
else:
    DRY_RUN = False

if 'DEBUG' in os.environ:
    DEBUG = bool(int(os.environ['DEBUG']))
else:
    DEBUG = DRY_RUN


def main():
    subscribers = requests.get(SUBSCRIBERS_URL).json()

    unprocessed_subscribers = filter_subscribers(subscribers)
    add_subscribers_to_mailerlite(unprocessed_subscribers)


def filter_subscribers(subscribers):
    def filter_func(subscriber):
        required_props = {'email', 'firstname', 'lastname', 'canton'}
        valid_cantons = CANTON_MANAGERS.keys()

        if already_processed(subscriber):
            return False

        if not all(prop in subscriber['data'] for prop in required_props):
            logger.warn("User %s ignored because missing props", subscriber)
            return False

        if subscriber['data']['canton'] not in valid_cantons:
            logger.warn("Invalid canton %s for user %s", subscriber['data']['canton'], subscriber['data']['email'])
            return False

        return True

    return [subscriber for subscriber in subscribers if filter_func(subscriber)]


def already_processed(subscriber):
    subscription_date = arrow.get(subscriber['created_at']).datetime

    return subscription_date < (arrow.utcnow() - datetime.timedelta(days=1))


def send_coaches_digest(subscribers):
    subscribers_by_canton = collections.defaultdict(list)

    for subscriber in subscribers:
        if subscriber['data']['coach'] == 'Oui':
            subscribers_by_canton[subscriber['data']['canton']].append(subscriber)

    for canton, manager_email in CANTON_MANAGERS.items():
        canton_subscribers = subscribers_by_canton[canton]

        if not canton_subscribers:
            continue

        context = {
            'subscribers': canton_subscribers,
            'canton': canton,
        }

        send_mail(
            "Demandes de coach pour le canton %s" % canton, Template(DIGEST_TEMPLATE).render(**context), manager_email
        )


def send_mail(subject, content, recipients):
    msg = MIMEText(content)

    msg['Subject'] = subject
    msg['From'] = 'mois-vegane.ch <info@asso-pea.ch>'
    msg['To'] = ', '.join(recipients)

    logger.debug("Sending mail to %s", recipients)
    logger.debug(content)

    if not DRY_RUN:
        s = smtplib.SMTP(MAIL_RELAY)
        s.send_message(msg)
        s.quit()


def add_subscribers_to_mailerlite(subscribers):
    for subscriber in subscribers:
        add_to_mailerlite(subscriber)


def add_to_mailerlite(subscriber):
    api_root = 'https://api.mailerlite.com/api/v2/'
    data = {
        'email': subscriber['data']['email'],
        'name': subscriber['data']['firstname'],
        'fields': {
            'last_name': subscriber['data']['lastname'],
            'coach': subscriber['data']['coach'],
            'state': subscriber['data']['canton'],
        }
    }
    headers = {
        'X-Mailerlite-ApiKey': MAILERLITE_API_KEY,
        'Content-Type': 'application/json',
    }
    full_url = api_root + 'groups/{}/subscribers'.format(MAILERLITE_GROUP_ID)
    full_data = json.dumps(data)

    logger.debug("Requesting URL %s with data %s", full_url, full_data)

    if not DRY_RUN:
        response = requests.post(full_url, headers=headers, data=full_data)

        if response.status_code != 200:
            logger.warning("Unable to add user %s on mailerlite, response was %s", subscriber, response)


if __name__ == '__main__':
    level = logging.WARNING if not DEBUG else logging.DEBUG
    logging.basicConfig(level=level, format='%(asctime)s - %(levelname)s - %(message)s', stream=sys.stdout)

    main()
