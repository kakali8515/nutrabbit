<template>
  <div class="main-body">
    <div class="container-medium">
      <div class="my-recipe-section">
        <div class="heading">
          <h1>my choice</h1>
        </div>
        <div class="my-recipe-body">
          <div class="row-type type-1">
            <h2>options</h2>

            <OnlyMeTable></OnlyMeTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyRecipeDetail",
};
</script>
