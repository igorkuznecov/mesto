import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage }  from '../components/PopupWithImage.js';
import { PopupWithForm }  from '../components/PopupWithForm.js';
import { PopupWithConfirmation }  from '../components/PopupWithConfirmation.js';
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
  overlay: '.profile__overlay',
  avatar: '.profile__avatar',
  cardSection: '.elements',
  likes: '.element__likes-count',
  likeActive: 'element__like_active'
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
const avatarInput = page.querySelector('.edit-form__input_avatar-link')

let userInfoFromServer = null

const avatarFormForValidation = new FormValidator(avatarForm, validationConfig)
const profileFormForValidation = new FormValidator(profileForm, validationConfig)
const cardFormForValidation = new FormValidator(cardForm, validationConfig)

avatarFormForValidation.enableValidation();
profileFormForValidation.enableValidation();
cardFormForValidation.enableValidation();

const popupLightbox = new PopupWithImage(selectors.popupLightbox);
popupLightbox.setEventListeners()

function handleCardClick(link, description) {
  popupLightbox.open(link, description);
}

function createCard(cardData) {
  const newCard = new Card(cardData, selectors, handleCardClick, handleLikeClick, handleDeleteIconClick, userInfoFromServer);
  const cardElement = newCard.generate();
  return cardElement;
}

function renderCard(data, isAppend) {
  const cardElement = createCard(data);
  section.addItem(cardElement, isAppend);
}

const section = new Section(renderCard, selectors.cardSection)

const popupAddCard = new PopupWithForm(selectors.popupCard, (data) => {
  popupAddCard.loadingState(true)
  api.addCard(data['input-card-name'], data['input-card-link'])
  .then((res) => { renderCard(res, false) })
  .then(() => { popupAddCard.close() })
  .catch((err) => console.log(`Catch ${err}`))
  .finally(() => { popupAddCard.loadingState(false) })
});

popupAddCard.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  popupAddCard.open();
});

const userInfo = new UserInfo(selectors);

const popupEditProfile = new PopupWithForm(selectors.popupProfile, (data) => {
  popupEditProfile.loadingState(true)
  api.setUserInfo(data['profile-edit-form-name'], data['profile-edit-form-job'])
  .then((res) => { userInfo.setUserInfo(res.name, res.about) })
  .then(() => { popupEditProfile.close() })
  .catch((err) => console.log(`Catch ${err}`))
  .finally(()=> { popupEditProfile.loadingState(false) })
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

Promise.all([
  api.getUserInfo(),
  api.getCards()
])
.then(([info, initialCards])=>{
  userInfoFromServer = info
  userInfo.setUserInfo(info.name, info.about)
  userInfo.setUserPic(info.avatar)
  section.renderItems(initialCards, true)
})
.catch((err) => console.log(`Catch ${err}`))

const popupAvatar = new PopupWithForm(selectors.popupAvatar, () => {
  popupAvatar.loadingState(true)
  api.changeAvatar(avatarInput.value)
  .then((res) => { userInfo.setUserPic(res.avatar) })
  .then(() => { popupAvatar.close() })
  .catch((err) => console.log(`Catch ${err}`))
  .finally(() => { popupAvatar.loadingState(false) })
});

popupAvatar.setEventListeners();

avatar.addEventListener('click', () => {
  avatarForm.reset()
  popupAvatar.open()
});

const popupDelete = new PopupWithConfirmation(selectors.popupDelete, () => {
  popupDelete.loadingState(true)
  api.deleteCard(popupDelete.card.getId())
  .then(() => { popupDelete.card.deleteCard() })
  .then(() => { popupDelete.close() })
  .catch((err) => console.log(`Catch ${err}`))
  .finally(() => { popupDelete.loadingState(false) })
});

popupDelete.setEventListeners();

function handleDeleteIconClick(card) {
  popupDelete.open(card)
};

function handleLikeClick(card) {
  if (card.isLiked()) {
    api.deleteLike(card.getId())
    .then((res) => { card.updateLikes(res.likes) })
    .catch((err) => { console.log(`Catch ${err}`) })
  } else {
    api.setLike(card.getId())
    .then((res) => { card.updateLikes(res.likes) })
    .catch((err) => { console.log(`Catch ${err}`) })
  }
}

