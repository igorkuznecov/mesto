import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submitHandle) {
    super(selector);
    this._submitHandle = submitHandle;
    this._form = this._popup.querySelector(".edit-form");
    this._inputs = this._form.querySelectorAll(".edit-form__input");
    this._button = this._form.querySelector(".edit-form__save-button");
  }

  _getInputValues() {
    const inputs = {};
    this._inputs.forEach((input) => {
      inputs[input.name] = input.value;
    });
    return inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandle(this._getInputValues());
    });
  }

  loadingState(state) {
    if (state) {
      this._buttonNormalState = this._button.textContent;
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = this._buttonNormalState;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
