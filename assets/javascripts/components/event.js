function getISODay (date) {
  return date.toISOString().slice(0, 10);
}

function getEvents () {
  return document.querySelectorAll('.event');
}

function getPastEvents (events) {
  const today = getISODay(new Date());
  return Array.prototype.filter.call(events, (event) => {
    let eventDateEl = event.querySelector('.event__day');
    let eventDay = getISODay(new Date(eventDateEl.getAttribute('datetime')));
    return eventDay < today;
  });
}

function togglePastEvents () {
  const events = getEvents();
  const pastEvents = getPastEvents(events);
  const eventsToggler = document.querySelector('[data-toggle="past-events"]');

  if (!pastEvents.length || events.length === pastEvents.length) {
    if (eventsToggler) {
      eventsToggler.style.display = 'none';
    }

    return;
  }

  let eventsHidden = false;
  const toggle = () => {
    pastEvents.forEach((el) => {
      el.style.display = eventsHidden ? 'table' : 'none';
    });
    eventsHidden = !eventsHidden;
  };

  eventsToggler.addEventListener('click', () => {
    toggle();
  });

  toggle();
}

export default () => {
  togglePastEvents();
};
