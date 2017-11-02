import StickyHeader from 'components/stickyHeader';
import setupEvents from 'components/event';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sticky').forEach((el) => {
    new StickyHeader(el);
  });

  setupEvents();
});
