<template>
  <div id="app-container">
    <!-- header -->
    <Header />
    <!--ENd header -->
    <router-view :key="$route.path" v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- Kakao Chat -->
    <!-- <KakaoChat /> -->
    <!-- Kakao Chat -->
    <!-- Footer -->
    <Footer />
    <!-- Footer -->
  </div>
</template>

<script>
// import { provide, inject } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
// import common from "./store/common";
// import KakaoChat from "./components/KakaoChat.vue";
import CommonService from "./services/CommonService";
export default {
  name: "App",
  inject: ["common"],
  components: {
    Header,
    Footer,
    // KakaoChat,
  },
  // setup() {
  //   provide("common", common);
  // },
  mounted() {
    this.commonService = new CommonService();
    this.getIp();
    window.Kakao.init("5d14c5e0ea3ead3c0683355cba9eda57");
    console.log(Kakao.isInitialized());
    window["sendPushNotificationData"] = (res) => {
      this.sendPushNotificationData(res);
    };
    window["backButtonHandeler"] = (res) => {
      this.isBackbuttonAction(res);
    };
  },
  methods: {
    sendPushNotificationData(res) {
      if (res) {
        alert("sendPushNotificationData");
        alert(JSON.stringify(res));
        console.log(res);
      } else {
        return false;
      }
    },
    isBackbuttonAction(res) {
      if (res) {
        const histroyCount = window.history.state.position;
        if (histroyCount < 2) {
          window.parent.postMessage("lastHistory", "*");
        } else {
          window.parent.postMessage("hasHistory", "*");
        }
      }
    },
    getIp() {
      console.log('getIP')
      this.commonService.getIpaddr().then((res) => {
        console.log('res', res.data.ipAddress)
        this.common.state.myIP = res.data.ipAddress;
        cookies.set('myIP', res.data.ipAddress);
        console.log('App--',this.common.state.myIP);
        // alert('Your IP : ' + res.data.ipAddress);
      });
    },
  },
};
</script>

<style lang="scss">
// route transition
.route-enter-from {
  opacity: 0;
  transform: translatey(50px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
