export class Api {
  constructor(config) {
    this._url = config.url,
    this._headers = config.headers,
    this._authorization = config.headers.authorization;
  }

  _handleRespone(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleRespone)
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._handleRespone)
  }

  deleteCard(ID) {
    return fetch(`${this._url}/cards/${ID}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleRespone)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleRespone)
  }

  setUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._handleRespone)
  }

  setLike(ID) {
    return fetch(`${this._url}/cards/${ID}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._handleRespone)
  }

  deleteLike(ID) {
    return fetch(`${this._url}/cards/${ID}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleRespone)
  }

  changeAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this._handleRespone)
  }
}
