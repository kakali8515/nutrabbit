<template>
    <div>
          <div class="notice-list">
          <ul>
            <li v-for="(item, index) of NoticeList" :key="index">
              <div class="item-left">
                <p class="para-category"> {{item.categoryname}}</p>
                <span v-if="item.tag">{{item.tag}}</span>
                <p>
                  {{item.title}}
                </p>
              </div>
              <div class="item-right" v-on:click="isOpen = !isOpen">
               <img src="src/assets/icons/icon-arrowDown.svg" />
                <!-- <img :src="data.img" alt="" /> -->
              </div>
            <div :class="isOpen ? 'd-block' : 'hidden'">
            <slot></slot>
            </div> 
            </li>
          </ul>
        </div>
        <!-- <div v-on:click="isOpen = !isOpen"> 
            <img src="src/assets/icons/icon-arrowDown.svg" />
            </div>  
        <div :class="isOpen ? 'd-block' : 'hidden'">
            <slot></slot>
        </div> -->
    </div>
</template>
<script>
export default {
    name:'Faq1Accordion',
    data: () =>{
      return {
         isOpen: false
      }
    },
    data(){
    return{
      NoticeList:[
        {
          categoryname:"all",
          tag:"important",
          title:"This is the FAQ title.",
         
        },
        {
          categoryname:"estimate",
          tag:"important",
          title:"This is the FAQ title.",
         
        },
        {
          categoryname:"Sample",  
          tag:"important",
          title:"This is the FAQ title.",
          
        },
        {
          categoryname:"delivery",
          tag:"important",
          title:"This is the FAQ title.",
         
        },
        {
          categoryname:"payment",
          tag:"important",
          title:"This is the FAQ title.",
         
        },
        {
          categoryname:"service",
          tag:"important",
          title:"This is the FAQ title.",
          
        },
        {
          categoryname:"Etc",
          tag:"important",
          title:"This is the FAQ title.",
         
        },
        {
          categoryname:"service",
          title:"This is the FAQ title.",
          
        },
         {
          categoryname:"service",
          title:"This is the FAQ title.",
         
        },
         {
          categoryname:"service",
          title:"This is the FAQ title.",
          
        },

      ]
    }
    },
    // props:{
    //     title: string,
    // }
   
}
</script>