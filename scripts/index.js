import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const page = document.querySelector('.page');

export const popupLightbox = page.querySelector('.popup_type_lightbox');
export const popupLightboxPicture = popupLightbox.querySelector('.popup__lightbox-image');
export const popupLightboxDescription = popupLightbox.querySelector('.popup__image-description');

const selectors = {
  cardTemplate:'#card-template',
  cardPicture:'.element__picture',
  singleCard:'.element',
};

const profileEditButton = page.querySelector('.profile__edit-button');
const popupProfile = page.querySelector('.popup_type_edit');
const popupProfileCOntainer = popupProfile.querySelector('.popup__container');
const popupProfileFormElement = popupProfileCOntainer.querySelector('.edit-form');

const profileName = page.querySelector('.profile__name');
const profileAbout = page.querySelector('.profile__description');
const nameInput = popupProfileFormElement.querySelector('.edit-form__input_profile-name');
const jobInput = popupProfileFormElement.querySelector('.edit-form__input_profile-job');

const buttonAddCard = page.querySelector('.profile__add-button');
const popupCard = page.querySelector('.popup_type_card');
const popupCardCOntainer = popupCard.querySelector('.popup__container');

const popupCardFormElement = popupCardCOntainer.querySelector('.edit-form');
const cardNameInput = popupCardFormElement.querySelector('.edit-form__input_card-name');
const cardLinkInput = popupCardFormElement.querySelector('.edit-form__input_card-link');

const cardsContainer = page.querySelector('.elements');
const buttonsClose = document.querySelectorAll('.popup__close-button');

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

profileFormForValidation.enableValidation();
cardFormForValidation.enableValidation();

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleClickClose);
  document.addEventListener('keydown', handleKeyClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleClickClose);
  document.removeEventListener('keydown', handleKeyClose);
}

function handleKeyClose(evt) {
  if (evt.key === 'Escape') {
    const popup = page.querySelector('.popup_opened')
    closePopup(popup);
  }
}

function handleClickClose(evt) {
  if (evt.target.classList.contains('popup') && !evt.target.classList.contains('popup__container')) {
    const popup = evt.target;
    closePopup(popup);
  }
}

function handlePopupEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupProfile);
}

function renderCard(cardObj, selectors) {
  const newCard = new Card(cardObj, selectors);
  const cardElement = newCard.generate();
  return cardElement;
}

function handlePopupCardFormSubmit(evt) {
  evt.preventDefault();
  const cardObj = { name: cardNameInput.value, link: cardLinkInput.value }
  const cardElement = renderCard(cardObj, selectors);
  cardsContainer.prepend(cardElement);
  closePopup(popupCard);
  popupCardFormElement.reset();
}

function setProfileInputsValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}

initialCards.forEach((cardObj) => {
  const cardElement = renderCard(cardObj, selectors);
  cardsContainer.append(cardElement);
});

buttonsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupProfileFormElement.addEventListener('submit', handlePopupEditFormSubmit);
popupCardFormElement.addEventListener('submit', handlePopupCardFormSubmit);
profileEditButton.addEventListener('click', () => { setProfileInputsValues(); openPopup(popupProfile) });
buttonAddCard.addEventListener('click', () => { openPopup(popupCard) });
