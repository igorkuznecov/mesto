export class FormValidator {
  constructor(form, config) {
    this._config = config;
    this._form = form;
    this._button = form.querySelector(config.submitButtonSelector);
    this._inputList = Array.from(
      form.querySelectorAll(config.inputSelector)
    );
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._form.addEventListener('reset', () => {
      this._disableButton()
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.removeAttribute('disabled');
    }
  }

  _disableButton() {
    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.setAttribute('disabled', '');
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => { evt.preventDefault() });
    this._setEventListeners();
  };
}
