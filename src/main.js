import { createApp } from "vue";
import App from "./App.vue";
import router from "./routing/router";
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import setAuthHeader from "./utils/setAuthHeader";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import "./Tailwind.css";
import i18n from './config/i18n';

//select
import VueNextSelect from 'vue-next-select';
import "vue-next-select/dist/index.css";
import './config/axios-interceptor';
import "../src/assets/js/postcode.v2.js";
import Pagination from 'v-pagination-3';

// cookie
import VueCookies from 'vue3-cookies';
import { globalCookiesConfig } from "vue3-cookies";

import common from "./store/common";


globalCookiesConfig({
    expireTimes: "30d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
});


const app = createApp(App);
app.use(VueLoading);
app.use(VueCookies);
app.use(VueSweetalert2);
app.use(VueAxios, axios);
app.use(i18n);
app.provide('common', common);
app.use(router).mount("#app");
app.component('vue-select', VueNextSelect);
app.component('pagination', Pagination);

