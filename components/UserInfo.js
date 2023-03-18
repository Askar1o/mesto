export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameInfo = document.querySelector(nameSelector);
    this._jobInfo = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._userInfoValues = {};
    this._userInfoValues['name'] = this._nameInfo.textContent;
    this._userInfoValues['job'] = this._jobInfo.textContent;
    return this._userInfoValues;
  }

  setUserInfo( name, job ) {
    this._nameInfo.textContent = name;
    this._jobInfo.textContent = job;
  }
}