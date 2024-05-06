import { reactive } from "vue";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const state = reactive({
  AppData: undefined,
  userId: localStorage.getItem("uid"),
  name: '',
  searchKeyword: '',
  myIP: cookies.get("myIP"),
  isMobile: false,
  isiPhone: false,
  SelectedLang: '',
  isPayment: false,
  isPaymentDone: null,
  isHidePhAddr:true,
});

const methods = {
  async getData() {
    console.log('getData');
  },
  // check if it's from APP
  isFromApp() {
    // const cookies = VueCookies();
    var queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var mobile = urlParams.get("mobile");
    var iphone = urlParams.get("isiPhone");
    if (mobile == 'true') {
      state.isMobile = true;
      document.cookie = "isMobile=true";
      localStorage.setItem("isMobile", true);
      if (iphone == 'true') {
        state.isiPhone = true;
        document.cookie = "isiPhone=true";
        localStorage.setItem("isiPhone", true);
      }
    }
    setTimeout(() => {
      // alert(state.isMobile);
      // alert(state.isiPhone);
      // console.log("state.isMobile:-", state.isMobile);
      // console.log("state.isiPhone:-", state.isiPhone);
    }, 4000);
  },
  // ENdx check if it's from APP

  
};

export default {
  state,
  methods,
};
