<template>
  <swiper
    :slidesPerView="1"
    :grid="{
      rows: 5,
      fill: 'row',
    }"
    :spaceBetween="20"
    :modules="modules"
    class="myclass"
  >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide><swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide><swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide><swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide><swiper-slide>Slide 9</swiper-slide>
    <swiper-slide>Slide 10</swiper-slide>
    <swiper-slide>Slide 11</swiper-slide><swiper-slide>Slide 12</swiper-slide>
    <swiper-slide>Slide 13</swiper-slide><swiper-slide>Slide 14</swiper-slide>
    <swiper-slide>Slide 15</swiper-slide><swiper-slide>Slide 16</swiper-slide>
    <swiper-slide>Slide 17</swiper-slide><swiper-slide>Slide 18</swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/grid";
import "swiper/css/pagination";

// import "./style.css";

// import required modules
import { Grid, Pagination } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Grid, Pagination],
    };
  },
};
</script>

<style scoped>
.myclass {
  display: grid;
  background-color: blue;
}
.swiper-wrapper {
  flex-direction: column !important; 
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: rgb(243, 126, 126);
  height: calc((100% - 30px) / 5) !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
