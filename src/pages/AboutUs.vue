<template>
  <div class="main-page">
    <div class="aboutAddtionalText">
      <p v-html="$t('aboutus.aboutfirsttext.title')"></p>
    </div>
    <div class="main-slider">
      <div class="main-page-body">
        <div class="container-medium">
          <div class="nutri-choice theme-green about-us-wrap">
            <span class="my-choice-title-top">Nutri 3.3</span>
            <p class="title text-center">{{ $t("aboutus.title.title") }}</p>
            <h2 class="nutri-choice-heading text-center">
              nutri 3.3
            </h2>
          </div>
        </div>
        <div class="devider"><i class="icon-grey-star"></i></div>
        <div class="container-medium">
          <div class="sampleServices about-recom">
            <p class="title text-center samllTitle">nutri 3.3</p>
            <h4 class="title text-center">{{ $t("aboutus.recommended.title") }}</h4>
            <div class="recom-section">
             <div class="row-type ">
                  <div class="num">1</div>
                  <figure><img src="~@/assets/images/about1.png"></figure>
                  <div class="text-box"><p v-html="$t('aboutus.recommended.rule1')"></p></div>
                </div>
              <div class="row-type">
                <div class="num">2</div>
                <figure><img src="~@/assets/images/about2.png"></figure>
                <div class="text-box">
                  <!-- <p><span class="black-text">I need</span> <span class="green-text">professional support</span> because there are too many prohibitions
                    like pharmaceuticals, complicated approval process from public organization!</p> -->
                    <p v-html="$t('aboutus.recommended.rule2')"></p>
                </div>
              </div>
              <div class="row-type">
                <div class="num">3</div>
                <figure><img src="~@/assets/images/about3.png"></figure>
                <div class="text-box">
                  <!-- <p>I’m concerned about minimum
                    quantity and high cost.</p> -->
                    <p v-html="$t('aboutus.recommended.rule3')"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="green-belt">
          <div class="container-medium">
           <div class="green-belt-inner">
              <div class="green-belt-content">
                <h2>{{ $t("aboutus.recommended.subtitle") }}</h2>
              <!-- <p>{{ $t("aboutus.recommended.content1") }} <span>{{ $t("aboutus.recommended.content2") }}</span> </p> -->
              <p>{{ $t("aboutus.recommended.content1") }}</p>
              </div>
           </div>
          </div>
        </div>
        <div class="container-medium">
          <div class="nutri-choice theme-green">
            <span class="my-choice-title-top">Nutri 3.3</span>
            <p class="title text-center">{{ $t("aboutus.service.title") }}</p>
            <h2 class="nutri-choice-heading text-center nutri-choice-heading2">
              {{ $t("aboutus.service.subtitle") }}
            </h2>
          </div>
          <div class="about-servcie">
            <div class="row-type">
              <div class="num">
                1
              </div>
              <div class="desc">
                <h3>{{ $t("aboutus.service.rule1") }}</h3>
                <!-- <p>{{ $t("aboutus.service.rule1_content") }}</p> -->
                <p v-html="$t('aboutus.service.rule1_content')"></p>
              </div>
            </div>
            <div class="row-type">
              <div class="num num-type-2">
                2
              </div>
              <div class="desc">
                <h3>{{ $t("aboutus.service.rule2") }}</h3>
                <!-- <p>{{ $t("aboutus.service.rule2_content") }}</p> -->
                <p v-html="$t('aboutus.service.rule2_content')"></p>
              </div>
            </div>
            <div class="row-type">
              <div class="num">
                3
              </div>
              <div class="desc">
                <h3>{{ $t("aboutus.service.rule3") }}</h3>
                <!-- <p>{{ $t("aboutus.service.rule3_content") }}</p> -->
                <p v-html="$t('aboutus.service.rule3_content')"></p>
              </div>
            </div>
            <div class="row-type">
              <div class="num num-type-2">
                4
              </div>
              <div class="desc">
                <h3>{{ $t("aboutus.service.rule4") }}</h3>
                <!-- <p>{{ $t("aboutus.service.rule4_content") }}</p> -->
                <p v-html=" $t('aboutus.service.rule4_content')"></p>
              </div>
            </div>
            <div class="row-type">
              <div class="num">
                5
              </div>
              <div class="desc">
                <h3>{{ $t("aboutus.service.rule5") }}</h3>
                <!-- <p>{{ $t("aboutus.service.rule5_content") }}</p> -->
                <p v-html="$t('aboutus.service.rule5_content')"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "../components/Accordion.vue";
import KakaoChat from "../components/KakaoChat.vue";
export default {

  name: "Samplemaking",
  components: {
    Accordion
  },
  data() {
    return {
      processData: [
        {
          img: "~@/assets/images/step1.png",
          step: "Step 1",
          title: "sample application",
          desc: "my choice in nutri 3.3 After using the desired sample Request a sample production! Sample production costs $270 / Additional modifications are charged separately"
        },
        {
          img: "~@/assets/images/step2.png",
          step: "Step 2",
          title: "development meeting",
          desc: "Based on the sample service requested We check your requirements."
        },
        {
          img: "~@/assets/images/step3.png",
          step: "Step 3",
          title: "product development",
          desc: "based on the requested information Develop samples."
        },
        {
          img: "~@/assets/images/step4.png",
          step: "Step 4",
          title: "sample production",
          desc: "After product development Produce samples."
        },
        {
          img: "~@/assets/images/step5.png",
          step: "Step 5",
          title: "customer delivery",
          desc: "The finished sample is your It will be shipped to your address."
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  .nutri-choice-heading2{
    color: $black-18 !important; 
  }
</style>