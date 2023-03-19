import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupBigImage = document.querySelector('.popup__image');
    this._popupSubtitleImage = document.querySelector('.popup__subtitle-image');
  }

  openPopup(name, link) {
    this._popupBigImage.src = link;
    this._popupBigImage.alt = name;
    this._popupSubtitleImage.textContent = name;
    super.openPopup();
  }
}