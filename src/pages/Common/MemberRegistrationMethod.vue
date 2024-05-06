<template>
  <div class="main-body">
    <div class="container-small">
      <div class="login-signup-wrap membership-wrap">
        <div class="login-signup-inner">
          <div class="login-heading-wrap type-2">
            <h1 class="login-heading">{{ $t('common.title.HowToSignUp') }}</h1>
            <p class="membership-desc">{{ $t('common.SubTitle.RegistrationProcess') }}</p>
          </div>
          <div class="membership-list-wrap method-selection">
            <ul>
              <li class="method-item">
                <h2 class="method-heading">{{ $t('common.title.GeneralSignUp') }}</h2>
                <p class="list-desc">{{ $t('common.SubTitle.EmailSignUp') }}</p>
                <button class="btn-primary" @click="
                  $router.push({
                    name: 'MemberRegistrationIndividual',
                  })
                ">{{ $t('common.QuickLinks.SignUp') }}</button>
              </li>
              <li class="method-item">
                <h2 class="method-heading">{{ $t('common.title.SnsSignUp') }}</h2>
                <p class="list-desc">
                  {{ $t('common.SubTitle.SnsSignUp') }}
                </p>

                <!-- <button class="btn-primary with-icon yellow-btn">
                  <i class="icon-chat-black"></i> {{ $t('common.QuickLinks.CacaoLogin') }}
                </button>
                <button class="btn-primary with-icon green-btn">
                  <i class="icon-naver"></i> {{ $t('common.QuickLinks.NaverLogin') }}
                </button> -->



                <!-- kakao login for Web -->
                <button id="kakao_login" v-if="!isPlatMobile" class="btn-primary with-icon yellow-btn"
                  @click="loginWithKakao">
                  <i class="icon-chat-black"></i>
                  {{ $t("common.QuickLinks.CacaoLogin") }}
                </button>
                <!-- kakao login for App -->
                <button id="kakao_login" v-else class="btn-primary with-icon yellow-btn" @click="mbKakaoLogin">
                  <i class="icon-chat-black"></i>
                  {{ $t("common.QuickLinks.CacaoLogin") }}
                </button>
                <!-- END kakao login for App -->

                <!-- Naver login for App -->
                <button id="naver_Login" v-if="!isPlatMobile" class="btn-primary with-icon green-btn"
                  @click="loginWithNaver">
                  <i class="icon-naver"></i>
                  {{ $t("common.QuickLinks.NaverLogin") }}
                </button>
                <!-- Naver login for App -->
                <button id="naver_Login" v-else class="btn-primary with-icon green-btn" @click="mbNaverLogin">
                  <i class="icon-naver"></i>
                  {{ $t("common.QuickLinks.NaverLogin") }}
                </button>
                <!-- ENd Naver login for App -->

                <!-- social login for appale -->
                <button class="btn-primary with-icon black-btn" v-show="isAppaleId" @click="mbAppleLogin">
                  <i class="icon-appale"></i>
                  {{ $t("common.QuickLinks.AppleLogin") }}
                </button>


              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, onMounted, onUpdated } from "vue";
