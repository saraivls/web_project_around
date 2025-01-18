export const validationsSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".submit",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };
  
  function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(settings.errorClass);
  }
  
  function showInputError(formElement, inputElement, settings) {
    let errorMessage = "";
    if (inputElement.validity.tooShort === true) {
      errorMessage = "La informacion no esta completa !!";
    }
    if (inputElement.validity.valueMissing === true) {
      errorMessage = "Por favor, rellena este campo";
    }
    if (inputElement.validity.typeMismatch) {
      errorMessage = "Por favor, introduce una dirección web.";
    }
  
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }
  
  function checkInputValidity(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  }
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  function toggleButtonstate(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  
  function setEventListeners(formElement, settings) {
    const inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );
  
    toggleButtonstate(inputList, buttonElement, settings);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonstate(inputList, buttonElement, settings);
      });
    });
  }
  
  function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
  
    forms.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, settings);
    });
  }
  
  export function resetValidations(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach((formElement) => {
      formElement.reset();
      const inputList = Array.from(
        formElement.querySelectorAll(settings.inputSelector)
      );
      inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settings);
      });
    });
  }
  
  enableValidation(validationsSettings);
  