<template>
  <div class="faq-item">
    <button @click="toggleAccordion()" class="accordion-heading" :aria-expanded="isOpen" :aria-controls="`collapse${_uid}`" >
      <slot name="title"> {{title}} </slot>
    </button>
    <div class="accordion-details" v-show="isOpen" :id="`collapse${_uid}`">
      <p class="no-data">
        <slot name="description">{{description}}</slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchAccordion",
  props: ["title", "description"],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>