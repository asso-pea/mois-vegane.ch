import StickyHeader from 'components/stickyHeader';
import setupEvents from 'components/event';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(function () {
    document.querySelectorAll('.sticky').forEach((el) => {
      new StickyHeader(el);
    });
  }, 500);

  setupEvents();
});
