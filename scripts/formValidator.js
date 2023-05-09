export class formValidator {
  constructor(form, config) {
    this._config = config;
    this._form = form;
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    this._form.addEventListener('reset', () => {
      this._disableButton(buttonElement)
    });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
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

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
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

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => { evt.preventDefault() });
    this._setEventListeners();
  };
}
