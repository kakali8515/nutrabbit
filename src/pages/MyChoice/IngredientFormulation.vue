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
            <li class="recomanded-status active">
              <div class="d-item">
                <span></span>
                <p>{{ $t("progress_bar.selection2") }}</p>
              </div>
            </li>
            <li class="recomanded-status">
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
                <h2>{{ $t("formulation.title") }}</h2>
                <div class="tolltip-outer">
                  <Popper>
                    <button>
                      <i class="icon-info"></i>
                    </button>
                    <template #content>
                      <div class="heading-tooltip-content">
                        <ul>
                          <li>{{ $t("formulation.popup.list1") }}</li>
                          <li>{{ $t("formulation.popup.list2") }}</li>
                        </ul>
                      </div>
                    </template>
                  </Popper>
                </div>
              </div>
            </div>
            <div class="product-list-wrap">
              <ul class="raw-material-list">
                <li
                  v-for="(item, index) of blendingFormulationData"
                  :key="index"
                >
                  <ProductList :item="item" @changeId="UpdatedId($event)" />
                </li>
              </ul>

              <div class="btn-wrap btn-wrap2">
                <button
                  v-if="storage_box"
                  @click="this.$router.push(`/add-ingredient/`)"
                  class="btn-small-solid grey"
                >
                  {{ $t("button.Previous") }}
                </button>
                <button
                  v-else
                  @click="
                    this.$router.push(`/mychoice-rawMaterial-detailed-page/`)
                  "
                  class="btn-small-solid grey"
                >
                  {{ $t("button.Previous") }}
                </button>

                <button
                  :class="!isSelected ? 'btn-disabled' : ''"
                  :disabled="!isSelected"
                  @click="checkPillId"
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
      blendingFormulationData: [],
      pill_id: "",
      isSelected: false,
      storage_box: localStorage.getItem("storage_box"),
      to: "",
      showModal2: false,
      globalLocale: "",
    };
  },
  created() {
    this.mychoiceService = new MyChoiceService();
  },
  beforeRouteLeave(to, from, next) {
    if (this.to) {
      next();
    } else {
      this.to = to;
      this.showModal2 = true;
    }
  },
  mounted() {
    this.blendingFormulation();
  },

  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.blendingFormulation();
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
    blendingFormulation() {
      this.mychoiceService.getBlendingFormulation().then((res) => {
        //  console.log(res);
        if (res.status == 200) {
          this.blendingFormulationData = res.data.pillData;
        } else {
          // this.$swal(res.message, "error");
          console.log(res.message);
        }
      });
    },
    UpdatedId(e) {
      this.pill_id = e;
      this.isSelected = true;
      //console.log(this.pill_id);
    },
    checkPillId() {
      this.to = "/raw-material-package/";
      // console.log(this.blending_id);
      if (this.pill_id == "") {
        this.$swal("Please Choose a Formulation");
      } else {
        var option_data = JSON.parse(localStorage.getItem("option") || "[]");

        for (let i = 0; i < option_data.length; i++) {
          var option_array = option_data[i];
          var res_option_type = Object.keys(option_array).toString();
          if (res_option_type == "pill") {
            option_data.pop(option_data[i]);
          }
        }

        var put_pill = {
          pill: this.pill_id,
        };
        option_data.push(put_pill);
        // Saving
        localStorage.setItem("option", JSON.stringify(option_data));

        localStorage.setItem("pill_id", this.pill_id);
        this.$router.push(this.to);
        //console.log("success");
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .heading-tooltip-content {
    max-width: 205px !important;
  }
  .popper{
    left: 85px !important;
  }
}
</style>