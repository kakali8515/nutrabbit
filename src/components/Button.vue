<template>
  <button :typeof="`${typeOf}`" :class="`primaryBtn ${btnCol}`">{{btnText}}</button>
</template>

<script>
export default {
    name: 'button',
    props: {
        typeof:String,
        btnCol:String,
        btnText:String,
    }
}
</script>

<style>

</style>