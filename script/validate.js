const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__type',
  inputErrorClass: 'popup__type_input_error',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
};

function disableSubmit(evt) {
  evt.preventDefault();
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', () => {
    toggleButton(form, config);
  });

    addInputListeners(form, config);
    toggleButton(form, config);
  })
}

function handleFormInput(event, config) {
  const input = event.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
}

function toggleButton(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();
  
  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

function addInputListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  inputList.forEach((item) => {
    item.addEventListener('input', (event) => {
      handleFormInput(event, config);
    })
  })
}

enableValidation(formValidationConfig);