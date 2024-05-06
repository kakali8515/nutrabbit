import axios from 'axios';
import Toast from '../alert/alert.js';

window.axios = axios;
// axios.defaults.baseURL = 'https://api-nutrabbit-dev.dvconsulting.org/nutrabbit-dev/api/v1/sites/'; // local
// axios.defaults.baseURL = 'https://back.nutri33.co.kr/'; // live
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL; // live

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.source = 'nutrabbit';
    config.headers.apiKey = 'coN21di1202VII01Ed0OnNiMDa2P3p0M';
    config.headers['Accept-Language'] = localStorage.getItem('selectedLang').toLowerCase();
    config.headers['Access-Control-Allow-Origin'] = '*';
    if (token) {
        config.headers.token = `${token}`;
    }

    return config;
}, function (err) {
    return Promise.reject(err);
});

// Token expire redirection
axios.interceptors.response.use((response) => {
    return response
}, async function (error) {
    if (error.response.status === 403) {
        Toast.fire({ title: "Session Expired" });
        window.location.href = '/login';
        localStorage.clear();
        return axios(originalRequest);

    }
    return Promise.reject(error);
});