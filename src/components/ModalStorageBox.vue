<template>
  <div class="modal-backdrop">
    <div class="modal">
      <section class="modal-body">
        <slot name="body">
          <h2 class="modal-title text-center">{{ bodytext1 }}</h2>
          <h2 class="modal-title text-center">{{ bodytext2 }}</h2>
        </slot>
      </section>

      <footer class="modal-footer">
        <div class="modal-btn-wrap dual-btn">
          <button
            type="button"
            class="btn-primary grey-btn-solid"
            @click="gotolocker()"
          >{{ btnText1 }}</button>
          <button type="button" class="btn-primary grenn-btn2" @click="addRawMaterial()">{{ btnText2 }}</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import MyChoiceService from "../services/MyChoiceService";
export default {
  name: 'ModalStorageBox',
  props: ['bodytext1', 'bodytext2', 'btnText1', 'btnText2', 'raw_material_id', 'sub_category_id'],

  created() {
    this.mychoiceService = new MyChoiceService();
  },
  methods: {
    close() {
      this.$emit('close');
    },
    addRawMaterial() {
      //  console.log(this.raw_material_id);
      let uid = localStorage.getItem('uid');
      this.mychoiceService.getRawMaterialStorageBox(uid).then((res) => {
        // console.log(res);
        if (res.status == 200) {
          for (let i = 0; i < res.data.data.length; i++) {

            if(this.raw_material_id==res.data.data[i].id) {
              this.item_exist="yes";
            }
            
          }
          if(this.item_exist=="yes"){
            // this.$swal("You have already added this item");
            this.$emit('close');

          }
          else{
             this.mychoiceService.rawMaterialStorageBoxAdd(this.raw_material_id).then((res) => {
        //console.log(res.data);
        if (res.data.status=200) {
          // this.$swal("Successfully Added");
           this.$emit('close');
         
        } else {
            this.$swal(res.data.message, "error");
        }
      });
          }
        } else {
          this.$swal(res.message, "error");
        }
      });
    },
    gotolocker() {
       //  console.log(this.raw_material_id);
      let uid = localStorage.getItem('uid');
      this.mychoiceService.getRawMaterialStorageBox(uid).then((res) => {
        // console.log(res);
        if (res.status == 200) {
          for (let i = 0; i < res.data.data.length; i++) {

            if(this.raw_material_id==res.data.data[i].id) {
              this.item_exist="yes";
            }
            
          }
          if(this.item_exist=="yes"){
            // this.$swal("You have already added this item");
            this.$router.push('/add-ingredient');

          }
          else{
             this.mychoiceService.rawMaterialStorageBoxAdd(this.raw_material_id).then((res) => {
        //console.log(res.data);
        if (res.data.status=200) {
          // this.$swal("Successfully Added");
           this.$router.push('/add-ingredient');
         
        } else {
            this.$swal(res.data.message, "error");
        }
      });
          }
        } else {
          this.$swal(res.message, "error");
        }
      });

    }
    
  },
};
</script>

