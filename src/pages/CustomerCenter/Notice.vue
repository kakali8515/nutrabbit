<template>
  <div class="main-body">
    <div class="container-medium">
      <div class="my-notice-wrap">
        <div class="my-notice-heading">
          <h2>{{ $t("customer.title.Notice") }}</h2>
        </div>
        <div class="notice-heading">
          <p class="title">{{ $t("onlyme.title.Title") }}</p>
          <p class="date">{{ $t("customer.title.PublishedDate") }}</p>
        </div>
        <div class="notice-list bBtm-0 notice-list-main notice-diff-border">
          <ul>
            <li v-for="(item, index) of importantNoticeList" :key="index">
              <div
                class="item-left"
                @click="this.$router.push(`/notice-detail-page/${item.id}`)"
              >
                <span v-if="item.top10 == 1">{{
                  $t("customer.tag.Important")
                }}</span>
                <p>{{ item.title }}</p>
              </div>
              <div class="item-right">
                <p>{{ dateformat(item.createdDate) }}</p>
              </div>
            </li>
            <li v-for="(item, index) of unimportantNoticeList" :key="index">
              <div
                class="item-left"
                @click="this.$router.push(`/notice-detail-page/${item.id}`)"
              >
                <!-- <span v-if="item.top10 == 1">Important</span> -->
                <p>{{ item.title }}</p>
              </div>
              <div class="item-right">
                <p>{{ dateformat(item.createdDate) }}</p>
              </div>
            </li>
          </ul>
        </div>
        <template v-if="this.UpdatedNoticeList.length > 0">
          <pagination
            v-model="page"
            :records="totalItems"
            :options="chunkPage"
            :per-page="perPage"
            @paginate="myCallback"
          />
        </template>
        <!-- <Pagination /> -->
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import CustomerCenterService from "../../services/CustomerCenterService";

export default {
  name: "Notice",
  components: {
    // Pagination,
  },
  inject : ["common"],
  data() {
    return {
      NoticeList: [],
      UpdatedNoticeList: [],
      page: 1,
      perPage: 10,
      totalItems: 0,
      chunkPage: { chunk: 5 },
      globalLocale: "",
    };
  },
  created() {
    this.CustomerCenterService = new CustomerCenterService();
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
        this.allNoticeList();
        this.dateformat();
        console.log(this.common.state.SelectedLang);
      }
    },
  },
  mounted() {
    this.allNoticeList();
    this.dateformat();
  },

  computed: {
    importantNoticeList() {
      return Array.from(this.UpdatedNoticeList).filter((item) => {
        return item.top10 == 1;
      });
    },

    unimportantNoticeList() {
      return Array.from(this.UpdatedNoticeList).filter((item) => {
        return item.top10 == 0;
      });
    },
  },

  methods: {
    myCallback(ClickPage) {
      const startIndex = (ClickPage - 1) * this.perPage;
      // const endIndex = (this.perPage * ClickPage);
      const endIndex = startIndex + this.perPage;
      this.UpdatedNoticeList = this.NoticeList.slice(startIndex, endIndex);
    },
    allNoticeList() {
      this.CustomerCenterService.getNoticeList()
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data.data)
            this.NoticeList = res.data.data.notice;
            this.totalItems = res.data.data.total;
            this.myCallback(1);
          }
        })
        .catch((err) => {
          return;
        });
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
@media screen and (max-width: 768px) {
.notice-heading{
    display: none !important;
  }
}
.main-body .container-medium .my-notice-wrap .my-notice-heading{
  border-bottom: 0px;
  
}
</style>