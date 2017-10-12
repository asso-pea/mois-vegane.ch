import StickyHeader from 'components/stickyHeader';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sticky').forEach((el) => {
    new StickyHeader(el);
  });
});
