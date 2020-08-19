<template>
  <div class="detail-banner" >
      <div class="editBanner" @click="bannerClick">
          <span>{{left}}</span>
          <slot name='right'/>
      </div>
  </div>
</template>

<script>
export default {
    name:'detailBanner',
    props:['left'],
    methods:{
        bannerClick(){
            this.$emit('bannerClick')
        }
    },
    
   
}
</script>

<style>
/* .detail-banner{
    margin: 15px 0;
} */
.editBanner{
background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  font-size: 18px;
  border-bottom:1px solid rgba(0, 0, 0, .1);
  color: rgba(45, 46, 48, 0.589);
  font-weight: 500;
  line-height: 30px;
  /* width: 100%; */
 
}
</style>