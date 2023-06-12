export class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }
  addItem(element, append) {
    if (append) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
