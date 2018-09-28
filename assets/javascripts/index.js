import StickyHeader from 'components/stickyHeader';
import setupEvents from 'components/event';

import 'icons';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(function () {
    document.querySelectorAll('.sticky').forEach((el) => {
      new StickyHeader(el);
    });
  }, 500);

  setupEvents();
});
