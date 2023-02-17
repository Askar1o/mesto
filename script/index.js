const popupProfile = document.querySelector('.popup_type_name');
const popupPlace = document.querySelector('.popup_type_place');
const popupBigImage = document.querySelector('.popup_type_big-image');
const popupCloseButtonsElement = document.querySelectorAll('.popup__button-close');
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

const elementsCard = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#cards').content;
const cardContainer =  cardsTemplate.querySelector('.element');
const popupImage = document.querySelector('.popup__image');
const popupSubtitleImage = document.querySelector('.popup__subtitle-image');
const popupInputTitle = document.querySelector('.popup__type_input_title');
const popupInputHref = document.querySelector('.popup__type_input_href');

const createCard = (cardData) => {
  const card = cardContainer.cloneNode(true);
  const cardDeleteButton = card.querySelector('.element__delete-button');
  const cardLikeButton = card.querySelector('.element__button');
  const elementBigImage = card.querySelector('.element__mask-group');

  elementBigImage.alt = cardData.name;
  elementBigImage.src = cardData.link;
  card.querySelector('.element__title').textContent = cardData.name;

  cardDeleteButton.addEventListener('click', function () {
    card.remove();
  })

  cardLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  })

  elementBigImage.addEventListener('click', function () {
    openPopup(popupBigImage);

    popupImage.alt = cardData.name;
    popupImage.src = cardData.link;
    popupSubtitleImage.textContent = cardData.name;
  })
  return card;
}

const renderCard = (cardData) => {
  elementsCard.append(createCard(cardData));
}

initialCards.forEach((item) => {
  renderCard(item);
}) 

function openPopupAddButton () {
  openPopup(popupPlace);
}

function handleCardFormSubmit (evt) {
  evt.preventDefault();

  const cardData = {name: popupInputTitle.value, link: popupInputHref.value};
  elementsCard.prepend(createCard(cardData));

  popupInputTitle.value = '';
  popupInputHref.value = '';

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

const popups = document.querySelectorAll('.popup');

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
