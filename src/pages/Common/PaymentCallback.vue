<template>
  <div>
    <h1>Payment Callback</h1>
  </div>
</template>

<script>
export default {
  name: 'PaymentCallback',
  data() {
    return {
      lastPath: null,
    }
  },
  // created() {
  //   this.lastPath = this.$router.options.history.state.back;
  // },
  mounted() {
    console.log('NaverLoginCallback');
    //   console.log('this.lastPath--', this.lastPath);
    //  alert('this.lastPath--'+ this.lastPath);
    this.payCallBack();
  },
  methods: {
    payCallBack() {
      console.log('payCallBack');
      var queryString = window.location.search;
      console.log('queryString', queryString);
      const urlParams = new URLSearchParams(queryString);
      var imp_success = urlParams.get('imp_success');
      console.log('imp_success', imp_success);
      if (imp_success === false) {
        // this.$emit('ImpSuccess', false);
        // this.$router.go(-1);

        this.$router.push({ name: "MyRecipe" });
        // setTimeout(() => {
        //   this.$router.go(-1);
        // }, 3000);
      } else {
        // this.$emit('ImpSuccess', true);
        // this.$router.go(-1);
        this.$router.push({ name: "MyApplicationDetails" });
        // setTimeout(() => {
        //   this.$router.go(-1);
        // }, 3000);
      }
    }
  }
}
</script>