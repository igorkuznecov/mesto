import { Popup }  from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector('.popup__lightbox-image');
    this._description = this._popup.querySelector('.popup__image-description');
  }

  open(link, description) {
    super.setEventListeners();
    this._image.src = link;
    this._image.alt = description;
    this._description.textContent = description;
    super.open()
  }
}
