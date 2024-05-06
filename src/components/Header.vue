<template>
  <header :class="isHeaderPositionAbsolute ? 'main-page-header' : ''">
    <div class="header-container">
      <div class="header-menu flex">
        <div class="manuLeft">
          <!-- For mobile only start -->
          <router-link :class="isHeaderPositionAbsolute ? 'header-back-remove' : 'header-back'" to
            @click="$router.go(-1)">
            <img src="../assets/images/header-arrow.svg" alt="">
          </router-link>
          <!-- For mobile only end -->

          <router-link class="header-logo" to="/">
            <img src="../assets/images/logo.svg" alt="Logo" />
          </router-link>
          <ul class="flex">
            <li>
              <router-link v-if="token" to="/my-choice">{{
                $t("header.myChoice")
              }}</router-link>
              <router-link v-else @click="accessPage()" to="">{{
                $t("header.myChoice")
              }}</router-link>
            </li>
            <li>
              <router-link v-if="token" to="/service-intro">{{
                $t("header.nutri")
              }}</router-link>
              <router-link v-else @click="accessPage()" to="">{{
                $t("header.nutri")
              }}</router-link>
            </li>
          </ul>
        </div>
        <div class="manuRight">
          <div class="search-wrap-outer">
            <div class="search-wrap" :class="showMobSearch ? 'search-wrap-mob' : ''">
              <div class="input-group">
                <input type="text" :placeholder="$t('header.search')" @click="getHistory" v-model="sarchInput"
                  v-on:keyup.enter="getSearch" :disabled="token ? disabled : ''" />
                <router-link to @click="getSearch" :disabled="token ? disabled : ''">
                  <i class="icon-search-black"></i>
                </router-link>
              </div>
              <div class="header-search-data" :class="activeSearch ? 'activeSearch' : ''">
                <div class="search-data-inner" :class="showSearchpannel ? 'showSearchpannel' : ''">
                  <template v-if="searchData.length > 0">
                    <ul>
                      <li v-for="(item, index) in searchData" :key="index">
                        <router-link to class="search-title" @click="getSearchFromHistory(item.search_data)">{{
                          item.search_data
                        }}</router-link>
                        <router-link to class="search-item-close" @click="deleteHistory(item.id)">
                          <i class="icon-close-search"></i>
                        </router-link>
                      </li>
                    </ul>
                  </template>
                  <template v-else>
                    <div class="no-search-data">
                      <p>{{ $t("header.searchHistory") }}</p>
                    </div>
                  </template>
                </div>
                <div class="delete-close">
                  <router-link to @click="deleteAllHistory" v-if="searchData.length > 0" class="delete-history"
                    :class="showSearchpannel ? 'showDelete' : 'hideDelete'">
                    <i class="icon-delete"></i>{{ $t("header.delete") }}
                  </router-link>
                  <router-link to @click="toCloseBtn">{{
                    $t("header.close")
                  }}</router-link>
                </div>
              </div>
            </div>
            <router-link to class="mobile-search-icon" :class="showMobSearch ? 'icon-show' : ''" @click="showMobSearchF">
              <i class="search-icon-mob-black"></i>
            </router-link>
          </div>
          <template v-if="this.logedInUserDetails">
            <div class="after-login-dropdown flex items-center">
              <div class="dropdown">
                <button class="dropbtn">
                  <i class="login-icon"></i>
                  {{ userName }}
                </button>
                <div class="dropdown-content">
                  <router-link :to="personalInfoRouterLink" class-active="active">{{
                    $t("header.ChangePersonalInfo")
                  }}</router-link>
                  <router-link to @click="logOut()">{{
                    $t("header.logout")
                  }}</router-link>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link to="/login" class="login-item">{{
              $t("header.login")
            }}</router-link>
          </template>

          <div class="header-dropdown">
            <div class="lang-dropdown">
              <select v-model="$i18n.locale" class="select-dropdown">
                <option v-for="lang in langs" :key="lang.code" :value="lang.code">
                  {{ lang.name }}
                </option>
              </select>
            </div>
          </div>
          <router-link to class="menu-toggle" @click="sideMenuOpen">
            <img src="../assets/icons/menu-toggle.svg" alt />
          </router-link>
        </div>
      </div>
    </div>
  </header>
  <div class="right-menu-screen" :class="{ active: active }">
    <div class="right-small-box">
      <!-- <div class="black-box"></div> -->
      <div class="white-box" :class="{ active: active }">
        <div class="closeMenu" @click="active = !active">
          <router-link to>
            <img src="/src/assets/icons/menu-close.svg" />
          </router-link>
        </div>
        <ul class="right-menu-items">
          <li v-for="(item, index) of rightMenuItem" :key="index" @click="rightMenuData(index)"
            :class="activeSubmenu === index ? 'active-side-menu-heading' : ''">
            <div class="side-menu-heading">
              <div v-if="token && index == 0" class="after-login-wrap">
                <div class="after-login side-menu-web-login">
                  <router-link to :class="token ? 'login-item' : ''" @click="activeLogin = !activeLogin">{{ userName }}
                  </router-link>
                  <i class="icon-leftArw" @click="goChangePersonalInfo"></i>
                </div>
                <div class="side-menu-mob-login">
                  <div class="after-login">
                    <router-link to :class="token ? 'login-item' : ''" @click="activeLogin = !activeLogin">{{ userName
                    }}
                    </router-link>
                    <i class="icon-leftArw"></i>
                  </div>
                  <div class="side-menu-logout-mob" :class="{ activeLogin: activeLogin }">
                    <router-link :to="personalInfoRouterLink" @click="goPersonalInfoMob">{{
                      $t("header.ChangePersonalInfo")
                    }}</router-link>
                    <router-link to @click="logOut()">{{
                      $t("header.logout")
                    }}</router-link>
                  </div>
                </div>
              </div>
              <router-link to v-else @click="index == 0 ? goToLogin() : ''">
                {{ item.mainItem }}
              </router-link>
              <i class="icon-menu-downArw" :class="
                item.subItemData && item.subItemData.length ? '' : 'no-arrow'
              "></i>
            </div>
            <div class="side-menu-list" :class="activeSubmenu === index ? 'activeSubmenu' : ''">
              <router-link to @click="onClickLink(item.link)" v-for="(item, index2) of item.subItemData" :key="index2">
                {{ item.label }}</router-link>
            </div>
          </li>
        </ul>
        <ul class="side-menu-language">
          <li v-for="lang in langs.slice().reverse()" :key="lang.code" @click="changeLanguage(lang.code)">
            <router-link to>{{ lang.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Modal v-show="isModalVisible" @close="closeModal2" :bodytext1="$t('requireModal.text1')"
    :bodytext2="$t('requireModal.text2')" :btnText1="$t('requireModal.btn1')" :btnText2="$t('requireModal.btn2')"
    link="/login" />
  <Modal v-show="isLogOutModalVisible" @close="closeLogOutModal" @Confirm="logOutConfirm($event)"
    :bodytext1="$t('logoutModal.text')" :btnText1="$t('warningModal.btn1')" :btnText2="$t('warningModal.btn2')"
    link="/login" />
  <div :class="activeSearch ? 'overlay-click-out-side' : ''" @click="activeSearch = false"></div>
</template>

<script>
import VueNextSelect from "vue-next-select";
import { inject } from "vue";
import PersonalInfoService from "../services/PersonalInfoService";
import CommonService from "../services/CommonService";
import Modal from "./Modal.vue";
import naver from 'naver-id-login';
import axios from 'axios';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export default {
  name: "Header",
  components: {
    "vue-select": VueNextSelect,
    Modal,
  },
  inject: ["common"],
  data() {
    return {
      token: localStorage.token ? true : false,
      userId: this.common.state.userId,
      userDetails: "",
      userName: "",
      localuser: localStorage.getItem("uname")
        ? localStorage.getItem("uname")
        : "no-name",
      logedInUserDetails: false,
      active: false,
      activeSearch: false,
      isModalVisible: false,
      isLogOutModalVisible: false,
      activeSubmenu: false,
      showMobSearch: false,
      sarchInput: "",
      activeLogin: false,
      showSearchpannel: false,
      personalInfoRouterLink: "",
      searchData: [],
      searchDataInput: '',
      AllSearchId: [],
      langs: [
        {
          code: "en",
          name: "EN",
        },
        {
          code: "kr",
          name: "KO",
        },
      ],
      // SearchHistoryTitle: [],
      isPlatMobile: localStorage.getItem("isMobile") === "true",
      isAppaleId: localStorage.getItem("isiPhone") === "true",
    };
  },
  setup() {
    const common = inject("common");
    return { common };
  },
  created() {
    this.personalInfoService = new PersonalInfoService();
    this.commonService = new CommonService();
  },

  updated() {
    if (localStorage.token) {
      this.logedInUserDetails = true;
      this.token = localStorage.token ? true : false;
      this.userName = localStorage.getItem("uname");
      this.get;
    } else {
      this.logedInUserDetails = false;
    }
    if (localStorage.token) {
      if (localStorage.getItem("userType") == "business_member") {
        this.personalInfoRouterLink = "/personal-information-business";
      }
      if (localStorage.getItem("userType") == "personal_member") {
        this.personalInfoRouterLink = "/personal-information";
      }
    }
    if (this.$i18n.locale == "kr") {
      this.common.state.SelectedLang = "KO";
      localStorage.setItem("selectedLang", this.common.state.SelectedLang);

    }
    if (this.$i18n.locale == "en") {
      this.common.state.SelectedLang = "EN";
      localStorage.setItem("selectedLang", this.common.state.SelectedLang);

    }
  },

  mounted() {
    this.getUserInfo();
    this.getIp();
    this.changePersonalInfo();
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
    accessPage() {
      //this.$router.push('/login')
      //this.$swal("Unauthorized Access.Please Login.");
      this.isModalVisible = true;
    },
    rightMenuData(index) {
      this.activeSubmenu = this.activeSubmenu == index ? "" : index;
      if (index != 0) {
        this.activeLogin = false;
      }
    },
    changePersonalInfo() {
      if (localStorage.token) {
        if (localStorage.getItem("userType") == "business_member") {
          this.personalInfoRouterLink = "/personal-information-business";
        }
        if (localStorage.getItem("userType") == "personal_member") {
          this.personalInfoRouterLink = "/personal-information";
        }
      }
    },
    goChangePersonalInfo() {
      if (this.personalInfoRouterLink) {
        this.$router.push(this.personalInfoRouterLink);
        this.active = false;
      }
    },
    showMobSearchF() {
      this.showMobSearch = true;
      this.activeSearch = true;
      this.showSearchpannel = false;
    },
    toCloseBtn() {
      this.showMobSearch = false;
      this.activeSearch = false;
    },
    // logout
    logOut() {
      this.isLogOutModalVisible = true;
    },
    logOutConfirm(event) {
      console.log('event', event);
      if (event) {
        this.isLogOutModalVisible = false;
        if (this.logedInUserDetails) {
          this.kakaoLogout();
          this.naverLogout();
          localStorage.clear();
          // this.deleteAllCookies();
          // this.$router.push({ name: 'Login' });
          window.location.href = '/login';
          this.active = false;
          this.activeLogin = !this.activeLogin;
          this.token = false;
        }
      }
    },
    kakaoLogout() {
      // alert("kakaoLogout");
      if (!window.Kakao.Auth.getAccessToken()) {
        console.log('Not logged in.');
        return;
      }
      window.Kakao.Auth.logout(function () {
        console.log(Kakao.Auth.getAccessToken());
      });
    },
    async naverLogout() {
      // alert("naverLogout");
      const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
      const callbackUrl = import.meta.env.VITE_REDIRECT_URI + '/callback/naverlogin';
      await naver.logout(clientId, callbackUrl).then((res) => {
        console.log('testNaverLg---', res);
      });
    },
    deleteAllCookies() {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    },

    closeModal2() {
      this.isModalVisible = false;
    },

    closeLogOutModal() {
      this.isLogOutModalVisible = false;
    },
    goPersonalInfoMob() {
      this.active = false;
      this.activeLogin = false;
    },
    // side menu restriction before login
    onClickLink(link) {
      if (this.logedInUserDetails) {
        this.$router.push(link);
        this.active = false;
      } else if (link == "/about-us" || link == "/faq") {
        this.$router.push(link);
        this.active = false;
      } else {
        this.isModalVisible = true;
        this.active = false;
      }
    },
    goToLogin() {
      this.$router.push({ name: "Login" });
      this.active = false;
    },
    sideMenuOpen() {
      this.active = true;
    },
    // user details
    getUserInfo() {
      if (this.userId) {
        this.personalInfoService.getPersonalData(this.userId).then((res) => {
          this.userDetails = res.data.data[0];
          console.log('##Userdetails:---', this.userDetails);
        });
      }
    },
    // search API
    getIp() {
      // fetch("https://api.ipify.org?format=json")
      //   .then((res) => res.json())
      //   .then(({ ip }) => {
      //     this.common.state.myIP = ip;
      //   });

      console.log('getIP')
      this.commonService.getIpaddr().then((res) => {
        console.log('res', res.data.ipAddress)
        this.common.state.myIP = res.data.ipAddress;
        cookies.set('myIP', res.data.ipAddress);
        // alert('Your IP : ' + res.data.ipAddress);
      });
      // axios.get('https://freeipapi.com/api/json')
      //   .then((res) => {
      //     console.log('res', res.data.ipAddress)
      //     this.common.state.myIP = res.data.ipAddress;
      //   });
    },
    // search api (main)
    getSearch(e) {
      if (this.sarchInput == "") {
        return false;
        // this.$swal("Please add searchData");
        // console.log("Please add searchData");
      } else {
        this.common.state.searchKeyword = this.sarchInput;
        this.searchDataInput = e.target.value;
        e.target.value = "";
        this.showMobSearch = false;
        this.activeSearch = false;
        this.sarchInput = "";
        this.$router.push("/search-result");
      }
    },
    // get search history
    getHistory() {
      this.showSearchpannel = true;
      this.commonService
        .getSearchHistory(this.common.state.myIP, this.common.state.userId)
        .then((res) => {
          this.activeSearch = true;
          if (res.data.data.length > 0) {
            this.searchData = res.data.data;
          }
        })
        .catch((err) => {
          this.searchData = [];
          return false;
        });
    },
    // search with saerch history
    getSearchFromHistory(search_data) {
      this.common.state.searchKeyword = search_data;
      this.showMobSearch = false;
      this.activeSearch = false;
      this.sarchInput = "";
      this.$router.push("/search-result");
    },
    // delete single search history itema
    deleteHistory(searchId) {
      this.commonService.deleteSearchHistory(searchId).then((res) => {
        if (res.status == 200) {
          this.getHistory();
        }
      });
    },
    // delete all search history itema
    deleteAllHistory() {
      this.commonService
        .deleteAllHistory(this.common.state.myIP, this.common.state.userId)
        .then((res) => {
          this.getHistory();
        })
        .catch((err) => {
          return false;
        });
    },
  },
  computed: {
    rightMenuItem() {
      return [
        {
          mainItem: this.$t("common.title.login"),
        },
        {
          mainItem: "nutri 3.3",
          subItemData: [
            {
              label: this.$t("header.SideNav.AboutUs"),
              link: "/about-us",
            },
            {
              label: this.$t("header.SideNav.myChoice"),
              link: "/my-choice",
            },
            {
              label: this.$t("header.SideNav.nutriBlending"),
              link: "/service-intro",
            },
            {
              label: this.$t("header.SideNav.SampleMakingGuide"),
              link: "/sample-making",
            },
          ],
        },
        {
          mainItem: "ONLY ONE",
          subItemData: [
            {
              label: this.$t("header.SideNav.RawMaterialStorage"),
              link: "/add-ingredient",
            },
            {
              label: this.$t("header.SideNav.MyRecipe"),
              link: "/my-recipe",
            },
            {
              label: this.$t("header.SideNav.MyApplication"),
              link: "/my-application-detail",
            },
          ],
        },
        {
          mainItem: "CUSTOMER CENTER",
          subItemData: [
            {
              label: this.$t("header.SideNav.Notice"),
              link: "/notice",
            },
            {
              label: this.$t("header.SideNav.FAQ"),
              link: "/faq",
            },
            {
              label: this.$t("header.SideNav.Inquiry"),
              link: "/inquiry",
            },
          ],
        },
      ];
    },
    isHeaderPositionAbsolute() {
      return this.$route.name == "Main";
    },
    showHeader() {
      return this.$route.name != "mobile-search";
    },
  },
};
</script>
