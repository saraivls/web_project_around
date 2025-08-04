export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector(".close");
    this.submitText = this._popup.querySelector(".submit__text");
  }

  open() {
    this._popup.showModal();
  }

  close() {
    this._popup.close();
  }

  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }

  setEventListeners() {
    if (this._closeButton) {
      this._closeButton.addEventListener("click", () => this.close());
    }

    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this._popup.close();
      }
    });

    this._handleEscClose();
  }
}


export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
         this._confirmButton = this._popup.querySelector('#confirm-delete-button');
    }
   

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

    
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      console.log("submit", this._cardId);
      this._handleSubmitCallback?.(this._cardId);
      
    });
  }

  open(cardId) {
    super.open();
    this._cardId = cardId;
  }
}

