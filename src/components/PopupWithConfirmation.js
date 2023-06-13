import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(selector, submitHandle) {
    super(selector);
    this._submitHandle = submitHandle;
    this._form = this._popup.querySelector(".edit-form");
    this._inputs = this._form.querySelectorAll(".edit-form__input");
    this._button = this._form.querySelector('.edit-form__save-button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandle();
    });
  }

  loadingState(state) {
    if (state) {
      this._buttonNormalState = this._button.textContent;
      this._button.textContent = 'Удаление...';
    } else {
      this._button.textContent = this._buttonNormalState;
    }
  }

  open(card) {
    super.open()
    this.card = card;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