import { useCookies } from "vue3-cookies";
import CommonService from "../../services/CommonService";
import naver from 'naver-id-login';
export default {
  name: "MemberRegistrationMethod",
  data() {
    return {
      loader: undefined,
      naverAuth: undefined,
      naverProfiledata: undefined,
      // isPlatMobile: localStorage.getItem("isMobile") === "true",
      // isAppaleId: localStorage.getItem("isiPhone") === "true",
      isPlatMobile: this.cookies.get("isMobile") === "true",
      isAppaleId: this.cookies.get("isiPhone") === "true",
      validateOnce: false,
      globalLocale: "",
    };
  },
  setup() {
    const { cookies } = useCookies();
    const common = inject("common");
    onMounted(() => {
      common.methods.isFromApp();
    });
    onUpdated(() => {
      common.methods.isFromApp();
    });
    return { cookies, common };
  },
  created() {
    this.commonService = new CommonService();
  },
  mounted() {
    if (this.cookies) {
      const rememberUserPasswordCookie = this.cookies.get("rememberUserPassword");
      const rememberUserEmailCookie = this.cookies.get("rememberUserEmail");

      if (rememberUserPasswordCookie && rememberUserEmailCookie) {
        (this.email = rememberUserEmailCookie),
          (this.password = rememberUserPasswordCookie);
      }
    }
    // web view get message
    window["sendKakaoLoginData"] = (res) => {
      this.sendKakoAccessToken(res);
    };
    window["sendNaverLoginData"] = (res) => {
      this.sendNaverAccessToken(res);
    };
    window["sendAppleLoginData"] = (res) => {
      this.sendAppleAccessToken(res);
    };
    // end web view get message
  },
  methods: {
    // Webview support
    sendAccessToken(res) {
      if (res) {
        // this.testres = res;
        this.checkMbfblogin(res);
      } else {
        return false;
      }
    },
    sendKakoAccessToken(token) {
      let ftoken = token;
      // console.log("ftoken:--", ftoken);
      // alert(ftoken);
      this.kakaoLoginHandler(ftoken);
    },
    sendNaverAccessToken(token) {
      let ftoken = token;
      // console.log("ftoken:--", ftoken);
      // alert(ftoken);
      this.naverLoginHandler(ftoken);
    },
    sendAppleAccessToken(token) {
      let ftoken = token;
      console.log("ftoken:--", ftoken);
      // alert(ftoken);
      this.appleLoginHandler(ftoken);
    },
    //post login
    mbKakaoLogin() {
      window.parent.postMessage("kakaoLoginClicked", "*");
    },
    mbNaverLogin() {
      window.parent.postMessage("naverLoginClicked", "*");
    },
    mbAppleLogin() {
      window.parent.postMessage("appleLoginClicked", "*");
    },

    appleLoginHandler(res) {
      // console.log("appleLoginHandler", res);
      const self = this;
      if (res) {
        // let resData = JSON.parse(JSON.stringify(res));
        let resData = JSON.parse(res);
        // alert(resData);
        // console.log("--appleLoginHandler--", resData);
        let emailName = resData.emailId.match(/^([^@]*)@/)[1];
        let userName = (!resData.userName || resData.userName == "") ? resData.userName : emailName;
        self.socialRegistration(
          userName,
          userName,
          "Ab12345678987654",
          resData.emailId,
          "9999999999",
          "address",
          "detail address",
          "sns",
          resData.accessToken,
          resData.loginVia
        );
        setTimeout(() => {
          self.socialLogin(resData.emailId);
        }, 1500);
      } else {
        return false;
      }
    },

    naverLoginHandler(res) {
      // console.log('naverLoginHandler', res);
      const self = this;
      if (res) {
        let resData = JSON.parse(res);
        // alert(resData);
        // console.log("--naverLoginHandler--", resData);
        self.socialRegistration(
          resData.userName,
          resData.userName,
          "Ab12345678987654",
          resData.emailId,
          "9999999999",
          "address",
          "detail address",
          "sns",
          resData.accessToken,
          resData.loginVia
        );
        setTimeout(() => {
          self.socialLogin(resData.emailId);
        }, 1500);
      } else {
        return false;
      }
    },

    kakaoLoginHandler(res) {
      // console.log('kakaoLoginHandler', res);
      const self = this;
      if (res) {
        // let resData = JSON.parse(JSON.stringify(res));
        let resData = JSON.parse(res);
        // alert(resData);
        // console.log("--kakaoLoginHandler--", resData);
        self.socialRegistration(
          resData.userName,
          resData.userName,
          "Ab12345678987654",
          resData.emailId,
          "9999999999",
          "address",
          "detail address",
          "sns",
          resData.accessToken,
          resData.loginVia
        );
        setTimeout(() => {
          self.socialLogin(resData.emailId);
        }, 1500);
      } else {
        return false;
      }
    },

    // END Webview support

    // naver login
    async loginWithNaver() {
      // alert('testNaverLg');
      // this.loader = this.$loading.show({
      //   // Optional parameters
      //   container: this.fullPage ? null : this.$refs.formContainer,
      //   canCancel: false,
      //   width: 30,
      //   height: 30,
      //   onCancel: this.onCancel,
      // });
      const self = this;
      const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
      const callbackUrl = import.meta.env.VITE_REDIRECT_URI+'/callback/naverlogin';
      await naver.login(clientId, callbackUrl).then((res) => {
        // console.log('testNaverLg---', res);
        self.naverAuth = res;
        self.naverProfile(res.access_token);
      });
    },

    naverProfile(token) {
      const self = this;
      naver.getProfile(this.naverAuth.access_token).then((res) => {
        // console.log('naverProfile---', res);
        self.naverProfiledata = res;
        self.socialRegistration(
          res.response.name,
          res.response.nickname,
          "Ab12345678987654",
          res.response.email,
          "9999999999",
          "address",
          "detail address",
          "sns",
          token,
          "naver"
        );
        setTimeout(() => {
          self.socialLogin(res.response.email);
          // self.loader.hide();
        }, 1500);
      });
    },


    // kakao Login
    loginWithKakao() {
      const self = this;
      // this.loader = this.$loading.show({
      //   // Optional parameters
      //   container: this.fullPage ? null : this.$refs.formContainer,
      //   canCancel: false,
      //   width: 30,
      //   height: 30,
      //   onCancel: this.onCancel,
      // });
      window.Kakao.Auth.login({
        success: function (authObj) {
          Kakao.Auth.setAccessToken(authObj.access_token);
          Kakao.API.request({
            url: "/v2/user/me",
            success: function (res) {
              self.socialRegistration(
                res.kakao_account.profile.nickname,
                res.kakao_account.profile.nickname,
                "Ab12345678987654",
                res.kakao_account.email,
                "9999999999",
                "address",
                "detail address",
                "sns",
                authObj.access_token,
                "kakao"
              );
              setTimeout(() => {
                self.socialLogin(res.kakao_account.email);
                // self.loader.hide();
              }, 1500);
            },
          });
        },
        fail: function (err) {
          // console.log(err);
        },
      });
    },

    //socialRegistration
    socialRegistration(
      name,
      username,
      password,
      email,
      phoneNumber,
      address,
      detsilAddress,
      checkName,
      login_token,
      login_type
    ) {
      this.commonService
        .individalRegistration(
          name,
          username,
          password,
          email,
          phoneNumber,
          address,
          detsilAddress,
          checkName,
          login_token,
          login_type
        )
        .then((res) => {
          // console.log("socialRegistration:--", res);
          if (res.data.status == 200) {
            // console.log("socialRegistration success:--", res);
            // this.$router.push("member-registration-completed");
          }
        });
    },

    //socialLogin
    socialLogin(email) {
      this.commonService.getSocialLogin(email).then((res) => {
        // console.log("socialLogin:--", res);
        // console.log("socialLogin res.response:--", res.response);
        // console.log("socialLogin res.data.status:--", res.data.status);
        if (res.response) {
          if (res.response.data.status == 400) {
            // console.log("res.response:", res.response);
          }
        } else {
          if (res.data.status == 200) {
            // console.log("login res", res.data.data);
            this.common.state.userId = res.data.data.userId;
            this.common.state.name = res.data.data.name;
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("uid", res.data.data.userId);
            localStorage.setItem("uname", res.data.data.name);
            localStorage.setItem("tokenexpiresAt", res.data.data.expiresIn);
            localStorage.setItem("userType", res.data.data.account_type);
            if (this.checkBox) {
              this.cookies.set("rememberUserEmail", email);
              this.cookies.set("rememberUserPassword", password);
            }
            this.$router.push({ name: "Main" });
          }
        }
      });
    },
  },
};
</script>

<style scoped>
  .black-btn{
    margin-top: 10px !important;
  }
</style>