<template>
  <div class="main-body terms-comp">
    <div class="container-medium">
      <div class="my-recipe-section">
        <template v-for="(item, index) of Terms" :key="index">
          <div class="heading">
            <h1>{{item.title}}</h1>
          </div>
          <div class="my-recipe-body" v-html="item.description"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import KakaoChat from "../components/KakaoChat.vue";
export default {
inject : ["common"],
  data() {
    return {
      terms: "terms",
      Terms: [],
    };
  },
  mounted() {
    this.getTerms();
  },

  watch : {
    'common.state.SelectedLang' : function(newVal, oldVal) {
      if((newVal == 'KO' && oldVal == 'EN') || (newVal == 'EN' && oldVal == 'KO')){
        this.getTerms();
        console.log(this.common.state.SelectedLang)
      }
    },
  },
  methods: {
    async getTerms() {
      try {
        const actualData = await axios.post("/cms", {key: this.terms, lang : localStorage.getItem('selectedLang')});
        console.log(actualData)
        this.Terms = actualData.data.data;
       } catch (error) {
        return;
      }
    },
  },
};
</script>

<style lang="scss">
.terms-comp{
  .my-recipe-section {
    .heading {
      h1{
        font-size: 30px;
      }
    }
  }
.row-type {
  margin-bottom: 30px;
  h3 {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 150%;
    color: #666666;
    margin-bottom: 5px;
  }
  p,
  ul li,
  ol li {
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    color: #666666;
  }
  &.type-2 {
    ul {
      padding-left: 35px;
    }
  }
}
.pad-bottom-15 {
  padding-bottom: 15px;
}
.my-recipe-body {
  padding-bottom: 50px;
  margin-top: 40px !important;
  ol {
    list-style-type: auto;
    padding-left: 20px;
  }
  ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  h2 {
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    color: #333333;
    margin-bottom: 30px;
  }
}
}
</style>