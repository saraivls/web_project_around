import { resetValidations, validationsSettings } from "./validate.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  PopupWithForm,
  PopupWithImage,
} from "./Popup.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
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



const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();



const profileFormPopup = new PopupWithForm(
  '#profile-popup',
  (formData) => {
    userInfo.setUserInfo({
      name: formData['name-profile'],
      job: formData['job-profile']
    });
  }
);



const cardFormPopup = new PopupWithForm(
  "#card-popup",
  (formData) => {
    const newCard = new Card(formData.title, formData.url, "#card-template");
    cardGallery.prepend(newCard.getView());
  }
);
cardFormPopup.setEventListeners();


const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__text"
});


const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardNode = new Card(item.name, item.link, "#card-template");
      return cardNode.getView();
    }
  },
  ".gallery"
);

section.renderItems();