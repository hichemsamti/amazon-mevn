<template>
<form @submit.prevent="sendFile" enctype="multipart/form-data">
<div class="field">
 <label for="file" class="label">Upload File</label>
  <input type="file" name="image" ref="file" @change="selectFile"/>
</div>

<div class="field">
 
 <button class="button is-info">Send</button>

</div>

</form>
    
</template>

<script>

import axios from "axios"
export default {
    name:"SimpleUpload",

  data() {
      return {
          file:""
      }
  },

  methods:{
      selectFile(){

          this.file=this.$refs.file.files[0]

      },

     async sendFile(){
          const formData = new FormData();
          formData.append('image',this.file)
       try{
       await axios.post("http://localhost:3000/api/products",formData)

      }catch(err){
          console.log(err)
      }
  }

  }
    
}
</script>