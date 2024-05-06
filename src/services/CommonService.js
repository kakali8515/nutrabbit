//import 
import axios from 'axios';

// variables
// var token = localStorage.getItem('token');

export default class CommonService {

  // API Functions
  async getLogin(loginId, loginPw) {
    return await axios.post(`/auth/login`, { login_id: loginId, password: loginPw, }).then((res) => res).catch((err) => err);
  }

  // API Functions
  async getSocialLogin(loginId) {
    return await axios.post(`/auth/social-login`, { email: loginId }).then((res) => res).catch((err) => err);
  }

  // Individuals signup
  async individalRegistration(name, username, password, email, phoneNumber, address, detsilAddress, checkName, login_token, login_type) {
    return await axios.post(`/user/individual_registration`, {
      name: name,
      username: username,
      password: password,
      email: email,
      mobile: phoneNumber,
      address: address,
      detail_address: detsilAddress,
      distribution_medium: checkName,
      login_token: login_token,
      login_type: login_type,
      // login_type: 'web',
    })
      .then((res) => res)
      .catch((err) => err)
  }

  // check user id

  async checkUser(username) {
    return await axios.post(`/user/check_id`, { uuid: username })
      .then((res) => res)
      .catch((err) => err)
  }

  // send otp

  async sendOTP(email) {
    return await axios.post(`/user/send_otp`, { email: email })
      .then((res) => res)
      .catch((err) => err)
  }

  // verify OTP

  async verifyOTP(email, emailOTP) {
    return await axios.post(`/user/verify_otp`, { email: email, verification_code: emailOTP })
      .then((res) => res)
      .catch((err) => err)
  }

  // Business signup
  async BusinessRegistration(name, username, password, email, phoneNumber, address, detsilAddress, businessNumber, businessName, depertment, contactPerson) {
    return await axios.post(`/user/business_registration`, {
      name: name,
      username: username,
      password: password,
      email: email,
      mobile: phoneNumber,
      address: address,
      detail_address: detsilAddress,
      business_number: businessNumber,
      business_name: businessName,
      department: depertment,
      contact_person: contactPerson,
      login_type: 'web',
    })
      .then((res) => res)
      .catch((err) => err)
  }

  // User find id

  async userFindId(email) {
    return await axios.post(`/user/find_id`, { email: email })
      .then((res) => res)
      .catch((err) => err)
  }

  // // Find id otp verification

  // async verifyOTP(email, emailOTP, btn_type) {
  //   return await axios.post(`/user/verify_otp`, { email: email, verification_code: emailOTP, btn_type: 'certification' })
  //     .then((res) => res)
  //     .catch((err) => err)
  // }

  // forget password verification

  async forgetPassword(email, username) {
    return await axios.post(`/user/find_password`, { email: email, username: username })
      .then((res) => res)
      .catch((err) => err)
  }

  // change password

  async ChangePassword(userId, password, confirmPassword) {
    return await axios.post(`/user/change_password`, {
      userId: userId,
      newPassword: password,
      confirm_password: confirmPassword
    })
      .then((res) => res)
      .catch((err) => err)
  }

  // search
  async getIpaddr(){
    return await axios.get(`https://freeipapi.com/api/json`)
    .then((res) => res)
    .catch((err) => err)
  }

  async getSearchResult(searchInput, ip, uid) {
    return new Promise((resolve, reject) => {
      axios.post(`/search`, { searchData: searchInput, ipAddress: ip, user_id: uid })
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }
  // get history
  async getSearchHistory(ip, uid) {
    return await axios.post(`/search/getHistory`, { ipAddress: ip, user_id: uid })
      .then((res) => res)
      .catch((err) => err)
  }

  // delete history
  async deleteSearchHistory(searchId) {
    return await axios.post(`/search/delete`, { deleteIdArray: searchId })
      .then((res) => res)
      .catch((err) => err)
  }

  // delete all
  async deleteAllHistory(ip,uid) {
    return await axios.post(`/search/deleteAll`, { ipAddress: ip, user_id: uid })
      .then((res) => res)
      .catch((err) => err)
  }

}