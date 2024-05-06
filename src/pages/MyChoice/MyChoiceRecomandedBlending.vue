<template>
  <div class="main-body">
    <div class="container-medium">
      <div class="my-choce-wrap my-choice-selection recomanded-blending-main">
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
                <div class="dropdown">
                  <!-- <vue-select
                    :options="['in order of popularity', 'in alphabetical Order']"
                    placeholder="in order of popularity"
                    close-on-select
                  ></vue-select>-->
                  <select @change="onChange">
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
            <ul class="recomanded-list">
              <li v-for="item in blendingData" :key="item">
                <SearchCard
                  type="recomandedBlending"
                  :category="item.name"
                  :name="item.material_name"
                  :desc="item.description"
                  :image="item.thumbnail_1_path"
                  :image_hover="item.thumbnail_2_path"
                  :image_link="imgBaseUrl"
                  :route_link="
                    '/choice-recommended-blending-detailed-page/' + item.id
                  "
                />
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

export default {
  name: "MyChoiceRecomandedBlending",
  inject: ["common"],
  components: {
    Popper,
    SearchCard,
    "vue-select": VueNextSelect,
  },
  data() {
    return {
      blendingData: [],
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
      globalLocale: "",
    };
  },
  created() {
    this.mychoiceService = new MyChoiceService();
  },
  mounted() {
    this.allBlendingData();
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
        this.allBlendingData();
      }
    },
  },
  methods: {
    // allBlendingData list
    allBlendingData() {
      this.sub_category_id = localStorage.getItem("sub_category_id");
      const setSubCategory = this.sub_category_id;
      this.mychoiceService.getRecommendedData(setSubCategory).then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.blendingData = res.data.blendingData;
        } else {
          // this.$swal(res.data.message, "error");
          console.log(res.data.message);
        }
      });
    },
    onChange(event) {
      this.sub_category_id = localStorage.getItem("sub_category_id");
      const setSubCategory = this.sub_category_id;
      // console.log(event.target.value);
      if (event.target.value == "popularity") {
        this.mychoiceService
          .getRecommendedBlendingPopularity(setSubCategory)
          .then((res) => {
            //  console.log(res.data);
            if (res.data.status == 200) {
              this.blendingData = res.data.data.blendingData;
            } else {
              // this.$swal(res.data.message, "error");
              console.log(res.data.message);
            }
          });
      } else if (event.target.value == "alphabetical") {
        this.mychoiceService
          .getRecommendedBlendingAlphabetical(setSubCategory)
          .then((res) => {
            // console.log(res.data);
            if (res.data.status == 200) {
              this.blendingData = res.data.data.blendingData;
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