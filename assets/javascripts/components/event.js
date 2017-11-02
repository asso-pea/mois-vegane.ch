const eventTitleSelector = '.event__weekday-title';
const descriptionVisibleClass = 'event__description--visible';

export default () => {
  document.querySelectorAll(eventTitleSelector).forEach((el) => {
    let hidden = true;
    const descriptionEl = el.nextElementSibling;
    el.addEventListener('click', () => {
      const toggleMethod = hidden ? 'add' : 'remove';
      descriptionEl.classList[toggleMethod](descriptionVisibleClass);
      hidden = !hidden;
    });
  });
};
