//import 
import axios from 'axios';

// variables
var token = localStorage.getItem('token');

export default class NutriService {

  // API Functions
  async getNutriService() {
    return await axios.post(`/nutriBlending`,
      {
        lang: localStorage.getItem('selectedLang')
      }).then((res) => res).catch((err) => err);
  }

  async getNutridetails(id) {
    return await axios.post(`/nutriBlending/id`,
      {
        id: id,
        lang: localStorage.getItem('selectedLang')
      }).then((res) => res).catch((err) => err);
  }

  async confirmbutton(id, additional_request, service_type) {
    return await axios.post(`/nutriBlending/get_quote`, {
      id: id,
      additional_request: additional_request,
      service_type: service_type,
      lang: localStorage.getItem('selectedLang')
    }).then((res) => res).catch((err) => err);
  }

  async nutriDetailsforFinalEstimate(id) {
    return await axios.post(`/nutriBlending/nutri_details`, {
      id: id,
      lang: localStorage.getItem('selectedLang')
    }).then((res) => res).catch((err) => err);
  }

}