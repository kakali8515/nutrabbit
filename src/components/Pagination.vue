<template>
  <div class="pagination-wrap">
    <a href=""><i class="pagination-arrow-left"></i></a>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <a href=""><i class="pagination-arrow-right"></i></a>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  data() {
    return {
      currentPage: 1,
      perPage: 4,
      totalData: 0,
      data: []
    };
  },
  methods:{
    getData(page = 1){
      // API call
      // Update data array
      // Update totalData no
      // Update currentPage
    },
    onPageClick(page){
      this.getData(page)
    }
  },
  mounted(){
    this.getData();
  },
};
</script>
