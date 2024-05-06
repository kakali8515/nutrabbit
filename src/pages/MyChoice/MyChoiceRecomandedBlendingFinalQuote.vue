<template>
  <div class="main-body">
    <div class="container-medium">
      <div class="my-choce-wrap my-choice-selection package-list-section">
        <div class="my-choice-heading">
          <h2>{{ $t("myChoice.RecommendedBlending.title") }}</h2>
          <ul class="recomanded-status-wrap">
            <li class="recomanded-status visited">
              <div class="d-item">
                <span></span>
                <p>{{ $t("progress_bar.selection1") }}</p>
              </div>
            </li>
            <li class="recomanded-status visited">
              <div class="d-item">
                <span></span>
                <p>{{ $t("progress_bar.selection2") }}</p>
              </div>
            </li>
            <li class="recomanded-status visited">
              <div class="d-item">
                <span></span>
                <p>{{ $t("progress_bar.selection3") }}</p>
              </div>
            </li>
            <li class="recomanded-status active">
              <div class="d-item">
                <span></span>
                <p>{{ $t("progress_bar.selection4") }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="choice-selection-item-wrap">
          <div class="choice-selection-item raw-material-product">
            <div class="heading-wrap">
              <div class="heading">
                <h2>{{ $t("final.option") }}</h2>
              </div>
            </div>
            <div class="materialForm">
              <div class="tableWrap">
                <table>
                  <thead>
                    <tr>
                      <th>{{ $t("final.No") }}</th>
                      <th>{{ $t("final.Category") }}</th>
                      <th>{{ $t("final.Description") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ $t(item.category) }}</td>
                      <td>{{ $t(item.explanation) }}</td>
                    </tr>

                    <tr v-for="(option, index) in raw_mat" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ $t(option.category) }}</td>
                      <td>{{ $t(option.explanation) }}</td>
                    </tr>
                    <tr v-for="(option, index) in pill" :key="index">
                      <td>{{ raw_mat.length + 1 }}</td>
                      <td>{{ $t(option.category) }}</td>
                      <td>{{ $t(option.explanation) }}</td>
                    </tr>
                    <tr v-for="(option, index) in pack" :key="index">
                      <td>{{ raw_mat.length + pill.length + 1 }}</td>
                      <td>{{ $t(option.category) }}</td>
                      <td>{{ $t(option.explanation) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="fGroup">
                <label>{{ $t("final.AdditionalRequests") }}</label>
                <span>{{ $t("final.add_info") }}</span>
                <textarea v-model="additional_request" :placeholder="$t('final.textarea_place')"></textarea>
              </div>
              <div class="fGroup mb0">
                <label class="mb0">
                  {{ $t("final.Select_Service") }}
                  <span class="mb0">
                    {{ $t("final.Select_Service_desc") }}</span>
                </label>
              </div>
              <div class="product-list-wrap">
                <div class="product-item with-input auto-width pt-20">
                  <div class="radio-wrap">
                    <label class="custom-check custom-check2" for="qoute">
                      <input type="checkbox" id="qoute" value="2" v-model="servicetype" />
                      <span class="checkmark" for="qoute"></span>
                    </label>
                  </div>
                  <div class="material-details">
                    <h2>{{ $t("final.check1") }}</h2>
                  </div>
                </div>
                <div class="product-item with-input auto-width">
                  <div class="radio-wrap">
                    <label class="custom-check custom-check2" for="sample">
                      <input type="checkbox" id="sample" value="1" v-model="servicetype" />
                      <span class="checkmark" for="sample"></span>
                    </label>
                  </div>
                  <div class="material-details">
                    <h2>
                      {{ $t("final.check2") }}
                      <span>{{ $t("final.check2_info") }}</span>
                    </h2>
                  </div>
                </div>
                <ul>
                  <li>{{ $t("final.note.list1") }}</li>
                  <li>{{ $t("final.note.list2") }}</li>
                  <li>{{ $t("final.note.list3") }}</li>
                  <li>{{ $t("final.note.list4") }}</li>
                </ul>
                <div class="btn-wrap tripple-btn">
                  <button @click="
                    this.$router.push({
                      name: 'ChoiceRecommendedBlendingPackageSelection',
                      query: { blending_id: this.blending_id },
                    })
                  " class="btn-small-solid grey btn-left">
                    {{ $t("button.Previous") }}
                  </button>
                  <div class="btnWrapRight">
                    <button class="btn-green-outline blue" @click="package_temporary_add">
                      {{ $t("button.Save_as_draft") }}
                    </button>
                    <button class="btn-small-solid blue ml-4" @click="package_add">
                      {{ $t("button.next") }}
                    </button>
                  </div>
                  <my-modal-component v-show="showModal">
                    <Modal @close="closeModal" :bodytext1="$t('final.modal_msg')" :btnText2="$t('button.Confirm')"
                      link="/" />
                  </my-modal-component>
                  <Modal v-show="isServiceSelectedVisible" @close="closeModalService"
                    :bodytext1="$t('final.required_service_msg')" :btnText1="$t('button.Confirm')" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <router-link :to="{name: 'PaymentCallback'}">PaymentCallback</router-link> -->
    </div>
  </div>
  <!-- {{ currentPath }} -->
  <!-- <PaymentCallback @ImpSuccess="payCheck($event)"  v-if="false"/> -->
</template>

<script>
// import Popper from "vue3-popper";
import ProductList from "../../components/ProductList.vue";
import MyChoiceService from "../../services/MyChoiceService";
import Modal from "../../components/Modal.vue";
import PersonalBusinessService from "../../services/PersonalBusinessService";
import PersonalInfoService from "../../services/PersonalInfoService";
import PaymentService from "../../services/PaymentService";
// import PaymentCallback from "../Common/PaymentCallback.vue";

export default {
  name: "RawMaterialEstimation",
  inject: ["common"],
  components: {
    // Popper,
    ProductList,
    Modal,
    // PaymentCallback
  },
  data() {
    return {
      currentPath: import.meta.env.VITE_SITE_BASE_URL_CALLBACK + this.$router.options.history.state.current,
      blending_id: this.$route.query.blending_id,
      package_id: this.$route.query.package_id,
      servicetype: ["2"],
      additional_request: "",
      showModal: false,
      items: [],
      raw_mat: [],
      pill: [],
      pack: [],
      etc: localStorage.getItem("etc"),
      isServiceSelectedVisible: false,
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      uuid: "",
      Detailaddress: "",
      userId: this.common.state.userId,
      payment_status: "",
      payment_done: "",
      service: "",
      is_temporary_storage: "N",
      applicationId: "",
      apply_num: "",
      bank_name: "",
      card_name: "",
      card_number: "",
      card_quota: "",
      currency: "",
      custom_data: "",
      imp_uid: "",
      merchant_uid: "",
      merchant_name: "",
      paid_amount: "",
      paid_at: "",
      pay_method: "",
      pg_provider: "",
      pg_tid: "",
      pg_type: "",
      receipt_url: "",
      request_id: "",
      status: "",
      success: "",
      error_code: "",
      error_msg: "",
    };
  },
  created() {
    this.mychoiceService = new MyChoiceService();
    this.personalInfoservice = new PersonalInfoService();
    this.personalBusinessService = new PersonalBusinessService();
    this.paymentService = new PaymentService();
    console.log('page path--', this.$router.options.history.state.current);
  },
  mounted() {
    this.option_list();
    this.getUserInfo();
    // this.payCheck();
  },
  // updated() {
  //   // this.payCheck('from updated');
  // },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.option_list();
      }
    },
  },
  methods: {
    closeModalService() {
      this.isServiceSelectedVisible = false;
    },
    closeModal() {
      this.showModal = false;
    },
    // payCheck() {
    //   // alert('payCheck call -- ' + e);
    //   // console.log('payCheck call -- ', e);
    //   console.log('payCheck');
    //   let self = this;
    //   var queryString = window.location.search;
    //   alert('queryString--' + queryString);
    //   const urlParams = new URLSearchParams(queryString);
    //   alert('urlParams--' + urlParams);
    //   var imp_success = urlParams.get('imp_success');
    //   var imp_uid = urlParams.get('imp_uid');
    //   var merchant_uid = urlParams.get('merchant_uid');
    //   alert('imp_success--' + imp_success);
    //   alert('localstorage--' + localStorage.getItem('rsp'));
    //   if (imp_success == 'false') {
    //     alert("결제가 실패하였습니다. nutri3.3으로 문의해주세요. / Payment failed");
    //   } else {
    //     alert("결제가 완료되었습니다. / payment success");
    //   }
    // },
    package_add() {
      let length = this.servicetype.length;
      if (length == 0) {
        // this.$swal("Please select a service");
        this.isServiceSelectedVisible = true;
      } else {
        if (length == 2) {
          this.service = 3;
        } else {
          this.service = this.servicetype.toString();
        }
        if (this.service == "2") {
          //Only get a quote
          this.mychoiceService
            .getRecommendedBlendingPackageAdd(
              this.blending_id,
              this.payment_status,
              this.package_id,
              this.etc,
              this.additional_request,
              this.service,
              this.is_temporary_storage
            )
            .then((res) => {
              // console.log(res);
              if (res.status == 200) {
                this.$router.push({ name: "MyApplicationDetails" });
              } else {
                this.$swal(res.message, "error");
              }
            });
        } else {
          // sample Application and both get a quote
          this.requestPay(
            this.email,
            this.name,
            this.phoneNumber,
            this.address
          );
        }
      }
    },
    // sample Application and both get a quote
    recommendedBlendingPackageAdd() {
      this.mychoiceService
        .getRecommendedBlendingPackageAdd(
          this.blending_id,
          this.payment_status,
          this.package_id,
          this.etc,
          this.additional_request,
          this.service,
          this.is_temporary_storage
        )
        .then((res) => {
          // console.log(res.data.application_Id);
          if (res.status == 200) {
            this.applicationId = res.data.application_Id;
            if (this.payment_status == "Success") {
              this.$router.push({ name: "MyApplicationDetails" });
              this.addPayment();
            }
            if (this.payment_status == "Failed") {
              this.$router.push({ name: "MyRecipe" });
              this.addPayment();
            }
          } else {
            // this.$swal(res.message, "error");
            console.log(res.message);
          }
        });
    },

    // add payment

    addPayment() {
      this.paymentService.addPayment(
        this.applicationId,
        this.apply_num,
        this.bank_name,
        this.address,
        this.email,
        this.name,
        this.phoneNumber,
        this.card_name,
        this.card_number,
        this.card_quota,
        this.currency,
        this.custom_data,
        this.imp_uid,
        this.merchant_uid,
        this.name,
        this.paid_amount,
        this.paid_at,
        this.pay_method,
        this.pg_provider,
        this.pg_tid,
        this.pg_type,
        this.receipt_url,
        this.request_id,
        this.status,
        this.success,
        this.error_code,
        this.error_msg
      );
    },

    // get user info for payement
    getUserInfo() {
      if (localStorage.getItem("userType") == "business_member") {
        this.personalBusinessService
          .getBusinessData(this.userId)
          .then((res) => {
            let data = res.data;
            // console.log("data",data);
            this.name = data.data[0].name;
            this.uuid = data.data[0].uuid;
            this.email = data.data[0].email;
            this.phoneNumber = data.data[0].mobile;
            this.address = data.data[0].address;
            this.Detailaddress = data.data[0].address;
          });
      }
      if (localStorage.getItem("userType") == "personal_member") {
        this.personalInfoservice.getPersonalData(this.userId).then((res) => {
          // console.log(res.data);
          let data = res.data;
          this.name = data.data[0].name;
          this.uuid = data.data[0].uuid;
          this.email = data.data[0].email;
          this.phoneNumber = data.data[0].mobile;
          this.address = data.data[0].address;
          this.Detailaddress = data.data[0].address;
        });
      }
    },
    // payment
    requestPay(buyerEmail, buyerName, buyerTel, buyerAddr) {
      let self = this;
      let IMP = window.IMP;
      // IMP.init("imp55488636");imp15295484
      IMP.init("imp15295484");
      IMP.request_pay(
        {
          pg: "tospayments",
          // pay_method: "card",
          merchant_uid: "ORDER_" + new Date().getTime(),
          name: buyerName,
          amount: 300000,
          tax_free: 0,
          buyer_email: buyerEmail,
          buyer_name: buyerName,
          buyer_tel: buyerTel,
          buyer_addr: buyerAddr,
          app_scheme: "NutrabbitIAmPort",
          m_redirect_url: import.meta.env.VITE_SITE_BASE_URL + "callback/payment",
          // m_redirect_url: this.currentPath,
        },
        function (rsp) {
          localStorage.setItem('rsp', rsp);
          if (rsp.success) {
            // payment successful: payment accepted or virtual account issued
            // alert('결제가 완료되었습니다.' + rsp);
            alert("결제가 완료되었습니다.");
            console.log("success", rsp);
            self.payment_status = "Success";
            self.payment_done = true;
            self.recommendedBlendingPackageAdd();
            self.card_name = rsp.card_name;
            self.card_number = rsp.card_number;
            self.card_quota = rsp.card_quota;
            self.currency = rsp.currency;
            self.custom_data = rsp.custom_data;
            self.imp_uid = rsp.imp_uid;
            self.merchant_uid = rsp.merchant_uid;
            self.merchant_name = rsp.name;
            self.paid_amount = rsp.paid_amount;
            self.paid_at = rsp.paid_at;
            self.pay_method = rsp.pay_method;
            self.pg_provider = rsp.pg_provider;
            self.pg_tid = rsp.pg_tid;
            self.pg_type = rsp.pg_type;
            self.receipt_url = rsp.receipt_url;
            self.request_id = rsp.request_id;
            self.status = rsp.status;
            self.success = rsp.success;
            self.error_code = rsp.error_code;
            self.error_msg = rsp.error_msg;
          } else {
            self.payment_status = "Failed";
            console.log("failed status", self.payment_status);
            self.payment_done = true;
            self.recommendedBlendingPackageAdd();
            self.card_name = rsp.card_name;
            self.card_number = rsp.card_number;
            self.card_quota = rsp.card_quota;
            self.currency = rsp.currency;
            self.custom_data = rsp.custom_data;
            self.imp_uid = rsp.imp_uid;
            self.merchant_uid = rsp.merchant_uid;
            self.merchant_name = rsp.name;
            self.paid_amount = rsp.paid_amount;
            self.paid_at = rsp.paid_at;
            self.pay_method = rsp.pay_method;
            self.pg_provider = rsp.pg_provider;
            self.pg_tid = rsp.pg_tid;
            self.pg_type = rsp.pg_type;
            self.receipt_url = rsp.receipt_url;
            self.request_id = rsp.request_id;
            self.status = rsp.status;
            self.success = rsp.success;
            self.error_code = rsp.error_code;
            self.error_msg = rsp.error_msg;
            console.log("failed", rsp);
            alert("결제가 실패하였습니다. nutri3.3으로 문의해주세요." + rsp.error_msg);
            // alert("결제가 실패하였습니다. nutri3.3으로 문의해주세요.");
          }
        }
      );
    },

    // payRes(res, status) {
    //   let self = this;
    //   if(status == 'Success') {
    //     alert("결제가 완료되었습니다.");
    //     console.log("success", rsp);
    //     self.payment_status = "Success";
    //     self.payment_done = true;
    //     self.recommendedBlendingPackageAdd();
    //     self.card_name = rsp.card_name;
    //     self.card_number = rsp.card_number;
    //     self.card_quota = rsp.card_quota;
    //     self.currency = rsp.currency;
    //     self.custom_data = rsp.custom_data;
    //     self.imp_uid = rsp.imp_uid;
    //     self.merchant_uid = rsp.merchant_uid;
    //     self.merchant_name = rsp.name;
    //     self.paid_amount = rsp.paid_amount;
    //     self.paid_at = rsp.paid_at;
    //     self.pay_method = rsp.pay_method;
    //     self.pg_provider = rsp.pg_provider;
    //     self.pg_tid = rsp.pg_tid;
    //     self.pg_type = rsp.pg_type;
    //     self.receipt_url = rsp.receipt_url;
    //     self.request_id = rsp.request_id;
    //     self.status = rsp.status;
    //     self.success = rsp.success;
    //     self.error_code = rsp.error_code;
    //     self.error_msg = rsp.error_msg;
    //   }

    // },

    package_temporary_add() {
      let is_temporary_storage = "Y";
      let length = this.servicetype.length;
      let service = "";
      if (length == 0) {
        // this.$swal("Please select a service");
        this.isServiceSelectedVisible = true;
      } else {
        if (length == 2) {
          service = 3;
        } else {
          service = this.servicetype.toString();
        }
        this.payment_status = "";
        this.mychoiceService
          .getRecommendedBlendingPackageAdd(
            this.blending_id,
            this.payment_status,
            this.package_id,
            this.etc,
            this.additional_request,
            service,
            is_temporary_storage
          )
          .then((res) => {
            // console.log(res);
            if (res.status == 200) {
              // this.$router.push("/");
              this.showModal = true;
            } else {
              // this.$swal(res.message, "error");
              console.log(res.message);
            }
          });
      }
    },
    option_list() {
      this.items = [];
      this.raw_mat = [];
      this.pill = [];
      this.pack = [];
      this.mychoiceService
        .getRecommendedBlendingDetail(this.blending_id)
        .then((res) => {
          //  console.log(res.data);
          if (res.data.status == 200) {
            var option_data = res.data.data[0].options;
            // console.log('option_data--',option_data);

            for (let i = 0; i <= option_data.length; i++) {
              var res_option_type = option_data[i].split(":")[0]; // raw_material:1
              var res_option_value = option_data[i].split(":")[1];
              // var option_array = option_data[i];
              // var res_option_type = Object.keys(option_array).toString();
              // var res_option_value = Object.values(option_array).toString();
              // console.log(res_option_type);
              // console.log(res_option_value);
              this.mychoiceService
                .optiondetails(res_option_type, res_option_value)
                .then((res) => {
                  // this.items.push({
                  //   category: res.data.data[0].category,
                  //   explanation: res.data.data[0].explanation,
                  // });

                  console.log("ressss----", res.data.data[0].category);

                  if (res.data.data[0].category == "Ingredients") {
                    this.raw_mat.push({
                      category: res.data.data[0].category,
                      explanation: res.data.data[0].explanation,
                    });
                  } else if (res.data.data[0].category == "Formulation") {
                    this.pill.push({
                      category: res.data.data[0].category,
                      explanation: res.data.data[0].explanation,
                    });
                  }
                  // else if (res.data.data[0].category == 'Package') {
                  //   this.pack.push({
                  //     category: res.data.data[0].category,
                  //     explanation: res.data.data[0].explanation,
                  //   })
                  // }
                });
            }
          } else {
            // this.$swal(res.data.message, "error");
            console.log(res.data.message);
          }
        });

      // package
      this.mychoiceService
        .optiondetails("package", this.package_id)
        .then((res) => {
          this.pack.push({
            category: res.data.data[0].category,
            explanation: res.data.data[0].explanation,
          });
          // console.log(res);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.pt-20 {
  padding-top: 20px !important;
}

.btn-green-outline {
  margin-right: 20px;
}

@media screen and (max-width: 768px) {
  .fGroup textarea {
    min-height: 208px !important;
  }
}
</style>
