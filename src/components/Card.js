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

  _checkDeleteAccess() {
    if (this._card.owner._id != this._profile._id) {
      this._deleteIcon.remove();
    }
  }

  _setListeners() {
    this._cardPicture.addEventListener('click', () => { this._handleCardClick(this._card.link, this._card.name) });
    this._like.addEventListener('click', () => { this._handleLikeClick(this) });
    this._deleteIcon.addEventListener('click', () => { this._handleDeleteIconClick(this); });
  }

  _updateLikesView() {
    this._likeCount.textContent = this._card.likes.length;
    this._like.classList.toggle(this._selectors.likeActive, this.isLiked());
  }

  deleteCard() {
    this.cardElement.remove();
  }

  isLiked() {
    return this._card.likes.some((like) => like._id === this._profile._id)
  }

  updateLikes(likes) {
    this._card.likes = likes;
    this._updateLikesView()
  }

  getId() {
    return this._card._id;
  }

  generate() {
    this._getElement();
    this._cardPicture = this.cardElement.querySelector(this._selectors.cardPicture);
    this._deleteIcon = this.cardElement.querySelector('.element__trash');
    this._like = this.cardElement.querySelector('.element__like')
    this._likeCount = this.cardElement.querySelector('.element__likes-count');
    this._checkDeleteAccess()
    this._setListeners();
    this._updateLikesView()
    this.cardElement.querySelector('.element__title').textContent = this._card.name;
    this._cardPicture.src = this._card.link;
    this._cardPicture.alt = this._card.name;
    return this.cardElement;
  }
}
