<template>
  <div class="main-body themePurple recomanded-blending-with-heading">
    <div class="container-medium">
      <h2 class="mychoice-heading heading">{{ $t("header.myChoice") }}</h2>
      <div class="recomanded-blending-details">
        <div class="blending-left">
          <div v-if="raw_material_data">
            <swiper class="mySwiper">
              <swiper-slide>
                <img
                  v-if="active"
                  @mouseleave="mouseLeave"
                  :src="thumb_2nd_image"
                />
                <img :src="thumb_image" v-else @mouseover="mouseOver" alt />
              </swiper-slide>
            </swiper>
          </div>
          <swiper
            :spaceBetween="10"
            :slidesPerView="5"
            :freeMode="true"
            :modules="[Thumbs]"
            watch-slides-progress
            @swiper="setThumbsSwiper"
            class="mySwiper2"
            v-if="raw_material_image.length > 0"
          >
            <swiper-slide
              v-for="(item, index) of raw_material_image"
              :key="index"
            >
              <img :src="imgBaseUrl + item.image_path" alt="" />
            </swiper-slide>
          </swiper>
          <swiper class="mySwiper2" v-else>
              <swiper-slide>
                <img src="../../assets/images/sub_place.png"/>
              </swiper-slide>
            </swiper>

          <!-- <div v-else>
            <img src="../../assets/images/thumbnail_place.png" alt />
          </div> -->
        </div>
        <div
          class="blending-right"
          v-for="(item, index) of raw_material_data"
          :key="index"
        >
          <div class="right-heading">
            <i class="login-icon"></i>
            <h2>{{ item.material_name }}</h2>
            <div class="blending-tag" v-if="item.tag">
              <span
                v-for="(tag, index) in splitJoin(item.tag)"
                :key="index"
                v-text="tag"
              ></span>
            </div>
          </div>
          <div class="product-details-wrap">
            <ul>
              <!-- <li v-for="(desc, index) of item.innderData" :key="index">
                <h2>{{ desc.title }}</h2>
                <p>{{ desc.desc }}</p>
              </li> -->
              <li>
                <h2>{{ $t("myChoice.RawMaterial.detail.Standard") }}</h2>
                <p>{{ item.standard }}</p>
              </li>
              <li>
                <h2>{{ $t("myChoice.RawMaterial.detail.Appearance") }}</h2>
                <p>{{ item.material_description }}</p>
              </li>
              <li>
                <h2>
                  {{ $t("myChoice.RawMaterial.detail.Functionalcontent") }}
                </h2>
                <p>{{ item.material_function }}</p>
              </li>
              <li>
                <h2>{{ $t("myChoice.RawMaterial.detail.DailyIntake") }}</h2>
                <!-- <p>{{ item.daily_intake_amount }}</p> -->
                <div class="p-text" v-html="item.daily_intake_amount"/>
              </li>
              <li>
                <h2>{{ $t("myChoice.RawMaterial.detail.Precautions") }}</h2>
                <!-- <p>{{ item.material_prequotion }}</p> -->
                <div class="p-text" v-html="item.material_prequotion"/>
              </li>
              <li>
                <h2>{{ $t("myChoice.RawMaterial.detail.Etc") }}</h2>
                <!-- <p>{{ item.material_extra }}</p> -->
                <div class="p-text" v-html="item.material_extra"/>
              </li>
            </ul>
            <div class="blendBtnList">
              <button
                @click="addRawMaterial()"
                class="btn-primary purple-btn-outline"
              >
                {{ $t("button.add") }}
              </button>
              <button
                @click="gotoNextPage()"
                class="btn-primary blue-btn-solid"
              >
                {{ $t("button.next") }}
              </button>
            </div>
          </div>
          <div class="suggested-product">
            <h2>{{ $t("myChoice.RecommendedBlending.title") }}</h2>
            <ul class="smilar-product-img">
              <li v-for="(items, index) of blendingData" :key="index">
                <img
                  v-if="items.thumbnail_1_path"
                  class="link-img"
                  @click="
                    this.$router.push(
                      `/choice-recommended-blending-detailed-page/${items.id}`
                    )
                  "
                  :src="imgBaseUrl + items.thumbnail_1_path"
                  alt
                />
                <img
                  v-else
                  @click="
                    this.$router.push(
                      `/choice-recommended-blending-detailed-page/${items.id}`
                    )
                  "
                  class="link-img"
                  src="../../assets/images/similar_place.png"
                  alt
                />
              </li>
            </ul>
          </div>
          <div class="suggested-product">
            <h2>{{ $t("myChoice.RawMaterial.detail.Similar_Products") }}</h2>
            <div v-if="similar_product_img.length > 0">
              <ul class="smilar-product-img">
                <li v-for="(item, index) of similar_product_img" :key="index">
                  <img :src="imgBaseUrl + item.image_path" alt="" />
                </li>
              </ul>
            </div>
            <div v-else>
              <ul class="smilar-product-img">
                <li><img src="../../assets/images/similar_place.png" alt /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination } from "swiper";
import { ref } from "vue";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useRoute } from "vue-router";
import MyChoiceService from "../../services/MyChoiceService";
import thumbImage from "~@/assets/images/thumbnail_place.png";

