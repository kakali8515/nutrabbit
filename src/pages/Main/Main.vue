<template>
  <div class="main-page">
    <div class="main-slider">
      <!-- slider for desktop -->
      <swiper :pagination="{
        type: 'fraction',
      }" :navigation="false" :modules="modules" :speed="1000" class="mySwiper mySwiperDesktop">
        <swiper-slide v-for="(slider, index) of MainSlider" :key="index">
          <a :href="slider.link" target="_blank">
            <template v-if="isFileImage(imgBaseUrl + slider.desktop_banner_path)">
              <img v-if="slider.desktop_banner_path" :src="imgBaseUrl + slider.desktop_banner_path" alt="" />
              <img v-else src="../../assets/images/banner_place.png" alt />
            </template>
            <template v-else-if="isFileVideo(imgBaseUrl + slider.desktop_banner_path)">
              <!-- <img v-if="slider.desktop_banner_path" :src="imgBaseUrl + slider.desktop_banner_path" alt="" /> -->
              <video autoplay muted playsinline loop>
                <source :src="imgBaseUrl + slider.desktop_banner_path" type="video/mp4">
                <source :src="imgBaseUrl + slider.desktop_banner_path" type="video/ogg">
                Your browser does not support the video tag.
              </video>
              <!-- <img src="../../assets/images/banner_place.png" alt /> -->
            </template>
            <img v-else src="../../assets/images/banner_place.png" alt />
            <!-- <p class="banner-title text-center">{{ slider.title }}</p> -->
          </a>
        </swiper-slide>
      </swiper>
      <!-- slider for mobile -->
      <swiper :pagination="{
        type: 'fraction',
      }" :navigation="false" :modules="modules" :speed="1000" class="mySwiper mySwiperMob">
        <swiper-slide v-for="(slider, index) of MainSlider" :key="index">
          <a :href="slider.link" target="_blank">
            <template v-if="isFileImage(imgBaseUrl + slider.mobile_banner_path)">
              <img v-if="slider.mobile_banner_path" :src="imgBaseUrl + slider.mobile_banner_path" alt="" />
              <img v-else src="../../assets/images/banner_place.png" alt />
            </template>
            <template v-else-if="isFileVideo(imgBaseUrl + slider.mobile_banner_path)">
              <!-- <img v-if="slider.mobile_banner_path" :src="imgBaseUrl + slider.mobile_banner_path" alt="" /> -->
              <video autoplay muted playsinline loop>
                <source :src="imgBaseUrl + slider.mobile_banner_path" type="video/mp4">
                <source :src="imgBaseUrl + slider.mobile_banner_path" type="video/ogg">
                Your browser does not support the video tag.
              </video>
              <!-- <img src="../../assets/images/banner_place.png" alt /> -->
            </template>
            <img v-else src="../../assets/images/banner_place.png" alt />
            <!-- <p class="banner-title text-center">{{ slider.title }}</p> -->
          </a>
        </swiper-slide>
      </swiper>
    </div>
    <div class="main-page-body">
      <div class="container-medium">
        <div class="nutri-choice with-img main_nutri">
          <!-- <h2>HI TEST TEXT ONLY</h2> -->
          <span class="my-choice-title-top">my choice</span>
          <p class="title text-center">my choice</p>
          <h2 class="nutri-choice-heading text-center main-page" v-html="$t('main.my_choice.title')"></h2>
          <p class="desc text-center main-page-desc" v-html="$t('main.my_choice.desc')"></p>
          <router-link to="/my-choice" v-if="token">
            <button class="btn-small-solid main-page-btn">
              {{ $t("main.my_choice.button") }}
            </button>
          </router-link>
          <router-link to="/" v-else @click="accessPage()">
            <button class="btn-small-solid main-page-btn">
              {{ $t("main.my_choice.button") }}
            </button>
          </router-link>
        </div>
        <!-- {{ 'ENV = ' +  process.env.VITE_SOME_KEY }} -->
      </div>
      <div class="devider">
        <i class="icon-grey-star"></i>
      </div>
      <div class="container-medium">
        <div class="nutri-blending">
          <div class="nutri-choice greenTItle main_nutri">
            <span class="my-choice-title-top">nutri 3.3</span>
            <p class="title text-center">{{ $t("main.nutri.heading") }}</p>
            <h2 class="nutri-choice-heading text-center main-page" v-html="$t('main.nutri.title')"></h2>
            <p class="desc text-center main-page-desc" v-html="$t('main.nutri.desc')"></p>
            <button @click="toNutri()" class="btn-small-solid green main-page-btn">
              {{ $t("main.nutri.button") }}
            </button>
            <!-- <button @click="allNutidata">jhbkjbjk</button> -->
          </div>
          <div class="nutri-dom-product">
            <ul>
              <li v-for="(item, index) of ProductData" :key="index">
                <MainProductCard :item="item" @login="accessPage" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal v-show="isModalVisible" @close="closeModal" :bodytext1="$t('requireModal.text1')"
    :bodytext2="$t('requireModal.text2')" :btnText1="$t('requireModal.btn1')" :btnText2="$t('requireModal.btn2')"
    link="/login" />
  <!-- <KakaoChat /> -->
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import MainProductCard from "../../components/MainProductCard.vue";
import { inject, onMounted, onUpdated } from "vue";
import MainService from "../../services/MainService";
import Button from "../../components/Button.vue";
import KakaoChat from "../../components/KakaoChat.vue";
import Modal from "../../components/Modal.vue";
import { useCookies } from "vue3-cookies";
export default {
  name: "Main",
  components: {
    Swiper,
    SwiperSlide,
    MainProductCard,
    Button,
    KakaoChat,
    Modal,
  },
  data() {
    return {
      MainSlider: [],
      ProductData: [],
      token: localStorage.getItem("token"),
      isMobile: false,
      isiPhone: false,
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
      isModalVisible: false,
      isPlatMobile: this.cookies.get("isMobile") === "true",
      isAppaleId: this.cookies.get("isiPhone") === "true",
    };
  },
  setup() {
    const { cookies } = useCookies();
    const common = inject("common");
    onMounted(() => {
      common.methods.isFromApp();
      // setTimeout(() => {
      //   alert('Test alert view');
      // }, 3000);
    });
    onUpdated(() => {
      common.methods.isFromApp();
    });
    return {
      modules: [Pagination, Navigation, Autoplay],
      common,
      cookies,
    };
  },
  created() {
    this.MainService = new MainService();

  },
  mounted() {
    this.allBanner();
    this.allNutidata();
    localStorage.removeItem("sub_category_id");
    localStorage.removeItem("raw_material_id");
    localStorage.removeItem("package_id");
    localStorage.removeItem("pill_id");
    localStorage.removeItem("option");
    localStorage.removeItem("etc");
    localStorage.removeItem("storage_box");
  },
  // updated() {
  //   alert('Platform: -' + this.isPlatMobile);
  //   alert('applePlatform: -' + this.isAppaleId);
  // },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.allNutidata();
      }
    },
  },

  methods: {
    // allBanner list
    allBanner() {
      this.MainService.getSlider().then((res) => {
        // console.log(res);
        if (res.status == 200) {
          console.log('getBanner res', res.data.bannerData);
          this.MainSlider = res.data.bannerData;
        } else {
          // this.$swal(res.message, "error");
          console.log(res.message);
        }
      });
    },
    // allNutidata list
    allNutidata() {
      this.MainService.getNutriData().then((res) => {
        //console.log(res);
        if (res.status == 200) {
          this.ProductData = res.data.blendingData;
          //console.log(res)
        } else {
          // console.log('getNutridata res', res.data.blendingData);
          // this.$swal(res.message, "error");
          console.log(res.message);
        }
      });
    },
    accessPage() {
      //this.$router.push('/login')
      //this.$swal("Unauthorized Access.Please Login.");
      this.isModalVisible = true;
    },

    toNutri() {
      if (this.token) {
        this.$router.push(`/service-intro`);
      } else {
        this.isModalVisible = true;
      }
    },

    closeModal() {
      this.isModalVisible = false;
    },

    isFileImage(fileUrl) {
      const images = ["jpg", "gif", "png"];
      const url = new URL(fileUrl);
      const extension = url.pathname.split(".")[1];
      return fileUrl && images.includes(extension)
    },
    isFileVideo(fileUrl) {
      const videos = ["mp4", "3gp", "ogg"];
      const url = new URL(fileUrl);
      const extension = url.pathname.split(".")[1];
      return fileUrl && videos.includes(extension)
    },

  },
};
</script>


<style lang="scss" scoped>
.main-slider video {
  width: 100%;
}
.icon-grey-star {
  @media screen and (max-width: 640px) {
    height: 10px !important;
    min-width: 10px !important;
    background-size: auto 10px !important;
  }
}

.nutri-choice-heading {
  @media screen and (max-width: 768px) {
    font-size: 24px !important;
  }
}

.nutri-choice {
  .title {
    @media screen and (max-width: 768px) {
      font-size: 16px !important;
      line-height: 19px !important;
    }
  }

  .nutri-choice-heading {
    @media screen and (max-width: 768px) {
      font-size: 24px !important;
    }
  }

  .desc {
    @media screen and (max-width: 768px) {
      font-size: 13px !important;
      line-height: 16px !important;
    }
  }

  button {
    @media screen and (max-width: 768px) {
      margin-top: 30px !important;
      font-size: 12px !important;
      line-height: 14px !important;
    }
  }
}
</style>