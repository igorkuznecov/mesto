export class Card {
  constructor(data, selectors, handleCardClick) {
    this._card = data;
    this._selectors = selectors;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardTemplate = document.querySelector(this._selectors.cardTemplate).content;
    this.cardElement = cardTemplate.querySelector(this._selectors.singleCard).cloneNode(true);
  }

  _setListeners() {
    this.cardPicture.addEventListener('click', () => { this._handleCardClick(this._card.link, this._card.name) });
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

