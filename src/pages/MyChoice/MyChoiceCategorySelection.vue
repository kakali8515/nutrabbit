<template>
  <div class="main-body">
    <div class="container-medium">
      <div class="my-choce-wrap my-choice-selection">
        <div class="my-choice-heading">
          <h2>{{ $t("header.myChoice") }}</h2>
        </div>
        <div class="choice-selection-item-wrap">
          <div class="choice-selection-item recomanded-blending">
            <div class="heading-wrap">
              <div class="heading heading-blue">
                <h2>{{ $t("myChoice.RecommendedBlending.title") }}</h2>
                <div class="tolltip-outer">
                  <Popper>
                    <button>
                      <i class="icon-info"></i>
                    </button>
                    <template #content>
                      <div class="heading-tooltip-content">
                        <ul>
                          <li>
                            {{ $t("myChoice.RecommendedBlending.popup.list1") }}
                          </li>
                          <li>
                            {{ $t("myChoice.RecommendedBlending.popup.list2") }}
                          </li>
                          <li>
                            {{ $t("myChoice.RecommendedBlending.popup.list3") }}
                          </li>
                        </ul>
                      </div>
                    </template>
                  </Popper>
                </div>
              </div>
              <div class="heading-left">
                <router-link to="/my-choice-recomanded-blending">
                  <a href class="see-more">
                    <i class="icon-plus"></i
                    >{{ $t("myChoice.RecommendedBlending.more") }}
                  </a>
                </router-link>
              </div>
            </div>
            <ul class="recomanded-list">
              <li v-for="item in blendingData" :key="item">
                <SearchCard
                  :category="item.name"
                  :name="item.material_name"
                  :desc="item.description"
                  :image="item.thumbnail_1_path"
                  :image_hover="item.thumbnail_2_path"
                  :image_link="imgBaseUrl"
                  :route_link="
                    '/choice-recommended-blending-detailed-page/' + item.id
                  "
                  type2="recommended_data"
                />
              </li>
            </ul>
          </div>
          <div class="choice-selection-item raw-material">
            <div class="heading-wrap">
              <div class="heading">
                <h2 class="color-2.green-belt-inner">{{ $t("myChoice.RawMaterial.title") }}</h2>
                <div class="tolltip-outer">
                  <Popper>
                    <button>
                      <i class="icon-info"></i>
                    </button>
                    <template #content>
                      <div class="heading-tooltip-content">
                        <ul>
                          <li>{{ $t("myChoice.RawMaterial.popup.list1") }}</li>
                          <li>{{ $t("myChoice.RawMaterial.popup.list2") }}</li>
                        </ul>
                      </div>
                    </template>
                  </Popper>
                </div>
              </div>
              <div class="heading-left">
                <div class="dropdown">
                  <!-- <vue-select
                    :options="['in order of popularity', 'in order of popularity']"
                    placeholder="in order of popularity"
                    close-on-select
                  ></vue-select>-->
                  <select @change="sortingMethod($event)">
                    <option value="popularity">
                      {{ $t("myChoice.RawMaterial.popularity") }}
                    </option>
                    <option value="alphabetical">
                      {{ $t("myChoice.RawMaterial.alphabetical") }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <ul class="raw-material-list">
              <li v-for="data in rawMaterialData" :key="data">
                <div class="list-left">
                  <div class="img-wrap" @click="gotoNextPage(data.id)">
                    <div class="img-hover-hide">
                    <img
                      v-if="data.thumbnail_fst_path"
                      :src="imgBaseUrl + data.thumbnail_fst_path"
                      alt
                    />
                    <img
                      v-else
                      src="../../assets/images/raw_material_place.png"
                      alt
                    />
                    </div>
                    <div v-if="data.thumbnail_scnd_path" class="img-wrap-hover">
                      <img :src="imgBaseUrl + data.thumbnail_scnd_path" alt />
                    </div>
                    <div v-else class="img-wrap-hover">
                      <img
                        src="../../assets/images/raw_material_place.png"
                        alt
                      />
                    </div>
                  </div>
                  <div class="material-details">
                    <h2 @click="gotoNextPage(data.id)">
                      {{ data.material_name }}
                    </h2>
                    <div @click="gotoNextPage(data.id)" class="description">
                      <p>{{ data.material_description }}</p>
                    </div>
                  </div>
                </div>
                <div class="list-right">
                  <button @click="showDetails(data.id)" class="btn-small-solid">
                    {{ $t("button.add") }}
                  </button>
                </div>
                <my-modal-component v-show="showModal">
                  <ModalStorageBox
                    @close="closeModal"
                    :bodytext1="$t('myChoice.RawMaterial.modal.heading')"
                    :btnText1="$t('myChoice.RawMaterial.modal.btn1')"
                    :btnText2="$t('myChoice.RawMaterial.modal.btn2')"
                    :raw_material_id="raw_material_id"
                    :sub_category_id="this.sub_category_id"
                  />
                </my-modal-component>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

          

<script>
import Popper from "vue3-popper";
import SearchCard from "../../components/SearchCard.vue";
import VueNextSelect from "vue-next-select";
import MyChoiceService from "../../services/MyChoiceService";
import ModalStorageBox from "../../components/ModalStorageBox.vue";

export default {
  name: "MyChoiceCategorySelection",
  inject: ["common"],
  components: {
    Popper,
    SearchCard,
    ModalStorageBox,
    "vue-select": VueNextSelect,
  },
  data() {
    return {
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
      blendingData: [],
      rawMaterialData: [],
      sub_category_id: null,
      showModal: false,
      raw_material_id: null,
      key: null,
      globalLocale: "",
    };
  },
  created() {
    this.mychoiceService = new MyChoiceService();
  },
  // updated(){
  //   this.globalLocale = this.$i18n.locale;
  // },

  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.rawMaterial();
        this.allBlendingData();
      }
    },
  },

  mounted() {
    this.rawMaterial();
    this.allBlendingData();
    localStorage.removeItem("raw_material_id");
  },
  methods: {
    showDetails(id) {
      this.showModal = true;
      this.raw_material_id = id;
    },
    closeModal() {
      this.showModal = false;
    },
    gotoNextPage(raw_material_id) {
      localStorage.setItem("raw_material_id", raw_material_id);
      this.$router.push("/mychoice-rawMaterial-detailed-page/");
    },
    // rawMaterial list
    rawMaterial() {
      this.sub_category_id = localStorage.getItem("sub_category_id");
      const setSubCategory = this.sub_category_id;

      this.mychoiceService.getRawMaterial(setSubCategory).then((res) => {
        if (res.status == 200) {
          this.rawMaterialData = res.data.data.rawMaterialData;
        } else {
          // this.$swal(res.data.message, "error");
          console.log(res.data.message);
        }
      });
    },

    // allBlendingData list
    allBlendingData() {
      let limit = 4;
      let page = 1;
      this.sub_category_id = localStorage.getItem("sub_category_id");
      const setSubCategory = this.sub_category_id;
      this.mychoiceService
        .getRecommendedData(setSubCategory, limit, page)
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.blendingData = res.data.blendingData;
          } else {
            // this.$swal(res.data.message, "error");
            console.log(res.data.message);
          }
        });
    },

    sortingMethod(event) {
      this.key = event.target.value;
      if (this.key == "alphabetical") {
        this.mychoiceService
          .getRawMaterialAlphabetical(this.sub_category_id)
          .then((res) => {
            if (res.status == 200) {
              this.rawMaterialData = res.data.data.rawMaterialData;
            } else {
              // this.$swal(res.data.message, "error");
              console.log(res.data.message);
            }
          });
      } else {
        this.mychoiceService
          .getRawMaterialAlPopularity(this.sub_category_id)
          .then((res) => {
            if (res.status == 200) {
              this.rawMaterialData = res.data.data.rawMaterialData;
            } else {
              // this.$swal(res.data.message, "error");
              console.log(res.data.message);
            }
          });
      }
    },
  },
};
</script>


<style scoped>
</style>