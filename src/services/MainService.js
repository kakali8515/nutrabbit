//import 
import axios from 'axios';

// variables
let token = localStorage.getItem('token');

export default class MainService {

  // API Functions
  async getSlider() {
    return await axios.post(`/banner`, { lang: localStorage.getItem('selectedLang') }).then((res) => res.data).catch((err) => err);
  }

  //getNutriData API Functions
  async getNutriData() {
    return await axios.post(`/nutriBlending/list`, { lang: localStorage.getItem('selectedLang'), limit: 6, page: 1 }).then((res) => res.data).catch((err) => err);
  }
}