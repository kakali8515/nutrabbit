<template>
  <div class="main-body">
    <div class="container-medium">
      <div class="my-notice-wrap">
        <div class="my-notice-heading">
          <h2>{{ $t("customer.title.Notice") }}</h2>
        </div>
        <div v-for="(item, index) of noticeDetailsData" :key="index">
          <div class="notice-list noBorder notice-list-main">
            <ul>
              <li>
                <div class="item-left">
                  <span v-if="item.top10 == 1">{{
                      $t("customer.tag.Important")
                  }}</span>
                  <p>
                    {{ item.title }}
                  </p>
                </div>
                <div class="item-right">
                  <p>{{ dateformat(item.createdDate) }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="background">
            <img :src="imgBaseUrl + item.image_path" />
          </div>
          <div class="details">
            <!-- <p>
              {{ item.description }}
            </p> -->
            <div class="cont" v-html="item.description"></div>
          </div>
          <div class="btn flex justify-end">
            <button class="btn-small-solid grey-82" @click="this.$router.push('/notice')">
              {{ $t("onlyme.button.List") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { useRoute } from "vue-router";
import CustomerCenterService from "../../services/CustomerCenterService";

export default {
  inject: ["common"],
  name: "NoticeDetailPage",

  data() {
    return {
      noticeDetailsID: null,
      noticeDetailsData: [],
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
    };
  },
  created() {
    this.CustomerCenterService = new CustomerCenterService();
  },
  mounted() {
    this.NoticeDetails();
    this.dateformat();
  },
  // updated() {
  //   this.globalLocale = localStorage.getItem("selectedLang");
  //   console.log(this.globalLocale);
  // },
  watch: {
    'common.state.SelectedLang': function (newVal, oldVal) {
      if ((newVal == 'KO' && oldVal == 'EN') || (newVal == 'EN' && oldVal == 'KO')) {
        this.NoticeDetails();
        this.dateformat();
        console.log(this.common.state.SelectedLang)
      }
    },
  },
  methods: {
    NoticeDetails() {
      //let noticeListId = useRoute();
      this.noticeDetailsID = this.$route.params.id;
      this.CustomerCenterService.getNoticeDetails(this.noticeDetailsID).then(
        (res) => {
          if (res.status == 200) {
            console.log(res)
            this.noticeDetailsData = res.data.data;
          } else {
            console.log("error");
          }
        }
      );
    },
    dateformat(value) {
      if (value) {
        return moment(String(value)).format("YYYY.MM.DD");
      }
    },
  },
};
</script>

<style scoped>
.grey-82 {
  font-size: 18px;
  line-height: 22px;
}

.main-body .container-medium .my-notice-wrap .btn {
  margin-top: 0px;
}

.main-body .container-medium .my-notice-wrap .notice-list {
  border-bottom: 1px solid #E0E0E0;
}
</style>