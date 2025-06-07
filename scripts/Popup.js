export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.showModal();
      }

      close(){
        this._popup.close();
      }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
          this.close();
        }
      }

    setEventListeners() {
        if (this._closeButton) {
            this._closeButton.addEventListener("click", () => this.close());
          }
      
          
          this._popup.addEventListener("click", (evt) => {
            if (evt.target === this._popup) {
              this.close();
            }
          });

          this._handleEscClose();
      }
}

export class PopupWithImage extends Popup{
    constructor({popupSelector}){
        super(popupSelector);
    }

    open() {
        super.open();
      }
    
    close() {
        super.close();
      }
}

export class PopupWithForm{
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector("form");
    }

     _getInputValues(){
        this._inputList = this._popup.querySelectorAll(".popup__input");
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
          });

        return this._formValues;
    }

    setEventListeners(){
        this._popup.addEventListener("submit", (evt) => {
            this.submitText.textContent = "Guardando...";
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
          });
    }

    close() {
        super.close();
        this._form.reset();
      }
}