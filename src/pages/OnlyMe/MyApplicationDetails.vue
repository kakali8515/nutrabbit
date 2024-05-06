<template>
  <div class="main-body themeGreen">
    <div class="container-medium">
      <div
        class="
          my-choce-wrap my-choice-selection
          package-list-section
          my-aplication-details
        "
      >
        <div class="my-choice-heading">
          <h2>{{ $t("onlyme.title.Application") }}</h2>
        </div>

        <div id="app">
          <ul class="overlay-panel-actions-primary">
            <li
              v-for="(tab, index) in tabsTrns"
              @click="currentTab = index"
              :class="{ active: currentTab === index }"
              :key="index"
            >
              {{ tab }}
            </li>
          </ul>
          <div class="content-bd">
            <div class="tab-content">
              <div v-show="currentTab === 0">
                <!-- <div class="choice-selection-item-wrap choice-wrap-border">
                  <div class="choice-selection-item raw-material-product">
                    <div class="heading-wrap">
                      <div class="heading">
                        <h2>{{ $t("onlyme.title.Nutri") }}</h2>
                      </div>
                    </div>
                    <div v-if="updateAppNutri_List.length > 0">
                      <div class="materialForm">
                        <div class="tableWrap">
                          <table>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>
                                  {{ $t("onlyme.tableCaption.Description") }}
                                </th>
                                <th>
                                  {{
                                    $t("onlyme.tableCaption.ApplicationDate")
                                  }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(item, index) of updateAppNutri_List"
                                :key="index"
                              >
                                <td>{{ perPage * (page1 - 1) + index + 1 }}</td>
                                <td
                                  @click="
                                    $router.push({
                                      name: 'MyRecipeDetailsSample',
                                      params: { id: item.id, type: 'nutri' },
                                    })
                                  "
                                >
                                  {{ item.explanation }}
                                </td>
                                <td>{{ dateformat(item.createdDate) }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <pagination
                        v-model="page1"
                        :records="appNutriTotal"
                        :options="chunkPage"
                        :per-page="perPage"
                        @paginate="myCallback1"
                      />
                    </div>
                    <div class="no-result-found" v-else>
                      <span>{{ $t("footer.no_result") }}</span>
                    </div>
                  </div>
                </div> -->
                <div class="choice-selection-item-wrap choice-wrap-border">
                  <div class="choice-selection-item raw-material-product">
                    <div class="heading-wrap">
                      <div class="heading">
                        <h2>{{ $t("onlyme.title.RecommendedBlending") }}</h2>
                      </div>
                    </div>
                    <div v-if="updateAppRecom_List.length > 0">
                      <div class="materialForm">
                        <div class="tableWrap">
                          <table>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>
                                  {{ $t("onlyme.tableCaption.Description") }}
                                </th>
                                <th>
                                  {{
                                    $t("onlyme.tableCaption.ApplicationDate")
                                  }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(item, index) of updateAppRecom_List"
                                :key="index"
                              >
                                <td>
                                  {{
                                    appRecommendedTotal -
                                    index -
                                    (page2 - 1) * perPage
                                  }}
                                </td>
                                <td
                                  class="applicationDesc"
                                  @click="
                                    $router.push({
                                      name: 'MyRecipeDetailsSample',
                                      params: {
                                        id: item.id,
                                        type: 'recommended',
                                      },
                                    })
                                  "
                                >
                                  {{ item.explanation }}
                                </td>
                                <td>{{ dateformat(item.createdDate) }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <pagination
                        v-model="page2"
                        :records="appRecommendedTotal"
                        :options="chunkPage"
                        :per-page="perPage"
                        @paginate="myCallback2"
                      />
                    </div>
                    <div class="no-result-found" v-else>
                      <span>{{ $t("footer.no_result") }}</span>
                    </div>
                  </div>
                </div>
                <div class="choice-selection-item-wrap choice-wrap-border">
                  <div class="choice-selection-item raw-material-product">
                    <div class="heading-wrap">
                      <div class="heading">
                        <h2>{{ $t("onlyme.title.MyChoice") }}</h2>
                      </div>
                    </div>
                    <div v-if="updateAppMychoiceList.length > 0">
                      <div class="materialForm">
                        <div class="tableWrap">
                          <table>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>
                                  {{ $t("onlyme.tableCaption.Description") }}
                                </th>
                                <th>
                                  {{
                                    $t("onlyme.tableCaption.ApplicationDate")
                                  }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(item, index) of updateAppMychoiceList"
                                :key="index"
                              >
                                <td>
                                  {{
                                    appMychoiceTotal -
                                    index -
                                    (page3 - 1) * perPage
                                  }}
                                </td>
                                <td
                                  class="applicationDesc"
                                  @click="
                                    $router.push({
                                      name: 'MyRecipeDetailsChoice',
                                      params: { id: item.id, type: 'choice' },
                                    })
                                  "
                                >
                                  {{ item.explanation }}
                                </td>
                                <td>{{ dateformat(item.createdDate) }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <pagination
                        v-model="page3"
                        :records="appMychoiceTotal"
                        :options="chunkPage"
                        :per-page="perPage"
                        @paginate="myCallback3"
                      />
                    </div>
                    <div class="no-result-found" v-else>
                      <span>{{ $t("footer.no_result") }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="currentTab === 1">
                <div class="choice-selection-item-wrap choice-wrap-border">
                  <div class="choice-selection-item raw-material-product">
                    <div class="heading-wrap">
                      <div class="heading">
                        <h2>{{ $t("onlyme.title.Nutri") }}</h2>
                      </div>
                    </div>
                    <div v-if="updateQuoteNutri_List.length > 0">
                      <div class="materialForm">
                        <div class="tableWrap">
                          <table>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>
                                  {{ $t("onlyme.tableCaption.Description") }}
                                </th>
                                <th>
                                  {{
                                    $t("onlyme.tableCaption.ApplicationDate")
                                  }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(item, index) of updateQuoteNutri_List"
                                :key="index"
                              >
                                <td>
                                  {{
                                    quoteNutriTotal -
                                    index -
                                    (page4 - 1) * perPage
                                  }}
                                </td>
                                <td
                                  class="applicationDesc"
                                  @click="
                                    $router.push({
                                      name: 'MyApplicationQuoteRequestBlending',
                                      params: { id: item.id, type: 'nutri' },
                                    })
                                  "
                                >
                                  {{ item.explanation }}
                                </td>
                                <td>{{ dateformat(item.createdDate) }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <pagination
                        v-model="page4"
                        :records="quoteNutriTotal"
                        :options="chunkPage"
                        :per-page="perPage"
                        @paginate="myCallback4"
                      />
                    </div>
                    <div class="no-result-found" v-else>
                      <span>{{ $t("footer.no_result") }}</span>
                    </div>
                  </div>
                </div>
                <div class="choice-selection-item-wrap choice-wrap-border">
                  <div class="choice-selection-item raw-material-product">
                    <div class="heading-wrap">
                      <div class="heading">
                        <h2>{{ $t("onlyme.title.RecommendedBlending") }}</h2>
                      </div>
                    </div>
                    <div v-if="updateQuoteRecom_List.length > 0">
                      <div class="materialForm">
                        <div class="tableWrap">
                          <table>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>
                                  {{ $t("onlyme.tableCaption.Description") }}
                                </th>
                                <th>
                                  {{
                                    $t("onlyme.tableCaption.ApplicationDate")
                                  }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(item, index) of updateQuoteRecom_List"
                                :key="index"
                              >
                                <td>
                                  {{
                                    quoteRecommendedTotal -
                                    index -
                                    (page5 - 1) * perPage
                                  }}
                                </td>
                                <td
                                  class="applicationDesc"
                                  @click="
                                    $router.push({
                                      name: 'MyApplicationQuoteRequestBlending',
                                      params: {
                                        id: item.id,
                                        type: 'recommended',
                                      },
                                    })
                                  "
                                >
                                  {{ item.explanation }}
                                </td>
                                <td>{{ dateformat(item.createdDate) }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <pagination
                        v-model="page5"
                        :records="quoteRecommendedTotal"
                        :options="chunkPage"
                        :per-page="perPage"
                        @paginate="myCallback5"
                      />
                    </div>
                    <div class="no-result-found" v-else>
                      <span>{{ $t("footer.no_result") }}</span>
                    </div>
                  </div>
                </div>
                <div class="choice-selection-item-wrap choice-wrap-border">
                  <div class="choice-selection-item raw-material-product">
                    <div class="heading-wrap">
                      <div class="heading">
                        <h2>{{ $t("onlyme.title.MyChoice") }}</h2>
                      </div>
                    </div>
                    <div v-if="updateQuoteMychoiceList.length > 0">
                      <div class="materialForm">
                        <div class="tableWrap">
                          <table>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>
                                  {{ $t("onlyme.tableCaption.Description") }}
                                </th>
                                <th>
                                  {{
                                    $t("onlyme.tableCaption.ApplicationDate")
                                  }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(item, index) of updateQuoteMychoiceList"
                                :key="index"
                              >
                                <td>
                                  {{
                                    quoteMychoiceTotal -
                                    index -
                                    (page6 - 1) * perPage
                                  }}
                                </td>
                                <td
                                  class="applicationDesc"
                                  @click="
                                    $router.push({
                                      name: 'MyApplicationQuoteRequestChoice',
                                      params: { id: item.id },
                                    })
                                  "
                                >
                                  {{ item.explanation }}
                                </td>
                                <td>{{ dateformat(item.createdDate) }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <pagination
                        v-model="page6"
                        :records="quoteMychoiceTotal"
                        :per-page="perPage"
                        :options="chunkPage"
                        @paginate="myCallback6"
                      />
                    </div>
                    <div class="no-result-found" v-else>
                      <span>{{ $t("footer.no_result") }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

          

<script>
// import Popper from "vue3-popper";
import ProductList from "../../components/ProductList.vue";
import MyApplicationDetails from "../../services/MyApplicationDetails";
import moment from "moment";
import { inject } from "vue";

export default {
  inject: ["common"],
  name: "MyRecipeDetails",
  components: {
    // Popper,
    ProductList,
  },
  // tab code
  el: "#app",
  data() {
    return {
      currentTab: 0,
      tabs: ["샘플 신청내역", "견적 신청내역"],
      appNutriList: [],
      appRecommendedList: [],
      appMychoiceList: [],

      application_type: "nutri_blending",
      application_type2: "recommended_blending",
      application_type3: "my_choice",

      QuoteNutri_List: [],
      QuoteRecommendedList: [],
      quotationList3: [],
      chunkPage: { chunk: 5 },

      userId: this.common.state.userId,
      lang: localStorage.getItem("selectedLang"),
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      page5: 1,
      page6: 1,
      perPage: 5,
      limit: "",
      sortBy: "",
      sortOrder: "",
      appMychoiceTotal: 0,
      appRecommendedTotal: 0,
      // appNutriTotal: 0,

      quoteMychoiceTotal: 0,
      quoteRecommendedTotal: 0,
      quoteNutriTotal: 0,

      updateAppMychoiceList: [],
      updateAppRecom_List: [],
      // updateAppNutri_List: [],

      updateQuoteMychoiceList: [],
      updateQuoteRecom_List: [],
      updateQuoteNutri_List: [],
      globalLocale: "",
    };
  },

  setup() {
    const common = inject("common");
    return { common };
  },

  computed: {
    tabsTrns() {
      return [
        this.$t("onlyme.title.SampleTab"),
        this.$t("onlyme.title.QuoteTab"),
      ];
    },
  },

  created() {
    this.myApplicationDetails = new MyApplicationDetails();
  },
  // updated() {
  //   this.globalLocale = localStorage.getItem("selectedLang");
  // },

  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.QuoteNutri();
        this.QuoteRecommended();
        this.QuoteMyChoice();

        // this.appNutri();
        this.appRecommended();
        this.appMychoice();
      }
    },
  },

  // watch: {
  //   globalLocale(newVal, oldVal) {
  //     if (
  //       (newVal == "KO" && oldVal == "EN") ||
  //       (newVal == "EN" && oldVal == "KO")
  //     ) {
  //       this.QuoteNutri();
  //       this.QuoteRecommended();
  //       this.QuoteMyChoice();

  //       // this.appNutri();
  //       this.appRecommended();
  //       this.appMychoice();
  //     }
  //   },
  // },
  methods: {
    // myCallback1(ClickPage) {
    //   const startIndex = (ClickPage - 1) * this.perPage;
    //   const endIndex = startIndex + this.perPage;
    //   this.updateAppNutri_List = this.appNutriList.slice(startIndex, endIndex);
    // },

    myCallback2(ClickPage) {
      const startIndex = (ClickPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      this.updateAppRecom_List = this.appRecommendedList.slice(
        startIndex,
        endIndex
      );
    },

    myCallback3(ClickPage) {
      const startIndex = (ClickPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      this.updateAppMychoiceList = this.appMychoiceList.slice(
        startIndex,
        endIndex
      );
    },

    myCallback4(ClickPage) {
      const startIndex = (ClickPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      this.updateQuoteNutri_List = this.QuoteNutri_List.slice(
        startIndex,
        endIndex
      );
    },

    myCallback5(ClickPage) {
      const startIndex = (ClickPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      this.updateQuoteRecom_List = this.QuoteRecommendedList.slice(
        startIndex,
        endIndex
      );
    },

    myCallback6(ClickPage) {
      const startIndex = (ClickPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      this.updateQuoteMychoiceList = this.QuoteMyChoice_List.slice(
        startIndex,
        endIndex
      );
    },

    // appNutri() {
    //   this.myApplicationDetails
    //     .appNutri(
    //       this.userId,
    //       this.application_type,
    //       this.page,
    //       this.limit,
    //       this.sortBy,
    //       this.sortOrder,
    //       this.lang
    //     )
    //     .then((res) => {
    //       if (res.status == 200) {
    //         // console.log("res", res);
    //         this.appNutriList = res.data.data.applicationData;
    //         this.appNutriTotal = res.data.data.total;
    //         // console.log("appNutriTotal", this.appNutriTotal);
    //         this.myCallback1(1);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },

    appRecommended() {
      this.myApplicationDetails
        .appRecommended(
          this.userId,
          this.application_type2,
          this.page,
          this.limit,
          this.sortBy,
          this.sortOrder,
          this.lang
        )
        .then((res) => {
          if (res.status == 200) {
            // console.log("res", res);
            this.appRecommendedList = res.data.data.applicationData;
            this.appRecommendedTotal = res.data.data.total;
            // console.log("appRecommendedTotal", this.appRecommendedTotal);
            this.myCallback2(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    appMychoice() {
      this.myApplicationDetails
        .appMychoice(
          this.userId,
          this.application_type3,
          this.page,
          this.limit,
          this.sortBy,
          this.sortOrder,
          this.lang
        )
        .then((res) => {
          if (res.status == 200) {
            // console.log("res", res);
            this.appMychoiceList = res.data.data.applicationData;
            this.appMychoiceTotal = res.data.data.total;
            // console.log("MyChoice", this.appMychoiceTotal);
            this.myCallback3(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    QuoteNutri() {
      this.myApplicationDetails
        .QuoteNutri(
          this.userId,
          this.application_type,
          this.page,
          this.limit,
          this.sortBy,
          this.sortOrder,
          this.lang
        )
        .then((res) => {
          if (res.status == 200) {
            // console.log("res", res);
            this.QuoteNutri_List = res.data.data.applicationData;
            this.quoteNutriTotal = res.data.data.total;
            // console.log("quoteNutriTotal", this.quoteNutriTotal);
            this.myCallback4(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    QuoteRecommended() {
      this.myApplicationDetails
        .QuoteRecommended(
          this.userId,
          this.application_type2,
          this.page,
          this.limit,
          this.sortBy,
          this.sortOrder,
          this.lang
        )
        .then((res) => {
          if (res.status == 200) {
            // console.log("res", res);
            this.QuoteRecommendedList = res.data.data.applicationData;
            this.quoteRecommendedTotal = res.data.data.total;
            // console.log("quoteRecommendedTotal", this.quoteRecommendedTotal);
            this.myCallback5(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    QuoteMyChoice() {
      this.myApplicationDetails
        .QuoteMyChoice(
          this.userId,
          this.application_type3,
          this.page,
          this.limit,
          this.sortBy,
          this.sortOrder,
          this.lang
        )
        .then((res) => {
          if (res.status == 200) {
            // console.log("res", res);
            this.QuoteMyChoice_List = res.data.data.applicationData;
            this.quoteMychoiceTotal = res.data.data.total;
            // console.log("quoteMychoiceTotal", this.quoteMychoiceTotal);
            this.myCallback6(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    dateformat(value) {
      if (value) {
        return moment(String(value)).format("YYYY.MM.DD");
      }
    },
  },

  mounted() {
    this.dateformat();
    this.QuoteNutri();
    this.QuoteRecommended();
    this.QuoteMyChoice();
    // this.appNutri();
    this.appRecommended();
    this.appMychoice();
  },
};
</script>