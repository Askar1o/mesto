const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupButtonSave = document.querySelector('.popup__button-save');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__type_username');
let jobInput = document.querySelector('.popup__type_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
} 

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

function openSubmit () { 
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  openPopup();
}

popupOpenButtonElement.addEventListener('click', openSubmit);
popupCloseButtonElement.addEventListener('click', closePopup);
popupButtonSave.addEventListener('click', closePopup);