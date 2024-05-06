<template>
  <footer>
    <div class="footer-inner">
      <div class="footer-links">
        <div class="footer-container">
          <div class="footer-links-inner">
            <div class="link-left">
              <ul>
                <li>
                  <router-link to="/terms">{{ $t("footer.term") }}</router-link>
                </li>
                <li class="active">
                  <router-link to="/privacy">{{ $t("footer.privacy") }}</router-link>
                </li>
              </ul>
            </div>
            <div class="link-right">
              <div class="footer-dropdown">
                <div class="lang-dropdown">
                  <select v-model="$i18n.locale" class="select-dropdown">
                    <option v-for="lang in langs" :key="lang.code" :value="lang.code">
                      {{ lang.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-container">
        <div class="footer-address">
          <a class="footer-logo" href="">
            <img src="../assets/images/footer-logo.svg" alt="" />
          </a>
          <div class="address">
            <ul>
              <li>
                <span>{{ $t('footer.address.co_name') }}</span>
                <span class="onMobile">{{ $t('footer.address.ceo') }}</span>
              </li>
              <li class="offMobile">{{ $t('footer.address.ceo') }}</li>
              <li class='active'>{{ $t('footer.address.reg_no') }} </li>
            </ul>
            <ul>
              <li class='active active2'>{{ $t('footer.address.phone_no') }}<a class="phno"
                  href="tel:070-4306-5678">070-4306-5678</a></li>
              <li>{{ $t('footer.address.mail_order') }}</li>
            </ul>
            <p> {{ $t('footer.address.location') }} </p>
            <a href=''>{{ $t('footer.address.copyright') }}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>

export default {
  name: "Footer",
  data() {
    return {
      langs: [
        {
          code: "en",
          name: "English",
        },
        {
          code: "kr",
          name: "Korean",
        },
      ],
    };
  },
};
</script>