import { resetValidations, validationsSettings } from "./validate.js";

const popup = document.getElementById("profile-popup");
const button = document.getElementById("edit-button");
const closeButton = document.getElementById("close-button");
const saveButton = document.getElementById("save-button");
const inputName = document.getElementById("name-profile");
const inputDescription = document.getElementById("job-profile");
const namePerson = document.querySelector(".profile__name");
const descriptionPerson = document.querySelector(".profile__text");

const popupCard = document.getElementById("card-popup");
const buttonCard = document.getElementById("add-card");
const closeCard = document.getElementById("close-card");
const saveCard = document.getElementById("save-card");
const inputCardName = document.getElementById("card-title");
const cardUrl = document.getElementById("card-url");
const cardGallery = document.querySelector(".gallery__cards");
const cardTemplate = document.getElementById("card-template");

const popupImage = document.querySelector("#image-popup"); 
const closePopupImage = document.querySelector("#close-image");
const imageLabel = document.querySelector("#popup-image");
const popupLabel = document.querySelector("#popup-label");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

initialCards.forEach((card) => {
  const newCard = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardName = newCard.querySelector(".card__text");
  const likeButton = newCard.querySelector("#like-button");
  const removeCardButton = newCard.querySelector(".card__remove-button");

  likeButton.addEventListener("click", function (evt) {
    likeButton.classList.toggle("liked-button");
  });

  removeCardButton.addEventListener("click", function (evt) {
    newCard.remove();
  });

  cardImage.addEventListener("click", function (evt) {
    popupImage.showModal();

    imageLabel.src = card.link;
    popupLabel.textContent = card.name;
  });

  closePopupImage.addEventListener("click", function (evt) {
    popupImage.close();
    resetValidations(validationsSettings);
  });

  cardImage.src = card.link;
  cardName.textContent = card.name;

  cardGallery.prepend(newCard);
});

button.addEventListener("click", function (evt) {
  popup.showModal();
});

closeButton.addEventListener("click", function (evt) {
  popup.close();
  resetValidations(validationsSettings);
});

saveButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  let nameValue = inputName.value;
  let descriptionValue = inputDescription.value;

  namePerson.textContent = nameValue;
  descriptionPerson.textContent = descriptionValue;

  popup.close();
});

buttonCard.addEventListener("click", function (evt) {
  popupCard.showModal();
});

closeCard.addEventListener("click", function (evt) {
  popupCard.close();
  resetValidations(validationsSettings);
});

saveCard.addEventListener("click", function (evt) {
  evt.preventDefault();

  let cardValue = inputCardName.value;
  let cardLink = cardUrl.value;

  const newCard = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardName = newCard.querySelector(".card__text");
  const likeButton = newCard.querySelector("#like-button");
  const removeCardButton = newCard.querySelector(".card__remove-button");

  likeButton.addEventListener("click", function (evt) {
    likeButton.classList.toggle("liked-button");
  });

  removeCardButton.addEventListener("click", function (evt) {
    newCard.remove();
  });

  cardImage.src = cardLink;
  cardName.textContent = cardValue;

  cardGallery.prepend(newCard);
  popupCard.close();

  cardImage.addEventListener("click", function (evt) {
    popupImage.showModal();

    imageLabel.src = cardLink;
    popupLabel.textContent = cardValue;
  });

  closePopupImage.addEventListener("click", function (evt) {
    popupImage.close();
  });
});

popup.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    popup.close();
    resetValidations(validationsSettings);
  }
});

popupCard.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup")) {
    popupCard.close();
    resetValidations(validationsSettings);
  }
});