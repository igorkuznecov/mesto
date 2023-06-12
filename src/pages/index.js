import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage }  from '../components/PopupWithImage.js';
import { PopupWithForm }  from '../components/PopupWithForm.js';
import { UserInfo }  from '../components/UserInfo.js';
import { Section }  from '../components/Section.js';
import { Api }  from '../components/Api.js';
import '../pages/index.css';

const selectors = {
  cardTemplate:'#card-template',
  cardPicture:'.element__picture',
  singleCard:'.element',
  popupCard: '.popup_type_card',
  popupProfile: '.popup_type_edit',
  popupLightbox: '.popup_type_lightbox',
  popupDelete: '.popup_type_delete',
  popupAvatar: '.popup_type_avatar',
  profileName: '.profile__name',
  profileJob: '.profile__description',
  cardSection: '.elements',
  likes: '.element__likes-count'
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
const avatarForm =  page.querySelector('.avatar-edit-form');
const avatar = page.querySelector('.profile__overlay');
const deleteForm = page.querySelector('.delete-form');
const avatarFormSubmitButton = avatarForm.querySelector('.edit-form__save-button')
const profileFormSubmitButton = profileForm.querySelector('.edit-form__save-button')
const cardFormSubmitButton = cardForm.querySelector('.edit-form__save-button')
const deleteFormSubmitButton = deleteForm.querySelector('.edit-form__save-button')
const avatarInput = page.querySelector('.edit-form__input_avatar-link')
const avatarPicture = page.querySelector('.profile__avatar')

let buttonNormalState = null
let userInfoFromServer = null
let cardElementForDelete = null
let cardIdForDelete = null

const avatarFormForValidation = new FormValidator(avatarForm, validationConfig)
const profileFormForValidation = new FormValidator(profileForm, validationConfig)
const cardFormForValidation = new FormValidator(cardForm, validationConfig)

avatarFormForValidation.enableValidation();
profileFormForValidation.enableValidation();
cardFormForValidation.enableValidation();

const popupLightbox = new PopupWithImage(selectors.popupLightbox);
popupLightbox.setEventListeners()

function loadingState(button, isLoading) {
  if (isLoading) {
    buttonNormalState = button.textContent;
    button.textContent = 'Сохранение...';
  } else
  button.textContent = buttonNormalState;
}

function handleCardClick(link, description) {
  popupLightbox.open(link, description);
}

function createCard(cardData) {
  const newCard = new Card(cardData, selectors, handleCardClick, handleLikeClick, handleDeleteIconClick, userInfoFromServer);
  const cardElement = newCard.generate();
  return cardElement;
}

function renderCard(data, append) {
  const cardElement = createCard(data);
  section.addItem(cardElement, append);
}

const section = new Section({items: [], renderer: renderCard}, selectors.cardSection)
section.renderItems()

const popupAddCard = new PopupWithForm(selectors.popupCard, (data) => {
  loadingState(cardFormSubmitButton, true)
  api.addCard(data['input-card-name'], data['input-card-link'])
  .then((res) => { renderCard(res) })
  .then(popupAddCard.close())
  .catch((err) => console.log(`Catch ${err}`))
  .finally(loadingState(cardFormSubmitButton, false))
});

popupAddCard.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupAddCard.open();
});

const userInfo = new UserInfo(selectors);

const popupEditProfile = new PopupWithForm(selectors.popupProfile, (data) => {
  loadingState(profileFormSubmitButton, true)
  api.setUserInfo(data['profile-edit-form-name'], data['profile-edit-form-job'])
  .then((res) => { userInfo.setUserInfo(res.name, res.about) })
  .then(popupEditProfile.close())
  .catch((err) => console.log(`Catch ${err}`))
  .finally(loadingState(profileFormSubmitButton, false))
});

popupEditProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupEditProfile.open();
});

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '3dd76270-4c4f-4c38-aef6-b808f759a447',
    'Content-Type': 'application/json'
  }
})

api.getCards().then((cards) => {
  cards.forEach((cardObj, append) => {
    renderCard(cardObj, append);
  });
}).catch((err) => console.log(`Catch ${err}`))

api.getUserInfo().then((res) => {
  userInfoFromServer = res
  userInfo.setUserInfo(userInfoFromServer.name, userInfoFromServer.about)
  avatarPicture.src = userInfoFromServer.avatar;
}).catch((err) => console.log(`Catch ${err}`));

const popupAvatar = new PopupWithForm(selectors.popupAvatar, () => {
  loadingState(avatarFormSubmitButton, true)
  api.changeAvatar(avatarInput.value)
  .then(avatarPicture.src = avatarInput.value)
  .then(popupAvatar.close())
  .catch((err) => console.log(`Catch ${err}`))
  .finally(loadingState(avatarFormSubmitButton, false))
});

popupAvatar.setEventListeners();

avatar.addEventListener('click', () => {
  avatarInput.value = userInfoFromServer.avatar
  popupAvatar.open()
})

const popupDelete = new PopupWithForm(selectors.popupDelete, () => {
  loadingState(deleteFormSubmitButton, true)
  api.deleteCard(cardIdForDelete)
  .then(cardElementForDelete.remove())
  .then(popupDelete.close())
  .catch((err) => console.log(`Catch ${err}`))
  .finally(loadingState(deleteFormSubmitButton, false))
});

popupDelete.setEventListeners();

function handleDeleteIconClick(cardElement, cardID) {
  cardElementForDelete = cardElement;
  cardIdForDelete = cardID;
  popupDelete.open();
}

function handleLikeClick(cardID, likeCount, like) {
  if (like.classList.contains('element__like_active')) {
    api.deleteLike(cardID).then((res) => {
      likeCount.textContent = res.likes.length;
    }).catch((err) => console.log(`Catch ${err}`))
  } else {
    api.setLike(cardID).then((res) => {
      likeCount.textContent = res.likes.length;
    }).catch((err) => console.log(`Catch ${err}`))
  }
}
