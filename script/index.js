const popupProfile = document.querySelector('.popup_type_name');
const popupPlace = document.querySelector('.popup_type_place');
const popupBigImage = document.querySelector('.popup_type_big-image');
const popupCloseButtonElementName = popupProfile.querySelector('.popup__button-close');
const popupCloseButtonElementPlace = popupPlace.querySelector('.popup__button-close');
const popupCloseButtonBigImage = popupBigImage.querySelector('.popup__button-close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

const formElementProfile = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__type_input_username');
const jobInput = document.querySelector('.popup__type_input_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formPopupPlace = document.querySelector('.popup__form_place');

const openPopup = function (popup) {
  popup.classList.toggle('popup_opened');

  document.addEventListener('keydown', closeByEscape);
}

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

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

function openSubmitProfile () { 
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  openPopup(popupProfile);
}

popupOpenButtonElement.addEventListener('click', openSubmitProfile);
popupCloseButtonElementName.addEventListener('click', function () {
  closePopup(popupProfile);
});

const elementsCard = document.querySelector('.elements');
const cardContainer = elementsCard.querySelector('.element');
const cardsTemplate = document.querySelector('#cards').content;
const popupImage = document.querySelector('.popup__image');
const popupSubtitleImage = document.querySelector('.popup__subtitle-image');
const popupInputTitle = document.querySelector('.popup__type_input_title');
const popupInputHref = document.querySelector('.popup__type_input_href');

const createCard = (item) => {
  const card = cardsTemplate.querySelector('.element').cloneNode(true);
  const cardDeleteButton = card.querySelector('.element__delete-button');
  const cardLikeButton = card.querySelector('.element__button');
  const elementBigImage = card.querySelector('.element__mask-group');

  elementBigImage.alt = item.name;
  elementBigImage.src = item.link;
  card.querySelector('.element__title').textContent = item.name;

  cardDeleteButton.addEventListener('click', function () {
    card.remove();
  })

  cardLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  })

  elementBigImage.addEventListener('click', function () {
    openPopup(popupBigImage);

    popupImage.alt = item.name;
    popupImage.src = item.link;
    popupSubtitleImage.textContent = item.name;
  })
  return card;
}

popupCloseButtonBigImage.addEventListener('click', function () {
  closePopup(popupBigImage);
})

const renderCards = (cardName) => {
  elementsCard.append(createCard(cardName));
}

initialCards.forEach((item) => {
  renderCards(item);
}) 

function openPopupAddButton () {
  openPopup(popupPlace);
}

function closePopupAddButton (evt) {
  evt.preventDefault();

  const addNewCard = {name: popupInputTitle.value, link: popupInputHref.value};
  elementsCard.prepend(createCard(addNewCard));

  closePopup(popupPlace);
}

function closeByOverlay(event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
}

function closeByEscape(event) {
  const popupList = Array.from(document.querySelectorAll('.popup'))
  popupList.forEach((popup) => {
    if (event.key === 'Escape' && popup.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
}

document.addEventListener('click', closeByOverlay);

formPopupPlace.addEventListener('submit', closePopupAddButton);
popupAddButton.addEventListener('click', openPopupAddButton);
popupCloseButtonElementPlace.addEventListener('click', function () {
  closePopup(popupPlace);
})