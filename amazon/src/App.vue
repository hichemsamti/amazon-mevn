<template>
  <div class ="section">
    <div class="container">
      <simple-upload/>
    </div>

  </div>



  
</template>

<script>

import SimpleUpload from "./SimpleUpload.vue"
export default {
  name: 'App',
  components:{
    SimpleUpload
  }

  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