export default {
  name: "MyChoiceRawMaterialDetailedPage",
  inject: ["common"],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };

    return {
      Thumbs,
      thumbsSwiper,
      setThumbsSwiper,
      FreeMode,
      Navigation,
    };
  },
  data() {
    return {
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
      raw_material_data: "",
      raw_material_id: "",
      raw_material_image: [],
      blendingData: "",
      item_exist: "",
      thumb_image: "",
      thumb_2nd_image: "",
      similar_product_img: [],
      active: false,
      placeholder_image: "../../src/assets/images/thumbnail_place.png",
      globalLocale: "",
      sub_category_id: "",
      imgUrl: thumbImage,
    };
  },
  created() {
    this.mychoiceService = new MyChoiceService();
  },
  mounted() {
    this.rawMaterialDetail();
    this.rawMaterialImage();
    setTimeout(() => {
      this.allBlendingData();
    }, 1000);
    localStorage.removeItem("option");
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.rawMaterialDetail();
      }
    },
  },
  methods: {
    mouseOver() {
      this.active = true;
    },
    mouseLeave() {
      this.active = false;
    },
    splitJoin(theText) {
      // console.log(theText.split(','))
      return theText.split(",");
    },
    gotoNextPage() {
      var option_data = JSON.parse(localStorage.getItem("option") || "[]");

      for (let i = 0; i < option_data.length; i++) {
        var option_array = option_data[i];
        var res_option_type = Object.keys(option_array).toString();
        //console.log(res_option_type);
        if (res_option_type == "raw_material") {
          option_data.pop(option_data[i]);
        }
      }

      var put_raw = {
        raw_material: localStorage.getItem("raw_material_id"),
      };
      option_data.push(put_raw);
      // Saving
      localStorage.setItem("option", JSON.stringify(option_data));

      this.$router.push("/ingredient-formulation/");
    },
    // rawmaterial details
    rawMaterialDetail() {
      this.raw_material_id = localStorage.getItem("raw_material_id");
      const setRawMaterialId = this.raw_material_id;
      this.mychoiceService
        .getRawMaterialDetail(setRawMaterialId)
        .then((res) => {
          // console.log(res.data.data[0].sub_category_id);
          if (res.data.status == 200) {
            this.raw_material_data = res.data.data;
            this.sub_category_id = res.data.data[0].sub_category_id;
            this.thumb_image = res.data.data[0].thumbnail_1
              ? this.imgBaseUrl + res.data.data[0].thumbnail_fst_path
              : this.imgUrl;
            this.thumb_2nd_image = res.data.data[0].thumbnail_2
              ? this.imgBaseUrl + res.data.data[0].thumbnail_scnd_path
              : this.imgUrl;
          } else {
            // this.$swal(res.data.message, "error");
            console.log(res.data.message);
          }
        });
    },
    rawMaterialImage() {
      this.mychoiceService
        .getRawMaterialImage(localStorage.getItem("raw_material_id"))
        .then((res) => {
          //console.log(res.data);
          if (res.data.status == 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].type == "similar_product_img") {
                this.similar_product_img.push(res.data.data[i]);
              } else {
                this.raw_material_image.push(res.data.data[i]);
              }
            }
          } else {
            // this.$swal(res.data.message, "error");
            console.log(res.data.message);
          }
        });
    },
    // allBlendingData list
    allBlendingData() {
      let limit = 5;
      let page = 1;
      const setSubCategory = this.sub_category_id;
      this.mychoiceService
        .getRawMaterialRecommendedData(localStorage.getItem("raw_material_id"), limit, page)
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
    addRawMaterial() {
      let uid = localStorage.getItem("uid");
      this.mychoiceService.getRawMaterialStorageBox(uid).then((res) => {
        //console.log(res);
        if (res.status == 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            if (
              localStorage.getItem("raw_material_id") == res.data.data[i].id
            ) {
              this.item_exist = "yes";
            }
          }
          if (this.item_exist == "yes") {
            // this.$swal("You have already added this item");
            this.$router.push("/add-ingredient");
          } else {
            this.mychoiceService
              .rawMaterialStorageBoxAdd(localStorage.getItem("raw_material_id"))
              .then((res) => {
                //console.log(res.data);
                if (res.data.status == 200) {
                  this.$router.push("/add-ingredient");
                } else {
                  // this.$swal(res.data.message, "error");
                  console.log(res.data.message);
                }
              });
          }
        } else {
          // this.$swal(res.message, "error");
          console.log(res.message);
        }
      });
    },
  },
};
</script>

<style scoped>
.mySwiper2 {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper2 .swiper-slide {
  width: 25%;
  height: 100%;
  /* opacity: 0.4; */
  margin-bottom: 10px;
}

.mySwiper2 .swiper-slide-thumb-active {
  opacity: 1;
}
.link-img {
  cursor: pointer;
}
.hover-image {
  position: absolute;
  top: 0;
  left: auto;
  z-index: 2;
}
.heading {
  font-weight: 700;
  font-size: 40px;
  line-height: 100%;
  color: #9642f4;
  padding-bottom: 36px;
}
@media screen and (max-width: 768px) {
  .heading {
    font-size: 30px;
    padding-bottom: 10px;
  }
}
</style>