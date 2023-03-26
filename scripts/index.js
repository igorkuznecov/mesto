let page = document.querySelector('.page');
let popup = page.querySelector('.popup');
let popupCOntainer = popup.querySelector('.popup__container');
let editButton = page.querySelector('.profile__edit-button');
let closeButton = page.querySelector('.popup__close-button')
let formElement = popupCOntainer.querySelector('.profile-edit-form');
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__description');
let nameInput = formElement.querySelector('.profile-edit-form__input_name');
let jobInput = formElement.querySelector('.profile-edit-form__input_job');

function popupOpen() {
  nameInput.setAttribute('value', profileName.textContent)
  jobInput.setAttribute('value', profileJob.textContent)
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
