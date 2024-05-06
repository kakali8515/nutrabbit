<template>
  <div class="nutri-product-item">
    <div v-if="token" @click="this.$router.push(`/nutri-detail/${item.id}`)">
      <img v-if="item.thumbnail_path" class="nutri-pimg" :src="imgBaseUrl + item.thumbnail_path" alt="" />
      <img v-else class="nutri-pimg" src="../assets/images/content_place.png" alt />
    </div>
    <div v-else @click="accessPage()">
      <img v-if="item.thumbnail_path" class="nutri-pimg" :src="imgBaseUrl + item.thumbnail_path" alt="" />
      <img v-else class="nutri-pimg" src="../assets/images/content_place.png" alt />
    </div>
    <div class="tag-wrap">
      <span>{{ item.category_name }}</span>
    </div>
    <p v-if="token" @click="this.$router.push(`/nutri-detail/${item.id}`)" class="title">
      {{ item.name }}
    </p>
    <p v-else @click="accessPage()" class="title">{{ item.name }}</p>
  </div>
</template>

<script>
export default {
  name: "MainProductCard",
  props: ["item"],
  data() {
    return {
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    accessPage() {
      // this.$swal("Unauthorized Access.Please Login.");
      this.$emit('login')
      //this.$router.push('/login')
    },
  },
};
</script>