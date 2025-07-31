import { resetValidations, validationsSettings } from "../scripts/validate.js";
import Card from "./Card.js";
import FormValidator from '../components/FormValidator.js'; 
import {
  PopupWithForm,
  PopupWithImage,
  PopupWithConfirmation
} from "./Popup.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import { api } from './Api.js';
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
} from "./Utils.js";

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners(); 


//no está actualizando directamente desde la api, no se mantienen los cambios en la página
const profileFormPopup = new PopupWithForm("#profile-popup", (data) => {
  const button = document.querySelector("#profile-popup").querySelector(".submit__text");
  button.textContent = "Guardando...";
  api.setUserInfo({ name: data.name, about: data.about })
      .then((data) => {
        userInfo.setUserInfo(data);
        popupProfile.close();
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
  jobSelector: ".profile__text"
});



const confirmPopup = new PopupWithConfirmation("#confirm-popup");
confirmPopup.setEventListeners();

function handleProfileSubmit(formData) {
  userInfo.setUserInfo({
    name: formData['profile-name'] || '',
    job: formData['profile-job'] || ''
  });
  profileFormPopup.close();
}

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
    .catch(err => console.error("Error al crear tarjeta:", err))

   // .finally(() => cardFormPopup.renderLoading(false));
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



/*initialCards.forEach((card) => {
  const cardNode = new Card(card.name, card.link, "#card-template");
  const cardNodeElement = cardNode.getView();
  cardGallery.prepend(cardNodeElement);
});*/
// este codigo es antiguo y no se usa.


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

/*saveCard.addEventListener("click", (evt) => {
  evt.preventDefault();
  const newCard = {
    name: inputCardName.value,
    link: cardUrl.value,
  };
  const cardNode = new Card(newCard.name, newCard.link, "#card-template");
  cardGallery.prepend(cardNode.getView());
  popupCard.close();
});*/
// este codigo es antiguo y no se usa.


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


