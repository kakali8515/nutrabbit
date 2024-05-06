<template>
  <div class="main-body themeGreen">
    <div class="container-medium">
      <div class="my-choce-wrap my-choice-selection package-list-section">
        <div class="my-choice-heading">
          <h2>{{ $t("onlyme.title.myRecipe") }}</h2>
          <!-- <p>{{globalLocale}}</p> -->
        </div>
        <div class="choice-selection-item-wrap recipeGap">
          <div class="choice-selection-item raw-material-product addWrap">
            <div class="heading-wrap">
              <div class="heading">
                <h2>{{ $t("onlyme.title.RecommendedBlending") }}</h2>
              </div>
            </div>
            <div
              class="product-list-wrap"
              v-if="recommendedBlendingData.length > 0"
            >
              <ul class="selectAllHeader">
                <li class="flex-justify-end">
                  <button
                    class="deleteBtn"
                    @click="deleteRecipeItemRecommended"
                  >
                    {{ $t("onlyme.button.DeleteSelection")
                    }}<i class="icon-menu-delete"></i>
                  </button>
                </li>
              </ul>
              <ul class="raw-material-list">
                <li
                  v-for="(item, index) of recommendedBlendingData"
                  :key="index"
                >
                  <ProductListRecipe
                    :item="item"
                    @changeId="getProductId"
                    type="recommended"
                    @type="getType"
                    :unchecked="unchecked"
                  />
                </li>
              </ul>
              <div class="btn-wrap flexEnd">
                <button
                  class="btn-small-solid blue"
                  @click="toNextRecommended"
                  :class="
                    type == 'radiochoice' || type == '' ? 'btn-disabled' : ''
                  "
                  :disabled="recommendedDisabled"
                >
                  {{ $t("onlyme.button.Next") }}
                </button>
              </div>
            </div>
            <div class="no-result-found text-center" v-else>
              <span>{{ $t("footer.no_result") }}</span>
            </div>
          </div>
        </div>
        <div class="choice-selection-item-wrap recipeGap">
          <div class="choice-selection-item raw-material-product addWrap">
            <div class="heading-wrap">
              <div class="heading">
                <h2>{{ $t("onlyme.title.MyChoice") }}</h2>
              </div>
            </div>
            <div class="product-list-wrap" v-if="myChoiceData.length > 0">
              <ul class="selectAllHeader">
                <li class="flex-justify-end">
                  <button class="deleteBtn" @click="deleteRecipeItemChoice">
                    {{ $t("onlyme.button.DeleteSelection")
                    }}<i class="icon-menu-delete"></i>
                  </button>
                </li>
              </ul>
              <ul class="raw-material-list">
                <li v-for="(item, index) of myChoiceData" :key="index">
                  <ProductListRecipe
                    :item="item"
                    @changeId="getProductId"
                    @type="getType"
                    type="choice"
                    :unchecked="unchecked"
                  />
                </li>
              </ul>
              <div class="btn-wrap flexEnd">
                <button
                  class="btn-small-solid blue"
                  :class="
                    type == 'radiorecommended' || type == ''
                      ? 'btn-disabled'
                      : ''
                  "
                  @click="toNextChoice"
                  :disabled="choiceDisabled"
                >
                  {{ $t("onlyme.button.Next") }}
                </button>
              </div>
            </div>
            <div class="no-result-found text-center" v-else>
              <span>{{ $t("footer.no_result") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-show="isRecommendedModalVisible"
      @close="closeModalRecommended"
      :bodytext1="$t('onlyme.modal.DeleteBodyText')"
      :btnText1="$t('onlyme.button.Cancel')"
      :btnText2="$t('onlyme.button.Confirm')"
      link="/my-recipe"
      @confirm="deleteRecipeRecommendedItem(product_id)"
    />
    <Modal
      v-show="isChoiceModalVisible"
      @close="closeModalChoice"
      :bodytext1="$t('onlyme.modal.DeleteBodyText')"
      :btnText1="$t('onlyme.button.Cancel')"
      :btnText2="$t('onlyme.button.Confirm')"
      link="/my-recipe"
      @confirm="deleteRecipeChoiceItem(product_id)"
    />
    <Modal
      v-show="isItemSelectedVisible"
      @close="closeModalDelete"
      :btnFull="true"
      :bodytext1="$t('onlyme.modal.SelectedBodyText')"
      link="/my-recipe"
      :btnText2="$t('onlyme.button.Confirm')"
    />
  </div>
</template>

          

<script>
import Popper from "vue3-popper";
import Button from "../../components/Button.vue";
import ProductListRecipe from "../../components/ProductListRecipe.vue";
import MyRecipeService from "../../services/MyRecipeService";
import Modal from "../../components/Modal.vue";

export default {
  inject: ["common"],
  name: "ChoiceRecommendedBlendingPackageSelection",
  components: {
    Popper,
    ProductListRecipe,
    Button,
    Modal,
  },

  data() {
    return {
      rwaMaterialData: [
        // {
        //   img: "../../../src/assets/images/pkgSelection.png",
        //   title: "Bottle",
        //   desc: [
        //     "Choose from a variety of sizes and shapes of bottles and caps.",
        //   ],
        // },
        // {
        //   img: "../../../src/assets/images/pkgSelection.png",
        //   title: "PTP",
        //   desc: [
        //     "It is hygienic and convenient.",
        //     "The packaging volume is slightly larger.",
        //   ],
        // },
      ],
      user_id: this.common.state.userId,
      product_id: "",
      //isNextDisable : true,
      recommendedBlendingData: [],
      myChoiceData: [],
      isRecommendedModalVisible: false,
      isChoiceModalVisible: false,
      isItemSelectedVisible: false,
      type: "",
      recommendedDisabled: true,
      choiceDisabled: true,
      unchecked: true,
      globalLocale: this.common.state.GlobalLocale,
    };
  },

  created() {
    this.myRecipe = new MyRecipeService();
    this.allRecommendedData();
    this.allChoiceData();
  },

  // updated() {
  //   this.globalLocale = localStorage.getItem("selectedLang");
  //   console.log(this.globalLocale);
  // },

  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.allRecommendedData();
        this.allChoiceData();
        console.log(this.common.state.SelectedLang);
      }
    },
  },

  // updated(){
  //   if(this.product_id != false){
  //     this.isNextDisable = false
  //   }
  // },

  methods: {
    getType(name) {
      this.type = name;
      if (name == "radiochoice") {
        this.choiceDisabled = false;
      } else {
        this.choiceDisabled = true;
      }

      if (name == "radiorecommended") {
        this.recommendedDisabled = false;
      } else {
        this.recommendedDisabled = true;
      }
      console.log(name);
    },

    getProductId(id) {
      this.product_id = id;
      console.log(this.product_id);
    },

    allRecommendedData() {
      this.myRecipe.getMyRecomendedBlendingData(this.user_id).then((res) => {
        if (res.status == 200) {
          this.recommendedBlendingData = res.data.recipeData;
          console.table(res.data.recipeData);
        } else {
          this.$swal(res.data.message, "error");
        }
      });
    },

    allChoiceData() {
      this.myRecipe.getMyChoiceData(this.user_id).then((res) => {
        //console.log(res)
        if (res.status == 200) {
          this.myChoiceData = res.data.recipeData;
          console.table(res.data.recipeData);
        } else {
          this.$swal(res.message, "error");
        }
      });
    },

    closeModalDelete() {
      this.isItemSelectedVisible = false;
    },

    deleteRecipeItemRecommended() {
      if (this.type !== "radiorecommended") {
        //this.$swal('Any one of the products needs to be selected')
        this.isItemSelectedVisible = true;
        return;
      }
      this.isRecommendedModalVisible = true;
    },

    deleteRecipeItemChoice() {
      if (this.type !== "radiochoice") {
        //this.$swal('Any one of the products needs to be selected')
        this.isItemSelectedVisible = true;
        return;
      }
      this.isChoiceModalVisible = true;
    },

    deleteRecipeRecommendedItem(id) {
      this.deleteRecipeItem(id, this.type);
    },

    deleteRecipeChoiceItem(id) {
      this.deleteRecipeItem(id, this.type);
    },

    closeModalRecommended() {
      this.isRecommendedModalVisible = false;
    },

    closeModalChoice() {
      this.isChoiceModalVisible = false;
    },

    deleteRecipeItem(id, type) {
      //console.log(`delete item product id : ${id}`)
      this.myRecipe.deleteRecipeData(id).then((res) => {
        if (res.status == 200) {
          //this.$swal(`Delete ${res.message}`)

          if (type == "radiorecommended") {
            this.allRecommendedData();
          }

          if (type == "radiochoice") {
            this.allChoiceData();
          }

          this.product_id = "";
          this.type = "";
          this.recommendedDisabled = true;
          this.choiceDisabled = true;
          this.unchecked = true;
        } else {
          //this.$swal(res.message, "error");
          console.log(res.message);
        }
      });
    },

    toNextRecommended() {
      this.$router.push({
        name: "MyRecipeDetails",
        params: { id: this.product_id, type: "recommended-blending" },
      });
    },

    toNextChoice() {
      // if (!this.product_id && this.type !== "radiochoice") {
      //   this.$swal("Any one of the products needs to be selected");
      //   return;
      // }
      this.$router.push({
        name: "MyRecipeDetails",
        params: { id: this.product_id, type: "my-choice" },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.addWrap {
  @media screen and (max-width: 640px) {
    padding: 30px 0;
    box-shadow: none;
  }
}
.deleteBtn{
  @media screen and (max-width: 640px) {
    margin: 0 !important;
  }
}
.recipeGap{
  @media screen and (max-width: 640px){
    margin-bottom: 40px !important;
  }
}
.raw-material-list{
  li{
    .my-choice-product-item{
      @media screen and (max-width: 640px) {
        padding: 30px 0 !important;
      }
    }
    &:first-child{
      .my-choice-product-item{
        @media screen and (max-width: 640px) {
          padding-top: 20px !important;
        }
      }
    }
  }
}
</style>