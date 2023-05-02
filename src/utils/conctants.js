//объект с названием и ссылкой для карточек
export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__type',
  inputErrorClass: 'popup__type_input_error',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
};
  
export const popupOpenButtonElement = document.querySelector('.profile__edit-button');
export const popupAddButtonOpen = document.querySelector('.profile__add-button');
export const popupButtonSave = document.querySelector('.popup__button-save');
  
export const formElementProfile = document.querySelector('.popup__form_profile');
export const nameInput = document.querySelector('.popup__type_input_username');
export const jobInput = document.querySelector('.popup__type_input_job');
export const formPopupPlace = document.querySelector('.popup__form_place');
export const buttonEditAvatar = document.querySelector('.profile__avatar-button');
export const formEditAvatar = document.querySelector('.popup__form_update');
export const avatar = document.querySelector('.profile__avatar');