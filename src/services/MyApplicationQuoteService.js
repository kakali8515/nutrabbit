import axios from 'axios';

var token = localStorage.getItem('token');

export default class MyApplicationQuoteService{
    //API for details pages
   
    async getApplicationBlendingDetails(_id, _app_type){
        return await axios.post(`application/blending/details`, { id : _id, application_type : _app_type}).then((res) => res.data).catch((err) => err);
    }

    async getApplicationChoiceDetails(_id){
        return await axios.post(`application/my_choice/details`, { id : _id }).then((res) => res.data).catch((err) => err);
    }

    async getOptionDetails(op_type, op_val){
        return await axios.post(`application/options_details`, { lang : localStorage.getItem('selectedLang'), option_type: op_type, option_val : op_val }).then((res) => res.data).catch((err) => err);
    }
}