<template>
  <div class="main-body themeGreen">
    <div class="container-medium">
      <div class="recomanded-blending-details">
        <div class="blending-left">
          <swiper
            :spaceBetween="10"
            :modules="[Thumbs]"
            :thumbs="{ swiper: thumbsSwiper }"
            class="mySwiper"
            v-for="(items, index) of blending_data"
            :key="index"
          >
            <swiper-slide
              v-for="(item, index) of items.detail_image_path"
              :key="index"
            >
              <img
                :src="'http://api-nutrabbit-dev.dvconsulting.org/' + item"
                alt
              />
            </swiper-slide>
          </swiper>
          <swiper
            :spaceBetween="10"
            :slidesPerView="4"
            :freeMode="true"
            :modules="[Thumbs]"
            watch-slides-progress
            @swiper="setThumbsSwiper"
            class="mySwiper2"
            v-for="(items, index) of blending_data"
            :key="index"
          >
            <swiper-slide
              v-for="(item, index) of items.detail_image_path"
              :key="index"
            >
              <img
                :src="'http://api-nutrabbit-dev.dvconsulting.org/' + item"
                alt
              />
            </swiper-slide>
          </swiper>
        </div>
        <div
          class="blending-right"
          v-for="(item, index) of blending_data"
          :key="index"
        >
          <div class="right-heading">
            <i class="login-icon-green"></i>
            <h2>{{ item.name_ko }}</h2>
            <div class="blending-tag">
              <span
                v-for="(tag, index) in splitJoin(item.tags_ko)"
                :key="index"
                v-text="tag"
              ></span>
            </div>
          </div>
          <div class="product-details-wrap">
            <p>When your body and mind are healthy, work will work out well.
              We recommend a cool Buff to you who are tired of the stress of the office.
              These products, taking the form of familiar office supplies, will not magically blow away your worries at once, but will definitely help ease the burden on your body and mind.
              When your body and mind are healthy, work will work out well.
              We recommend a cool Buff to you who are tired of the stress of the office.
              These products, taking the form of familiar office supplies, will not magically blow away your worries at once, but will definitely help ease the burden on your body and mind.</p><!-- <ul>
              <li>
                <h2>Sub raw Material</h2>
                <p>{{ item.sub_raw_materials }}</p>
              </li>
              <li>
                <h2>efficacy</h2>
                <p>{{ item.efficiency_ko }}</p>
              </li>
              <li>
                <h2>Category Name</h2>
                <p>{{ item.category_name_ko }}</p>
              </li>
              <li>
                <h2>Material Name</h2>
                <p>{{ item.material_name_ko }}</p>
              </li>
              <li>
                <h2>Product Information</h2>
                <p>{{ item.description_ko }}</p>
              </li>
            </ul> -->
            <button
              @click="
                this.$router.push({
                  name: 'ChoiceRecommendedBlendingPackageSelection',
                  query: { blending_id: this.blending_id },
                })
              "
              class="btn-primary blue-btn-solid"
            >
              next
            </button>
          </div>
        </div>
        <div class="devider"><i class="icon-grey-star"></i></div>
        <div class="container-medium">
          <div class="sampleServices about-recom">
            <p class="title text-center samllTitle">nutri 3.3</p>
            <h4 class="title text-center">nutri 3.3 blending product</h4>
            <div class="nutri-dom-product blendedPro">
              <ul v-for="(item, index) of nutriList" :key="index">
                <!-- <ul> -->
                <li>
                  <div class="nutri-product-item">
                    <!-- <img class="nutri-pimg" src="http://api-nutrabbit-dev.dvconsulting.org//public/uploads/nutriBlending/e630093a-bdf7-4423-ab09-9ce463852dfc.jpg" alt=""> -->
                    <!-- <img class="nutri-pimg" :src="`https://backend.da-lab.io/${cardDetails.imageUrl}`" /> -->

                    <img class="nutri-pimg" :src="'http://api-nutrabbit-dev.dvconsulting.org' + item.detail_image_path" alt=""/>
                    <div class="tag-wrap">
                      <span>nutri 3.3</span>
                    </div>
                    <p>{{item.name_ko}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="nutriDetail">
        <img src="../../assets/images/nutri-info.jpg">
      </div>
    </div>
  </div>
</template>


<script>
import NutriService from "../../services/NutriService";
export default {
  name: "NutriDetail",
  components: {
    // Swiper,
    // SwiperSlide,
  },
  // setup() {
  //   const thumbsSwiper = ref(null);
  //   const setThumbsSwiper = (swiper) => {
  //     thumbsSwiper.value = swiper;
  //   };

  //   return {
  //     Thumbs,
  //     thumbsSwiper,
  //     setThumbsSwiper,
  //     FreeMode,
  //     Navigation,
  //   };
  // },
  data() {
    return {
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
      blending_id: null,
      blending_data: "",
      productDetails: [
        {
          title: "dark blend",
          tags: [
            {
              tag1: "Allergic",
              tag2: "Masks",
              tag3: "Disposable gloves",
              tag4: "Immunomodulators",
              tag5: "Vitamins",
              tag6: "Nasal drop",
            },
          ],
          innderData: [
            {
              title: "main ingredients",
              desc: "Description of the main ingredient",
            },
            {
              title: "auxiliary material",
              desc: "Description of auxiliary ingredients",
            },
            {
              title: "efficacy",
              desc: "Description of Efficacy",
            },
            {
              title: "appearance",
              desc: "Description of the features",
            },
            {
              title: "Product Information",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada tristique nisl turpis nisl placerat ac, diam felis.",
            },
          ],
        },
      ],
      silimarProduct: [
        {
          title: "similar products",
          productImg: [
            {
              img1: "../../../src/assets/images/suggested-product-img.png",
              img2: "../../../src/assets/images/suggested-product-img.png",
              img3: "../../../src/assets/images/suggested-product-img.png",
              img4: "../../../src/assets/images/suggested-product-img.png",
              img5: "../../../src/assets/images/suggested-product-img.png",
            },
          ],
        },
      ],
      lang:"",
      nutriList:[],
    };
  },

  created() {
    this.nutriService = new NutriService();
  },

  methods: {

    getNutriService() {
      this.nutriService
        .getNutriService(
          this.lang,
        )
        .then((res) => {
          if (res.status == 200) {
            console.log("res", res);
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
  }
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
  opacity: 0.4;
}

.mySwiper2 .swiper-slide-thumb-active {
  opacity: 1;
}
</style>