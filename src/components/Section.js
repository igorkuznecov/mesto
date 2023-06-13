export class Section {
  constructor(renderer, selector) {
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

  renderItems(items, isAppend) {
    items.forEach((item) => {
      this._renderer(item, isAppend);
    });
  }
}
