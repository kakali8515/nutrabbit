//import 
import axios from 'axios';

// variables
var token = localStorage.getItem('token');

export default class MyApplicationDetails {

  // API Functions

    // async appNutri(userId, application_type, page, limit, sortBy, sortOrder) {
    //   return await axios.post(`/application/sample_application`,
    //     {
    //       userId: userId,
    //       application_type:application_type,
    //       page:page,
    //       limit: limit,
    //       sortBy: sortBy,
    //       sortOrder:sortOrder,
    //       lang: localStorage.getItem('selectedLang'),
    //     }).then((res) => res).catch((err) => err);
    // }

    async appRecommended(userId, application_type2, page, limit, sortBy, sortOrder) {
      return await axios.post(`/application/sample_application`,
        {
          userId: userId,
          application_type:application_type2,
          page:page,
          limit: limit,
          sortBy: sortBy,
          sortOrder:sortOrder,
          lang: localStorage.getItem('selectedLang'),
        }).then((res) => res).catch((err) => err);
    }

    async appMychoice(userId, application_type3, page, limit, sortBy, sortOrder) {
      return await axios.post(`/application/sample_application`,
        {
          userId: userId,
          application_type:application_type3,
          page:page,
          limit: limit,
          sortBy: sortBy,
          sortOrder:sortOrder,
          lang: localStorage.getItem('selectedLang'),
        }).then((res) => res).catch((err) => err);
    }

    async QuoteNutri(userId, application_type, page, limit, sortBy, sortOrder) {
      return await axios.post(`/application/get_quote`,
        {
          userId: userId,
          application_type:application_type,
          page:page,
          limit: limit,
          sortBy: sortBy,
          sortOrder:sortOrder,
          lang: localStorage.getItem('selectedLang'),
        }).then((res) => res).catch((err) => err);
    }

    async QuoteRecommended(userId, application_type2, page, limit, sortBy, sortOrder) {
      return await axios.post(`/application/get_quote`,
        {
          userId: userId,
          application_type:application_type2,
          page:page,
          limit: limit,
          sortBy: sortBy,
          sortOrder:sortOrder,
          lang: localStorage.getItem('selectedLang'),
        }).then((res) => res).catch((err) => err);
    }

    async QuoteMyChoice(userId, application_type3, page, limit, sortBy, sortOrder) {
      return await axios.post(`/application/get_quote`,
        {
          userId: userId,
          application_type:application_type3,
          page:page,
          limit: limit,
          sortBy: sortBy,
          sortOrder:sortOrder,
          lang: localStorage.getItem('selectedLang'),
        }).then((res) => res).catch((err) => err);
    }

    //My applicaton - My choice
    async sampledetail(id) {
      return await axios.post(`/application/my_choice/details`,
        {
          id:id,
        }).then((res) => res).catch((err) => err);
    }

    async getsampleDetails(op_type,op_val) {
      return await axios.post(`/application/options_details`,
        {
          lang: localStorage.getItem('selectedLang'),
          option_type:op_type,
          option_val:op_val,
        }).then((res) => res).catch((err) => err);
    }

 //My applicaton - recommended_blending & nutri
    async sampleBlendingDetails(id, application_type) {
      return await axios.post(`/application/blending/details`,
        {
          id:id,
          application_type:application_type,
        }).then((res) => res).catch((err) => err);
    }
}