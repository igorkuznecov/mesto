import { openPopup } from './index.js';

export class Card {
  constructor(data, selectors) {
    this._card = data;
    this._selectors = selectors;
  }

  _getElement() {
    const cardTemplate = document.querySelector(this._selectors.cardTemplate).content;
    this.cardElement = cardTemplate.querySelector(this._selectors.singleCard).cloneNode(true);
    this.cardPicture = this.cardElement.querySelector(this._selectors.cardPicture);
  }

  _setListeners() {
    this.cardPicture.addEventListener('click', () => {
      this._selectors.popupLightboxPicture.src = this._card.link;
      this._selectors.popupLightboxPicture.alt = this._card.name;
      this._selectors.popupLightboxDescription.textContent = this._card.name;
      openPopup(this._selectors.popupLightbox);
    });

    this.cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
    });

    this.cardElement.querySelector('.element__trash').addEventListener('click', () => {
      const listItem = this.cardElement.closest(this._selectors.singleCard);
      listItem.remove();
    });
  }

  generate() {
    this._getElement();
    this._setListeners();
    this.cardElement.querySelector('.element__title').textContent = this._card.name;
    this.cardPicture.src = this._card.link;
    this.cardPicture.alt = this._card.name;
    return this.cardElement;
  }
}
