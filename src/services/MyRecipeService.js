
import axios from 'axios';

var token = localStorage.getItem('token');

export default class MyRecipeService{

// Fetching all recipe data for recomended blending reff : MyRecipe

   async getMyRecomendedBlendingData(uid){
        return await axios.post(`/recipe`, { lang: localStorage.getItem('selectedLang'),  user_id : uid, application_type : 'recommended_blending'}).then((res) => res.data).catch((err) => err);
    };

// Fetching all recipe data for my choice reff : MyRecipe

    async getMyChoiceData(uid){
        return await axios.post(`/recipe`, { lang: localStorage.getItem('selectedLang'),  user_id : uid, application_type : 'my_choice'}).then((res) => res.data).catch((err) => err);
    }


    // async getRecipeDetails(_id){
    //     return await axios.post(`recipe/details`, { id : _id, application_type : 'my_choice'}).then((res) => res.data).catch((err) => err);
    // }

// Fetching  data for option detail table for single product reff: MyRecipeDetails

    async getOptionDetails(op_type, op_val){
        return await axios.post(`application/options_details`, { lang : localStorage.getItem('selectedLang'), option_type: op_type, option_val : op_val }).then((res) => res.data).catch((err) => err);
    }

// Fetching data for recipe details like title, additional requests for single product reff: MyRecipeDetails


    async getSingleRecipeProductDetails(_id, type){
        return await axios.post(`recipe/details`, { id : _id, application_type : type}).then((res) => res.data).catch((err) => err);
    }


// Sending Edited data for single product reff : MyRecipeDetailsEdit

    async editRecipeDetail(_id, _title, _additional_req, ser_tp){
        return await axios.post(`recipe/my_choice/edit`, { id : _id, additional_request : _additional_req, title : _title, service_type : ser_tp}).then((res) => res.data).catch((err) => err);
    }

// Ssubmitting application option data for single product reff : MyRecipeDetailsEdit

    async submitRecipeApplication(app_id){
        return await axios.post(`application/submit`, { application_id : app_id, lang : localStorage.getItem('selectedLang') }).then((res) => res.data).catch((err) => err);
    }

// Delete data for a specific product reff : MyRecipe, MyRecipeDetails

    async deleteRecipeData(_id){
        return await axios.post(`recipe/delete`, { deleteID : _id }).then((res) => res.data).catch((err) => err);
    }


}