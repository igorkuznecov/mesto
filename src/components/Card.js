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

  _handleDelete() {
    this.cardElement.remove();
  }

  _handleLike() {
    this._like.classList.toggle('element__like_active');
  }

  _setListeners() {
    this._cardPicture.addEventListener('click', () => { this._handleCardClick(this._card.link, this._card.name) });
    this._like.addEventListener('click', () => { this._handleLike() });
    this.cardElement.querySelector('.element__trash').addEventListener('click', () => { this._handleDelete() });
  }

  generate() {
    this._getElement();
    this._cardPicture = this.cardElement.querySelector(this._selectors.cardPicture);
    this._like = this.cardElement.querySelector('.element__like')
    this._setListeners();
    this.cardElement.querySelector('.element__title').textContent = this._card.name;
    this._cardPicture.src = this._card.link;
    this._cardPicture.alt = this._card.name;
    return this.cardElement;
  }
}

