<template>
  <div class="main-body">
    <div class="container-medium">
      <div class="my-notice-wrap">
        <div class="my-notice-heading faq-diff-head">
          <h2>{{$t("customer.title.Faq")}}</h2>
        </div>
        <div class="faq-heading">
          <p class="category">{{$t("onlyme.tableCaption.Category")}}</p>
          <p class="title">{{$t("onlyme.title.Title")}}</p>
        </div>
        <FaqAccordion v-for="(item, index) of importantFaqList" :key="index">
          <template v-slot:title>
            <div class="item-left">
              <div class="item-left-inner">
                <p class="para-category">{{ item.category_name }}</p>
                <span v-if="item.top10 == y">{{$t("customer.tag.Important")}}</span>
              </div>
              <div class="item-right-inner">
                <p>{{ item.title }}</p>
              </div>
            </div>
          </template>
          <template v-slot:content>
            <h4>{{$t("customer.tag.Answred")}}</h4>
            <p>
              {{ item.description }}
            </p>
          </template>
        </FaqAccordion>

        <!-- unimportant FAQ List -->

        <FaqAccordion v-for="(item, index) of unimportantFaqList" :key="index">
          <template v-slot:title>
            <div class="item-left">
              <div class="item-left-inner">
                <p class="para-category">{{ item.category_name }}</p>
              </div>
              <div class="item-right-inner">
                <p>{{ item.title }}</p>
              </div>
            </div>
          </template>
          <template v-slot:content>
            <h4>{{$t("customer.tag.Answred")}}</h4>
            <p>
              {{ item.description }}
            </p>
          </template>
        </FaqAccordion>

        <!-- **************************************************************************************** -->

        <template v-if="this.updatedFaqList.length > 0">
          <pagination
            v-model="page"
            :records="FaqList.length"
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
import FaqAccordion from "../../components/FaqAccordion.vue";
import CustomerCenterService from "../../services/CustomerCenterService";
 
export default {
  name: "FAQ",
  components: {
    FaqAccordion,
  },
  inject : ["common"],
  data() {
    return {
      FaqList: [
        {
          categoryname: "all",
          tag: "important",
          title: "This is the FAQ title.",
          content:
            "1 ipsum dolor sit amet consectetur adipisicing elit. Quia,porro. Non a excepturi, voluptatibus ipsam magnam, eligendi,accusantium ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?",
        },
        {
          categoryname: "estimate",
          tag: "important",
          title: "This is the FAQ title.",
          content:
            "2 ipsum dolor sit amet consectetur adipisicing elit. Quia,porro. Non a excepturi, voluptatibus ipsam magnam, eligendi,accusantium ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?",
        },
        {
          categoryname: "Sample",
          tag: "important",
          title: "This is the FAQ title.",
          content:
            "3 ipsum dolor sit amet consectetur adipisicing elit. Quia,porro. Non a excepturi, voluptatibus ipsam magnam, eligendi,accusantium ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?",
        },
        {
          categoryname: "delivery",
          tag: "important",
          title: "This is the FAQ title.",
          content:
            "4 ipsum dolor sit amet consectetur adipisicing elit. Quia,porro. Non a excepturi, voluptatibus ipsam magnam, eligendi,accusantium ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?",
        },
        {
          categoryname: "payment",
          tag: "important",
          title: "This is the FAQ title.",
          content:
            "5 ipsum dolor sit amet consectetur adipisicing elit. Quia,porro. Non a excepturi, voluptatibus ipsam magnam, eligendi,accusantium ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?",
        },
        {
          categoryname: "service",
          tag: "important",
          title: "This is the FAQ title.",
          content:
            "6 ipsum dolor sit amet consectetur adipisicing elit. Quia,porro. Non a excepturi, voluptatibus ipsam magnam, eligendi,accusantium ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?",
        },
        {
          categoryname: "Etc",
          tag: "important",
          title: "This is the FAQ title.",
          content:
            "7 ipsum dolor sit amet consectetur adipisicing elit. Quia,porro. Non a excepturi, voluptatibus ipsam magnam, eligendi,accusantium ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?",
        },
        {
          categoryname: "service",
          title: "This is the FAQ title.",
          content:
            "8 ipsum dolor sit amet consectetur adipisicing elit. Quia,porro. Non a excepturi, voluptatibus ipsam magnam, eligendi,accusantium ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?",
        },
        {
          categoryname: "service",
          title: "This is the FAQ title.",
          content:
            "9 ipsum dolor sit amet consectetur adipisicing elit. Quia,porro. Non a excepturi, voluptatibus ipsam magnam, eligendi,accusantium ipsa quae quis praesentium voluptate saepe ullam sint ea itaque consectetur impedit?",
        },
        {
          categoryname: "service",
          title: "This is the FAQ title.",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare facilisi tempor rutrum blandit duis mauris egestas iaculis. Gravida eu nulla imperdiet turpis massa aliquam, vestibulum gravida tempor. Non fermentum malesuada sit amet vestibulum semper sem mollis. Magna pellentesque bibendum tellus est tortor, faucibus nibh sagittis. Nunc, scelerisque cras convallis duis orci ultrices nec amet eget. Gravida vestibulum, suspendisse eu ut. At at cursus faucibus ac risus mollis.",
        },
      ],
      FaqList: [],
      updatedFaqList: [],
      page: 1,
      perPage: 10,
      chunkPage: { chunk: 5 },
      globalLocale: "",
    };
  },

  computed: {
    importantFaqList() {
      return Array.from(this.updatedFaqList).filter((item) => {
        return item.top_10 == "y";
      });
    },

    unimportantFaqList() {
      return Array.from(this.updatedFaqList).filter((item) => {
        return item.top_10 != "y";
      });
    },
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
        this.allFaqList();
        console.log(this.common.state.SelectedLang);
      }
    },
  },
  mounted() {
    this.allFaqList();
  },

  methods: {
    myCallback(ClickPage) {
      const startIndex = (ClickPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      this.updatedFaqList = this.FaqList.slice(startIndex, endIndex);
    },
    allFaqList() {
      this.CustomerCenterService.getFAQList()

        .then((res) => {
          if (res.status == 200) {
            //console.log(res.data.data.faq)
            this.FaqList = res.data.data.faq;
            this.myCallback(1);
          }
        })
        .catch((err) => {
         return;
        });
    },
  },
};
</script>