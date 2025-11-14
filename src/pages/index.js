import { resetValidations, validationsSettings } from "../scripts/validate.js";
import Card from "../../components/Card.js";
import FormValidator from '../../components/FormValidator.js'; 
import  {PopupWithForm} from "../../components/popupWithForm.js";
import {PopupWithImage} from "../../components/popupWithImage.js";
import {PopupWithConfirmation} from "../../components/Popup.js";
import UserInfo from "../../components/UserInfo.js";
import Section from "../../components/Section.js";
import { api } from '../../components/Api.js';
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
  popupAvatar,
  closeAvatar,
  saveAvatar,
  inputAvatarUrl,
  avatarImage,
  avatarEditIcon,
} from "../../components/Utils.js";

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners(); 


// Initialize the popup for profile form submission
const profileFormPopup = new PopupWithForm("#profile-popup", (data) => {
  const button = document.querySelector("#profile-popup").querySelector(".submit__text");
  button.textContent = "Guardando...";
  api.setUserInfo({ name: data.name, about: data.about })
      .then((data) => {
        userInfo.setUserInfo(data);
        profileFormPopup.close();
        button.textContent = "Guardar";
      })
      .catch((err) => console.error("Error al actualizar la información del usuario:", err));
      button.textContent = "Guardar";
});





profileFormPopup.setEventListeners(); 

const cardFormPopup = new PopupWithForm("#card-popup", handleCardSubmit);
cardFormPopup.setEventListeners(); 

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__text",
   avatarSelector: ".profile__avatar"
});


const confirmPopup = new PopupWithConfirmation("#confirm-popup");
confirmPopup.setEventListeners();


function handleCardSubmit(formData) {
   const newCard = {
    name: formData['card-title'] || '',
    link: formData['card-url'] || ''
  };
  
  const button = document.querySelector("#card-popup").querySelector(".submit__text");
  button.textContent = "Creando...";
  api.addCard(newCard)
    .then((res) => {
      const cardNode = new Card(
        res.name,
        res.link,
        "#card-template",
        (data) => imagePopup.open({ src: data.link, caption: data.name }),
        handleDeleteClick,
        res._id
      );
      cardGallery.prepend(cardNode.getView());
     })
    .catch(err => console.error("Error al crear tarjeta:", err));
}


function handleDeleteClick(cardId, cardElement) {
  confirmPopup.open(cardId);
  
  confirmPopup.setSubmitAction(() => {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        confirmPopup.close();
      })
      .catch((err) => console.error("Error al eliminar tarjeta:", err));
    });
  }

let section;

api.getInitialCards()
  .then(cards => {
    section = new Section(
  {
    items: cards,
    renderer: (item) => {
    const cardNode = new Card(
    item.name,
    item.link,
    "#card-template",
    (data) => imagePopup.open({ src: data.link, caption: data.name }),
    handleDeleteClick,
    item._id
  );
  return cardNode.getView();
}
  },
  ".gallery__cards" 
);
    section.renderItems(cards);
  })
  .catch(err => console.error("Error al obtener las tarjetas:", err));



initialFormValidator.forEach((formElement) => {
  const formValidator = new FormValidator(validationsSettings, formElement);
  formValidator.enableValidation();
});


button.addEventListener("click", () => popup.showModal());
closeButton.addEventListener("click", () => {
  popup.close();
  resetValidations(validationsSettings);
});



buttonCard.addEventListener("click", () => popupCard.showModal());
closeCard.addEventListener("click", () => {
  popupCard.close();
  resetValidations(validationsSettings);
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


avatarEditIcon.addEventListener("click", () => {
  popupAvatar.showModal();
  inputAvatarUrl.value = "";
});


closeAvatar.addEventListener("click", () => {
  popupAvatar.close();
  resetValidations(validationsSettings);
});


saveAvatar.addEventListener("click", (evt) => {
  evt.preventDefault();
  const newAvatarUrl = inputAvatarUrl.value;

  const loadingTextEl = saveAvatar.querySelector(".submit__text");
  const defaultText = loadingTextEl.textContent;
  loadingTextEl.textContent = "Guardando..."; 

  api.updateProfilePicture(newAvatarUrl)
    .then((res) => {
      avatarImage.src = res.avatar;
      popupAvatar.close();
    })
    .catch((err) => {
      console.error("Error al actualizar la imagen de perfil:", err);
    })
    .finally(() => {
      loadingTextEl.textContent = defaultText;
    });
});

api.getUserInfo()
.then((userData) => {
   avatarImage.src = userData.avatar;
   namePerson.textContent = userData.name;
   descriptionPerson.textContent = userData.about;
});


