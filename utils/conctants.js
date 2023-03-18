//объект с названием и ссылкой для карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__type',
  inputErrorClass: 'popup__type_input_error',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
};
  
export const popupProfile = document.querySelector('.popup_type_name');
export const popupPlace = document.querySelector('.popup_type_place');
export const popupBigImage = document.querySelector('.popup_type_big-image');
export const popupImage = popupBigImage.querySelector('.popup__image');
export const popupSubtitleImage = document.querySelector('.popup__subtitle-image');
export const popupCloseButtonsElement = document.querySelectorAll('.popup__button-close');
export const popupOpenButtonElement = document.querySelector('.profile__edit-button');
export const popupAddButtonOpen = document.querySelector('.profile__add-button');
  
export const formElementProfile = document.querySelector('.popup__form_profile');
export const nameInput = document.querySelector('.popup__type_input_username');
export const jobInput = document.querySelector('.popup__type_input_job');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const formPopupPlace = document.querySelector('.popup__form_place');
  
export const elementsCard = document.querySelector('.elements');
export const popupInputTitle = document.querySelector('.popup__type_input_title');
export const popupInputHref = document.querySelector('.popup__type_input_href');
export const popups = document.querySelectorAll('.popup');