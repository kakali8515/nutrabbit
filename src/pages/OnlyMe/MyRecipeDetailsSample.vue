<template>
  <div class="main-body themeGreen">
    <div class="container-medium">
      <div class="my-choce-wrap my-choice-selection package-list-section">
        <div class="my-choice-heading">
          <h2>{{ $t("onlyme.title.SampleTab") }}</h2>
        </div>
        <div class="choice-selection-item-wrap">
          <div class="choice-selection-item raw-material-product">
            <div class="heading-wrap">
              <div class="heading">
                <h2>{{ $t("onlyme.title.Options") }}</h2>
              </div>
            </div>
            <div class="materialForm">
              <div class="tableWrap">
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>{{ $t("onlyme.tableCaption.Category") }}</th>
                      <th>{{ $t("onlyme.tableCaption.Description") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr v-for="(item, index) of options" :key="index">
                        <td>{{ index +1 }}</td>
                        <td>{{ $t(item.category) }}</td>
                        <td>{{ $t(item.explanation) }}</td>
                    </tr> -->

                    <tr v-for="(option, index) in raw_mat" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ $t(option.category) }}</td>
                      <td>{{ $t(option.explanation) }}</td>
                    </tr>
                    <tr v-for="(option, index) in pill" :key="index">
                      <td>{{ raw_mat.length + 1 }}</td>
                      <td>{{ $t(option.category) }}</td>
                      <td>{{ $t(option.explanation) }}</td>
                    </tr>
                    <tr v-for="(option, index) in pack" :key="index">
                      <td>{{ raw_mat.length + pill.length + 1 }}</td>
                      <td>{{ $t(option.category) }}</td>
                      <td>{{ $t(option.explanation) }}</td>
                    </tr>


                  </tbody>
                </table>
              </div>
              <!-- <div class="fGroup">
                <label>{{$t("onlyme.title.Title")}}</label>
                <input type="text" name="" v-model="title" placeholder="My own recipe made with guar gum hydrolyzate">
              </div> -->
              <div class="fGroup">
                <label>{{ $t("onlyme.title.AdditionalRequest") }}</label>
                <div class="ansBlock">
                  <p>{{ additional_request }}</p>
                </div>
              </div>
              <div class="fGroup">
                <label>{{ $t("onlyme.title.Answer") }}</label>
                <div class="ansBlock">
                  <p>{{ answer_by_admin }}</p>
                </div>
              </div>
              <div class="product-list-wrap">
                <div class="btn-wrap flex-justify-end">
                  <button class="btn-small-solid grey" @click="$router.go(-1)">{{ $t("onlyme.button.Previous")
                  }}</button>
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
import { useRoute } from "vue-router";

export default {
  inject: ["common"],
  name: "MyRecipeDetails",
  components: {
    // Popper,
    ProductList,
  },
  data() {
    return {
      sampleBlendingDetailID: "",
      title: "",
      answer_by_admin: "",
      additional_request: "",
      options: [],
      raw_mat: [],
      pill: [],
      pack: [],
      application_type: "",
      titletrue: false,
      sampleDetailType: "",
      globalLocale: '',
    };
  },

  created() {
    this.myApplicationDetails = new MyApplicationDetails();
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
        this.sampleBlendingDetails();
      }
    },
  },

  methods: {

    sampleBlendingDetails() {
      this.sampleBlendingDetailID = this.$route.params.id;

      this.application_type = "recommended_blending"
      this.myApplicationDetails.sampleBlendingDetails(this.sampleBlendingDetailID, this.application_type)
        .then((res) => {
          if (res.status == 200) {
            console.log("res", res);
            this.title = res.data.data[0].title;
            this.answer_by_admin = res.data.data[0].answer_by_admin;
            this.additional_request = res.data.data[0].additional_request;
            this.options = [];
            this.raw_mat = [];
            this.pill = [];
            this.pack = [];
            Array.from(res.data.data[0].options).forEach((ele) => {
              let op_type = ele.split(':')[0];
              let op_val = ele.split(':')[1];
              // console.log("op_type", op_type);
              // console.log("op_val", op_val);

              this.myApplicationDetails.getsampleDetails(op_type, op_val).then(res => {
                if (res.status == 200) {
                  console.log("res----", res.data.data[0]);
                  // this.options.push(res.data.data[0]);

                  if (res.data.data[0].category == 'Ingredients') {
                    this.raw_mat.push({
                      category: res.data.data[0].category,
                      explanation: res.data.data[0].explanation,
                    })
                  }
                  else if (res.data.data[0].category == 'Formulation') {
                    this.pill.push({
                      category: res.data.data[0].category,
                      explanation: res.data.data[0].explanation,
                    })
                  }
                  else if (res.data.data[0].category == 'Package') {
                    this.pack.push({
                      category: res.data.data[0].category,
                      explanation: res.data.data[0].explanation,
                    })
                  }
                }
              })
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

  },

  mounted() {
    this.sampleBlendingDetails();
  }

};
</script>