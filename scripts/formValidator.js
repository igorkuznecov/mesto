export class FormValidator {
  constructor(form, config) {
    this._config = config;
    this._form = form;
    this.inputList = Array.from(
      form.querySelectorAll(config.inputSelector)
    );
  }

  _setEventListeners() {
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(buttonElement);
    this._form.addEventListener('reset', () => {
      this._disableButton(buttonElement)
    });
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement);
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

  _toggleButtonState(buttonElement) {
    if (this._hasInvalidInput()) {
      this._disableButton(buttonElement);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this._config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => { evt.preventDefault() });
    this._setEventListeners();
  };
}
