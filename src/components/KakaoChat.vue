<template>
  <div class="kakao-talk-chat" @click="chatWithKakao">
    <span class="round">
      <img src="../assets/images/chat-icon.svg" />
    </span>
  </div>
</template>
<script>
export default {
  name: "KakaoChat",
  methods: {
    chatWithKakao() {
      window.Kakao.init("5d14c5e0ea3ead3c0683355cba9eda57");
      console.log('Kakao.isInitialized()');
      window.Kakao.Channel.chat({
        channelPublicId: "_qaBKxb",
        success: function (result) {
          console.log('result', result);
        },
        fail: function (error) {
          console.log('error', error);
        }
      });
    },
  },
};
</script>