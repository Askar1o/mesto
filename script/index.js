import Card from "./cards.js";
import { initialCards } from "./cards.js";

//const popupProfile = document.querySelector('.popup_type_name');
const popupPlace = document.querySelector('.popup_type_place');
const popupBigImage = document.querySelector('.popup_type_big-image');
const popupImage = popupBigImage.querySelector('.popup__image');
const popupSubtitleImage = document.querySelector('.popup__subtitle-image');
const popupCloseButtonsElement = document.querySelectorAll('.popup__button-close');
//const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

/*const formElementProfile = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__type_input_username');
const jobInput = document.querySelector('.popup__type_input_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');*/
const formPopupPlace = document.querySelector('.popup__form_place');

const elementsCard = document.querySelector('.elements');
/*const cardsTemplate = document.querySelector('#cards').content;
const cardContainer =  cardsTemplate.querySelector('.element');*/
const popupInputTitle = document.querySelector('.popup__type_input_title');
const popupInputHref = document.querySelector('.popup__type_input_href');
const popups = document.querySelectorAll('.popup');

const openPopup = function (popup) {
  popup.classList.toggle('popup_opened');

  document.addEventListener('keydown', closeByEscape);
}

const closePopup = function (popup) {
  popup.classList.toggle('popup_opened');

  document.removeEventListener('keydown', closeByEscape);
}

/*function handleFormSubmitProfile (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  
  closePopup(popupProfile);
}

function openSubmitProfile () { 
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  openPopup(popupProfile);
}*/

function openPopupAddButton () {
  openPopup(popupPlace);
}

function createCard(item) {
  const card = new Card (item, '#cards', handleCardClick);
  return card.generateCard();
}

function handleCardFormSubmit (evt) {
  evt.preventDefault();

  const cardData = {name: popupInputTitle.value, link: popupInputHref.value};
  elementsCard.prepend(createCard(cardData));

  evt.target.reset();

  closePopup(popupPlace);

  evt.submitter.classList.add('popup__button-save_disabled');
  evt.submitter.disabled = true;
}

function closeByOverlay(event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
}

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupSubtitleImage.textContent = name;
  
  openPopup(popupBigImage);
}

/*formElementProfile.addEventListener('submit', handleFormSubmitProfile);

popupOpenButtonElement.addEventListener('click', openSubmitProfile);*/

popups.forEach((popup) => {
  popup.addEventListener('mousedown', closeByOverlay);
})

formPopupPlace.addEventListener('submit', handleCardFormSubmit);
popupAddButton.addEventListener('click', openPopupAddButton);

popupCloseButtonsElement.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

initialCards.forEach((item) => {
  elementsCard.append(createCard(item));
})