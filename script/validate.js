const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__type',
  inputErrorClass: 'popup__type_input_error',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
};

function enableValidation(config) {
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

enableValidation(formValidationConfig);