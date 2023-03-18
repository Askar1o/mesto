import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { formValidationConfig } from '../utils/conctants.js';
import Section from '../components/Section.js';
import { initialCards, popupAddButtonOpen, formElementProfile, formPopupPlace, popupOpenButtonElement, nameInput, jobInput } from '../utils/conctants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupBigImage = new PopupWithImage('.popup_type_big-image');

//функция создания карточки
function createCard(item) {
  const card = new Card ({
    data: item,
    handleCardClick: (name, link) => {
      popupBigImage.openPopup(name, link);
    }
  },
  '#cards');
  return card.generateCard();
}

popupBigImage.setEventListeners();

const popupAddButton = new PopupWithForm({
  handleFormSubmit: (cardData) => {
    section.addItem(createCard(cardData));
    popupAddButton.closePopup();
  }},
  '.popup_type_place'
)

popupAddButton.setEventListeners();

popupAddButtonOpen.addEventListener('click', () => {
  popupAddButton.openPopup();
});

const section = new Section({
  items: initialCards, 
  renderer: (items) => {
    section.addItem(createCard(items));
  }
},
 '.elements'
);

section.renderItems(initialCards);

const userInfo = new UserInfo({ nameSelector: '.profile__title', jobSelector: '.profile__subtitle' });

const popupProfile = new PopupWithForm({
  handleFormSubmit: ({ name, job }) => {
    userInfo.setUserInfo(name, job);
    popupProfile.closePopup();
  }
},
'.popup_type_name'
);

popupProfile.setEventListeners();

popupOpenButtonElement.addEventListener('click', () => {
  popupProfile.openPopup();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
});

const profileValidation = new FormValidator(formValidationConfig, formElementProfile);
profileValidation.enableValidation();

const addCardValidation = new FormValidator(formValidationConfig, formPopupPlace);
addCardValidation.enableValidation();

//функция открытия попапов
/*const openPopup = function (popup) {
  popup.classList.toggle('popup_opened');

  document.addEventListener('keydown', closeByEscape);
}

//функция закрытия попапов
const closePopup = function (popup) {
  popup.classList.toggle('popup_opened');

  document.removeEventListener('keydown', closeByEscape);
}*/

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
}

//функция открытия попапа(создания карточки)
function openPopupAddButton () {
  openPopup(popupPlace);
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
/*function closeByOverlay(event) {
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
}*/

/*formElementProfile.addEventListener('submit', handleFormSubmitProfile);
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
})*/