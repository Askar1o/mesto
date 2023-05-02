import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupName = this._popup.querySelector('.popup__subtitle-image');
  }

  open (name, link) {
    this._popupImage.src = link;
    this._popupName.textContent = name;
    this._popupImage.alt = name;
    super.open();
  }
}

/*import Popup from "./Popup.js";

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
}*/