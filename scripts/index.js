import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithImage }  from './PopupWithImage.js';
import { PopupWithForm }  from './PopupWithForm.js';
import { UserInfo }  from './UserInfo.js';
import { Section }  from './Section.js';

const selectors = {
  cardTemplate:'#card-template',
  cardPicture:'.element__picture',
  singleCard:'.element',
  popupCard: '.popup_type_card',
  popupProfile: '.popup_type_edit',
  profileName: '.profile__name',
  profileJob: '.profile__description',
  cardSection: '.elements'
};

const validationConfig = {
  formSelector: ".edit-form",
  inputSelector: ".edit-form__input",
  submitButtonSelector: ".edit-form__save-button",
  inactiveButtonClass: "edit-form__save-button_disabled",
  inputErrorClass: "edit-form__input_error",
  errorClass: "edit-form__error_visible",
};

const page = document.querySelector('.page');
const popupProfile = page.querySelector('.popup_type_edit');
const popupProfileCOntainer = popupProfile.querySelector('.popup__container');
const popupProfileFormElement = popupProfileCOntainer.querySelector('.edit-form');
const nameInput = popupProfileFormElement.querySelector('.edit-form__input_profile-name');
const jobInput = popupProfileFormElement.querySelector('.edit-form__input_profile-job');
const profileForm =  page.querySelector('.profile-edit-form');
const cardForm =  page.querySelector('.add-form');
const popupLightbox = '.popup_type_lightbox';
const popupCard = page.querySelector('.popup_type_card');
const popupCardCOntainer = popupCard.querySelector('.popup__container');
const popupCardFormElement = popupCardCOntainer.querySelector('.edit-form');
const cardNameInput = popupCardFormElement.querySelector('.edit-form__input_card-name');
const cardLinkInput = popupCardFormElement.querySelector('.edit-form__input_card-link');
const buttonAddCard = page.querySelector('.profile__add-button');
const profileEditButton = page.querySelector('.profile__edit-button');

const profileFormForValidation = new FormValidator(profileForm, validationConfig)
const cardFormForValidation = new FormValidator(cardForm, validationConfig)
profileFormForValidation.enableValidation();
cardFormForValidation.enableValidation();

function handleCardClick(link, description) {
  const popup = new PopupWithImage(popupLightbox);
  popup.open(link, description);
}

buttonAddCard.addEventListener('click', () => {
  const popup = new PopupWithForm(selectors.popupCard, () => {
    const cardObj = [{ name: cardNameInput.value, link: cardLinkInput.value }]
    const cardAdd = new Section({
      items: cardObj,
      renderer: (cardObj) => {
        const newCard = new Card(cardObj, selectors, handleCardClick);
        const cardElement = newCard.generate();
        cardAdd.addItem(cardElement);
      }
    },
      selectors.cardSection
    );
    cardAdd.renderItems();
  })
  popup.open();
  popup.setEventListeners();
});

const cardsList = new Section({
  items: initialCards,
  renderer: (initialCards) => {
    const newCard = new Card(initialCards, selectors, handleCardClick);
    const cardElement = newCard.generate();
    cardsList.addItem(cardElement);
  }
},
  selectors.cardSection
);
cardsList.renderItems();

profileEditButton.addEventListener('click', () => {
  const popup = new PopupWithForm(selectors.popupProfile, () => {
    const userInfo = new UserInfo(selectors);
    userInfo.setUserInfo(nameInput.value, jobInput.value);
  } );
  const userInfo = new UserInfo(selectors);
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popup.open();
  popup.setEventListeners();
});
