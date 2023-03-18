export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupSelector.querySelector('.popup__button-close');
  }
  
  openPopup() {
    this._popupSelector.classList.toggle('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popupSelector.classList.toggle('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      this.closePopup(popupOpened);
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.closePopup();
    });

    this._popupSelector.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup_opened')) {
        this.closePopup();
      }
    });
  } 
}
