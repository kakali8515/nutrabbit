<template>
  <div class="main-body privecy-comp">
    <div class="container-medium">
      <div class="my-recipe-section">
        <template v-for="(item, index) of Privecy" :key="index">
          <div class="heading">
            <h1>{{ item.title }}</h1>
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
  name: "Privacy",
  data() {
    return {
      privacy: "privacy",
      Privecy: [],
      
    };
  },
  mounted() {
    this.getPrivecy();
  },

  watch : {
    'common.state.SelectedLang' : function(newVal, oldVal) {
      if((newVal == 'KO' && oldVal == 'EN') || (newVal == 'EN' && oldVal == 'KO')){
        this.getPrivecy();
      }
    },
  },
  methods: {
    async getPrivecy() {
      try {
        const actualData = await axios.post("/cms", { key: this.privacy, lang : localStorage.getItem('selectedLang') });
        this.Privecy = actualData.data.data;
      } catch (error) {
        return;
      }
    },
  },
};
</script>

<style lang="scss">
.privecy-comp {
  .my-recipe-section {
    .heading {
      h1 {
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
    p {
      padding-bottom: 5px;
    }
    p,
    ul li,
    ol li {
      font-weight: 500;
      font-size: 12px;
      line-height: 150%;
      color: #666666;
    }
    &.type-1 {
      table {
        width: 100%;
        border: 1px solid $grey-CF;
        background: #fafafa;
        tr {
          border-bottom: 1px solid #ccc;
          font-weight: 500;
          color: #828282;
          text-align: left;
          th,
          td {
            padding: 10px;
            font-size: 12px;
            line-height: 14px;
            border-right: 1px solid #ccc;
            &:last-child {
              border-right: 0px;
            }
          }
          th {
            color: #666666;
            font-weight: 400;
          }
        }
      }
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
  