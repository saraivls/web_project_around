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
        this._imageElement = this._popup.querySelector('.image-details');
        this._captionElement = this._popup.querySelector('.popup-name');
    }

    open({ link, name }) {
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._captionElement.textContent = name;
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
        this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
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
        this._form.addEventListener('submit', (evt) => {
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