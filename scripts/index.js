
const page = document.querySelector('.page');

const editButton = page.querySelector('.profile__edit-button');
const popupEdit = page.querySelector('.popup-edit');
const popupEditCOntainer = popupEdit.querySelector('.popup__container');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button')
const popupEditFormElement = popupEditCOntainer.querySelector('.edit-form');
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__description');
let nameInput = popupEditFormElement.querySelector('.edit-form__input_profile-name');
let jobInput = popupEditFormElement.querySelector('.edit-form__input_profile-job');

const addButton = page.querySelector('.profile__add-button');
const popupAdd = page.querySelector('.popup-add');
const popupAddCOntainer = popupAdd.querySelector('.popup__container');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button')
const popupAddFormElement = popupAddCOntainer.querySelector('.edit-form');
const cardNameInput = popupAddFormElement.querySelector('.edit-form__input_card-name');
const cardLinkInput = popupAddFormElement.querySelector('.edit-form__input_card-link');

const popupLightbox = page.querySelector('.popup-lightbox');

function popupOpen(popupID) {
  popupID.classList.add('popup_opened');
}

function popupClose(popupID) {
  popupID.classList.remove('popup_opened');
}

function popupEditHandleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose(popupEdit);
}

function popupAddHandleFormSubmit (evt) {
  evt.preventDefault();
  let name = cardNameInput.value;
  let link = cardLinkInput.value;
  addCard(name, link);
  popupClose(popupAdd);
  cardNameInput.value = '';
  cardLinkInput.value = '';
}

function addCard(name, link) {
  const cardsContainer = page.querySelector('.elements');
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__picture').src = link;
  cardElement.querySelector('.element__picture').alt = name;
  cardElement.querySelector('.element__picture').addEventListener('click', function () {
    popupLightbox.querySelector('.popup__lightbox-image').src = link;
    popupLightbox.querySelector('.popup__image-description').textContent = name;
    let popupLightboxCloseButton = popupLightbox.querySelector('.popup__close-button');
    popupLightboxCloseButton.addEventListener('click', () => { popupClose(popupLightbox) });
    popupOpen(popupLightbox);
  });

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
    const listItem = cardElement.closest('.element');
    listItem.remove();
  });

  cardsContainer.prepend(cardElement);
}

function setProfileInputsValues() {
  nameInput.setAttribute('value', profileName.textContent);
  jobInput.setAttribute('value', profileJob.textContent);
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (element) {
  const cardsContainer = page.querySelector('.elements');
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__picture').src = element.link;
  cardElement.querySelector('.element__picture').alt = element.name;

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
   });

  cardElement.querySelector('.element__trash').addEventListener('click', function () {
    const listItem = cardElement.closest('.element');
    listItem.remove();
  });

  cardElement.querySelector('.element__picture').addEventListener('click', function () {
    popupLightbox.querySelector('.popup__lightbox-image').src = element.link;
    popupLightbox.querySelector('.popup__image-description').textContent = element.name;
    let popupLightboxCloseButton = popupLightbox.querySelector('.popup__close-button');
    popupLightboxCloseButton.addEventListener('click', () => { popupClose(popupLightbox) });
    popupOpen(popupLightbox);
  });

  cardsContainer.append(cardElement);
});

popupEditFormElement.addEventListener('submit', popupEditHandleFormSubmit);
popupAddFormElement.addEventListener('submit', popupAddHandleFormSubmit);
editButton.addEventListener('click', () => { popupOpen(popupEdit); setProfileInputsValues() });
addButton.addEventListener('click', () => { popupOpen(popupAdd) });
popupEditCloseButton.addEventListener('click', () => { popupClose(popupEdit) });
popupAddCloseButton.addEventListener('click', () => { popupClose(popupAdd) });
