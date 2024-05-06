<template>
  <div class="main-body themeGreen">
    <div class="container-medium">
      <div class="my-choce-wrap my-choice-selection package-list-section">
        <div class="my-choice-heading">
          <h2>{{$t("onlyme.title.QuoteTab")}}</h2>
        </div>
        <div class="choice-selection-item-wrap">
          <div class="choice-selection-item raw-material-product">
            <div class="heading-wrap">
              <div class="heading">
                <h2>{{$t("onlyme.title.Options")}}</h2>
              </div>
            </div>
            <div class="materialForm">
              <div class="tableWrap">
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>{{$t("onlyme.tableCaption.Category")}}</th>
                      <th>{{$t("onlyme.tableCaption.Description")}}</th>
                    </tr>
                  </thead>
                  <!-- <tbody
                    v-for="(option, index) in options"
                    :key="index"
                  >
                    <tr>
                      <td>{{ index + 1 }}</td>
                      <td>{{ $t(option.category)}}</td>
                      <td>{{ $t(option.explanation) }}</td>
                    </tr>
                  </tbody> -->
                   <tbody>
                    <tr v-for="(option, index) in raw_mat" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ $t(option.category)}}</td>
                      <td>{{ $t(option.explanation) }}</td>
                    </tr>
                    <tr v-for="(option, index) in pill" :key="index">
                      <td>{{ raw_mat.length + 1 }}</td>
                      <td>{{ $t(option.category)}}</td>
                      <td>{{ $t(option.explanation) }}</td>
                    </tr>
                    <tr v-for="(option, index) in pack" :key="index">
                      <td>{{ raw_mat.length + pill.length + 1  }}</td>
                      <td>{{ $t(option.category)}}</td>
                      <td>{{ $t(option.explanation) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="fGroup">
                <label>{{$t("onlyme.title.Title")}}</label>
                <input type="text" name="" v-model="title" disabled :placeholder="$t('onlyme.placeholder.title')">
              </div>
              <div class="fGroup">
                <label>{{$t('onlyme.title.AdditionalRequest')}}</label>
                <div class="ansBlock">
                  <p>{{ add_req }}</p>
                </div>
              </div>
              <div class="fGroup">
                <label>{{$t("onlyme.title.Answer")}}</label>
                <div class="ansBlock">
                  <!-- <p>{{ answer }}</p> -->
                  <div class="p-text" v-html="answer"></div>
                </div>
              </div>
              <div class="product-list-wrap">
                <div class="btn-wrap flex-justify-end">
                  <button class="btn-small-solid grey" @click="$router.push('/my-application-detail')">{{$t("onlyme.button.Previous")}}</button>
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
import MyApplicationService from "../../services/MyApplicationQuoteService";
 
export default {
  name: "MyApplicationQuoteRequestChoice",
 inject : ["common"],
  data() {
    return {
      options: [],
      raw_mat: [],
      pill: [],
      pack: [],
      title : "",
      add_req: "",
      answer: "",
      product_id: this.$route.params.id,
     globalLocale : '',
    };
  },

  created() {
    this.myApplication = new MyApplicationService();
    console.log(
      `product id is : ${this.product_id}`
    );
  },

  mounted() {
    this.getQuotionRequestDetails(this.product_id);
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
        this.getQuotionRequestDetails(this.product_id);
        console.log(this.common.state.SelectedLang);
      }
    },
  },

  methods: {
    getQuotionRequestDetails(_id) {
      this.myApplication.getApplicationChoiceDetails(_id).then(res=>{
                // console.log(res.data[0])
              if(res.status == 200){
                   this.add_req = res.data[0].additional_request;
                   this.title = res.data[0].title;
                   this.answer = res.data[0].answer_by_admin;
                  this.options = [];

                  this.raw_mat = [];
                  this.pill = [];
                  this.pack = [];

                  


                  // console.log('options---', res.data[0].options);

                   Array.from(res.data[0].options).forEach((ele)=>{
                     //console.log(Object.keys(ele)[0], Object.values(ele)[0])
                      let op_type = ele.split(':')[0];
                      let op_val = ele.split(':')[1];
                      // console.log(op_type, op_val)
                      this.myApplication.getOptionDetails(op_type, op_val).then(res =>{

                        // console.log('getOptionDetails---',res);

                        if(res.status == 200){
                          // console.log(res.data[0])
                            //  this.options.push( res.data[0] )
                            if(op_type == 'raw_material') {
                              this.raw_mat.push(res.data[0])
                            }
                            else if(op_type == 'pill') {
                              this.pill.push(res.data[0])
                            }
                            else if(op_type == 'package') {
                              this.pack.push(res.data[0])
                            }

                        }else{
                          // console.log(res.message)
                           //this.$swal(res.message)
                        }
                        
                      })
                   })
                  //  console.log('Raw--', this.raw_mat);
                  //  console.log('Pill--',this.pill);
                  //  console.log('Pack--',this.pack);
              }else{
                this.$swal(res.message)
              }
      })
    },
  },
};
</script>

<style>
</style>