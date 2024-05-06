<template>
  <div class="main-body">
    <div class="container-medium">
      <div class="recomanded-blending-details">
        <div class="blending-left">
          <div v-if="blending_data">
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

            <swiper
              :spaceBetween="10"
              :slidesPerView="5"
              :freeMode="true"
              :modules="[Thumbs]"
              watch-slides-progress
              @swiper="setThumbsSwiper"
              class="mySwiper2"
              v-if="detail_image"
            >
              <template v-for="(item, index) of blending_image" :key="index">
                <swiper-slide v-if="item != '/uploads/blending/null'">
                  <img :src="imgBaseUrl + item" alt />
                  <!-- <img v-else src="../../assets/images/sub_place.png"/> -->
                </swiper-slide>
              </template>
            </swiper>
            <!-- <swiper class="mySwiper2" v-else>
              <swiper-slide>
                <img src="../../assets/images/sub_place.png"/>
              </swiper-slide>
            </swiper> -->
          </div>
        </div>
        <div
          class="blending-right"
          v-for="(item, index) of blending_data"
          :key="index"
        >
          <div class="right-heading">
            <i class="icon-star-blue"></i>
            <h2>{{ item.name }}</h2>
            <div class="blending-tag" v-if="item.tag">
              <span
                v-for="(tag, index) in splitJoin(item.tags)"
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
              </li>-->

              <li>
                <h2>
                  {{
                    $t("myChoice.RecommendedBlending.detail.main_raw_material")
                  }}
                </h2>
                <p>{{ item.material_name }}</p>
              </li>
              <li>
                <h2>
                  {{
                    $t("myChoice.RecommendedBlending.detail.Auxiliary_material")
                  }}
                </h2>
                <p>{{ item.sub_raw_materials }}</p>
              </li>
              <li>
                <h2>
                  {{ $t("myChoice.RecommendedBlending.detail.Efficacy") }}
                </h2>
                <p>{{ item.efficiency }}</p>
              </li>
              <li>
                <h2>
                  {{ $t("myChoice.RecommendedBlending.detail.Appearance") }}
                </h2>
                <p>{{ item.ingredients }}</p>
              </li>
              <li>
                <h2>
                  {{
                    $t(
                      "myChoice.RecommendedBlending.detail.Product_Information"
                    )
                  }}
                </h2>
                <!-- <p>{{ item.description }}</p> -->
                <div class="p-text" v-html="item.description"></div>
              </li>
            </ul>
            <button
              @click="
                this.$router.push({
                  name: 'ChoiceRecommendedBlendingPackageSelection',
                  query: { blending_id: this.blending_id },
                })
              "
              class="btn-primary blue-btn-solid"
            >
              {{ $t("button.next") }}
            </button>
          </div>
          <div class="suggested-product">
            <h2>
              {{ $t("myChoice.RecommendedBlending.detail.Similar_Products") }}
            </h2>
            <!-- <img src="../assets/images/suggested-product-img.png" alt="" /> -->
            <ul class="smilar-product-img" v-if="item.similar_image">
              <template
                v-for="(items, index) of item.similar_image_path"
                :key="index"
              >
                <li v-if="items != '/uploads/blending/null'">
                  <img :src="imgBaseUrl + items" alt />
                  <!-- <img v-else src="../../assets/images/sub_place.png"/> -->
                </li>
              </template>
            </ul>
            <!-- <ul class="smilar-product-img" v-else>
              <li>
                <img src="../../assets/images/similar_place.png" alt />
              </li>
            </ul> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { ref } from "vue";
// import "swiper/css/pagination";
// import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import MyChoiceService from "../../services/MyChoiceService";
import thumbImage from "~@/assets/images/thumbnail_place.png";

export default {
  name: "ChoiceRecommendedBlendingDetailedPage",
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
      blending_id: null,
      blending_data: "",
      blending_image: [],
      thumb_image: "",
      thumb_2nd_image: "",
      active: false,
      globalLocale: "",
      placeholder_image: "../../src/assets/images/thumbnail_place.png",
      detail_image: "",
      imgUrl: thumbImage,
    };
  },
  created() {
    this.mychoiceService = new MyChoiceService();
  },
  mounted() {
    this.blendingDetail();
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.blendingDetail();
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
    // blendingDetails
    blendingDetail() {
      this.blending_id = this.$route.params.id;
      const setBlendingId = this.blending_id;
      this.mychoiceService
        .getRecommendedBlendingDetail(setBlendingId)
        .then((res) => {
          // console.log(res.data.data);
          if (res.data.status == 200) {
            this.blending_data = res.data.data;
            this.blending_image = res.data.data[0].detail_image_path;
            this.detail_image = res.data.data[0].detail_image;

            this.thumb_image = res.data.data[0].thumbnail_1_path
              ? this.imgBaseUrl + res.data.data[0].thumbnail_1_path
              : this.imgUrl;

            this.thumb_2nd_image = res.data.data[0].thumbnail_2_path
              ? this.imgBaseUrl + res.data.data[0].thumbnail_2_path
              : this.imgUrl;
          } else {
            // this.$swal(res.data.message, "error");
            console.log(res.data.message);
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

.hover-image {
  position: absolute;
  top: 0;
  left: auto;
  z-index: 2;
}
</style>