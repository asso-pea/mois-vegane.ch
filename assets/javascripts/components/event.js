const eventTitleSelector = '.event__weekday-title';
const descriptionVisibleClass = 'event__description--visible';

function toggleDescription () {
  document.querySelectorAll(eventTitleSelector).forEach((el) => {
    let hidden = true;
    const descriptionEl = el.nextElementSibling;
    el.addEventListener('click', () => {
      const toggleMethod = hidden ? 'add' : 'remove';
      descriptionEl.classList[toggleMethod](descriptionVisibleClass);
      hidden = !hidden;
    });
  });
}

function getISODay (date) {
  return date.toISOString().slice(0, 10);
}

function getPastEvents () {
  const events = document.querySelectorAll('.event');
  const today = getISODay(new Date());
  return Array.prototype.filter.call(events, (event) => {
    let eventDateTime = event.querySelector('.event__day').dateTime;
    let eventDay = getISODay(new Date(eventDateTime));
    return eventDay < today;
  });
}

function togglePastEvents () {
  const pastEvents = getPastEvents();
  if (!pastEvents.length) {
    return;
  }

  const eventsToggler = document.querySelector('.canton__past-events');
  eventsToggler.style.display = 'block';

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
  toggleDescription();
  togglePastEvents();
};
