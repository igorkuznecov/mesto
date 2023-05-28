export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup') && !evt.target.classList.contains('popup__container')) {
      this.close();
    }
  }

  setEventListeners() {
    const buttonsClose = this._popup.querySelector('.popup__close-button');
    buttonsClose.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._handleClickClose.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));

  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('click', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}



