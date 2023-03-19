export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._containerSelector = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}