
const page = document.querySelector('.page');

const profileEditButton = page.querySelector('.profile__edit-button');
const popupProfile = page.querySelector('.popup-edit');
const popupProfileCOntainer = popupProfile.querySelector('.popup__container');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button');
const popupProfileFormElement = popupProfileCOntainer.querySelector('.edit-form');
const profileName = page.querySelector('.profile__name');
const profileAbout = page.querySelector('.profile__description');
const nameInput = popupProfileFormElement.querySelector('.edit-form__input_profile-name');
const jobInput = popupProfileFormElement.querySelector('.edit-form__input_profile-job');

const addCardButton = page.querySelector('.profile__add-button');
const popupCard = page.querySelector('.popup-add');
const popupCardCOntainer = popupCard.querySelector('.popup__container');
const popupCardCloseButton = popupCard.querySelector('.popup__close-button')
const popupCardFormElement = popupCardCOntainer.querySelector('.edit-form');
const cardNameInput = popupCardFormElement.querySelector('.edit-form__input_card-name');
const cardLinkInput = popupCardFormElement.querySelector('.edit-form__input_card-link');

const cardsContainer = page.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

const popupLightbox = page.querySelector('.popup-lightbox');
const popupLightboxPicture = popupLightbox.querySelector('.popup__lightbox-image');
const popupLightboxDescription = popupLightbox.querySelector('.popup__image-description');
const popupLightboxCloseButton = popupLightbox.querySelector('.popup__close-button');

function openPopup(popupID) {
  popupID.classList.add('popup_opened');
}

function closePopup(popupID) {
  popupID.classList.remove('popup_opened');
}

function handlePopupEditFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(popupProfile);
}

function handlePopupCardFormSubmit (evt) {
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
  cardElement.querySelector('.element__picture').addEventListener('click', function () {
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

popupProfileFormElement.addEventListener('submit', handlePopupEditFormSubmit);
popupCardFormElement.addEventListener('submit', handlePopupCardFormSubmit);
profileEditButton.addEventListener('click', () => { openPopup(popupProfile); setProfileInputsValues() });
addCardButton.addEventListener('click', () => { openPopup(popupCard) });
popupProfileCloseButton.addEventListener('click', () => { closePopup(popupProfile) });
popupCardCloseButton.addEventListener('click', () => { closePopup(popupCard) });
popupLightboxCloseButton.addEventListener('click', () => { closePopup(popupLightbox) });
