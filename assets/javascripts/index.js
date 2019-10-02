import StickyHeader from 'components/stickyHeader';
import setupEvents from 'components/event';

import 'icons';
// SVG use polyfill for IE11
import 'svgxuse';
import '../sass/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(function () {
    document.querySelectorAll('.sticky').forEach((el) => {
      new StickyHeader(el);
    });
  }, 500);

  setupEvents();
});
