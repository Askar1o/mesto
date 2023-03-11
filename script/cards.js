//класс Card
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

//возвращаем карточку
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

//функция создания карточки
  generateCard() {
    this._element = this._getTemplate();

    this._popupBigImage = document.querySelector('.popup_type_big-image');
    this._bigImage = this._element.querySelector('.element__mask-group');
    this._popupCloseBigImage = this._popupBigImage.querySelector('.popup__button-close_image');
    this._popupSubtitleImage = this._popupBigImage.querySelector('.popup__subtitle-image');
    this._popupImage = document.querySelector('.popup__image');
    this._cardDeleteButton = this._element.querySelector('.element__delete-button');
    this._cardLikeButton = this._element.querySelector('.element__button');

    this._bigImage.alt = this._name;
    this._bigImage.src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

//
  _openBigImagePopup() {
    this._popupBigImage.classList.add('popup_opened');

    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupSubtitleImage.textContent = this._name;
  }

  _deleteCardElement() {
    this._element.remove();
  }

  _likeCardElement(evt) {
    evt.target.classList.toggle('element__button_active');
  }

  _setEventListeners() {
    this._bigImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._cardDeleteButton.addEventListener('click', () => {
      this._deleteCardElement();
    });

    this._cardLikeButton.addEventListener('click', (evt) => {
      this._likeCardElement(evt);
    });
  }
}