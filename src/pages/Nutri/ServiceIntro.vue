<template>
  <div class="main-page">
    <div class="main-slider">
      <div class="main-page-body">
        <div class="container-medium">
          <div class="nutri-choice theme-green servIntro">
            <span class="my-choice-title-top">nutri 3.3</span>
            <h2 class="nutri-choice-heading text-center mt-0">
              {{ $t("nutri.title.heading") }}
            </h2>
            <p class="title text-center sampleBLueAfter nutriBlend sample-diff">
              {{ $t("nutri.title.sub_heading") }}
            </p>
            <p
              class="text-center nutriBlend-para"
              v-html="$t('nutri.title.paragraph1')"
            ></p>
            <!-- {{ $t("nutri.title.paragraph1") }} <span>sadasdas</span> <br /> -->
            <!-- {{ $t("nutri.title.paragraph2") }} <span></span> -->
          </div>
        </div>
        <div class="devider"><i class="icon-grey-star"></i></div>
        <div class="container-medium">
          <div class="sampleServices sampleBlendSpecial about-recom pb-40">
            <p class="title text-center samllTitle">nutri 3.3</p>
            <h4 class="title text-center service-intro-title">
              {{ $t("nutri.title.heading2") }}
            </h4>
            <ul class="nutriBlending">
              <li>
                <img src="~@/assets/images/blending1.svg" />
                <span class="steps">Step.1</span>
                <p>{{ $t("nutri.title.desc1") }}</p>
              </li>
              <li>
                <img src="~@/assets/images/blending2.svg" />
                <span class="steps">Step.2</span>
                <p v-html="$t('nutri.title.desc2')"></p>
              </li>
              <li>
                <img src="~@/assets/images/blending3.svg" />
                <span class="steps">Step.3</span>
                <p v-html="$t('nutri.title.desc3')"></p>
                <!-- <p>{{ $t("nutri.title.desc3") }} <span></span></p> -->
              </li>
              <li>
                <img src="~@/assets/images/blending4.svg" />
                <span class="steps">Step.4</span>
                <p v-html="$t('nutri.title.desc4')"></p>
              </li>
            </ul>
          </div>
          <ul class="below-block pb-150">
            <li>{{ $t("nutri.title.nutri_list") }}</li>
            <li>{{ $t("nutri.title.nutri_list1") }}</li>
          </ul>
        </div>
        <div class="devider"><i class="icon-grey-star"></i></div>
        <div class="container-medium">
          <div class="sampleServices about-recom pb-70">
            <p class="title text-center samllTitle">nutri 3.3</p>
            <h4 class="title text-center mb-80 service-intro-title">
              {{ $t("nutri.title.blending") }}
            </h4>
            <div class="nutri-dom-product blendedPro">
              <ul>
                <li v-for="(item, index) of nutriList" :key="index">
                  <div class="nutri-product-item">
                    <div @click="this.$router.push(`/nutri-detail/${item.id}`)">
                      <img
                        v-if="item.thumbnail_path"
                        class="nutri-pimg"
                        :src="imgBaseUrl + item.thumbnail_path"
                        alt=""
                      />
                      <img
                        v-else
                        class="nutri-pimg"
                        src="../../assets/images/content_place.png"
                        alt=""
                      />
                    </div>
                    <div class="tag-wrap">
                      <span>{{ item.category_name }}</span>
                      <!-- <span>nutri 3.3</span> -->
                    </div>

                    <p @click="this.$router.push(`/nutri-detail/${item.id}`)">
                      {{ item.name }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NutriService from "../../services/NutriService";

export default {
  inject: ["common"],
  name: "ServiceIntro",
  data() {
    return {
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
      nutriList: [],
      lang: "",
      globalLocale: "",
    };
  },

  created() {
    this.nutriService = new NutriService();
  },

  updated() {
    this.globalLocale = localStorage.getItem("selectedLang");
    // console.log(this.globalLocale)
  },

  watch: {
    globalLocale(newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.getNutriService();
      }
    },
  },

  methods: {
    getNutriService() {
      this.nutriService
        .getNutriService(this.lang)
        .then((res) => {
          if (res.status == 200) {
            // console.log("res", res);
            this.nutriList = res.data.data.blendingData;
            console.log("nutriList", this.nutriList);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getNutriService();
  },
};
</script>

<style lang="scss" scoped>
.servIntro {
  .sampleBLueAfter {
    @media screen and (max-width: 640px) {
      &:after {
        background: url(@/assets/images/service-intro-mob.svg) no-repeat top
          left;
        left: -20px;
        top: -31px;
        height: 76px;
        width: 68px;
      }
    }
  }
}
.nutri-product-item .nutri-pimg,
.nutri-product-item p {
  cursor: pointer;
}
.mt-0 {
  margin-top: 0 !important;
}
.nutriBlend-para {
  font-weight: 400;
  font-size: 22px;
  line-height: 140%;
  color: $grey-4C;
  span {
    color: $green-68;
  }

  @media screen and (max-width: 768px) {
    font-size: 17px;
    line-height: 150%;
  }
}
.about-recom.sampleServices {
  h4 {
    margin-bottom: 40px;
    @media screen and (max-width: 768px) {
      font-size: 30px;
    }
  }
  .nutriBlending li {
    .steps{
      text-transform: uppercase;
    }
    p {
      color: $black-33;
      span {
        color: $green-68;
        margin: 0;
        border: 0px;
        padding: 0;
      }
    }
    img {
      @media screen and (max-width: 768px) {
        padding: 0 14px;
      }
    }
  }
}
.pb-40 {
  padding-bottom: 40px;
}
.block {
  display: block !important;
}
.pb-150 {
  padding-bottom: 150px;
  @media screen and (max-width: 768px) {
    padding-bottom: 75px;
  }
}
.pb-70 {
  padding-bottom: 70px;
}
.below-block {
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #a4a4a4;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
}
</style>