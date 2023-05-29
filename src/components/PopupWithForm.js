import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, submitHandle) {
    super(selector);
    this._submitHandle = submitHandle;
    this._form = this._popup.querySelector(".edit-form");
    this._inputs = this._form.querySelectorAll(".edit-form__input");
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
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
