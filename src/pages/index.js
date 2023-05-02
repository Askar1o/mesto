import './index.css';

import {
  formValidationConfig, avatar, popupOpenButtonElement, popupAddButtonOpen,
  formElementProfile, nameInput, jobInput, formPopupPlace, buttonEditAvatar, formEditAvatar
} from "../utils/conctants.js";
import Section from "../components/Section.js";
import FormValidator from '../components/FormValidator.js';
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'e7b3962d-255b-4179-a35a-d7cc666e72ce',
    'Content-Type': 'application/json'
  }
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const userInfo = new UserInfo({
  username: '.profile__title',
  job: '.profile__subtitle',
  avatar: '.profile__avatar'
});

const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_type_name',
  handleFormSubmit: (dataForm) => {
    editProfilePopup.loading(true);
    api.editUserInfo(dataForm)
      .then((dataForm) => {
        userInfo.setUserInfo(dataForm);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editProfilePopup.loading(false);
      });
  }
});
editProfilePopup.setEventListeners();

function fillInEditProfileFormInputs({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}
const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_update',
  handleFormSubmit: (data) => {
    editAvatarPopup.loading(true);
    api.editAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
  }
});
editAvatarPopup.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
  formEditAvatarValidator.toggleButton();
  editAvatarPopup.open();
});

popupOpenButtonElement.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs({
    username: info.username,
    job: info.job
  });
  editProfilePopup.open();
});

const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: '.element__template',
    userId: userId,
    handleCardClick: (name, link) => {
      viewImagePopup.open(name, link);
    },
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements');

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '.popup_type_correction'
});
deleteCardPopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_place',
  handleFormSubmit: (formData) => {
    addCardPopup.loading(true);
    api.addCard(formData)
      .then((formData) => {
        cardsList.addItem(createCard(formData));
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        addCardPopup.loading(false);
      });
  }
});

addCardPopup.setEventListeners();
// обработчик открытия попапа
popupAddButtonOpen.addEventListener('click', () => {
  formAddNewCardValidator.toggleButton();
  addCardPopup.open();
})

const viewImagePopup = new PopupWithImage('.popup_type_big-image');
viewImagePopup.setEventListeners();


const formEditProfileValidator = new FormValidator(formValidationConfig, formElementProfile);
formEditProfileValidator.enableValidation();

const formAddNewCardValidator = new FormValidator(formValidationConfig, formPopupPlace);
formAddNewCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(formValidationConfig, formEditAvatar);
formEditAvatarValidator.enableValidation();