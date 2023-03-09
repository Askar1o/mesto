import Card from './cards.js';
import { initialCards } from './cards.js';
import FormValidator from './validate.js';
import { formValidationConfig } from './validate.js';

const popupProfile = document.querySelector('.popup_type_name');
const popupPlace = document.querySelector('.popup_type_place');
const popupBigImage = document.querySelector('.popup_type_big-image');
const popupImage = popupBigImage.querySelector('.popup__image');
const popupSubtitleImage = document.querySelector('.popup__subtitle-image');
const popupCloseButtonsElement = document.querySelectorAll('.popup__button-close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

const formElementProfile = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__type_input_username');
const jobInput = document.querySelector('.popup__type_input_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formPopupPlace = document.querySelector('.popup__form_place');

const elementsCard = document.querySelector('.elements');
const popupInputTitle = document.querySelector('.popup__type_input_title');
const popupInputHref = document.querySelector('.popup__type_input_href');
const popups = document.querySelectorAll('.popup');

const profileValidation = new FormValidator(formValidationConfig, popupProfile);
profileValidation.enableValidation();

const addCardValidation = new FormValidator(formValidationConfig, popupPlace);
addCardValidation.enableValidation();

//функция открытия попапов
const openPopup = function (popup) {
  popup.classList.toggle('popup_opened');

  document.addEventListener('keydown', closeByEscape);
}

//функция закрытия попапов
const closePopup = function (popup) {
  popup.classList.toggle('popup_opened');

  document.removeEventListener('keydown', closeByEscape);
}

function handleFormSubmitProfile (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  
  closePopup(popupProfile);
}

function openSubmitProfile () { 
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  openPopup(popupProfile);
}

//функция открытия попапа(создания карточки)
function openPopupAddButton () {
  openPopup(popupPlace);
}

//функция создания карточки
function createCard(item) {
  const card = new Card (item, '#cards', handleCardClick);
  return card.generateCard();
}

//функция закрытия попапа(создания карточки)
function handleCardFormSubmit (evt) {
  evt.preventDefault();

  const cardData = {name: popupInputTitle.value, link: popupInputHref.value};
  elementsCard.prepend(createCard(cardData));

  evt.target.reset();

  closePopup(popupPlace);

  evt.submitter.classList.add('popup__button-save_disabled');
  evt.submitter.disabled = true;
}

//функция закрытия попапа по оверлай
function closeByOverlay(event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
}

//функция закрытия попапа нажатием на Esc
function closeByEscape(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//функция открытия попапа с большим изображением
function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupSubtitleImage.textContent = name;
  
  openPopup(popupBigImage);
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile);
popupOpenButtonElement.addEventListener('click', openSubmitProfile);

//слушатель на все попапы для закрытия по оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', closeByOverlay);
})

//слушатель на зарытие/отправку формы создания карточки
formPopupPlace.addEventListener('submit', handleCardFormSubmit);

//слушатель на кнопку открытия формы создания карточки
popupAddButton.addEventListener('click', openPopupAddButton);

//слушатель на кнопки закрытия по крестику
popupCloseButtonsElement.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

//создание новой карточки
initialCards.forEach((item) => {
  elementsCard.append(createCard(item));
})