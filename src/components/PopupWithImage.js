import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupBigImage = this._popup.querySelector('.popup__image');
    this._popupSubtitleImage = this._popup.querySelector('.popup__subtitle-image');
  }

  openPopup(name, link) {
    this._popupBigImage.src = link;
    this._popupBigImage.alt = name;
    this._popupSubtitleImage.textContent = name;
    super.openPopup();
  }
}