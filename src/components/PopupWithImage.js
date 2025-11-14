import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.image-details');
        this._popupTitle = this._popup.querySelector('.popup-name');
    }

    open({ src, alt, caption }) {
        this._popupImage.src = src;
        this._popupImage.alt = alt || caption;
        this._popupTitle.textContent = caption;

        super.open();
    }
}

