export default class Card {
    constructor(name, link, cardSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick; 
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector)
            .content.querySelector(".card").cloneNode(true);
    }

    _likedCard() {
        this._likeButton = this._element.querySelector("#like-button");
        this._likeButton.classList.toggle("liked-button");
    }

    _viewCard() {
        this._handleCardClick(this._name, this._link);
    }

    _closeCard() {
        this._closePopupImage = this._element.querySelector("#close-image");
        this._popupImage.close();
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._removeCardButton.addEventListener("click", () => this._deleteCard());
        this._likeButton.addEventListener("click", () => this._likedCard());
        this._cardImage.addEventListener("click", () => this._viewCard()); 
    }

    getView() {
        this._element = this._getTemplate();
        this._popupImage = document.querySelector("#image-popup");
        this._popupLabel = document.querySelector("#popup-label");
        this._imageLabel = document.querySelector("#popup-image");
        this._cardImage = this._element.querySelector(".card__image");
        this._cardName = this._element.querySelector(".card__text");
        this._cardImage.src = this._link;
        this._cardName.textContent = this._name;
        this._removeCardButton = this._element.querySelector(".card__remove-button");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._closePopupImage = document.querySelector("#close-image");
        this._setEventListeners();

        if (this._isLiked) {
            this._likeButton.classList.toggle("liked-button");
        }

        return this._element;
    }
}
