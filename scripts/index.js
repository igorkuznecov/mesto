const page = document.querySelector('.page');

const profileEditButton = page.querySelector('.profile__edit-button');
const popupProfile = page.querySelector('.popup-edit');
const popupProfileCOntainer = popupProfile.querySelector('.popup__container');
const popupProfileFormElement = popupProfileCOntainer.querySelector('.edit-form');
const profileName = page.querySelector('.profile__name');
const profileAbout = page.querySelector('.profile__description');
const nameInput = popupProfileFormElement.querySelector('.edit-form__input_profile-name');
const jobInput = popupProfileFormElement.querySelector('.edit-form__input_profile-job');

const addCardButton = page.querySelector('.profile__add-button');
const popupCard = page.querySelector('.popup-add');
const popupCardCOntainer = popupCard.querySelector('.popup__container');

const popupCardFormElement = popupCardCOntainer.querySelector('.edit-form');
const cardNameInput = popupCardFormElement.querySelector('.edit-form__input_card-name');
const cardLinkInput = popupCardFormElement.querySelector('.edit-form__input_card-link');

const cardsContainer = page.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

const popupLightbox = page.querySelector('.popup-lightbox');
const popupLightboxPicture = popupLightbox.querySelector('.popup__lightbox-image');
const popupLightboxDescription = popupLightbox.querySelector('.popup__image-description');

const closeButtons = document.querySelectorAll('.popup__close-button');

function openPopup(popup) {
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

function handlePopupCardFormSubmit(evt) {
  evt.preventDefault();
  const cardObj = { name: cardNameInput.value, link: cardLinkInput.value };
  const newCard = createCard(cardObj);
  cardsContainer.prepend(newCard);
  closePopup(popupCard);
  popupCardFormElement.reset();
}

function createCard(cardObj) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardPicture = cardElement.querySelector('.element__picture');
  cardElement.querySelector('.element__title').textContent = cardObj.name;
  cardPicture.src = cardObj.link;
  cardPicture.alt = cardObj.name;
  cardPicture.addEventListener('click', function () {
    popupLightboxPicture.src = cardObj.link;
    popupLightboxPicture.alt = cardObj.name;
    popupLightboxDescription.textContent = cardObj.name;
    openPopup(popupLightbox);
  });
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  cardElement.querySelector('.element__trash').addEventListener('click', function () {
    const listItem = cardElement.closest('.element');
    listItem.remove();
  });
  return cardElement;
}

function setProfileInputsValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}

initialCards.forEach((card) => {
  cardsContainer.append(createCard(card));
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupProfileFormElement.addEventListener('submit', handlePopupEditFormSubmit);
popupCardFormElement.addEventListener('submit', handlePopupCardFormSubmit);
profileEditButton.addEventListener('click', () => { openPopup(popupProfile); setProfileInputsValues() });
addCardButton.addEventListener('click', () => { openPopup(popupCard) });
