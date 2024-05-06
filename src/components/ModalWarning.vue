<template>
  <div class="modal-backdrop">
    <div class="modal">
      <section class="modal-body">
        <slot name="body">
          <h2 class="modal-title text-center" v-if="bodytext1">
            {{ bodytext1 }}
          </h2>
          <h2 class="modal-title text-center" v-if="bodytext2">
            {{ bodytext2 }}
          </h2>
        </slot>
      </section>

      <footer class="modal-footer">
        <div
          class="modal-btn-wrap"
          :class="btnText1 && btnText2 ? 'dual-btn' : 'pppp'"
        >
          <button
            type="button"
            class="btn-primary grey-btn-solid"
            @click="close"
            v-if="btnText1"
          >
            {{ btnText1 }}
          </button>
          <button
            type="button"
            class="btn-primary grenn-btn2"
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
  name: "ModalWarning",
  props: ["bodytext1", "bodytext2", "btnText1", "btnText2", "confirm"],
  methods: {
    close() {
      this.$emit("close2");
    },
    close2(link) {
      this.$emit("confirm");
    },
  },
};
</script>

