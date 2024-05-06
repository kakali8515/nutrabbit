<template>
  <div class="main-body">
    <div class="container-small">
      <div class="login-signup-wrap login-wrap">
        <div class="login-signup-inner">
          <div class="login-heading-wrap">
            <h1 class="login-heading">{{ $t("common.title.login") }}</h1>
          </div>
          <form action @submit="(e) => e.preventDefault()">
            <div class="form-group" :class="error.email ? 'error' : ''">
              <label for>{{ $t("common.label.ID") }}</label>
              <div class="input-group">
                <div class="input-inner">
                  <input class="form-control" type="text" :placeholder="$t('common.placeholder.EnterId')"
                    v-model="email" />
                </div>
              </div>
              <span class="error-msg">{{ error.email }}</span>
            </div>
            <div class="form-group" :class="error.password ? 'error' : ''">
              <label for>{{ $t("common.label.Password") }}</label>
              <div class="input-group">
                <div class="input-inner">
                  <input class="form-control" type="password" :placeholder="$t('common.placeholder.EnterPassword')"
                    v-model="password" />
                </div>
              </div>
              <span class="error-msg">{{ error.password }}</span>
            </div>
            <div class="form-group">
              <div class="check-box-wrap">
                <label class="custom-check special-login">
                  {{ $t("common.QuickLinks.RememberId") }}
                  <input type="checkbox" v-model="checkBox" />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div class="form-links">
              <div class="form-links-left">
                <p id="token-result"></p>
                <ul>
                  <li>
                    <router-link to="/find-id">
                      {{ $t("common.QuickLinks.FindID") }}</router-link>
                  </li>
                  <li>
                    <router-link to="/forgot-password">{{
                        $t("common.QuickLinks.FindPassword")
                    }}</router-link>
                  </li>
                </ul>
              </div>
              <div class="form-link-right">
                <router-link to="/member-registration-type-selection">
                  {{ $t("common.QuickLinks.SignUp") }}
                </router-link>
              </div>
            </div>
            <button class="btn-primary" @click="onSubmit">
              {{ $t("common.title.login") }}
            </button>
          </form>
          <div class="getting-started">
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
              <!-- kakao mobile login -->
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
              <!-- naver mobile login -->
              {{ $t("common.QuickLinks.NaverLogin") }}
            </button>
            <!-- ENd Naver login for App -->

            <!-- social login for appale -->
            <button class="btn-primary with-icon black-btn" v-show="isAppaleId" @click="mbAppleLogin">
              <i class="icon-appale"></i>
              {{ $t("common.QuickLinks.AppleLogin") }}
            </button>

            <!-- <div id="naver_id_login"></div> -->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/Button.vue";
import { inject, onMounted, onUpdated } from "vue";
import { useCookies } from "vue3-cookies";
import CommonService from "../../services/CommonService";
import validateLogin from "../../Validation/validateLogin";
import naver from 'naver-id-login';
export default {
  name: "Login",
  components: {
    Button,
  },
  data() {
    return {
      email: "",
      password: "",
      error: {},
      errorEmail: "",
      errorPassword: "",
      checkBox: "",
      loader: undefined,
      naverAuth: undefined,
      naverProfiledata: undefined,
      // isPlatMobile: localStorage.getItem("isMobile") === "true",
      // isAppaleId: localStorage.getItem("isiPhone") === "true",
      isPlatMobile: this.cookies.get("isMobile") === "true",
      isAppaleId: this.cookies.get("isiPhone") === "true",
      validateOnce: false,
      globalLocale: "",
      isTabActive: '',
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

    window.onfocus = function () {
      this.isTabActive = true;
    };

    window.onblur = function () {
      this.isTabActive = false;
    };

    // test
    // setInterval(function () {
    //   console.log(this.isTabActive ? 'active' : 'inactive');
    // }, 1000);

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
  },

  updated() {
    this.globalLocale = this.$i18n.locale;
    // alert('Platform: -' + this.isPlatMobile);
    // alert('applePlatform: -' + this.isAppaleId);
  },

  watch: {
    globalLocale(newVal) {
      if (newVal == "en" && this.validateOnce == true) {
        this.onSubmit();
      }

      if (newVal == "kr" && this.validateOnce == true) {
        this.onSubmit();
      }
    },
  },

  methods: {
    checkError() {
      let credential = {
        email: this.email,
        password: this.password,
      };
      const { isInvalid, error } = validateLogin(credential);
      this.validateOnce = true;
      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
    onSubmit() {
      if (!this.checkError()) {
        return;
      } else {
        this.commonService.getLogin(this.email, this.password).then((res) => {
          if (res.response) {
            if (res.response.data.status == 400) {
              if (res.response.data.message == "Password Does Not Match") {
                this.error.password = this.$t("common.Error.checkPassword");
              } else if (
                res.response.data.message ==
                "User With The Email Does Not Exists"
              ) {
                this.error.email = this.$t("common.Error.chcekId");
              }
              // this.$swal(res.response.data.message);
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
                this.cookies.set("rememberUserEmail", this.email);
                this.cookies.set("rememberUserPassword", this.password);
              }
              this.$router.push("/");
            }
          }
        });
      }
    },

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
      // console.log("ftoken:--", ftoken);
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
        // alert('Apple login res from APP:' + JSON.stringify(resData));
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
          // alert('kakao login with: ' + resData.emailId);
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
      const callbackUrl = import.meta.env.VITE_REDIRECT_URI + '/callback/naverlogin';
      await naver.login(clientId, callbackUrl).then((res) => {
        console.log('testNaverLg---', res);
        self.naverAuth = res;
        self.naverProfile(res.access_token);
      });
    },

    naverProfile(token) {
      const self = this;
      naver.getProfile(this.naverAuth.access_token).then((res) => {
        console.log('naverProfile---', res);
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
          console.log('navaer profile---', res.response);
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
      //   canCancel: true,
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
                console.log('kakao profile---', res.kakao_account);
                self.socialLogin(res.kakao_account.email);
                // self.loader.hide();

              }, 1500);
            },
          });
        },
        fail: function (err) {
          this.$router.push({ name: "Login" });
          // self.loader.hide();
          // alert('kakao error');
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
          console.log("socialRegistration:--", res.response);
          // alert('indi reg data: ' + JSON.stringify(res));
          if (res.response) {
            if (res.response.data.status == 400) {
              // alert('login failed:' + JSON.stringify(res.response));
              console.log("res.response:", res.response);
            }
          } else {
            if (res.data.status == 200) {
              console.log("socialRegistration success:--", res);
              // this.$router.push("member-registration-completed");
            }
          }
        });
    },

    //socialLogin
    socialLogin(email) {
      this.commonService.getSocialLogin(email).then((res) => {
        console.log("socialLogin:--", res);
        // console.log("socialLogin res.response:--", res.response);
        // console.log("socialLogin res.data.status:--", res.data.status);
        if (res.response) {
          if (res.response.data.status == 400) {
            alert('login failed:' + JSON.stringify(res.response));
            console.log("res.response:", res.response);
          }
        } else {
          if (res.data.status == 200) {
            console.log("Social login res--", res.data.data);
            // alert("Social login res--"+res.data.data);
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
            alert('login success: Welcome, ' + JSON.stringify(res.data.data.name));
            // alert('redirected now...');
            if(res.data.data.social_login_status) {
              this.$router.push({ name: "Main" });
            } else {
              this.$router.push({ name: "personal-information" });
            }
          }
        }
      });
    },
  },
};
// NAVER account
// ID : taewoo226
// PW : waterandnoodle12
</script>


