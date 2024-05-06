<template>
  <div class="main-body">
    <div class="signUp-container">
      <div class="login-signup-wrap registration-completed">
        <div class="login-signup-inner">
          <div class="circle-tick">
            <img src="../../assets/icons/green-tick-circle.svg" alt="" />
          </div>
          <h2 class="text-center">{{ $t("common.title.completeRegistration") }}</h2>
          <div class="reg-desc">
            <p class="text-center">{{ $t("common.SubTitle.completeRegistrationMsg1") }}</p>
            <p class="text-center">
              {{ $t("common.SubTitle.completeRegistrationMsg2") }}
            </p>
          </div>
          <div class="btn-wrap flex dual-btn">
            <button class="btn-primary grey-btn-outline" @click="this.$router.push('/')">
              {{ $t("common.QuickLinks.home") }}
            </button>
            <button class="btn-primary grenn-btn2" @click="this.$router.push('/login')">
              {{ $t("common.title.login") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 
export default {
  name: "MemberRegistrationCompleted",
};
</script>