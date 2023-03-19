import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { initialCards, formValidationConfig, popupAddButtonOpen, formElementProfile, formPopupPlace, popupOpenButtonElement, nameInput, jobInput } from '../utils/conctants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

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