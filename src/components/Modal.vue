<template>
  <div class="modal-backdrop">
    <div class="modal">
      <section class="modal-body">
        <slot name="body">
          <img v-if="img" :src="img" alt="" class="mx-auto img-space">
          <h2 class="modal-title text-center" v-if="bodytext1">
            {{ bodytext1 }}
          </h2>
          <h2 class="modal-title text-center" v-if="bodytext2">
            {{ bodytext2 }}
          </h2>
          <p class="body-title text-center" v-if="bodytext3">{{bodytext3}}</p>
        </slot>
      </section>

      <footer class="modal-footer">
        <div
          class="modal-btn-wrap"
          :class="btnText1 && btnText2 ? 'dual-btn' : 'pppp'"
        >
          <button
            type="button"
            :class="`btn-primary grey-btn-solid ${btnFull? 'full-width' : ''}`"
            @click="close()"
            v-if="btnText1"
          >
            {{ btnText1 }}
          </button>
          <button
            type="button"
            :class="`btn-primary grenn-btn2 ${btnFull? 'full-width' : ''}`"
            @click="close2(link)"
            v-if="btnText2"
          >
            {{ btnText2 }}
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>

export default {
  name: "Modal",
  props: ["bodytext1", "bodytext2", "bodytext3", "btnText1", "btnText2", "link", "btnFull","img"],
  methods: {
    close() {
      this.$emit("close");
    },
    close2(link) {
      if(link) {
        this.$router.push(link);
      }
      this.$emit("Confirm", true);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-footer{
  .btn-primary{
    width: 50%;
    &.full-width{
      width: 100%;
    }
  }
}

.body-title{
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  font-family: $default-font;
  margin-top: 20px;
  color: #4c4c4c;
}
.img-space{
  margin-bottom: 20px;
}
</style>

