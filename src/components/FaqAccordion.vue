<template>
    <button 
      @click="toggleAccordion()" 
      class="notice-list" 
      :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`"
    >
  
      <slot name="title" />
      
      <svg
        class="w-3 transition-all duration-200 transform"
        :class="{
          'rotate-180': isOpen,
          'rotate-0': !isOpen,
        }"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 10"
        aria-hidden="true"
      >
        <path
          d="M15 1.2l-7 7-7-7"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    
    <div v-show="isOpen" :id="`collapse${_uid}`" class="accroCont">
      <slot name="content" />
    </div>
</template>
<script>
export default {
  name: "FaqAccordion",
  //  data(){
  //   return{
  //     NoticeList:[
  //       {
  //         tag:"important",
  //         title:"This is the announcement title. This is the announcement title.",
  //         img: "../../../src/assets/icons/icon-arrowDown.svg",
  //       },
  //       {
  //         tag:"important",
  //         title:"This is the announcement title. This is the announcement title.",
  //          img: "../../../src/assets/icons/icon-arrowDown.svg",
  //       },
  //       {
  //         tag:"important",
  //         title:"This is the announcement title. This is the announcement title.",
  //         img:"2022.01.10"
  //       },
  //       {
  //         tag:"important",
  //         title:"This is the announcement title. This is the announcement title.",
  //         img:"2022.01.10"
  //       },
  //       {
  //         tag:"important",
  //         title:"This is the announcement title. This is the announcement title.",
  //         img:"2022.01.10"
  //       },
  //       {
  //         title:"This is the announcement title. This is the announcement title.This is the announcement title.This is the announcement title.",
  //         date:"2022.01.10"
  //       },
  //       {
  //         title:"This is the announcement title. This is the announcement title.This is the announcement title.This is the announcement title.",
  //         date:"2022.01.10"
  //       }
        
  //     ]
  //   }
  // }
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