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


/* ---------- API ----------- */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'e7b3962d-255b-4179-a35a-d7cc666e72ce',
    'Content-Type': 'application/json'
  }
});

let userId;

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });



/* -------------- Профиль юзера --------------- */
// создание экземпляра класса, отвечающего за отображение информации о пользователе
const userInfo = new UserInfo({
  username: '.profile__title',
  job: '.profile__subtitle',
  avatar: '.profile__avatar'
});


// создание попапа с формой редактирования профиля
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

// Заносим данные в форму попапа редактирования профиля
function fillInEditProfileFormInputs({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

// Создание попапа редактирования аватара пользователя
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
// Обработчик кнопки Edit аватара пользователя
buttonEditAvatar.addEventListener('click', () => {
  formEditAvatarValidator.toggleButton();
  editAvatarPopup.open();
});
// Обработчик кнопки Edit попапа редактирования профиля
popupOpenButtonElement.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs({
    username: info.username,
    job: info.job
  });
  editProfilePopup.open();
});


/* ----------- Карточки с изображениями ----------- */

// функционал создания новой карточки
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

// Создание экземпляра класса Section
const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements');

// Создаем попап с подтверждением удаления карточки
const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '.popup_type_correction'
});
deleteCardPopup.setEventListeners();

// создание попапа с формой добавления новой карточки
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
// добавляем слушатели этому попапу:
addCardPopup.setEventListeners();
// обработчик открытия попапа
popupAddButtonOpen.addEventListener('click', () => {
  formAddNewCardValidator.toggleButton();
  addCardPopup.open();
})

/* Попап просмотра изображения */
const viewImagePopup = new PopupWithImage('.popup_type_big-image');
viewImagePopup.setEventListeners();


/* Валидация форм */
// валидация формы редактирования профиля
const formEditProfileValidator = new FormValidator(formValidationConfig, formElementProfile);
formEditProfileValidator.enableValidation();
// валидация формы добавления новой карточки
const formAddNewCardValidator = new FormValidator(formValidationConfig, formPopupPlace);
formAddNewCardValidator.enableValidation();
// Валидация формы редактирования аватара пользователя
const formEditAvatarValidator = new FormValidator(formValidationConfig, formEditAvatar);
formEditAvatarValidator.enableValidation();
/*import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {formValidationConfig, popupAddButtonOpen, formElementProfile, formPopupPlace, popupOpenButtonElement, nameInput, jobInput, buttonEditAvatar, formEditAvatar, avatar } from '../utils/conctants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

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
    section.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

  const userInfo = new UserInfo({ username: '.profile__title', job: '.profile__subtitle', avatar: '.profile__avatar' });

const editProfilePopup = new PopupWithForm({
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
  },
  popupSelector: '.popup_type_name'
});
editProfilePopup.setEventListeners();

function fillInEditProfileFormInputs({ username, job }) {
  nameInput.value = username;
  jobInput.value = job;
}

const editAvatarPopup = new PopupWithForm({
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
  },
  popupSelector: '.popup_type_update'
});
editAvatarPopup.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
  formEditAvatarValidator.toggleButton();
  editAvatarPopup.openPopup();
});

popupOpenButtonElement.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs({
    username: info.name,
    job: info.job
  });
  editProfilePopup.openPopup();
});

const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (name, link) => {
      viewImagePopup.openPopup(name, link);
    },
    templateSelector: '.element__template',
    userId: userId,
    handleDeleteIconClick: (cardId) => {
      deletePopup.openPopup();
      deletePopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            deletePopup.closePopup();
            card.deleteCardElement();
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
      api.deleteCard(cardId)
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
}

const section = new Section({
  renderer: (items) => {
    section.addItem(createCard(items));
  }
},
 '.elements'
);



const viewImagePopup = new PopupWithImage('.popup_type_big-image');
viewImagePopup.setEventListeners();

const deletePopup = new PopupWithConfirmation({
  popupSelector: '.popup_type_correction'
});
deletePopup.setEventListeners();

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
  }},
  '.popup_type_place'
);

popupAddButton.setEventListeners();

popupAddButtonOpen.addEventListener('click', () => {
  popupAddButton.openPopup();
  addCardValidation.resetValidator();
});*/

//section.renderItems(initialCards);

/*const popupProfile = new PopupWithForm({
  handleFormSubmit: ({ name, job }) => {
    userInfo.setUserInfo(name, job);
  }
},
'.popup_type_name'
);

popupProfile.setEventListeners();

popupOpenButtonElement.addEventListener('click', () => {
  popupProfile.openPopup();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
});*/

/*const profileValidation = new FormValidator(formValidationConfig, formElementProfile);
profileValidation.enableValidation();

const addCardValidation = new FormValidator(formValidationConfig, formPopupPlace);
addCardValidation.enableValidation();

const formEditAvatarValidator = new FormValidator(formValidationConfig, formEditAvatar);
formEditAvatarValidator.enableValidation();*/
