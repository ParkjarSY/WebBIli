<template>
  <div class="artical-item" @click="getPath" >
      <!-- {{artical.id}} -->
      <div class="img-part">
          <img :src="artical.img" />
          <span class="video">123</span>
          <span class="talk">{{artical.commentlen}}</span>
      </div>
      <p>{{artical.name}}</p>
  </div>
</template>

<script>
import Bus from '@/bus.js'

export default {
    name:'artiaclItem',
    props:['artical',],
    methods:{
        // sendId(){
        //     console.log(this.artical.id)
        //     Bus.$emit('pushId',this.artical.id)
        // },
        getPath(){
            if(this.$route.path != `/article/${this.artical.id}`){
                this.$router.push({
                name:'article',
                params:{id:this.artical.id}
            })}
        }
    },
    // created(){
    //     this.sendId()
    // }
}
</script>

<style>
.artical-item p{
    font-size: 4vw;
    overflow: hidden;
}
.img-part{
    position: relative;
}
.img-part img{
    width: 100%;
}
.video{
    position: absolute;
    left: 4px;
    bottom: 1px;
    color: black;
}
.talk{
    position: absolute;
    right: 4px;
    bottom: 1px;
    color: black;
}
</style>
