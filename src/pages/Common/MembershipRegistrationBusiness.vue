<template>
  <div class="main-body">
    <div class="signUp-container">
      <div class="login-signup-wrap membership-wrap">
        <div class="login-signup-inner">
          <div class="login-heading-wrap with-extra-text">
            <h1 class="login-heading">
              {{ $t("common.QuickLinks.SignUp") }}
              <span>{{ $t("common.SubTitle.BusinessMember") }}</span>
            </h1>
            <span>{{ $t("common.Error.Resquired") }}</span>
          </div>
          <form action="" class="signUp-form" @submit="(e) => e.preventDefault()">
            <div class="terms-sec">
              <div class="form-group" :class="error.termsCheck ? 'error' : ''">
                <div class="check-box-wrap">
                  <label class="custom-check">
                    <i18n-t keypath="common.label.TermsCheckBox" tag="p" for="common.label.TermsCheckBoxLink">
                      <router-link to="/terms">{{
                          $t("common.label.TermsCheckBoxLink")
                      }}</router-link>
                    </i18n-t>
                    <input type="checkbox" v-model="termsCheck" />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="form-group" :class="error.personalCheck ? 'error' : ''">
                <div class="check-box-wrap">
                  <!-- <label class="custom-check">
                    {{ $t("common.label.PersonalInfoCheckBox") }}
                    <input type="checkbox" v-model="personalCheck"  />
                    <span class="checkmark"></span>
                  </label> -->
                  <label class="custom-check">
                    <i18n-t keypath="common.label.PersonalInfoCheckBox" tag="p"
                      for="common.label.PersonalInfoCheckBoxLink">
                      <router-link to="/privacy">{{
                          $t("common.label.PersonalInfoCheckBoxLink")
                      }}</router-link>
                    </i18n-t>
                    <input type="checkbox" v-model="personalCheck" />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="business-form">
              <div class="form-group" :class="error.businessNumber ? 'error' : ''">
                <label for=""><i class="icon-required"></i>
                  {{ $t("common.label.BusinessNo") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="text" :placeholder="$t('common.placeholder.EnterBusinessNo')"
                      v-model="businessNumber" />
                  </div>
                </div>
                <span class="error-msg">{{ error.businessNumber }}</span>
              </div>
              <div class="form-group" :class="error.businessName ? 'error' : ''">
                <label for=""><i class="icon-required"></i>
                  {{ $t("common.label.BusinessName") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="text" :placeholder="$t('common.placeholder.EnterBusinessName')"
                      v-model="businessName" />
                  </div>
                </div>
                <span class="error-msg">{{ error.businessName }}</span>
              </div>
              <div class="form-group" :class="error.depertment ? 'error' : ''">
                <label for=""><i class="icon-required"></i>{{ $t("common.label.department") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="text" :placeholder="$t('common.placeholder.Enterdepartment')"
                      v-model="depertment" />
                  </div>
                </div>
                <span class="error-msg">{{ error.depertment }}</span>
              </div>
              <div class="form-group" :class="error.contactPerson ? 'error' : ''">
                <label for=""><i class="icon-required"></i>{{ $t("common.label.contactPerson") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="text" :placeholder="$t('common.placeholder.EntercontactPerson')"
                      v-model="contactPerson" />
                  </div>
                </div>
                <span class="error-msg">{{ error.contactPerson }}</span>
              </div>
            </div>
            <div class="individuals-form business-with-individual">
              <div class="form-group" :class="error.name ? 'error' : ''">
                <label for=""><i class="icon-required"></i>{{ $t("common.label.Name") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="text" :placeholder="$t('common.placeholder.Name')"
                      v-model="name" />
                  </div>
                </div>
                <span class="error-msg">{{ error.name }}</span>
              </div>
              <div class="form-group" :class="error.username ? 'error' : ''">
                <label for=""><i class="icon-required"></i>{{ $t("common.label.ID") }}</label>
                <div class="input-group with-btn">
                  <div class="input-inner">
                    <input class="form-control" type="text" :placeholder="$t('common.placeholder.EnterId')"
                      v-model="username" />
                  </div>
                  <button class="btn-green-outline" @click="checkUser">
                    {{ $t("button.checkAvailability") }}
                  </button>
                </div>
                <span class="success-msg" v-if="isIDVerified">{{
                    $t("common.Error.useridAvailable")
                }}</span>
                <span class="error-msg">{{ error.username }}</span>
              </div>
              <div class="form-group" :class="error.password ? 'error' : ''">
                <label for=""><i class="icon-required"></i>{{ $t("common.label.Password") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="password" :placeholder="
                      $t('common.placeholder.PasswordFormatSignup')
                    " v-model="password" />
                  </div>
                </div>
                <span class="error-msg">{{ error.password }}</span>
              </div>
              <div class="form-group" :class="error.confirmPassword ? 'error' : ''">
                <label for=""><i class="icon-required"></i>{{ $t("common.label.VerifyPassword") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="password" :placeholder="$t('common.placeholder.VerifyPassword')"
                      v-model="confirmPassword" />
                  </div>
                </div>
                <span class="error-msg">{{ error.confirmPassword }}</span>
              </div>
              <div class="form-group" :class="error.email ? 'error' : ''">
                <label for=""><i class="icon-required"></i>{{ $t("common.label.Email") }}</label>
                <div class="input-group with-btn">
                  <div class="input-inner">
                    <input class="form-control" type="text" :placeholder="$t('common.placeholder.Email')"
                      v-model="email" />
                  </div>
                  <button class="btn-green-outline" @click="sendOtp" :class="{ grey: isVerification }"
                    :disabled="emailValidated">
                    {{ verificationStatus }}
                  </button>
                </div>
                <span class="error-msg">{{ error.email }}</span>
              </div>
              <div class="form-group" :class="error.emailOTP ? 'error' : ''">
                <label for=""><i class="icon-required"></i>{{ $t("common.label.EmailVerification") }}</label>
                <div class="input-group with-btn">
                  <div class="input-inner">
                    <input class="form-control" type="text" :placeholder="
                      $t('common.placeholder.EnterVerificationCode')
                    " v-model="emailOTP" maxlength="6" />
                    <span class="time" :class="{ startTimer: startTimer }">{{
                        newTime
                    }}</span>
                    <span class="time" :class="{ showTick: showTick }"><i class="green-tick-circle"></i></span>
                  </div>
                  <button class="btn-green-outline" :class="{ grey: isActive }" @click="verifyOTP"
                    :disabled="otpValidate">
                    {{ $t("button.verify") }}
                  </button>
                </div>
                <span class="success-msg" v-if="isOtpVerified">{{
                    isOtpSuccess
                }}</span>
                <span class="error-msg">{{ error.emailOTP }}</span>
              </div>

              <div class="form-group" :class="error.phoneNumber ? 'error' : ''" v-if="common.state.isHidePhAddr">
                <label for=""><i class="icon-required"></i>{{ $t("common.label.PhoneNumber") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="text" :placeholder="$t('common.placeholder.PhoneNumber')"
                      v-model="phoneNumber" />
                  </div>
                </div>
                <span class="error-msg">{{ error.phoneNumber }}</span>
              </div>
              <div class="form-group" :class="error.address || error.detsilAddress ? 'error' : ''"
                v-if="common.state.isHidePhAddr">
                <label for=""><i class="icon-required"></i>{{ $t("common.label.Address") }}</label>
                <div class="input-group with-btn dual-input">
                  <div class="input-inner">
                    <input class="form-control" type="text" :placeholder="$t('common.placeholder.EnterAddress')"
                      v-model="address" disabled />
                  </div>
                  <button class="btn-green-outline" @click="getAddress">
                    {{ $t("button.SearchAddress") }}
                  </button>
                  <!-- postcodeWrap modal -->
                  <div id="postcodeWrap">
                    <div id="addressLayer">
                      <button @click="popClose"><img src="/src/assets/icons/menu-close.svg" /></button>
                    </div>
                  </div>
                  <!-- postcodeWrap modal -->
                </div>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="text" :placeholder="
                      $t('common.placeholder.EnterDetailedAddress')
                    " v-model="detsilAddress" />
                  </div>
                </div>
                <span class="error-msg">{{ error.address }}</span>
              </div>
              <!-- address -->

            </div>
            <button class="btn-primary grenn-btn2" @click="BusinessRegistration">
              {{ $t("common.QuickLinks.SignUp") }}
            </button>
          </form>
        </div>
      </div>
      <Modal v-show="isModalVisible" @close="closeModal" :bodytext1="$t('common.Modal.ServerError')"
        :bodytext3="$t('common.Modal.ServerErrorSub')" :btnText2="$t('button.Confirm')"
        link="/member-registration-individuals" :img="imgUrl" :btnFull="true" />
    </div>
  </div>
</template>
<script>
import validateRegistration from "../../Validation/validateRegistration";
import validator from "validator";
import CommonService from "../../services/CommonService";
import Modal from "../../components/Modal.vue";
import ErrorImage from "~@/assets/images/Error.png";
export default {
  name: "MembershipRegistrationBusiness",
  inject: ['common'],
  components: {
    Modal,
  },
  data() {
    return {
      termsCheck: "",
      personalCheck: "",
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      emailOTP: "",
      phoneNumber: "",
      address: "",
      detsilAddress: "",
      businessNumber: "",
      businessName: "",
      depertment: "",
      contactPerson: "",
      error: {},
      timer: 180,
      isActive: true,
      isVerification: false,
      emailValidated: 0,
      otpValidate: 1,
      startTimer: true,
      showTick: true,
      storeSetInterval: null,
      newTime: "",
      // verificationStatus : this.$t('button.sendVerification'),
      isIDVerified: false,
      isOtpVerified: false,
      isUserSuccess: "",
      isOtpSuccess: "",
      verificationTimer: false,
      validateOnce: false,
      globalLocale: "",
      clickCheckAvailability: false,
      clickSendOtp: false,
      clickVerifyOtp: false,
      otpCheck: false,
      userExists: false,
      emailExist: false,
      isModalVisible: false,
      imgUrl: ErrorImage,
    };
  },
  created() {
    this.commonService = new CommonService();
  },

  updated() {
    this.globalLocale = this.$i18n.locale;
  },
  computed: {
    verificationStatus() {
      if (this.verificationTimer) {
        return this.$t("button.resendVerification");
      } else {
        return this.$t("button.sendVerification");
      }
    },
  },

  watch: {
    globalLocale(newVal) {
      if ((newVal == "kr" || newVal == "en") && this.validateOnce) {
        this.checkError();
      }

      if ((newVal == "kr" || newVal == "en") && this.clickCheckAvailability) {
        this.checkErrorUser();
      }

      if ((newVal == "kr" || newVal == "en") && this.clickSendOtp) {
        this.sendOtpErrorCheck();
      }

      if ((newVal == "kr" || newVal == "en") && this.clickVerifyOtp) {
        this.verifyOTPError();
      }

      if ((newVal == "kr" || newVal == "en") && this.otpCheck) {
        this.wrongOtpCheck();
      }

      if ((newVal == "kr" || newVal == "en") && this.emailExist) {
        this.emailExists();
      }
    },
  },

  methods: {
    closeModal() {
      window.location.reload();
      this.isModalVisible = false;
    },
    checkError() {
      let credential = {
        termsCheck: this.termsCheck,
        personalCheck: this.personalCheck,
        name: this.name,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
        email: this.email,
        emailOTP: this.emailOTP,
        phoneNumber: this.phoneNumber,
        address: this.address,
        detsilAddress: this.detsilAddress,
        businessNumber: this.businessNumber,
        businessName: this.businessName,
        depertment: this.depertment,
        contactPerson: this.contactPerson,
        account_type: "business",
        isIDVerified: this.isIDVerified,
        isOtpVerified: this.isOtpVerified,
      };
      const { isInvalid, error } = validateRegistration(credential);
      this.clickCheckAvailability = false;
      this.clickSendOtp = false;

      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
    async BusinessRegistration() {
      this.validateOnce = true;

      if (!this.checkError()) {
        //this.isIDVerified = false;
        return;
      } else {
        this.commonService
          .BusinessRegistration(
            this.name,
            this.username,
            this.password,
            this.email,
            this.phoneNumber,
            this.address,
            this.detsilAddress,
            this.businessNumber,
            this.businessName,
            this.depertment,
            this.contactPerson
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.$router.push("member-registration-completed");
            }
          });
      }
    },

    checkErrorUser() {
      if (validator.isEmpty(this.username)) {
        this.error.username = this.$t("common.Error.EnterId");
        return true;
      } else if (!validator.isAlphanumeric(this.username)) {
        this.isIDVerified = false;
        this.error.username = this.$t("common.Error.useridFormatSignup");
        return true;
      } else if (this.userExists) {
        this.error.username = this.$t("common.Error.UserExists");
        //return true;
      } else {
        return false;
      }
    },

    async checkUser() {
      // if (validator.isEmpty(this.username)) {
      //   this.error.username =  this.$t("common.Error.EnterId");
      // } else if (!validator.isAlphanumeric(this.username)) {
      //   this.error.username = "Please use only letter and number";
      //   this.isUserSuccess = "";
      // }
      this.clickCheckAvailability = true;
      if (this.checkErrorUser()) {
        this.isIDVerified = false;
        return;
      } else {
        this.commonService.checkUser(this.username).then((res) => {
          if (res.data.status == 200 && res.data.data.is_exist === 0) {
            this.isIDVerified = true;
            this.error.username = "";
            //this.isUserSuccess = "User ID available";
          } else if (res.data.status == 200 && res.data.data.is_exist === 1) {
            //this.error.username = res.data.data.msg;
            this.userExists = true;
            this.isIDVerified = false;
            this.isUserSuccess = "";
          }
        });
      }
    },

    sendOtpErrorCheck() {
      if (validator.isEmpty(this.email)) {
        this.error.email = this.$t("common.Error.EnterEmail");
        return true;
      } else if (!validator.isEmail(this.email)) {
        this.error.email = this.$t("common.Error.ValidEmail");
        return true;
      } else {
        return false;
      }
    },

    emailExists() {
      this.error.email = this.$t("common.Error.EmailExists");
    },

    async sendOtp() {
      // if (validator.isEmpty(this.email)) {
      //   this.error.email = this.$t("common.Error.EnterEmail");
      // }
      // else if (!validator.isEmail(this.email)) {
      //   this.error.email = "Enter a valid email address";
      // }
      this.clickSendOtp = true;
      if (this.sendOtpErrorCheck()) {
        return;
      } else {
        this.commonService.sendOTP(this.email).then((res) => {
          // console.log(res);
          // console.log("send otp res",res.response)
          // console.log("send otp",res)
          if (!res) {
            this.isModalVisible = true;
          }
          if (res.status == 200) {
            this.isActive = false;
            this.isVerification = true;
            this.emailValidated = 1;
            this.otpValidate = 0;
            this.startTimer = false;
            this.showTick = true;
            this.emailOTP = "";
            this.error.email = "";
            this.emailExist = false;

            if (this.storeSetInterval) {
              clearInterval(this.storeSetInterval);
            }
            // asign new time again
            this.timer = 180;

            this.storeSetInterval = setInterval(() => {
              let m = Math.floor(this.timer / 60);
              let s = this.timer % 60;
              m = m < 10 ? "0" + m : m;
              s = s < 10 ? "0" + s : s;
              this.newTime = m + ":" + s;
              if (this.timer > 0) {
                return this.timer--;
              }
            }, 1000);
            setTimeout(() => {
              this.isVerification = false;
              this.isActive = true;
              this.emailValidated = 0;
              this.otpValidate = 1;
              this.startTimer = true;
              this.verificationTimer = true;
              // this.verificationStatus = this.$t('button.resendVerification')
            }, (this.timer + 1) * 1000);
          } else if (res.response.data.status == 400) {
            this.emailExist = true;
            this.error.email = this.$t("common.Error.EmailExists");
            //return (this.error.email = res.response.data.message);
          }
        }).catch(err => {
          console.log(err)
          this.isModalVisible = true;
        });
      }
    },

    verifyOTPError() {
      if (validator.isEmpty(this.emailOTP)) {
        this.error.emailOTP = this.$t("common.Error.EnterOtp");
        return true;
      } else {
        return false;
      }
    },

    wrongOtpCheck() {
      this.error.emailOTP = this.$t("common.Error.OTPCheck");
    },

    async verifyOTP() {
      // if (this.emailOTP == "") {
      //   return (this.error.emailOTP = "Enter an valid OTP");
      // }
      this.clickVerifyOtp = true;
      if (this.verifyOTPError()) {
        return;
      } else {
        this.commonService.verifyOTP(this.email, this.emailOTP).then((res) => {
          if (res.data.status == 200 && res.data.data.otp_verify === 1) {
            // this.$swal("OTP verified");
            //  this.isOtpSuccess = 'OTP verified';
            this.startTimer = true;
            this.showTick = false;
            this.isActive = true;
            this.isVerification = false;
            this.emailValidated = 0;
            this.otpValidate = 1;
            this.isOtpVerified = true;
            this.error.emailOTP = "";
            return true;
          } else if (res.data.status == 200 && res.data.data.otp_verify === 0) {
            this.otpCheck = true;
            //console.log('wrong otp')
            this.error.emailOTP = this.$t("common.Error.OTPCheck");
            // return (this.error.emailOTP =
            //   this.$t("common.Error.OTPCheck"));
          }
        });
      }
    },
    getAddress() {
      var element_layer = document.getElementById("postcodeWrap");
      var element_layer2 = document.getElementById("addressLayer");
      var win_width;
      if (window.innerWidth < 576) {
        win_width = window.innerWidth - 60;
      }
      element_layer.style.display = "flex";
      new daum.Postcode({
        width: win_width,
        oncomplete: (data) => {
          element_layer.style.display = "none";
          return (this.address = data.address);
        },
      }).embed(element_layer2, {
        autoClose: false,
      });
    },
    popClose() {
      var element_layer = document.getElementById("postcodeWrap");
      element_layer.style.display = "none";
    },
  },
};
</script>

<style scoped>
.login-signup-wrap .login-signup-inner {
  position: relative;
}

#addressLayer {
  padding: 15px;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgb(0 0 0 / 10%);
  border-radius: 5px;
}

#addressLayer button {
  width: 24px;
  margin-left: auto;
  display: flex;
  margin-bottom: 4px;
}

#postcodeWrap {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(24, 24, 24, 0.8);
  z-index: 5;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
}
</style>