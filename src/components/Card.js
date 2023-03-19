//класс Card
export default class Card {
  constructor({ data, handleCardClick }, templateSelector) {
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

    this._bigImage = this._element.querySelector('.element__mask-group');

    this._element.querySelector('.element__mask-group').alt = this._name;
    this._element.querySelector('.element__mask-group').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
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

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCardElement();
    });

    this._element.querySelector('.element__button').addEventListener('click', (evt) => {
      this._likeCardElement(evt);
    });
  }
}