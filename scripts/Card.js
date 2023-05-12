import { openPopup } from './index.js';
import { popupLightbox } from './index.js';
import { popupLightboxPicture } from './index.js';
import { popupLightboxDescription } from './index.js';
export class Card {
  constructor(data, selectors) {
    this._card = data;
    this._selectors = selectors;
  }

  _getElement() {
    const cardTemplate = document.querySelector(this._selectors.cardTemplate).content;
    this.cardElement = cardTemplate.querySelector(this._selectors.singleCard).cloneNode(true);
  }

  _setListeners() {
    this.cardPicture.addEventListener('click', () => {
      popupLightboxPicture.src = this._card.link;
      popupLightboxPicture.alt = this._card.name;
      popupLightboxDescription.textContent = this._card.name;
      openPopup(popupLightbox);
    });

    this.cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });

    this.cardElement.querySelector('.element__trash').addEventListener('click', () => {
      this.cardElement.remove();
    });
  }

  generate() {
    this._getElement();
    this.cardPicture = this.cardElement.querySelector(this._selectors.cardPicture);
    this._setListeners();
    this.cardElement.querySelector('.element__title').textContent = this._card.name;
    this.cardPicture.src = this._card.link;
    this.cardPicture.alt = this._card.name;
    return this.cardElement;
  }
}

