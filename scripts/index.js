import { resetValidations, validationsSettings } from "./validate.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  popup,
  button,
  closeButton,
  saveButton,
  inputName,
  inputDescription,
  namePerson,
  descriptionPerson,
  popupCard,
  buttonCard,
  closeCard,
  saveCard,
  inputCardName,
  cardUrl,
  cardGallery,
  initialCards,
  initialFormValidator,
} from "./utils.js";


initialCards.forEach((card) => {
  const cardNode = new Card(card.name, card.link, "#card-template");
  const cardNodeElement = cardNode.getView();
  cardGallery.prepend(cardNodeElement);
});


initialFormValidator.forEach((formElement) => {
  const formValidator = new FormValidator(validationsSettings, formElement);
  formValidator.enableValidation();
});


button.addEventListener("click", () => popup.showModal());
closeButton.addEventListener("click", () => {
  popup.close();
  resetValidations(validationsSettings);
});
saveButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  namePerson.textContent = inputName.value;
  descriptionPerson.textContent = inputDescription.value;
  popup.close();
});


buttonCard.addEventListener("click", () => popupCard.showModal());
closeCard.addEventListener("click", () => {
  popupCard.close();
  resetValidations(validationsSettings);
});
saveCard.addEventListener("click", (evt) => {
  evt.preventDefault();
  const newCard = {
    name: inputCardName.value,
    link: cardUrl.value,
  };
  const cardNode = new Card(newCard.name, newCard.link, "#card-template");
  cardGallery.prepend(cardNode.getView());
  popupCard.close();
});


popup.addEventListener("click", (evt) => {
  if (evt.target === popup) {
    popup.close();
    resetValidations(validationsSettings);
  }
});

popupCard.addEventListener("click", (evt) => {
  if (evt.target === popupCard) {
    popupCard.close();
    resetValidations(validationsSettings);
  }
});