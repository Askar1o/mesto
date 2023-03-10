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
    //this._formElement = document.querySelector(this._form);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    /*this._formList = Array.from(document.querySelectorAll(this._formSelector));
    this._formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    })*/
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

  /*_hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _offButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._inactiveButtonClass); 
  }

  _onButton() {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._inactiveButtonClass); 
  }*/

  _toggleButton() {
    const isFormValid = this._form.checkValidity();
  
    this._submitButton.disabled = !isFormValid;
    this._submitButton.classList.toggle(this._inactiveButtonClass, !isFormValid);
    /*if (this._hasInvalidInput()) {
      this._offButton();
    } else {
      this._onButton();
    }*/
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));

    this._toggleButton();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleFormInput(inputElement);
        this._toggleButton();
      });
    })
  }
}



/*function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    const buttonSubmit = form.querySelector(config.submitButtonSelector);

    form.addEventListener('input', (event) => {
      handleFormInput(event, config);
      toggleButton(form, config, buttonSubmit);
  });

    toggleButton(form, config, buttonSubmit);
  })
}

function showError(input, config) {
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  input.classList.add(config.inputErrorClass);

  errorElement.textContent = input.validationMessage;
}

function hideError(input, config) {
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  input.classList.remove(config.inputErrorClass);

  errorElement.textContent = '';
}

function handleFormInput(event, config) {
  const input = event.target;

  if (input.validity.valid) {
    hideError(input, config);
  } else {
    showError(input, config);
  }
}

function toggleButton(form, config, buttonSubmit) {
  const isFormValid = form.checkValidity();
  
  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

enableValidation(formValidationConfig);*/