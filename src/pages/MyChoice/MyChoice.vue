<template>
  <div class="main-body">
    <div class="container-medium">
      <div class="my-choce-wrap">
        <div class="my-choice-heading">
          <h2>{{ $t("header.myChoice") }}</h2>
          <div class="tolltip-outer">
            <Popper>
              <button>
                <i class="icon-info"></i>
              </button>
              <template #content>
                <div class="heading-tooltip-content">
                  <ul>
                    <li>{{ $t("myChoice.popup.list1") }}</li>
                    <li>{{ $t("myChoice.popup.list2") }}</li>
                    <li>{{ $t("myChoice.popup.list3") }}</li>
                  </ul>
                </div>
              </template>
            </Popper>
          </div>
        </div>
        <div class="my-choice-list-wrap">
          <ul class="my-choice-list-outer">
            <li
              class="my-choice-list-outer-item"
              v-for="item in categories"
              :key="item"
            >
              <h2 class="list-heading">{{ item.category_name }}</h2>
              <ul class="my-choice-list-inner">
                <li
                  class="my-choice-list-inner-item"
                  v-for="(item, i) of item.sub_category_arr"
                  :key="i + 1"
                >
                  <div
                    class="choice-card"
                    @click="gotoNextPage(item.sub_category_id)"
                  >
                    <img
                      v-if="item.sub_category_image_path"
                      :src="imgBaseUrl + item.sub_category_image_path"
                      alt
                    />
                    <img
                      v-else
                      src="../../assets/images/my_choice_place.png"
                      alt
                    />
                  </div>
                  <p class="desc">{{ item.sub_category_name }}</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Popper from "vue3-popper";
import MyChoiceService from "../../services/MyChoiceService";

export default {
  name: "MyChoice",
  inject: ["common"],
  components: {
    Popper,
  },
  data() {
    return {
      categories: "",
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
      globalLocale: "",
    };
  },
  created() {
    this.mychoiceService = new MyChoiceService();
  },
  mounted() {
    this.allCategories();
    localStorage.removeItem("sub_category_id");
    localStorage.removeItem("raw_material_id");
    localStorage.removeItem("package_id");
    localStorage.removeItem("pill_id");
    localStorage.removeItem("option");
    localStorage.removeItem("etc");
    localStorage.removeItem("storage_box");
  },
  //  updated(){
  //     this.globalLocale = this.$i18n.locale;
  //   },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.allCategories();
      }
    },
  },

  methods: {
    gotoNextPage(sub_category_id) {
      localStorage.setItem("sub_category_id", sub_category_id);
      this.$router.push("/my-choice-category-selection/");
    },
    // allCategories list
    allCategories() {
      this.mychoiceService.getCategories().then((res) => {
        if (res.status == 200) {
          this.categories = res.data.parentCategoryData;
        } else {
          // this.$swal(res.message, "error");
          console.log(res.message);
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.tolltip-outer {
  .popper {
    @media screen and (max-width: 640px) {
      left: 70px !important;
    }
  }
  .heading-tooltip-content {
    @media screen and (max-width: 640px) {
      max-width: 207px !important;
    }
  }
}
</style>