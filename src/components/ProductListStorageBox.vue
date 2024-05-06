<template>
  <div class="product-item">
    <div class="radio-wrap">
      <label class="custom-radio">
        <input type="checkbox" :id="item.material_name" ref="checkbox" :value="item.id" v-if="allSelected==true" checked @click="getStorageBoxId" />
        <input type="checkbox" :id="item.material_name" ref="checkbox" :value="item.id" v-else @click="getStorageBoxId" />
        <span class="checkmark"></span>
      </label>
      <div class="img-wrap">
        <img v-if="item.image_path" v-bind:src="imgBaseUrl + item.image_path" alt="" />
         <img v-else src="../assets/images/package_place.png" alt />
      </div>
    </div>
    <div class="material-details" @click="gotoNextPage(item.id)">
      <h2>{{item.material_name}}</h2>
      <div class="description">
        <p>{{item.material_description}}</p>
        <!-- <p v-for="(description, ind) of item.desc" :key="ind">{{description}}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductListStorageBox",
  props:["item", "allSelected","unchecked"],
  data() {
    return {
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
    }
  },
  updated(){
   if(this.unchecked == true && this.allSelected==false){
        this.$refs.checkbox.checked = false;
      //  console.log(this.$refs.checkbox);
   }
  },
   methods: {
     getStorageBoxId(event) {

       if(this.$refs.checkbox.checked==false) {
         this.$emit('getUncheckedId',event.target.value);
       }
       else{
         this.$emit('storageBoxId',event.target.value);
       }
       
        // console.log(event.target.value);
     },
      gotoNextPage(raw_material_id) {

      localStorage.setItem('raw_material_id',raw_material_id);
      this.$router.push('/mychoice-rawMaterial-detailed-page/');

    },
   }
};
</script>