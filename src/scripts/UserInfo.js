export class UserInfo {
  constructor({profileName, profileJob}) {
    this._name = document.querySelector(profileName);
    this._job = document.querySelector(profileJob);
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
}
