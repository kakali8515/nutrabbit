<template>
  <div class="main-body">
    <div class="signUp-container">
      <div class="login-signup-wrap membership-wrap personal-info">
        <div class="login-signup-inner">
          <div class="login-heading-wrap">
            <h1 class="login-heading">
              {{ $t("personalInfo.personalBussiness.title") }}
            </h1>
          </div>
          <form action="" class="signUp-form" @submit="(e) => e.preventDefault()">
           <div class="individuals-form">
              <div class="form-group" :class="error.business_number ? 'error' : ''">
              <label for="">{{ $t("personalInfo.personalBussiness.businessnumber") }}</label>
              <div class="input-group">
                <div class="input-inner">
                  <input
                    class="form-control disabled"
                    disabled
                    type="text"
                    v-model="business_number"
                  />
                </div>
              </div>
              <span class="error-msg">{{ error.business_number }}</span>
            </div>
            <div class="form-group" :class="error.businessName ? 'error' : ''">
              <label for="">{{ $t("personalInfo.personalBussiness.businessname") }}</label>
              <div class="input-group">
                <div class="input-inner">
                  <input
                    class="form-control"
                    type="text" 
                    v-model="business_name"
                    :placeholder="$t('personalInfo.placeholder.BusinessName')"
                  />
                </div>
              </div>
              <span class="error-msg">{{ error.businessName }}</span>
            </div>
            <div class="form-group" :class="error.department ? 'error' : ''">
              <label for="">{{ $t("personalInfo.personalBussiness.dept") }}</label>
              <div class="input-group">
                <div class="input-inner">
                  <input
                    class="form-control"
                    type="text"
                    v-model="department"
                    :placeholder="$t('personalInfo.placeholder.department')"
                  />
                </div>
              </div>
              <span class="error-msg">{{ error.department }}</span>
            </div>
            <div class="form-group" :class="error.contactPerson ? 'error' : ''">
              <label for="">{{ $t("personalInfo.personalBussiness.contactperson") }}</label>
              <div class="input-group">
                <div class="input-inner">
                  <input
                    class="form-control"
                    type="text"
                    v-model="contactPerson"
                    :placeholder="$t('personalInfo.placeholder.EntercontactPerson')"
                    autocomplete="off"
                  />
                </div>
              </div>
               <span class="error-msg">{{ error.contactPerson }}</span>
            </div>
             <div class="form-group">
              <label for="">{{ $t("personalInfo.labels.id") }}</label>
              <div class="input-group">
                <div class="input-inner">
                  <input
                    class="form-control disabled"
                    disabled
                    type="text"
                    v-model="uuid"
                
                  />
                </div>
              </div>
            </div>
           
            <div class="form-group" :class="error.password ? 'error' : ''">
              <label for="">{{ $t("personalInfo.labels.password") }}</label>
              <div class="input-group">
                <div class="input-inner">
                  <input
                    class="form-control"
                    type="password"
                   :placeholder= "$t('personalInfo.placeholder.PasswordFormat')"
                   maxlength="20"
                   v-model="password"
                   autocomplete="off"
                  />
                </div>
              </div>
              <span class="error-msg">{{ error.password }}</span>
            </div>
            <div class="form-group" :class="error.confirmPassword ? 'error' : ''">
              <label for="">{{ $t("personalInfo.labels.confirm_password") }}</label>
              <div class="input-group">
                <div class="input-inner">
                  <input
                    class="form-control"
                    type="password"
                    :placeholder="$t('personalInfo.placeholder.VerifyPassword')"
                    v-model="confirmPassword"
                    autocomplete="off"
                  />
                </div>
              </div>
              <span class="error-msg">{{ error.confirmPassword }}</span>
            </div>
             <div class="form-group">
              <label for="">{{ $t("personalInfo.labels.email") }}</label>
              <div class="input-group">
                <div class="input-inner">
                  <input
                    class="form-control disabled"
                    disabled
                    type="text"
                    v-model="email"
                
                  />
                </div>
              </div>
            </div>
           
            <div class="form-group" :class="error.phoneNumber ? 'error' : ''" v-if="common.state.isHidePhAddr">
              <label for="">{{ $t("personalInfo.labels.phonenumber") }}</label>
              <div class="input-group">
                <div class="input-inner">
                  <input
                    class="form-control"
                    type="text"
                    v-model="phoneNumber"
                    :placeholder="$t('personalInfo.placeholder.PhoneNumber')"
                  />
                </div>
              </div>
              <span class="error-msg">{{ error.phoneNumber }}</span>
            </div>
            <div class="form-group" :class="error.address ? 'error' : ''" v-if="common.state.isHidePhAddr">
              <label for="">{{ $t("personalInfo.labels.address") }}</label>
              <div class="input-group with-btn dual-input">
                <div class="input-inner">
                  <input
                    class="form-control"
                    type="text"
                    :placeholder="$t('common.placeholder.EnterAddress')"
                    v-model="address"
                    disabled
                  />
                </div>
                <button class="btn-green-outline" @click="getAddress">{{ $t("personalInfo.labels.searchaddress") }}</button>
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
                  <input
                    class="form-control"
                    type="text"
                    v-model="Detailaddress"
                    :placeholder="$t('common.placeholder.EnterDetailedAddress')"
                  />
                </div>
              </div>
              <span class="error-msg">{{ error.address }}</span>
            </div>
           </div>
            <button class="btn-primary grenn-btn2" @click="updateBusinessInfo">{{ $t("personalInfo.labels.save") }}</button>
          </form>
           <div class="logout-withdraw">
            <ul>
              <li><router-link to @click="logOut()">{{ $t("personalInfo.labels.log_out") }}</router-link>
              </li>
              <li><router-link to="/withdrawal-of-membership">{{ $t("personalInfo.labels.withdrawal") }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal 
    v-show="isModalVisible"
    @close="closeModal"
    :bodytext1="$t('personalInfo.info_modal.bodytext')"
    :btnText2="$t('personalInfo.info_modal.btntext')"
    link = '/'
  />
</template>
<script>
import { inject } from "vue";
import Modal from "../../components/Modal.vue";
import PersonalBusinessService from "../../services/PersonalBusinessService";
import personalBusinessValidation from "../../Validation/personalBusinessValidation";
 
export default {
  name: "PersonalInformationBusiness",
  components: {
    // "vue-select": VueNextSelect,
    Modal,
  },
  data(){
    return{
      userId: this.common.state.userId,
      userID: "",
      business_number:"",
      business_name:"",
      department:"",
      contactPerson:"",
      uuid:"",
      password:"",
      confirmPassword:"",
      email:"",
      phoneNumber:"",
      address:"",
      error: {},
      isModalVisible:false,
      Detailaddress:"",
      validateOnce: false,
      globalLocale: "",
    }
  },

  setup() {
    const common = inject("common");
    return { common };
  },

  created() {
    this.personalBusinessService = new PersonalBusinessService();
  },

  updated(){
     this.globalLocale = this.$i18n.locale;
    //  this.personalInfo();
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

      this.personalBusinessService.getBusinessData(this.userId).then((res) => {
        
        let data = res.data;
        console.log("data",data);
        this.business_number = data.data[0].business_number;
        this.business_name = data.data[0].business_name;        
        this.department = data.data[0].department;
        this.contactPerson = data.data[0].name;
        this.uuid = data.data[0].uuid;
        this.email = data.data[0].email;
        this.phoneNumber = data.data[0].mobile;
        this.address = data.data[0].address;
        this.userID = this.common.state.userId;
        this.Detailaddress = data.data[0].detail_address;
      });
    },
   
   checkError() {
      let credential = {
        business_number: this.business_number,
        business_name: this.business_name,
        department: this.department,
        contactPerson: this.contactPerson,
        password: this.password,
        confirmPassword: this.confirmPassword,
        email: this.email,
        phoneNumber: this.phoneNumber,
        address: this.address,
        // address:this.Detailaddress
      };
      const { isInvalid, error } = personalBusinessValidation(credential);
      if (isInvalid) {
        this.error = error;
        return false;
      } else {
        this.error = {};
        return true;
      }
    },
    
    async updateBusinessInfo() {
       this.validateOnce = true;
      if (!this.checkError()) {
        return;
      } else {
        
        this.personalBusinessService
          .updateBusinessInfo(
            this.userID,
            this.business_number,
            this.business_name,
            this.department,
            this.contactPerson,
            this.password,
            this.confirmPassword,
            this.email,
            this.phoneNumber,
            this.address,
            this.Detailaddress
          )
          .then((res) => {
            if (res.data.status == 200) {
              console.log(res.data.status);
              localStorage.setItem("uname", this.contactPerson);
              this.openmodal();
            }
          });
      }
    },

    openmodal() {
      this.isModalVisible = true;
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