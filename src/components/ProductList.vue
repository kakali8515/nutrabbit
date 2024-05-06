<template>
  <!-- <div class="product-item" :class="item.name_ko == 'ETC' ? 'with-input' : ''">
    <div class="radio-wrap">
      <label class="custom-radio">
        <input type="radio" name="radio" id="radio" :value="item.id" @click="getPackageId" />
        <span class="checkmark"></span>
      </label>
      <div class="img-wrap" v-if="item.name_ko != 'ETC' && item.name_ko != 'Unchecked'">
        <img v-bind:src="imgBaseUrl + item.image_path" alt />
      </div>
    </div>
    <div class="material-details">
      <h2>{{ item.name_ko }}</h2>
      <div v-if="item.name_ko != 'ETC' && item.name_ko != 'Unchecked'" class="description">
        <p>{{ item.description_ko }}</p>
      </div>
      <div v-if="item.name_ko == 'ETC'" class="input-group">
        <input type="text" @keyup="getEtc" placeholder="Etc input" />
      </div>
    </div>
  </div> -->
  <div class="product-item">
    <div class="radio-wrap">
      <label class="custom-radio custom-radio2">
        <input type="radio" name="radio" id="radio" :value="item.id" @click="getPackageId" />
        <span class="checkmark"></span>
      </label>
      <div class="img-wrap">
        <img v-if="item.image_path" :src="imgBaseUrl + item.image_path" alt />
        <img v-else src="../assets/images/package_place.png" alt />
      </div>
    </div>
    <div class="material-details ">
      <h2>{{ item.name }}</h2>
      <div class="description">
        <p>{{ item.description }}</p>
        <!-- <p v-for="(description, ind) of item.desc" :key="ind">{{description}}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: ["item"],
  data() {
    return {
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
    }

  },
  methods: {
    getPackageId(event) {
      this.$emit('changeId', event.target.value);
      this.$emit('etcChecked', '');
      // if (this.item.name_ko == 'ETC') {
      //   this.$emit('etcChecked', 'ETC');
      // }
      // else {
      //   this.$emit('etcChecked', '');
      // }
      //console.log(event.target.value)
    },
    // getEtc(event) {
    //   this.$emit('etcInput', event.target.value);
    //   //console.log(event.target.value)
    // }
  }
};
</script>