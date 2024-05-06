<template>
  <div class="main-body">
    <div class="signUp-container">
      <div class="login-signup-wrap membership-wrap">
        <div class="login-signup-inner">
          <div class="login-heading-wrap type-2">
            <h1 class="login-heading">
              {{ $t("common.title.ChangePassword") }}
            </h1>
            <p class="membership-desc">
              {{ $t("common.SubTitle.changePassword") }}
            </p>
          </div>

          <form
            action=""
            class="signUp-form change-password"
            @submit="(e) => e.preventDefault()"
          >
            <div class="form-group" :class="error.password ? 'error' : ''">
              <label for="">
                <!-- <i class="icon-required">
                </i> -->
                {{ $t("common.label.NewPassword") }}</label
              >
              <div class="input-group">
                <div class="input-inner">
                  <input
                    class="form-control"
                    type="password"
                    :placeholder="$t('common.placeholder.EnterNewPassword')"
                    v-model="password"
                  />
                </div>
              </div>
              <span class="error-msg">{{ error.password }}</span>
            </div>
            <div
              class="form-group"
              :class="error.confirmPassword ? 'error' : ''"
            >
              <label for="">
                <!-- <i class="icon-required">
                  </i> -->
                {{ $t("common.label.Newpasswordconfirmation") }}</label
              >
              <div class="input-group">
                <div class="input-inner">
                  <input
                    class="form-control"
                    type="password"
                    :placeholder="
                      $t('common.placeholder.Newpasswordconfirmation')
                    "
                    v-model="confirmPassword"
                  />
                </div>
              </div>
              <span class="error-msg">{{ error.confirmPassword }}</span>
            </div>
            <button class="btn-primary grenn-btn2" @click="changePassword">
              {{ $t("button.change") }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import passwordValidation from "../../Validation/passwordValidation";
import CommonService from "../../services/CommonService";

export default {
  name: "ChangePassword",

  data() {
    return {
      password: "",
      confirmPassword: "",
      error: {},
      localUserData: "",
      validateOnce: false,
      globalLocale: "",
    };
  },
  created() {
    this.commonService = new CommonService();
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
    checkError() {
      let credential = {
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      const { isInvalid, error } = passwordValidation(credential);

      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = "";
        return true;
      }
    },
    changePassword() {
      // let credential = {
      //   password: this.password,
      //   confirmPassword: this.confirmPassword,
      // };
      // const { isInvalid, error } = passwordValidation(credential);
      this.validateOnce = true;
      if (!this.checkError()) {
        return;
      } else {
        this.commonService
          .ChangePassword(
            this.localUserData.userId,
            this.password,
            this.confirmPassword
          )
          .then((res) => {
            if (res.status == 200) {
              this.$router.push("/login");
              // this.$swal(res.data.data);
            }
          });
      }
    },
  },
  mounted() {
    this.localUserData = JSON.parse(localStorage.getItem("forgetUserData"));
  },
};
</script>