<template>
  <div class="product-item my-choice-product-item">
    <div class="radio-wrap">
      <label class="custom-radio">
        <input type="radio" name="radio" ref="radio" :id="'radio-'+ item.id" :value="item.id" @click="getPackageId" :data-type="'radio'+ type" />
        <span class="checkmark"></span>
      </label>
      <div class="img-wrap">
        <img v-if="item.thumbnail_image_path[0]" v-bind:src="imgBaseUrl + item.thumbnail_image_path[0]" v-bind:alt="item.title" />
        <img v-else src="../assets/images/package_place.png" alt />
      </div>
    </div>
    <div class="material-details">
      <h2>{{item.title}}</h2>
      <div class="description">
        <!-- <table>
          <tr>
            <th><p>Raw material</p></th>
            <td><p>{{ item.raw_material_name }}</p></td>
          </tr>
          <tr>
            <th><p>Formulation</p></th>
            <td><p>{{ item.formulation }}</p></td>
          </tr>
          <tr>
            <th><p>Package</p></th>
            <td><p>{{ item.package }}</p></td>
          </tr>
          <tr>
            <th><p>Additional Request</p></th>
            <td><p>{{ item.additional_request }}</p></td>
          </tr>
          <tr>
            <th><p>Service</p></th>
            <td><p>{{ item.service }}</p></td>
          </tr>
        </table> -->
        <div class="product-details-wrap">
          <ul>
            <li>
              <h3>{{ $t("onlyme.tableCaption.RawMaterial" )}}</h3>
              <p>{{ item.raw_material_name }}</p>
            </li>
            <li>
              <h3>{{ $t("onlyme.tableCaption.Formulation" )}}</h3>
              <p>{{ item.formulation }}</p>
            </li>
            <li>
              <h3>{{ $t("onlyme.tableCaption.Package" )}}</h3>
              <p>{{ $t(item.package) }}</p>
            </li>
            <li>
              <h3>{{ $t("onlyme.tableCaption.AdditionalRequest" )}}</h3>
              <p>{{ item.additional_request }}</p>
            </li>
            <li>
              <h3>{{ $t("onlyme.tableCaption.Service" )}}</h3>
              <p>{{ $t(item.service) }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "ProductListRecipe",
  props:["item", "type", "unchecked"],
  data() {
    return {
      imgBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
    }
  },

  updated(){
   if(this.unchecked == true){
       this.$refs.radio.checked = false;
       //console.log(this.$refs.radio)
   }
  },
   methods: {
         getPackageId(event) {
           this.$emit('changeId',event.target.value);
           this.$emit('type', event.target.getAttribute('data-type'));
          console.log(event.target.getAttribute('data-type'))
         }
   }
};
</script>