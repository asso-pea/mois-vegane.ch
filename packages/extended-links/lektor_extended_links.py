# -*- coding: utf-8 -*-
from lektor.context import get_ctx
from lektor.pluginsystem import Plugin

from markupsafe import escape

from werkzeug.urls import url_parse


class ExtendedLinksMixin(object):
    def link(self, link, title, text):
        if self.record is not None:
            url = url_parse(link)
            if not url.scheme:
                link = self.record.url_to('!' + link,
                                          base_url=get_ctx().base_url)

        link, attrs = self.get_attrs(link)
        link = escape(link)

        if title:
            attrs['title'] = escape(title)

        attrs_html = ' '.join([
            '{0}="{1}"'.format(attr, val) for attr, val in attrs.items()
        ])

        return '<a href="%s"%s>%s</a>' % (
            link, ' ' + attrs_html if attrs else '', text
        )

    def get_attrs(self, link):
        if link.startswith('+'):
            return link[1:], {'target': '_blank'}

        return link, {}


class ExtendedLinksPlugin(Plugin):
    name = u'Extended links'
    description = u'Add your description here.'

    def on_markdown_config(self, config, **extra):
        config.renderer_mixins.append(ExtendedLinksMixin)

    def on_process_template_context(self, context, **extra):
        def test_function():
            return 'Value from plugin %s' % self.name
        context['test_function'] = test_function
