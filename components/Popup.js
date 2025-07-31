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

export class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = this._form.querySelectorAll(".popup__input");
    }

     _getInputValues(){
        const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
          evt.preventDefault();
          const button = this._form.querySelector(".submit__text");
          button.textContent = "Creando...";
          this._handleFormSubmit(this._getInputValues());
          setTimeout(() => { this.close()},1000);
          });
    }

    close() {
        super.close();
        this._form.reset();
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

