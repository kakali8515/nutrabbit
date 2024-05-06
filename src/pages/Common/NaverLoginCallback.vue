<template>
  <div>

    <h>NaverLoginCallback</h>

  </div>
</template>

<script>
import naver from 'naver-id-login';
export default {
  name: 'NaverLoginCallback',

  mounted() {
    naver.handleTokenResponse();
    // console.log('NaverLoginCallback');
    // console.log(naver.getAccessToken());
  },

}
</script>
