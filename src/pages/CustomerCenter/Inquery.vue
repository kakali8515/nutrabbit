<template>
  <div class="main-body">
    <div class="container-medium">
      <div class="my-notice-wrap inquery-wrap">
        <div class="my-notice-heading noFlex">
          <h2>{{ $t("customer.title.Inquiry") }}</h2>
          <button
            class="btn-primary grenn-btn2"
            @click="this.$router.push('/inquiry-contactUs')"
          >
            {{ $t("customer.button.Inquiry") }}
          </button>
        </div>
        <div class="faq-heading inquiry">
          <p class="category">{{ $t("customer.title.PublishedDate") }}</p>
          <p class="status">{{ $t("customer.title.Status") }}</p>
          <p class="title">{{ $t("onlyme.title.Title") }}</p>
        </div>
        <FaqAccordion v-for="(item, index) in UpdatedEnqueryList" :key="index">
          <template v-slot:title>
            <div class="item-left">
              <div class="item-left-inner">
                <p class="para-category para-date">
                  {{ dateformat(item.createdDate) }}
                </p>
                <span
                  class="mr-2 ml-2"
                  :class="item.status == 'Unanswered' ? 'grey' : ''"
                  >{{ $t(item.status) }}</span
                >
              </div>
              <div class="item-right-inner">
                <p>{{ item.title }}</p>
              </div>
            </div>
          </template>
          <template v-slot:content>
            <div class="contWrap fullWidth">
              <div class="contCol">
                <h4>{{ $t("customer.tag.Attachment") }}</h4>
                <p class="ml-2">
                  <a
                    :href="
                      imgBaseUrl +
                      item.attachment_path
                    "
                    target="_blank"
                  >
                    {{ item.attachment }}
                  </a>
                </p>
              </div>
              <div class="contCol">
                <h4>{{ $t("customer.tag.Inquiries") }}</h4>
                <p class="ml-2">
                  {{ item.description }}
                </p>
              </div>
              <div
                class="contCol"
                :class="item.status == 'Answered' ? 'show' : 'hide'"
              >
                <h4>{{ $t("customer.tag.AnswerContent") }}</h4>
                <!-- <p class="ml-2">
                  {{ item.replyText }}
                </p> -->
                <div class="ml-2 fullWidth" v-html="item.replyText"></div>
              </div>
            </div>
          </template>
        </FaqAccordion>
        <template v-if="this.UpdatedEnqueryList.length > 0">
          <pagination
            v-model="page"
            :records="enqueryList.length"
            :options="chunkPage"
            :per-page="perPage"
            @paginate="myCallback"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import FaqAccordion from "../../components/FaqAccordion.vue";
import CustomerCenterService from "../../services/CustomerCenterService";

export default {
  name: "Inquery",
  components: {
    FaqAccordion,
  },
  inject: ["common"],
  data() {
    return {
      enqueryList: [],
      UpdatedEnqueryList: [],
      page: 1,
      perPage: 10,
      inqId: localStorage.getItem("uid"),
      chunkPage: { chunk: 5 },
      globalLocale: "",
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
    };
  },
  created() {
    this.CustomerCenterService = new CustomerCenterService();
  },

  // updated(){
  //   this.globalLocale = localStorage.getItem('selectedLang');
  //   console.log(this.globalLocale)
  // },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.allEnqueryList();
        this.dateformat();
        console.log(this.common.state.SelectedLang);
      }
    },
  },

  mounted() {
    this.allEnqueryList();
    this.dateformat();
  },
  methods: {
    myCallback(ClickPage) {
      const startIndex = (ClickPage - 1) * this.perPage;
      // const endIndex = (this.perPage * ClickPage);
      const endIndex = startIndex + this.perPage;
      this.UpdatedEnqueryList = this.enqueryList.slice(startIndex, endIndex);
    },
    allEnqueryList() {
      this.CustomerCenterService.getEnqueryList(this.inqId)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.enqueryList = res.data.data.inquery;
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
.inquery-wrap .grenn-btn2 {
  padding: 11px 30px;
}
@media screen and (max-width: 768px) {
  .notice-list .item-left span {
    font-size: 12px !important;
    line-height: 14px !important;
  }
  .notice-list .item-left p{
    line-height: 17px !important;
  }
}
</style>