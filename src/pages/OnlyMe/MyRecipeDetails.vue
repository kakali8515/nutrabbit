<template>
  <div class="main-body themeGreen">
    <div class="container-medium">
      <div class="my-choce-wrap my-choice-selection package-list-section">
        <div class="my-choice-heading">
          <h2>{{ page_header }}</h2>
          <!-- <h2>My Choice</h2> -->
        </div>
        <div class="choice-selection-item-wrap">
          <div class="choice-selection-item raw-material-product">
            <div class="heading-wrap">
              <div class="heading">
                <h2>{{ $t("onlyme.title.Options") }}</h2>
              </div>
            </div>
            <div class="materialForm">
              <div class="tableWrap">
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>{{ $t("onlyme.tableCaption.Category") }}</th>
                      <th>{{ $t("onlyme.tableCaption.Description") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr>
                      <td>{{ index + 1 }}</td>
                      <td>{{ $t(option_item.category) }}</td>
                      <td>{{ $t(option_item.explanation) }}</td>
                    </tr> -->

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
              <div class="fGroup" v-if="isRecomm">
                <label>{{ $t("onlyme.title.Title") }}</label>
                <input type="text" name="" :placeholder="$t('onlyme.placeholder.title')" v-model="title" disabled />
              </div>
              <div class="fGroup">
                <label>{{ $t("onlyme.title.AdditionalRequest") }}</label>
                <textarea :placeholder="$t('onlyme.placeholder.additionalRequest')" v-model="additionalRequest"
                  disabled></textarea>
              </div>
              <div class="fGroup mb0">
                <label class="mb0">{{ $t("onlyme.title.Service") }}</label>
              </div>
              <div class="product-list-wrap">
                <div v-if="serviceSample || serviceEstimate">
                  <div class="product-item with-input without-input">
                    <div class="material-details">
                      <h2>{{ singleService }}</h2>
                    </div>
                  </div>
                </div>
                <div v-if="serviceBoth">
                  <div v-for="(service, index) in services" :key="index" class="product-item with-input without-input">
                    <div class="material-details">
                      <h2>{{ service }}</h2>
                    </div>
                  </div>
                </div>
                <div class="btn-wrap tripple-btn">
                  <button class="btn-small-solid grey btn-left" @click="openModal">
                    {{ $t("onlyme.button.Delete") }}
                  </button>
                  <div class="btnWrapRight">
                    <button class="btn-green-outline blue" @click="toEditRecipeDetails(product_id, app_type)"
                      :disabled="isDisabled">
                      {{ $t("onlyme.button.Edit") }}
                    </button>
                    <button class="btn-small-solid blue ml-4" @click="toPaymentGateway(product_id)">
                      {{ $t("onlyme.button.Next") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-show="isModalVisible" @close="closeModal" :bodytext1="$t('onlyme.modal.DeleteBodyText')"
      :btnText1="$t('onlyme.button.Cancel')" :btnText2="$t('onlyme.button.Confirm')" link="/my-recipe"
      @confirm="deleteRecipeDetail" />
  </div>
</template>

          

<script>
// import Popper from "vue3-popper";
import ProductList from "../../components/ProductList.vue";
import MyRecipeService from "../../services/MyRecipeService";
import Modal from "../../components/Modal.vue";
import PersonalBusinessService from "../../services/PersonalBusinessService";
import PersonalInfoService from "../../services/PersonalInfoService";
import PaymentService from "../../services/PaymentService";

export default {
  inject: ["common"],
  name: "MyRecipeDetails",
  components: {
    // Popper,
    ProductList,
    Modal,
  },
  data() {
    return {
      siteBaseUrl: import.meta.env.VITE_SITE_BASE_URL,
      userId: this.common.state.userId,
      rwaMaterialData: [],
      additionalRequest: "",
      title: "",
      // choice_title : "",
      // recom_title : "",
      // recom_ko : "",
      // recom_en : "",
      serviceType: [],
      option_items: [],
      raw_mat: [],
      pill: [],
      pack: [],
      isModalVisible: false,
      serviceNum: "",
      isDisabled: false,
      serviceSample: false,
      serviceEstimate: false,
      serviceBoth: false,
      globalLocale: "",
      isRecomm: true,

      //   {
      //     img: "../../../src/assets/images/pkgSelection.png",
      //     title: "Bottle",
      //     desc: [
      //       "Choose from a variety of sizes and shapes of bottles and caps.",
      //     ],
      //   },
      //   {
      //     img: "../../../src/assets/images/pkgSelection.png",
      //     title: "PTP",
      //     desc: [
      //       "It is hygienic and convenient.",
      //       "The packaging volume is slightly larger.",
      //     ],
      //   },
      // ],

      product_id: this.$route.params.id,
      application_type:
        this.$route.params.type == "my-choice"
          ? "my_choice"
          : "recommended_blending",
      app_type: this.$route.params.type,
      page_header:
        this.$route.params.type == "my-choice"
          ? "My Choice"
          : "Recommended Blending",

      // for payment
      applicationId: this.$route.params.id,
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      uuid: "",
      Detailaddress: "",
      userId: this.common.state.userId,
      payment_status: "",
      payment_done: "",
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
    this.myRecipe = new MyRecipeService();
    this.personalInfoservice = new PersonalInfoService();
    this.personalBusinessService = new PersonalBusinessService();
    this.paymentService = new PaymentService();
    // console.log(
    //   `product id is : ${this.product_id} and type is ${this.application_type}`
    // );
  },
  // updated(){
  //   this.globalLocale = localStorage.getItem('selectedLang');
  //   console.log(this.globalLocale)
  // },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.recipeSingleProductDetails(this.product_id, this.application_type);
        console.log(this.common.state.SelectedLang);
      }
    },
  },
  mounted() {
    this.recipeSingleProductDetails(this.product_id, this.application_type);

    if (this.$route.params.type == "recommended-blending") {
      this.isRecomm = false;
    }
    this.getUserInfo();
  },

  computed: {
    services() {
      return [
        this.$t("onlyme.title.SampleAppliction"),
        this.$t("onlyme.title.Estimate"),
      ];
    },
    singleService() {
      let service;
      if (this.serviceSample) {
        service = this.$t("onlyme.title.SampleAppliction");
      }
      if (this.serviceEstimate) {
        service = this.$t("onlyme.title.Estimate");
      }

      return service;
    },

    page_header() {
      if (this.$route.params.type == "my-choice") {
        return this.$t("onlyme.title.MyChoice");
      }

      if (this.$route.params.type == "recommended-blending") {
        return this.$t("onlyme.title.RecommendedBlending");
      }
    },
  },
  methods: {
    recipeSingleProductDetails(_productID, _type) {
      this.myRecipe
        .getSingleRecipeProductDetails(_productID, _type)
        .then((res) => {
          console.log(res.data[0]);
          if (res.status == 200) {
            if (res.data[0].is_temporary_storage == "N") {
              this.$router.push("/my-recipe");
              this.isDisabled = true;
              return;
            }

            this.rwaMaterialData = res.data[0];
            console.log(this.rwaMaterialData);
            this.additionalRequest = res.data[0].additional_request;
            this.title = _type == "my_choice" ? res.data[0].title : "";

            this.serviceNum = res.data[0].service_type;
            if (this.serviceNum == 1) {
              this.serviceSample = true;
            } else if (this.serviceNum == 2) {
              this.serviceEstimate = true;
            } else {
              this.serviceBoth = true;
            }
            this.option_items = [];
            this.raw_mat = [];
            this.pill = [];
            this.pack = [];
            Array.from(res.data[0].options).forEach((ele) => {
              console.log(Object.keys(ele)[0], Object.values(ele)[0]);
              let op_type = Object.keys(ele)[0].toString();
              let op_val = Object.values(ele)[0].toString();

              this.myRecipe.getOptionDetails(op_type, op_val).then((res) => {
                // console.log('sfgedfgegr===',res.data[0])
                if (res.status == 200) {

                  // this.option_items.push(res.data[0]),
                  console.log(this.option_items);


                  if (res.data[0].category == 'Ingredients') {
                    this.raw_mat.push({
                      category: res.data[0].category,
                      explanation: res.data[0].explanation,
                    })
                  }
                  else if (res.data[0].category == 'Formulation') {
                    this.pill.push({
                      category: res.data[0].category,
                      explanation: res.data[0].explanation,
                    })
                  }
                  else if (res.data[0].category == 'Package') {
                    this.pack.push({
                      category: res.data[0].category,
                      explanation: res.data[0].explanation,
                    })
                  }






                } else {
                  // this.$swal(res.message, "error");
                  console.log("error", res.message);
                }
              });
            });
          } else {
            // this.$swal(res.message, "error");
            console.log("error", res.message);
          }
        });
    },

    openModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
      //this.deleteRecipeDetail(this.product_id);
    },

    toEditRecipeDetails(_id, _type) {
      if (!_id) {
        return;
      }
      //console.log(`to next id ${_id}`)
      this.$router.push({
        name: "MyRecipeDetailsEdit",
        params: { id: _id, type: _type },
      });
    },

    toPaymentGateway(_id) {
      //console.log(this.serviceNum)

      if (this.serviceNum == 1) {
        // for payment gatteway
        console.log(`product id for payment is  : ${_id}`);

        // sample Application
        this.requestPay(this.email, this.name, this.phoneNumber, this.address);
      } else {
        // if service is quote
        this.myRecipe.submitRecipeApplication(_id).then((res) => {
          if (res.status == 200) {
            // console.log(`application submit status : ${res.message}`);
            this.$router.replace("/my-application-detail");
          } else {
            //this.$swal(res.message, "error");
            console.log("Error", res.message);
          }
        });
      }
    },

    deleteRecipeDetail() {
      //console.log(`delete item product id : ${id}`);

      this.myRecipe.deleteRecipeData(this.product_id).then((res) => {
        if (res.status == 200) {
          console.log(res.message);
          this.additionalRequest = "";
          this.title = "";
          this.serviceType = [];
          this.option_items = [];
        } else {
          this.$swal(res.message, "error");
        }
      });
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
          pg: "toss",
          pay_method: "card",
          merchant_uid: "ORDER_" + new Date().getTime(),
          name: buyerName,
          amount: 300000,
          tax_free: 0,
          buyer_email: buyerEmail,
          buyer_name: buyerName,
          buyer_tel: buyerTel,
          buyer_addr: buyerAddr,
          app_scheme: "NutrabbitIAmPort",
          m_redirect_url: this.siteBaseUrl+"callback/payment",
          // m_redirect_url: "https://frontned-nutrabbit-dev.dvconsulting.org/callback/payment",
        },
        function (rsp) {
          if (rsp.success) {
            // payment successful: payment accepted or virtual account issued
            // alert('결제가 완료되었습니다.' + rsp);
            alert('결제가 완료되었습니다.');
            console.log("success", rsp);
            self.payment_status = "Success";
            self.payment_done = true;
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
            self.addPayment();
            self.submitApplication();
          } else {
            // console.log("failed", rsp);
            // alert("결제가 실패하였습니다. nutri3.3으로 문의해주세요." + rsp.error_msg);
            alert("결제가 실패하였습니다. nutri3.3으로 문의해주세요.");
            // self.payment_status = "Success";
            self.payment_done = true;
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
            self.addPayment();
            self.$router.push({ name: "MyRecipe" });
          }
        }
      );
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

    submitApplication() {
      this.myRecipe.submitRecipeApplication(this.applicationId).then((res) => {
        if (res.status == 200) {
          // console.log(`application submit status : ${res.message}`);
          this.$router.replace({ name: "MyApplicationDetails" });
        } else {
          //this.$swal(res.message, "error");
          console.log("Error", res.message);
        }
      });
    },
  },
};
</script>

<style scoped>
.material-details h2 {
  cursor: default !important;
}
</style>