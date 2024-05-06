import axiox from 'axios';

var token = localStorage.getItem('token');

export default class AuthService {
  
  // Authentication Checking for Invalid authendication
  async isAuth() {
    var currentTime = new Date().getTime();
    console.log('isAuth_currentTime', currentTime);
    //check for Invalid authendication
    if (!localStorage.token || !localStorage.tokenexpiresAt) {
      return false;
    } else if (localStorage.token && localStorage.tokenexpiresAt && localStorage.tokenexpiresAt < currentTime) {
      return false;
    } else if (localStorage.token && localStorage.tokenexpiresAt && localStorage.tokenexpiresAt > currentTime) {
      return true;
    } else {
      return false;
    }
  }
}