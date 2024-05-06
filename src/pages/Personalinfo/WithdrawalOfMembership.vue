<template>
    <div class="main-body">
    <div class="signUp-container">
      <div class="login-signup-wrap membership-wrap personal-info">
        <div class="login-signup-inner">
          <div class="login-heading-wrap">
            <h1 class="login-heading">
              {{ $t("personalInfo.withdrawal.title") }}
            </h1>
          </div>
          <form action="" class="signUp-form" @submit="(e) => e.preventDefault()">
           <div class="individuals-form">
              <div class="form-group" :class="error.reason ? 'error' : ''">
              <label for="">{{ $t("personalInfo.withdrawal.header") }}</label>
              <div class="input-group">
                <div class="input-inner">
                  <textarea class="form-control textarea" @keyup="reasonkeyup" :placeholder="$t('personalInfo.withdrawal.placeholder')" v-model="reason"></textarea>
                </div>
              </div>
              <span class="error-msg">{{ error.reason }}</span>
            </div>
           </div>
            <button class="btn-primary grenn-btn2" @click="modalWithdraw">{{ $t("personalInfo.withdrawal.button") }}</button>
          </form>
          <!-- <modal/> -->
        </div>
      </div>
    </div>
    </div>
        <div>
          <Modal 
            v-show="isModalVisible"
            @close="closeModal"
            @confirm = "confirm"
            :bodytext1="$t('personalInfo.withdrawal.bodytext')"
            :btnText1="$t('personalInfo.withdrawal.btntext')"
            :btnText2="$t('personalInfo.withdrawal.btntext1')"
            link = ''
          />
        </div>

      <div>
        <Modal
        v-show="confirmModal"
        @close="closeModal1"
        :bodytext1="$t('personalInfo.withdrawmodal.bodytext')"
        :btnText2="$t('personalInfo.withdrawmodal.btntext')"
        link = '/'
      />
      </div>
</template>
<script>
import Modal from "../../components/Modal.vue";
import PersonalBusinessService from "../../services/PersonalBusinessService";
 
export default {
  name: "WithdrawalOfMembership",
  components: {
    // "vue-select": VueNextSelect,
    Modal
  },
  data() {
    return{
      reason:"",
      error: {},
      isModalVisible: false,
      confirmModal: false,
      saveModal: false,
      globalLocale : '',
    }
  },

  created() {
    this.personalBusinessService = new PersonalBusinessService();
  },

  updated(){
    this.globalLocale = localStorage.getItem('selectedLang');
    console.log(this.globalLocale)
  },
  watch: {
    globalLocale(newVal, oldVal) {
      if((newVal == 'KO' || newVal == 'EN') && this.reason == ''){
        this.emptyReason();
      }
    },
  },

  methods:{

    emptyReason(){
      this.error.reason = this.$t("personalInfo.withdrawal.reason");
    },

    reasonkeyup(){
      if (this.reason == "") {
        this.error.reason = this.$t("personalInfo.withdrawal.reason");
      } else {
        this.error.reason = ""
      }
    },

    modalWithdraw(){
      if (this.reason == "") {
        this.error.reason = this.$t("personalInfo.withdrawal.reason");
      } else {
        this.isModalVisible =  true;
      }
    },

    async businessWithdraw() {
        this.personalBusinessService
          .businessWithdraw(
            this.reason
          )
          .then((res) => {
            console.log(res);
            if (res.data.status == 200) {
              console.log("res.data.status",res.data.status);
            }
          });
    },


    closeModal() {
      this.isModalVisible = false;
    },

    closeModal1() {
      this.confirmModal = false;
    },

    confirm(){
      this.confirmModal = true;
      this.businessWithdraw();
    }

  },
 
};
</script>

