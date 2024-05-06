<template>
  <div class="main-body">
    <div class="signUp-container">
      <div class="login-signup-wrap membership-wrap personal-info">
        <div class="login-signup-inner">
          <div class="login-heading-wrap">
            <h1 class="login-heading">{{ $t("personalInfo.title.title") }}</h1>
          </div>
          <form action class="signUp-form" @submit="(e) => e.preventDefault()">
            <div class="individuals-form">
              <div class="form-group" :class="error.name ? 'error' : ''">
                <label for>{{ $t("personalInfo.labels.name") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="text" v-model="name"
                      :placeholder="$t('personalInfo.placeholder.Name')" />
                  </div>
                </div>
                <span class="error-msg">{{ error.name }}</span>
              </div>
              <div class="form-group">
                <label for>{{ $t("personalInfo.labels.id") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control disabled" disabled type="text" v-model="uuid"
                      :placeholder="$t('personalInfo.placeholder.EnterId')" />
                  </div>
                </div>
                <!-- <span class="error-msg">{{ error.userID }}</span> -->
              </div>
              <div class="form-group" :class="error.password ? 'error' : ''">
                <label for="">{{ $t("personalInfo.labels.password") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="password"
                      :placeholder="$t('personalInfo.placeholder.PasswordFormat')" maxlength="20" v-model="password"
                      autocomplete="off" />
                  </div>
                </div>
                <span class="error-msg">{{ error.password }}</span>
              </div>
              <div class="form-group" :class="error.confirmPassword ? 'error' : ''">
                <label for>{{ $t("personalInfo.labels.confirm_password") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="password"
                      :placeholder="$t('personalInfo.placeholder.VerifyPassword')" v-model="confirmPassword"
                      autocomplete="off" />
                  </div>
                </div>
                <span class="error-msg">{{ error.confirmPassword }}</span>
              </div>
              <div class="form-group">
                <label for>{{ $t("personalInfo.labels.email") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control disabled" disabled type="text" v-model="email" />
                  </div>
                </div>
              </div>

              <div class="form-group" :class="error.phoneNumber ? 'error' : ''" v-if="common.state.isHidePhAddr">
                <label for>{{ $t("personalInfo.labels.phonenumber") }}</label>
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="text" v-model="phoneNumber"
                      :placeholder="$t('personalInfo.placeholder.PhoneNumber')" />
                  </div>
                </div>
                <span class="error-msg">{{ error.phoneNumber }}</span>
              </div>
              <div class="form-group" :class="error.address ? 'error' : ''" v-if="common.state.isHidePhAddr">
                <label for>{{ $t("personalInfo.labels.address") }}</label>
                <div class="input-group with-btn dual-input">
                  <div class="input-inner">
                    <input class="form-control" type="text" v-model="address" disabled />
                  </div>
                  <button class="btn-green-outline" @click="getAddress">{{ $t("personalInfo.labels.searchaddress")
                  }}</button>
                </div>
                <!-- postcodeWrap modal -->
                <div id="postcodeWrap">
                  <div id="addressLayer">
                    <button @click="popClose"><img src="/src/assets/icons/menu-close.svg" /></button>
                  </div>
                </div>
                <!-- postcodeWrap modal -->
                <div class="input-group">
                  <div class="input-inner">
                    <input class="form-control" type="text" v-model="Detailaddress"
                      :placeholder="$t('personalInfo.placeholder.EnterDetailedAddress')" />
                  </div>
                </div>
                <span class="error-msg">{{ error.address }}</span>
              </div>
              <div class="form-group">
                <label for>{{ $t("personalInfo.labels.find us") }}</label>
                <div class="multi-checkbox">
                  <div class="check-box-wrap">
                    <label class="custom-check">
                      {{ $t("personalInfo.labels.offline") }}
                      <input type="checkbox" value="offline" v-model="offline" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="check-box-wrap">
                    <label class="custom-check">
                      {{ $t("personalInfo.labels.online") }}
                      <input type="checkbox" value="online" v-model="online" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="check-box-wrap">
                    <label class="custom-check">
                      {{ $t("personalInfo.labels.network") }}
                      <input type="checkbox" value="network" v-model="network" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="check-box-wrap">
                    <label class="custom-check">
                      {{ $t("personalInfo.labels.sns") }}
                      <input type="checkbox" value="sns" v-model="sns" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="check-box-wrap">
                    <label class="custom-check">
                      {{ $t("personalInfo.labels.etc") }}
                      <input type="checkbox" value="etc" v-model="etc" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <!-- <p>{{common.state.userId}}</p> -->
            <button class="btn-primary grenn-btn2" @click="updatePersonalInfo">{{ $t("personalInfo.labels.save") }}
              <!-- <router-link to="/withdrawal-of-membership"></router-link> -->
            </button>
          </form>
          <div class="logout-withdraw">
            <ul>
              <li>
                <router-link to @click="logOut()">{{ $t("personalInfo.labels.log_out") }}</router-link>
              </li>
              <li>
                <router-link to="" @click="openWithdrawalModal">{{ $t("personalInfo.labels.withdrawal") }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal v-show="isModalVisible" @close="closeModal" :bodytext1="$t('personalInfo.info_modal.bodytext')"
    :btnText2="$t('personalInfo.info_modal.btntext')" link='/' />

  <!-- isWithdrawalModalVisible -->
  <Modal v-show="isWithdrawalModalVisible" @close="closeWithdrawalModal" @Confirm="confirmWithdraw"
    :bodytext1="$t('personalInfo.withdrawal.bodytext')" :btnText1="$t('personalInfo.withdrawal.btntext')"
    :btnText2="$t('personalInfo.withdrawal.btntext1')" link='/' />
</template>
<script>
import { inject } from "vue";
import PersonalInfoService from "../../services/PersonalInfoService";
import personalInfoValidation from "../../Validation/personalInfoValidation";
import Modal from "../../components/Modal.vue";

export default {
  name: "PersonalInformationManagement",
  components: {
    Modal,
  },
  data() {
    return {
      // userId: 21,
      userId: this.common.state.userId,
      name: "",
      userID: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNumber: "",
      address: "",
      checkName: [],
      error: {},
      uuid: "",
      isModalVisible: false,
      isWithdrawalModalVisible: false,
      Detailaddress: "",

      offline: false,
      online: false,
      network: false,
      sns: false,
      etc: false,
      validateOnce: false,
      globalLocale: "",
    };
  },

  setup() {
    const common = inject("common");
    return { common };
  },

  created() {
    this.personalInfoservice = new PersonalInfoService();
  },

  updated() {
    this.globalLocale = this.$i18n.locale;
  },

  watch: {
    globalLocale(newVal) {
      if (newVal == "en" && this.validateOnce == true) {
        this.checkError();
      }

      if (newVal == "kr" && this.validateOnce == true) {
        this.checkError();
      }
    },
  },

  methods: {

    async personalInfo() {

      this.personalInfoservice.getPersonalData(this.userId).then((res) => {
        console.log(res.data);
        let data = res.data;
        this.name = data.data[0].name;
        this.uuid = data.data[0].uuid;
        this.email = data.data[0].email;
        this.phoneNumber = data.data[0].mobile;
        this.address = data.data[0].address;
        this.userID = this.common.state.userId;
        this.Detailaddress = data.data[0].detail_address;

        // this.checkName = data.data[0].distribution_medium;
        // console.log("this.checkName",this.checkName);

        if (data.data[0].distribution_medium == "offline") {
          this.offline = true;
        }
        if (data.data[0].distribution_medium == "online") {
          this.online = true;
        }
        if (data.data[0].distribution_medium == "network") {
          this.network = true;
        }
        if (data.data[0].distribution_medium == "sns") {
          this.sns = true;
        }
        if (data.data[0].distribution_medium == "etc") {
          this.etc = true;
        }

        if (data.data[0].distribution_medium == "offline_online") {
          this.offline = true;
          this.online = true;
        }
        if (data.data[0].distribution_medium == "offline_network") {
          this.offline = true;
          this.network = true;
        }
        if (data.data[0].distribution_medium == "offline_sns") {
          this.offline = true;
          this.sns = true;
        }
        if (data.data[0].distribution_medium == "offline_etc") {
          this.offline = true;
          this.etc = true;
        }

        if (data.data[0].distribution_medium == "online_network") {
          this.online = true;
          this.network = true;
        }
        if (data.data[0].distribution_medium == "online_sns") {
          this.online = true;
          this.sns = true;
        }
        if (data.data[0].distribution_medium == "online_etc") {
          this.online = true;
          this.etc = true;
        }

        if (data.data[0].distribution_medium == "network_sns") {
          this.network = true;
          this.sns = true;
        }
        if (data.data[0].distribution_medium == "network_etc") {
          this.network = true;
          this.etc = true;
        }

        if (data.data[0].distribution_medium == "sns_etc") {
          this.sns = true;
          this.etc = true;
        }

        if (data.data[0].distribution_medium == "offline_online_network") {
          this.offline = true;
          this.online = true;
          this.network = true;
        }
        if (data.data[0].distribution_medium == "offline_online_sns") {
          this.offline = true;
          this.online = true;
          this.sns = true;
        }
        if (data.data[0].distribution_medium == "offline_online_etc") {
          this.offline = true;
          this.online = true;
          this.etc = true;
        }

        if (data.data[0].distribution_medium == "online_network_sns") {
          this.online = true;
          this.network = true;
          this.sns = true;
        }
        if (data.data[0].distribution_medium == "online_network_etc") {
          this.online = true;
          this.network = true;
          this.etc = true;
        }

        if (data.data[0].distribution_medium == "network_sns_etc") {
          this.network = true;
          this.sns = true;
          this.etc = true;
        }

        if (data.data[0].distribution_medium == "offline_online_network_sns") {
          this.offline = true;
          this.online = true;
          this.network = true;
          this.sns = true;
        }
        if (data.data[0].distribution_medium == "offline_online_network_etc") {
          this.offline = true;
          this.online = true;
          this.network = true;
          this.etc = true;
        }

        if (data.data[0].distribution_medium == "online_network_sns_etc") {
          this.online = true;
          this.network = true;
          this.sns = true;
          this.etc = true;
        }

        if (data.data[0].distribution_medium == "network_sns_etc_offline") {
          this.network = true;
          this.sns = true;
          this.etc = true;
          this.offline = true;
        }

        if (data.data[0].distribution_medium == "offline_online_network_sns_etc") {
          this.offline = true;
          this.online = true;
          this.network = true;
          this.sns = true;
          this.etc = true;
        }
      });

    },

    checkError() {
      let credential = {
        name: this.name,
        password: this.password,
        confirmPassword: this.confirmPassword,
        email: this.email,
        phoneNumber: this.phoneNumber,
        address: this.address,
      };
      const { isInvalid, error } = personalInfoValidation(credential);
      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },

    async updatePersonalInfo() {

      // let credential = {
      //   name: this.name,
      //   password: this.password,
      //   confirmPassword: this.confirmPassword,
      //   email: this.email,
      //   phoneNumber: this.phoneNumber,
      //   address: this.address,
      // };
      // const { isInvalid, error } = personalInfoValidation(credential);
      this.validateOnce = true;

      if (!this.checkError()) {

        return;
      } else {

        let checkboxName;

        if (this.offline) {
          checkboxName = 'offline';
        }
        if (this.online) {
          checkboxName = 'online';
        }
        if (this.network) {
          checkboxName = 'network';
        }
        if (this.sns) {
          checkboxName = 'sns';
        }
        if (this.etc) {
          checkboxName = 'etc';
        }

        if (this.offline && this.online) {
          checkboxName = 'offline_online';
        }
        if (this.offline && this.network) {
          checkboxName = 'offline_network';
        }
        if (this.offline && this.sns) {
          checkboxName = 'offline_sns';
        }
        if (this.offline && this.etc) {
          checkboxName = 'offline_etc';
        }

        if (this.online && this.network) {
          checkboxName = 'online_network';
        }
        if (this.online && this.sns) {
          checkboxName = 'online_sns';
        }
        if (this.online && this.etc) {
          checkboxName = 'online_etc';
        }

        if (this.network && this.sns) {
          checkboxName = 'network_sns';
        }
        if (this.network && this.etc) {
          checkboxName = 'network_etc';
        }

        if (this.sns && this.etc) {
          checkboxName = 'sns_etc';
        }

        if (this.offline && this.online && this.network) {
          checkboxName = 'offline_online_network';
        }
        if (this.offline && this.online && this.sns) {
          checkboxName = 'offline_online_sns';
        }
        if (this.offline && this.online && this.etc) {
          checkboxName = 'offline_online_etc';
        }

        if (this.online && this.network && this.sns) {
          checkboxName = 'online_network_sns';
        }
        if (this.online && this.network && this.etc) {
          checkboxName = 'online_network_etc';
        }

        if (this.network && this.sns && this.etc) {
          checkboxName = 'network_sns_etc';
        }

        if (this.offline && this.online && this.network && this.sns) {
          checkboxName = 'offline_online_network_sns';
        }
        if (this.offline && this.online && this.network && this.etc) {
          checkboxName = 'offline_online_network_etc';
        }

        if (this.online && this.network && this.sns && this.etc) {
          checkboxName = 'online_network_sns_etc';
        }

        if (this.network && this.sns && this.etc && this.offline) {
          checkboxName = 'network_sns_etc_offline';
        }

        if (this.offline && this.online && this.network && this.sns && this.etc) {
          checkboxName = 'offline_online_network_sns_etc';
        }

        this.personalInfoservice
          .updatePersonalInfo(
            this.userID,
            this.name,
            this.password,
            this.confirmPassword,
            this.email,
            this.phoneNumber,
            this.address,
            this.Detailaddress,
            checkboxName
          )
          .then((res) => {
            if (res.data.status == 200) {
              localStorage.setItem("uname", this.name);
              // console.log(res.data.status);
              this.openmodal();
            }
          });
      }
    },

    openmodal() {
      this.isModalVisible = true;
    },

    openWithdrawalModal() {
      this.isWithdrawalModalVisible = true;
    },

    closeWithdrawalModal() {
      this.isWithdrawalModalVisible = false;
    },

    closeModal() {
      this.isModalVisible = false;
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

    logOut() {
      localStorage.clear();
      window.location = "/login";
    },

    async businessWithdraw() {
      this.personalInfoservice.businessWithdraw().then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          console.log("businessWithdraw res.data.status", res.data.status);
          this.closeWithdrawalModal();
          this.logOut();
        }
      });
    },

    confirmWithdraw() {
      window.parent.postMessage("businessWithdraw", "*");
      this.businessWithdraw();
    }

  },

  mounted() {
    this.personalInfo();
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