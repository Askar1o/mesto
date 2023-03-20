export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__button-close');
  }
  
  openPopup() {
    this._popup.classList.toggle('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.toggle('popup_opened');

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

    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup_opened')) {
        this.closePopup();
      }
    });
  } 
}
