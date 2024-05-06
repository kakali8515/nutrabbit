<template>
  <div class="main-body themePurple">
    <div class="container-medium">
      <div class="my-choce-wrap my-choice-selection package-list-section">
        <div class="my-choice-heading">
          <h2>{{ $t("storageBox.heading") }}</h2>
        </div>
        <div class="choice-selection-item-wrap">
          <div class="choice-selection-item raw-material-product addWrap">
            <div class="heading-wrap">
              <div class="heading full-width">
                <h2>{{ $t("storageBox.title") }}</h2>
              </div>
            </div>
            <div class="product-list-wrap ingredient-wrap">
              <ul class="selectAllHeader">
                <li>
                  <div class="radio-wrap">
                    <label class="custom-radio">
                      <input
                        type="checkbox"
                        :checked="
                          (this.storage_box_list_data.length ==
                          this.box_id_data.length) && this.storage_box_list_data.length != 0
                            ? true
                            : false
                        "
                        @click="selectAll"
                        v-model="allSelected"
                      />
                      <span class="checkmark"></span>
                      {{ $t("storageBox.selectAll") }}
                    </label>
                  </div>
                  <button @click="deleteStorageBox" class="deleteBtn">
                    {{ $t("storageBox.delete") }}
                    <i class="icon-menu-delete"></i>
                  </button>
                  <my-modal-component v-show="showModal">
                    <Modal
                      @close="closeModal"
                      :bodytext1="$t('storageBox.deleteModal.text')"
                      :btnText1="$t('storageBox.deleteModal.btn1')"
                      :btnText2="$t('storageBox.deleteModal.btn2')"
                      @confirm="confirmbtn($event)"
                      link="/add-ingredient"
                    />
                  </my-modal-component>
                </li>
              </ul>
              <ul class="raw-material-list">
                <li v-for="(item, index) of storage_box_list_data" :key="index">
                  <ProductListStorageBox
                    :item="item"
                    :allSelected="allSelected"
                    :unchecked="unchecked"
                    @storageBoxId="UpdatedId($event)"
                    @getUncheckedId="updateUnchekedId($event)"
                  />
                </li>
              </ul>
              <div class="addIng">
                <button @click="this.$router.push(`/my-choice/`)">
                  <i class="icon-menu-add"></i>{{ $t("storageBox.add") }}
                </button>
                <div class="tolltip-outer">
                  <Popper>
                    <button>
                      <i class="icon-info"></i>
                    </button>
                    <template #content>
                      <div class="heading-tooltip-content">
                        <ul>
                          <li>{{ $t("storageBox.popup") }}</li>
                        </ul>
                      </div>
                    </template>
                  </Popper>
                </div>
              </div>
              <div class="btn-wrap flexEnd btn-wrap2">
                <button
                  :class="!isSelected ? 'btn-disabled' : ''"
                  :disabled="!isSelected"
                  @click="gotoNextPage()"
                  class="btn-small-solid blue"
                >
                  {{ $t("button.next") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal
    v-show="isItemSelectedVisible"
    :btnFull="true"
    @close="closeModalDelete"
    :bodytext1="$t('onlyme.modal.SelectedBodyText')"
    :btnText2="$t('button.Confirm')"
    link="/add-ingredient"
  />
</template>

          

<script>
import Popper from "vue3-popper";
import Button from "../../components/Button.vue";
import ProductListStorageBox from "../../components/ProductListStorageBox.vue";
import MyChoiceService from "../../services/MyChoiceService";
import Modal from "../../components/Modal.vue";

export default {
  name: "ChoiceRecommendedBlendingPackageSelection",
  inject: ["common"],
  components: {
    Popper,
    ProductListStorageBox,
    Button,
    Modal,
  },
  data() {
    return {
      storage_box_list_data: "",
      box_id_data: [],
      allSelected: false,
      sub_category_id: localStorage.getItem("sub_category_id"),
      showModal: false,
      btn: "",
      isItemSelectedVisible: false,
      unchecked: true,
      globalLocale: "",
      isSelected: false,
    };
  },
  created() {
    this.mychoiceService = new MyChoiceService();
  },
  mounted() {
    this.storage_box_list();
    localStorage.removeItem("package_id");
    localStorage.removeItem("pill_id");
    localStorage.removeItem("option");
    localStorage.removeItem("etc");
    localStorage.removeItem("storage_box");
  },
  updated() {
    if (this.storage_box_list_data.length == this.box_id_data.length) {
      this.allSelected = true;
    }
  },
  watch: {
    "common.state.SelectedLang": function (newVal, oldVal) {
      if (
        (newVal == "KO" && oldVal == "EN") ||
        (newVal == "EN" && oldVal == "KO")
      ) {
        this.storage_box_list();
      }
    },
    box_id_data: {
      handler(newVal) {
        if (newVal.length > 0) {
          this.isSelected = true;
        } else {
          this.isSelected = false;
        }
      },
      deep: true,
    },
  },

  // watch: {
  //   globalLocale(newVal, oldVal) {
  //     this.storage_box_list();
  //   },
  //   box_id_data: {
  //     handler(newVal) {
  //       if (newVal.length > 0) {
  //         this.isSelected = true;
  //       } else {
  //         this.isSelected = false;
  //       }
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    closeModalDelete() {
      this.isItemSelectedVisible = false;
    },
    confirmbtn(e) {
      this.btn = e;
      if (this.btn == true) {
        for (let i = 0; i < this.box_id_data.length; i++) {
          let box_id = this.box_id_data[i];
          let uid = localStorage.getItem("uid");
          this.mychoiceService
            .deleteIngredientsStorageBox(uid, box_id)
            .then((res) => {
              if (res.status == 200) {
                this.unchecked = true;
                this.box_id_data = [];
                this.storage_box_list();
              } else {
                // this.$swal(res.data.message, "error");
                console.log(res.data.message);
              }
            });
        }
      }
    },
    gotoNextPage() {
      if (this.box_id_data.length == 0) {
        // this.$swal("Please Select at Least one");
        this.isItemSelectedVisible = true;
      } else {
        var option_data = JSON.parse(localStorage.getItem("option") || "[]");

        for (let i = 0; i < option_data.length; i++) {
          var option_array = option_data[i];
          var res_option_type = Object.keys(option_array).toString();
          // console.log(res_option_type);
          if (res_option_type == "raw_material") {
            option_data.pop(option_data[i]);
          }
        }

        for (let i = 0; i < this.box_id_data.length; i++) {
          let box_id = this.box_id_data[i];
          // Modifying
          var put_raw = {
            raw_material: box_id,
          };
          option_data.push(put_raw);
        }

        // Saving
        localStorage.setItem("option", JSON.stringify(option_data));

        localStorage.setItem("raw_material_id", this.box_id_data);
        localStorage.setItem("storage_box", "storage_box");
        this.$router.push("/ingredient-formulation/");
      }
    },
    storage_box_list() {
      let uid = localStorage.getItem("uid");
      this.mychoiceService.getRawMaterialStorageBox(uid).then((res) => {
        if (res.status == 200) {
          this.storage_box_list_data = res.data.data;
        } else {
          // this.$swal(res.message, "error");
          console.log(res.message);
        }
      });
    },
    selectAll() {
      if (!this.allSelected) {
        //  console.log(this.storage_box_list_data.length);
        for (let i = 0; i < this.storage_box_list_data.length; i++) {
          let box_id = this.storage_box_list_data[i];
          this.box_id_data.push(box_id.id);
          // console.log(box_id.id);
        }
        this.isSelected = true;
      } else {
        this.box_id_data = [];
        this.isSelected = false;
      }
    },
    updateUnchekedId(e) {
      this.box_id_data.pop(e);
    },
    UpdatedId(e) {
      // if(!this.box_id_data.includes(e)){
      //   this.box_id_data.push(e);
      // }
      this.box_id_data.push(e);
      // if (this.box_id_data.length == 0) {
      //   this.box_id_data.push(e);
      //   console.log(this.box_id_data);
      // }
      // else {
      //   // console.log(this.box_id_data.includes(e));
      //   let data = this.box_id_data.includes(e);
      //   if (data == false) {
      //     this.box_id_data.push(e);
      //   }
      //   else if (data == true) {
      //     this.box_id_data.pop(e);
      //   }
      // }
    },
    deleteStorageBox() {
      //console.log(this.box_id_data.length);
      if (this.box_id_data.length == 0) {
        this.isItemSelectedVisible = true;
      } else {
        this.showModal = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tolltip-outer {
  .popper {
    @media screen and (max-width: 640px) {
      top: -14px !important;
    }
    .heading-tooltip-content {
      @media screen and (max-width: 640px) {
        max-width: 219px !important;
        padding: 10px 10px 10px 26px !important;
      }
    }
  }
}
</style>