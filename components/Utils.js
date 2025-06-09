import FormValidator from '../components/FormValidator.js'; 
const _ = FormValidator;


export const validationsSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


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
const cardTemplate = document.getElementById("#card-template");


const formProfile = document.querySelector("#profile-popup .popup__form");
const formCard = document.querySelector("#card-popup .popup__form");


export const initialFormValidator = [formProfile, formCard];

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

export {
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
  cardTemplate,
  initialCards,
};