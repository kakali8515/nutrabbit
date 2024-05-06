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
                  <tbody
                    v-for="(option_item, index) in option_items"
                    :key="index"
                  >
                    <tr>
                      <td>{{ index + 1 }}</td>
                      <td>{{ $t(option_item.category) }}</td>
                      <td>{{ $t(option_item.explanation) }}</td>
                    </tr>
                    <!-- <tr>
                      <td>One</td>
                      <td>Raw material</td>
                      <td>aloe gel</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Raw material</td>
                      <td>aloe gel</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Raw material</td>
                      <td>aloe gel</td>
                    </tr> -->
                  </tbody>
                </table>
              </div>
              <div class="fGroup" v-if="isRecomm">
                <label>{{ $t("onlyme.title.Title") }}</label>
                <input
                  type="text"
                  name=""
                  :placeholder="$t('onlyme.placeholder.title')"
                  v-model="title"
                />
              </div>
              <div class="fGroup">
                <label>{{ $t("onlyme.title.AdditionalRequest") }}</label>
                <span>{{ $t("onlyme.add_req_caption.Caption") }}</span>
                <textarea
                  :placeholder="$t('onlyme.placeholder.additionalRequest')"
                  v-model="add_req"
                ></textarea>
              </div>
              <div class="fGroup mb0">
                <label class="mb0 special-label-edit"
                  >{{ $t("onlyme.title.Service") }}
                  <!-- <span class="mb0"
                    >{{$t('onlyme.service_caption.Caption')}}</span
                  > -->
                </label>
              </div>
              <div class="product-list-wrap">
                <div class="product-item with-input recipe-without-input">
                  <div class="material-details">
                    <h2>{{ serviceType }}</h2>
                  </div>
                </div>
                <!-- <ul>
                  <li>
                    {{$t("onlyme.service_info.ContentOne")}}
                  </li>
                  <li>
                    {{$t("onlyme.service_info.ContentTwo")}}
                  </li>
                  <li>
                    {{$t("onlyme.service_info.ContentThree")}}
                  </li>
                </ul> -->
                <div class="btn-wrap">
                  <div>
                    <button
                      class="btn-small-solid grey btn-left"
                      @click="$router.push('/my-recipe')"
                    >
                      {{ $t("onlyme.button.Cancel") }}
                    </button>
                  </div>
                  <div class="flexRight">
                    <button
                      class="btn-small-solid blue ml-4"
                      @click="
                        saveRecipeDetails(product_id, title, add_req, services)
                      "
                    >
                      {{ $t("onlyme.button.Save") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-show="isFieldEmptyVisible" @close="closeModal" :bodytext1="$t('final.required_title_msg')"
    :btnText1="$t('onlyme.button.Confirm')"/>
  </div>
</template>

          

<script>
// import Popper from "vue3-popper";
import ProductList from "../../components/ProductList.vue";
import MyRecipeService from "../../services/MyRecipeService";
import validator from "validator";

import Modal from "../../components/Modal.vue";

export default {
  inject: ["common"],
  name: "MyRecipeDetailsEdit",
  components: {
    // Popper,
    ProductList,
    Modal,
  },
  data() {
    return {
      rwaMaterialData: [],
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

      title: "",
      add_req: "",
      services: [],
      isSample: false,
      isQuote: false,
      product_id: this.$route.params.id,
      application_type:
        this.$route.params.type == "my-choice"
          ? "my_choice"
          : "recommended_blending",
      option_items: [],
      //page_header : (this.$route.params.type == "my-choice") ? "My Choice" : "Recommended Blending",
      isFieldEmptyVisible: false,
      globalLocale: "",
      isRecomm: true,
      // emptyTitle : false,
      // emptyReq : false,
      // emptyService : false,
      // errMsg : '',
    };
  },

  created() {
    this.myRecipe = new MyRecipeService();
    console.log(
      `product id is : ${this.product_id} and type is ${this.application_type}`
    );
  },

  mounted() {
    this.recipeSingleProductDetails(this.product_id, this.application_type);

    if (this.$route.params.type == "recommended-blending") {
      this.isRecomm = false;
    }
  },

  // updated() {
  //   this.globalLocale = localStorage.getItem('selectedLang');
  //   console.log(this.globalLocale)
  // },

  computed: {
    serviceType() {
      if (this.isSample) {
        return this.$t("onlyme.title.SampleAppliction");
      }

      if (this.isQuote) {
        return this.$t("onlyme.title.Estimate");
      }
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

  methods: {
    recipeSingleProductDetails(_productID, _type) {
      this.myRecipe
        .getSingleRecipeProductDetails(_productID, _type)
        .then((res) => {
          console.log(res.data[0]);
          if (res.status == 200) {
            if (res.data[0].is_temporary_storage == "N") {
              this.$router.push("/my-recipe");
              return;
            }
            this.rwaMaterialData = res.data;
            this.add_req = res.data[0].additional_request;
            this.title =
              _type == "my_choice" ? res.data[0].title : res.data[0].name_ko;

            if (res.data[0].service_type == 1) {
              this.isSample = true;
              this.serviceType = "Sample application";
            }

            if (res.data[0].service_type == 2) {
              this.isQuote = true;
              this.serviceType = "Get a quote";
            }

            //  if(res.data[0].service_type == 3){
            //    this.isSample = true;
            //    this.isQuote = true;
            //  }

            this.option_items = [];
            Array.from(res.data[0].options).forEach((ele) => {
              //console.log(Object.keys(ele)[0], Object.values(ele)[0])
              let op_type = Object.keys(ele)[0].toString();
              let op_val = Object.values(ele)[0].toString();

              this.myRecipe.getOptionDetails(op_type, op_val).then((res) => {
                //  console.log(res.data[0])
                if (res.status == 200) {
                  this.option_items.push(res.data[0]);
                  //  console.log(this.option_items)
                } else {
                  //this.$swal(res.message, "error");
                  console.log(res.message);
                }
              });
            });
          } else {
            this.$swal(res.message, "error");
          }
        });
    },

    saveRecipeDetails(_id, _title, _additional_req, _services) {
      if (this.application_type == "my_choice" && this.title == "") {
        //this.$swal('All fields required to be filled')
        this.isFieldEmptyVisible = true;
        return;
      }

      //let ser_tp = (_services.length > 1) ? '3' : _services[0]

      let ser_tp;

      if (this.isSample) {
        ser_tp = "1";
      }

      if (this.isQuote) {
        ser_tp = "2";
      }

      if (this.isSample && this.isQuote) {
        ser_tp = "3";
      }

      console.log(_id, _title, _additional_req, ser_tp);
      this.myRecipe
        .editRecipeDetail(_id, _title, _additional_req, ser_tp)
        .then((res) => {
          // console.log(_id, _title, _additional_req, ser_tp)
          // console.log(res)
          if (res.status == 200) {
            this.$router.go(-1);
            console.log(res.message);
          } else {
            // this.$swal(res.message, "error");
            console.log(res.message);
          }
        });
    },

    closeModal() {
      this.isFieldEmptyVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-wrap div {
  width: 50%;
}
.special-label-edit {
  padding-bottom: 20px;
  border-bottom: 1px solid $grey-CF;
}
@media screen and (max-width: 768px) {
  .main-body
    .my-choce-wrap.my-choice-selection
    .choice-selection-item.raw-material-product
    .product-list-wrap
    .product-item.recipe-without-input {
    padding: 30px 10px 30px;
  }
}
.material-details h2 {
  cursor: default !important;
}
.fGroup input{
  background: $white-1 !important;
}
</style>