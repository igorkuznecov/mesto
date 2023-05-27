import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithImage }  from './PopupWithImage.js';
import { PopupWithForm }  from './PopupWithForm.js';
import { UserInfo }  from './UserInfo.js';

const page = document.querySelector('.page');

const selectors = {
  cardTemplate:'#card-template',
  cardPicture:'.element__picture',
  singleCard:'.element',
  popupCard: '.popup_type_card',
  popupProfile: '.popup_type_edit',
  profileName: '.profile__name',
  profileJob: '.profile__description'
};

const popupProfile = page.querySelector('.popup_type_edit');
const popupProfileCOntainer = popupProfile.querySelector('.popup__container');
const popupProfileFormElement = popupProfileCOntainer.querySelector('.edit-form');

const nameInput = popupProfileFormElement.querySelector('.edit-form__input_profile-name');
const jobInput = popupProfileFormElement.querySelector('.edit-form__input_profile-job');

const cardsContainer = page.querySelector('.elements');


const validationConfig = {
  formSelector: ".edit-form",
  inputSelector: ".edit-form__input",
  submitButtonSelector: ".edit-form__save-button",
  inactiveButtonClass: "edit-form__save-button_disabled",
  inputErrorClass: "edit-form__input_error",
  errorClass: "edit-form__error_visible",
};

const profileForm =  page.querySelector('.profile-edit-form');
const profileFormForValidation = new FormValidator(profileForm, validationConfig)

const cardForm =  page.querySelector('.add-form');
const cardFormForValidation = new FormValidator(cardForm, validationConfig)

const popupLightbox = '.popup_type_lightbox';

function handleCardClick(link, description) {
  const popup = new PopupWithImage(popupLightbox);
  popup.open(link, description);
}

const popupCard = page.querySelector('.popup_type_card');
const popupCardCOntainer = popupCard.querySelector('.popup__container');
const popupCardFormElement = popupCardCOntainer.querySelector('.edit-form');
const cardNameInput = popupCardFormElement.querySelector('.edit-form__input_card-name');
const cardLinkInput = popupCardFormElement.querySelector('.edit-form__input_card-link');


const buttonAddCard = page.querySelector('.profile__add-button');

buttonAddCard.addEventListener('click', () => {
  const popup = new PopupWithForm(selectors.popupCard, () => {
    const cardObj = { name: cardNameInput.value, link: cardLinkInput.value }
    const cardElement = createCard(cardObj, selectors);
    cardsContainer.prepend(cardElement);
  })
  popup.open();
  popup.setEventListeners();
});

function createCard(cardObj, selectors) {
  const newCard = new Card(cardObj, selectors, handleCardClick);
  const cardElement = newCard.generate();
  return cardElement;
}

initialCards.forEach((cardObj) => {
  const cardElement = createCard(cardObj, selectors);
  cardsContainer.append(cardElement);
});


function popupProfileSubmitHandle() {
  const userInfo = new UserInfo(selectors);
  userInfo.setUserInfo(nameInput.value, jobInput.value);
}

const profileEditButton = page.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', () => {
  const popup = new PopupWithForm(selectors.popupProfile, popupProfileSubmitHandle);
  const userInfo = new UserInfo(selectors);
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popup.open();
  popup.setEventListeners();
});

profileFormForValidation.enableValidation();
cardFormForValidation.enableValidation();
