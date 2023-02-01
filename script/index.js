const popupElement = document.querySelector('.popup');
const popupName = document.querySelector('.popup__name');
const popupPlace = document.querySelector('.popup__place');
const popupBigImage = document.querySelector('.popup__big-image');
const popupCloseButtonElementName = popupName.querySelector('.popup__button-close');
const popupCloseButtonElementPlace = popupPlace.querySelector('.popup__button-close');
const popupCloseButtonBigImage = popupBigImage.querySelector('.popup__button-close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupButtonSave = document.querySelector('.popup__button-save');
const popupAddButton = document.querySelector('.profile__add-button');

let formElement = document.querySelector('.popup__form_profile');
let nameInput = document.querySelector('.popup__type_input_username');
let jobInput = document.querySelector('.popup__type_input_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formPopupPlace = document.querySelector('.popup__form_place');

const togglePopup = function (popup) {
  popup.classList.toggle('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  
  togglePopup(popupName);
}

formElement.addEventListener('submit', handleFormSubmit);

function openSubmit () { 
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  togglePopup(popupName);
}

popupOpenButtonElement.addEventListener('click', openSubmit);
popupCloseButtonElementName.addEventListener('click', function () {
  togglePopup(popupName);
});

const initialCards = [
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

const cardsTemplate = document.querySelector('#cards').content;
const elementsCard = document.querySelector('.elements');
const cardContainer = elementsCard.querySelector('.element');
const popupImage = document.querySelector('.popup__image');
const popupSubtitleImage = document.querySelector('.popup__subtitle-image');
let popupInputTitle = document.querySelector('.popup__type_input_title');
let popupInputHref = document.querySelector('.popup__type_input_href');

const createCard = (item) => {
  const card = cardsTemplate.querySelector('.element').cloneNode(true);
  const cardDeleteButton = card.querySelector('.element__delete-button');
  const cardLikeButton = card.querySelector('.element__button');
  const elementBigImage = card.querySelector('.element__mask-group');

  card.querySelector('.element__mask-group').alt = item.name;
  card.querySelector('.element__mask-group').src = item.link;
  card.querySelector('.element__title').textContent = item.name;

  cardDeleteButton.addEventListener('click', function () {
    card.remove();
  })

  cardLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  })

  elementBigImage.addEventListener('click', function () {
    togglePopup(popupBigImage);

    popupImage.alt = item.name;
    popupImage.src = item.link;
    popupSubtitleImage.textContent = item.name;
  })
  return card;
}

popupCloseButtonBigImage.addEventListener('click', function () {
  togglePopup(popupBigImage);
})

const renderCards = (cardName) => {
  elementsCard.append(createCard(cardName));
}

initialCards.forEach((item) => {
  renderCards(item);
}) 

function openPopupAddButton () {
  togglePopup(popupPlace);
}

function closePopupAddButton (evt) {
  evt.preventDefault();

  const addNewCard = {name: popupInputTitle.value, link: popupInputHref.value};
  elementsCard.prepend(createCard(addNewCard));

  togglePopup(popupPlace);
}

formPopupPlace.addEventListener('submit', closePopupAddButton);
popupAddButton.addEventListener('click', openPopupAddButton);
popupCloseButtonElementPlace.addEventListener('click', function () {
  togglePopup(popupPlace);
})