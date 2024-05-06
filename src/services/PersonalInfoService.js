//import 
import axios from 'axios';

// variables
var token = localStorage.getItem('token');

export default class PersonalInfoService {

  // API Functions
  async getPersonalData(userId) {
    return await axios.post(`/profile/personal_information`,
      {
        userID: userId,
      }).then((res) => res).catch((err) => err);
  }

  async updatePersonalInfo(userID, name, password, confirmPassword, email, phoneNumber, address, Detailaddress, checkboxName) {
    return await axios.post(`/profile/personal_information/update`, {
      userID: userID,
      name: name,
      password:password,
      confirm_password:confirmPassword,
      email:email,
      mobile: phoneNumber,
      address: address,
      detail_address: Detailaddress,
      distribution_medium: checkboxName,   
    }).then((res) => res);
  }

  async businessWithdraw() {
    return await axios.post(`/profile/withdrawal`).then((res) => res).catch((err) => err);
  }
  
}