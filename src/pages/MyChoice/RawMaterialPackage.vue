<template>
  <div class="main-body themePurple">
    <div class="container-medium">
      <div class="my-choce-wrap my-choice-selection package-list-section">
        <div class="my-choice-heading">
          <h2>{{ $t("header.myChoice") }}</h2>
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
            <li class="recomanded-status active">
              <div class="d-item">
                <span></span>
                <p>{{ $t("progress_bar.selection3") }}</p>
              </div>
            </li>
            <li class="recomanded-status">
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
              <div class="heading full-width">
                <h2>{{ $t("package.title") }}</h2>
                <div class="tolltip-outer">
                  <Popper>
                    <button>
                      <i class="icon-info"></i>
                    </button>
                    <template #content>
                      <div class="heading-tooltip-content">
                        <ul>
                          <li>{{ $t("package.popup.list1") }}</li>
                          <li>{{ $t("package.popup.list2") }}</li>
                          <li>{{ $t("package.popup.list3") }}</li>
                        </ul>
                      </div>
                    </template>
                  </Popper>
                </div>
              </div>
            </div>
            <div class="product-list-wrap">
              <ul class="raw-material-list">
                <li v-for="(item, index) of blendingPackageData" :key="index">
                  <!-- <ProductList :item="item" @changeId="UpdatedId($event)" @etcChecked="etcCheckedValue($event)"
                    @etcInput="UpdatedEtcInput($event)" /> -->
                  <ProductList
                    :item="item"
                    @changeId="UpdatedId($event)"
                    @etcChecked="etcCheckedValue($event)"
                  />
                </li>
              </ul>
              <div class="product-item with-input">
                <div class="radio-wrap">
                  <label class="custom-radio" for="17">
                    <input
                      type="radio"
                      name="radio"
                      id="17"
                      value="17"
                      v-model="package_id"
                      @click="getetcbtn"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="material-details">
                  <h2>{{ $t("package.etc") }}</h2>
                  <!-- <div class="form-group error">
                    <div class="input-group">
                      <input type="text" :placeholder="$t('package.etc_input')" v-model="etc" />
                      <span class="error-msg">{{ etcEmptyError }}</span>
                    </div>
                  </div> -->
                  <div
                    class="form-group form-full-width"
                    :class="etcEmptyError ? 'error' : ''"
                  >
                    <div class="input-group">
                      <div class="input-inner">
                        <input
                          type="text"
                          class="form-control"
                          :placeholder="$t('package.etc_input')"
                          v-model="etc"
                        />
                      </div>
                    </div>
                    <span class="error-msg">{{ etcEmptyError }}</span>
                  </div>
                </div>
              </div>
              <div class="product-item with-input">
                <div class="radio-wrap">
                  <label class="custom-radio" for="18">
                    <input
                      type="radio"
                      id="18"
                      name="radio"
                      v-model="package_id"
                      value="18"
                      @click="checkuncheckbtn"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="material-details">
                  <h2>{{ $t("package.unchecked") }}</h2>
                </div>
              </div>
              <div class="btn-wrap">
                <button
                  @click="this.$router.push(`/ingredient-formulation/`)"
                  class="btn-small-solid grey"
                >
                  {{ $t("button.Previous") }}
                </button>
                <button
                  :class="!isSelected ? 'btn-disabled' : ''"
                  :disabled="!isSelected"
                  @click="checkPackageId"
                  class="btn-small-solid blue"
                >
                  {{ $t("button.next") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <my-modal-component v-show="showModal2">
    <ModalWarning
      @close2="closeModal2"
      :bodytext1="$t('warningModal.text')"
      :btnText1="$t('warningModal.btn1')"
      :btnText2="$t('warningModal.btn2')"
      @confirm="confirm"
    />
  </my-modal-component>
</template>

          

<script>
import Popper from "vue3-popper";
import ProductList from "../../components/ProductList.vue";
import MyChoiceService from "../../services/MyChoiceService";
import ModalWarning from "../../components/ModalWarning.vue";

export default {
  name: "ChoiceRecommendedBlendingPackageSelection",
  inject: ["common"],
  components: {
    Popper,
    ProductList,
    ModalWarning,
  },
  data() {
    return {
      blendingPackageData: "",
      package_id: "",
      etc: "",
      etcbtn: "",
      to: "",
      showModal2: false,
      etcEmptyError: "",
      globalLocale: "",
      ischeckETCError: false,
      isSelected: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.to) {
      next();
    } else {
      this.to = to;
      this.showModal2 = true;
    }
  },
  created() {
    this.mychoiceService = new MyChoiceService();
  },
  mounted() {
    this.blendingPackage();
  },
  // updated() {
  //   //console.log(this.$i18n.locale);
  //   this.globalLocale = this.$i18n.locale;
  // },
  // watch: {
  //   globalLocale(newVal) {
  //     if ((newVal == "kr" || newVal == "en") && this.ischeckETCError) {
  //       this.checkETCError();
  //     }
  //     this.blendingPackage();
  //   },
  // },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        ((newVal == "KO" && oldVal == "EN") ||
          (newVal == "EN" && oldVal == "KO")) &&
        this.ischeckETCError
      ) {
        this.checkETCError();
        this.blendingPackage();
      } else {
        this.blendingPackage();
      }
    },
  },
  methods: {
    closeModal2() {
      this.showModal2 = false;
      this.to = null;
    },
    confirm() {
      this.showModal2 = false;
      this.$router.push(this.to);
    },
    // blending package Details
    blendingPackage() {
      this.mychoiceService.getRecommendedBlendingPackage().then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.blendingPackageData = res.data.packageData;
        } else {
          // this.$swal(res.message, "error");
          console.log(res.message);
        }
      });
    },
    UpdatedId(e) {
      this.package_id = e;
      this.isSelected = true;
    },
    UpdatedEtcInput(e) {
      this.etc = e;
    },
    etcCheckedValue(e) {
      this.etcbtn = e;
    },
    getetcbtn() {
      this.etcbtn = "ETC";
      this.isSelected = true;
    },
    checkuncheckbtn() {
      this.isSelected = true;
      this.etcbtn = "";
    },
    checkETCError() {
      this.etcEmptyError = this.$t("package.error_etc");
    },
    checkPackageId() {
      this.to = "/raw-material-estimation/";
      if (this.package_id == "") {
        this.$swal("Please Choose a Package");
      } else {
        if (this.etcbtn == "ETC") {
          if (this.etc == "") {
            this.ischeckETCError = true;
            this.etcEmptyError = this.$t("package.error_etc");
            return;
          } else {
            localStorage.setItem("etc", this.etc);
            var option_data = JSON.parse(
              localStorage.getItem("option") || "[]"
            );

            for (let i = 0; i < option_data.length; i++) {
              var option_array = option_data[i];
              var res_option_type = Object.keys(option_array).toString();
              // console.log(res_option_type);
              if (res_option_type == "package") {
                option_data.pop(option_data[i]);
              }
            }

            var put_package = {
              package: this.package_id,
            };
            option_data.push(put_package);
            // Saving
            localStorage.setItem("option", JSON.stringify(option_data));

            localStorage.setItem("package_id", this.package_id);
            this.$router.push(this.to);
            this.etcEmptyError = "";
          }
        } else {
          var option_data = JSON.parse(localStorage.getItem("option") || "[]");

          for (let i = 0; i < option_data.length; i++) {
            var option_array = option_data[i];
            var res_option_type = Object.keys(option_array).toString();
            //console.log(res_option_type);
            if (res_option_type == "package") {
              option_data.pop(option_data[i]);
              // console.log("hello");
            }
          }

          var put_package = {
            package: this.package_id,
          };
          option_data.push(put_package);
          // Saving
          localStorage.setItem("option", JSON.stringify(option_data));

          localStorage.setItem("package_id", this.package_id);
          this.$router.push(this.to);
        }
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .btn-wrap {
    margin-top: 40px !important;
  }
}
</style>