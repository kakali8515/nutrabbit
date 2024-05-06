<template>
  <div class="search-card-inner" @click="this.$router.push(route_link)">
    <div class="img-wrapper-search">
      <img
        v-if="image"
        @mouseover="mouseOver"
        class="search-result-img"
        :src="image_link + image"
        alt
      />
      <img
        v-else
        @mouseover="mouseOver2"
        class="search-result-img"
        src="../assets/images/recommended_place.png"
        alt
      />

      <img
        class="search-result-img hover-image"
        v-if="active"
        @mouseleave="mouseLeave"
        :src="image_link + image_hover"
        alt
      />
      <img
        class="search-result-img hover-image"
        v-if="active2 && type2 != 'search'"
        @mouseleave="mouseLeave2"
        src="../assets/images/recommneded_hover_place.png"
        alt
      />
    </div>
    <p class="text-center">{{ category }}</p>
    <template v-if="type == 'recomandedBlending'">
      <router-link :to="route_link">
        <p class="recomanded-vitamin text-center">{{ name }}</p>
        <!-- <p class="recomanded-quality text-center">
          {{ desc.substring(0, 50) }}
        </p> -->
        <!-- <div class="recomanded-quality text-center" v-html="desc.substring(0, 50)"></div> -->
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  name: "SearchCard",
  props: [
    "image",
    "type",
    "category",
    "name",
    "desc",
    "image_link",
    "route_link",
    "image_hover",
    "type2",
  ],
  data() {
    return {
      active: false,
      active2: false,
    };
  },
  methods: {
    mouseOver() {
      this.active = true;
    },
    mouseLeave() {
      this.active = false;
    },
    mouseOver2() {
      this.active2 = true;
    },
    mouseLeave2() {
      this.active2 = false;
    },
  },
};
</script>

<style scoped>
.hover-image {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.search-card-inner {
  position: relative;
}
</style>