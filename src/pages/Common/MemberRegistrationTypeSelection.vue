<template>
  <div class="main-body">
    <div class="container-small">
      <div class="login-signup-wrap membership-wrap">
        <div class="login-signup-inner">
          <div class="login-heading-wrap type-2">
            <h1 class="login-heading">{{$t('common.title.Membershiptype')}}</h1>
            <p class="membership-desc">{{$t('common.SubTitle.MemberType')}}</p>
          </div>

          <div class="membership-list-wrap">
            <ul class="membership-list-inner">
              <li
                class="membership-item"
                 @click="this.$router.push('/method-selection')"
              >
                <i class="icon-user"></i>
                <h2 class="list-heading">{{$t('common.title.PersonalMembership')}}</h2>
                <p class="list-desc">{{$t('common.SubTitle.PersonalMembership')}}</p>
              </li>
              <li class="membership-item" @click="this.$router.push('/membership-registration-business')">
                <i class="icon-building-symbol"></i>
                <h2 class="list-heading">{{$t('common.title.BusinessMembership')}}</h2>
                <p When class="list-desc">{{$t('common.SubTitle.BusinessMembership')}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 
export default {
  name: "MemberRegistrationTypeSelection",

  data() {
    return {
      active: false,
    };
  },
};
</script>


