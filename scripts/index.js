let page = document.querySelector('.page');
let popup = page.querySelector('.popup');
let editButton = page.querySelector('.profile__edit-button');
let closeButton = page.querySelector('.popup__close-button')
let formElement = page.querySelector('.popup__container');
let profileName = page.querySelector('.profile__name');
let profileJob = page.querySelector('.profile__description');
let nameInput = formElement.querySelector('.popup__form-profile-name');
let jobInput = formElement.querySelector('.popup__form-profile-description');

function popupOpen() {
  nameInput.setAttribute('value', profileName.textContent)
  jobInput.setAttribute('value', profileJob.textContent)
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);
