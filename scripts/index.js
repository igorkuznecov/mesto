
const page = document.querySelector('.page');

const editButton = page.querySelector('.profile__edit-button');
const popupEdit = page.querySelector('.popup-edit');
const popupEditCOntainer = popupEdit.querySelector('.popup__container');
const popupEditCloseButton = popupEdit.querySelector('.popup__close-button')
const popupEditFormElement = popupEditCOntainer.querySelector('.edit-form');
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__description');
let nameInput = popupEditFormElement.querySelector('.profile-edit-form__input_name');
let jobInput = popupEditFormElement.querySelector('.profile-edit-form__input_job');

const addButton = page.querySelector('.profile__add-button');
const popupAdd = page.querySelector('.popup-add');
const popupAddCOntainer = popupAdd.querySelector('.popup__container');
const popupAddCloseButton = popupAdd.querySelector('.popup__close-button')
const popupAddFormElement = popupAddCOntainer.querySelector('.edit-form');
const cardNameInput = popupAddFormElement.querySelector('.add-form__input_name');
const cardLinkInput = popupAddFormElement.querySelector('.add-form__input_link');

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

popupEditFormElement.addEventListener('submit', popupEditHandleFormSubmit);
popupAddFormElement.addEventListener('submit', popupAddHandleFormSubmit);
editButton.addEventListener('click', () => { popupOpen(popupEdit); setProfileInputsValues() });
addButton.addEventListener('click', () => { popupOpen(popupAdd) });
popupEditCloseButton.addEventListener('click', () => { popupClose(popupEdit) });
popupAddCloseButton.addEventListener('click', () => { popupClose(popupAdd) });

// добавление базового массива

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

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
   });

  cardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
    const listItem = cardElement.closest('.element');
    listItem.remove();
  });

  cardsContainer.append(cardElement);
});

