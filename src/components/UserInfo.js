export class UserInfo {
  constructor({profileName, profileJob, overlay, avatar}) {
    this._name = document.querySelector(profileName);
    this._job = document.querySelector(profileJob);
    this._overlay = document.querySelector(overlay);
    this._avatar = document.querySelector(avatar)
  }

  getUserInfo() {
    const currentUserInfo = {};
    currentUserInfo.name = this._name.textContent;
    currentUserInfo.job = this._job.textContent;
    return currentUserInfo;
  }

  setUserInfo(name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }

  getUserPic() {
    return this._avatar
  }

  setUserPic(newPic) {
    this._avatar.src = newPic
  }
}
