import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage }  from '../components/PopupWithImage.js';
import { PopupWithForm }  from '../components/PopupWithForm.js';
import { UserInfo }  from '../components/UserInfo.js';
import { Section }  from '../components/Section.js';
import { initialCards }  from '../utils/initialCards.js';
import '../pages/index.css';


const selectors = {
  cardTemplate:'#card-template',
  cardPicture:'.element__picture',
  singleCard:'.element',
  popupCard: '.popup_type_card',
  popupProfile: '.popup_type_edit',
  popupLightbox: '.popup_type_lightbox',
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
const buttonAddCard = page.querySelector('.profile__add-button');
const profileEditButton = page.querySelector('.profile__edit-button');

const profileFormForValidation = new FormValidator(profileForm, validationConfig)
const cardFormForValidation = new FormValidator(cardForm, validationConfig)

profileFormForValidation.enableValidation();
cardFormForValidation.enableValidation();

const popupLightbox = new PopupWithImage(selectors.popupLightbox);

function handleCardClick(link, description) {
  popupLightbox.open(link, description);
}



function createCard(cardData) {
  const newCard = new Card(cardData, selectors, handleCardClick);
  const cardElement = newCard.generate();
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

const section = new Section({items: [], renderer: renderCard}, selectors.cardSection)
section.renderItems()

const popupAddCard = new PopupWithForm(selectors.popupCard, (data) => {
  data['name'] = data['input-card-name'];
  data['link'] = data['input-card-link'];
  delete data['input-card-name'];
  delete data['input-card-link'];
  renderCard(data);
  popupAddCard.close();
});

popupAddCard.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupAddCard.open();
});

initialCards.forEach((cardObj) => {
    renderCard(cardObj);
  });

const userInfo = new UserInfo(selectors);

const popupEditProfile = new PopupWithForm(selectors.popupProfile, (data) => {
  userInfo.setUserInfo(data['profile-edit-form-name'], data['profile-edit-form-job']);
  popupEditProfile.close();
} );

popupEditProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupEditProfile.open();
});
