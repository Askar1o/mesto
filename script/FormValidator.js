export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__type',
  inputErrorClass: 'popup__type_input_error',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
};

export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;

    this._form = form;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  enableValidation() {
    this._setEventListeners();
  }

  _showError(input) {
    this._errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    this._errorElement.textContent = input.validationMessage;
  }

  _hideError(input) {
    this._errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
  }

  _handleFormInput(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _toggleButton() {
    const isFormValid = this._form.checkValidity();
  
    this._submitButton.disabled = !isFormValid;
    this._submitButton.classList.toggle(this._inactiveButtonClass, !isFormValid);
  }

  _setEventListeners() {
    this._toggleButton();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleFormInput(inputElement);
        this._toggleButton();
      });
    })
  }
}