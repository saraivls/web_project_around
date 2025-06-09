

export default class FormValidator {
    constructor(validationsSettings, formElement) {  
      this._validationsSettings = validationsSettings; 
      this._formElement = formElement;
    }
  
    _hideInputError(inputElement) {  
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
  
      if (errorElement) {
        inputElement.classList.remove(this._validationsSettings.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._validationsSettings.errorClass);
      }
    }
  
    _showInputError(inputElement, errorMessage) {   
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    
      if (errorElement) {
      inputElement.classList.add(this._validationsSettings.inputErrorClass);
      errorElement.textContent = errorMessage;  
      errorElement.classList.add(this._validationsSettings.errorClass);
      }
    }
  
    _checkInputValidity(inputElement) {  
      if (!inputElement.validity.valid) {  
        let errorMessage = "";
        if (inputElement.validity.tooShort) {
          errorMessage = "La información no está completa !!";
        } else if (inputElement.validity.valueMissing) {
          errorMessage = "Por favor, rellena este campo";
        } else if (inputElement.validity.typeMismatch) {
          errorMessage = "Por favor, introduce una dirección web.";
        }
        this._showInputError(inputElement, errorMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;  
      });
    }
  
    _toggleButtonState(inputList, buttonElement) {  
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._validationsSettings.inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(this._validationsSettings.inactiveButtonClass);
        buttonElement.disabled = false;
      }
    }
  
    _setEventListeners() {  
      const inputList = Array.from(
        this._formElement.querySelectorAll(this._validationsSettings.inputSelector)
      );
      const buttonElement = this._formElement.querySelector(
        this._validationsSettings.submitButtonSelector
      );
  
      this._toggleButtonState(inputList, buttonElement);
  
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
    }
  
    enableValidation() {  
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();  
    }
  
    resetValidation() {  
      const inputList = Array.from(
        this._formElement.querySelectorAll(this._validationsSettings.inputSelector)
      );
      inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    }
  }