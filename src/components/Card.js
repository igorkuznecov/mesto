export class Card {
  constructor(data, selectors, handleCardClick, handleLikeClick, handleDeleteIconClick, userInfoFromServer) {
    this._card = data;
    this._selectors = selectors;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._profile = userInfoFromServer;
  }

  _getElement() {
    const cardTemplate = document.querySelector(this._selectors.cardTemplate).content;
    this.cardElement = cardTemplate.querySelector(this._selectors.singleCard).cloneNode(true);
  }

  _handleDelete() {
    this._handleDeleteIconClick(this.cardElement, this._card._id);
  }

  _handleLike() {
    this._handleLikeClick(this._card._id, this._likeCount, this._like)
    this._like.classList.toggle('element__like_active');
  }

  _checkUserLikes() {
    if (this._card.likes.some((item) => item._id === this._profile._id)) {
      this._like.classList.add('element__like_active');
    } else {
      this._like.classList.remove('element__like_active');
    }
  }

  _checkDeleteAccess() {
    if (this._card.owner._id != this._profile._id) {
      this._deleteIcon.remove();
    }
  }

  _setListeners() {
    this._cardPicture.addEventListener('click', () => { this._handleCardClick(this._card.link, this._card.name) });
    this._like.addEventListener('click', () => { this._handleLike() });
    this._deleteIcon.addEventListener('click', () => { this._handleDelete() });
  }

  setLikeCount() {
    this._likeCount = this.cardElement.querySelector('.element__likes-count');
    this._likeCount.textContent = this._card.likes.length;
  }

  generate() {
    this._getElement();
    this._cardPicture = this.cardElement.querySelector(this._selectors.cardPicture);
    this._deleteIcon = this.cardElement.querySelector('.element__trash');
    this._like = this.cardElement.querySelector('.element__like')
    this._checkDeleteAccess()
    this._setListeners();
    this._checkUserLikes()
    this.cardElement.querySelector('.element__title').textContent = this._card.name;
    this._cardPicture.src = this._card.link;
    this._cardPicture.alt = this._card.name;
    this.setLikeCount();
    return this.cardElement;
  }
}
