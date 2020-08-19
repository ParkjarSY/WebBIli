<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keep"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keep"/>
  </div>
</template>

<script>
  export default {

  }

</script>
<style>
  body{
    padding: 0;
    margin: 0;
    background-color: #f4f4f4;
    box-sizing: border-box;
  }
  p{
    margin: 0;
  }
  h1,h2,h3,h4,h5,h6{
    padding: 0;
    margin:0;
  }
</style>
