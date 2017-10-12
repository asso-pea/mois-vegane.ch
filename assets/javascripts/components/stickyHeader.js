export default class StickyHeader {
  constructor(el) {
    this.el = el;
    this.elRect = this.el.getBoundingClientRect();
    this.posY = this.elRect.top + window.pageYOffset;
    this.el.style.height = this.elRect.height + 'px';

    this.stickyActive = false;
    // Init stickiness if the user reloaded the page while it was scrolled. Here the top position includes the scroll
    // so it will be negative if the document top is below the element
    this.toggleStickiness(this.elRect.top <= 0);

    this._addEventListeners();
  }

  _addEventListeners() {
    document.addEventListener('scroll', (event) => {
      if (window.pageYOffset >= this.posY) {
        this.toggleStickiness(true);
      }
      else {
        this.toggleStickiness(false);
      }
    });
  }

  toggleStickiness(value) {
    // Don't bother adding/removing classes if the state is already ok
    if (value == this.stickyActive) {
      return;
    }

    this.stickyActive = value;

    if (value) {
      this.el.classList.add('sticky--active');
    }
    else {
      this.el.classList.remove('sticky--active');
    }
  }
}
