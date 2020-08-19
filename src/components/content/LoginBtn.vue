<template>
  <div class="btn" @click="loginClick">
      <div class="lbtn" >{{btName}}</div>
  </div>
</template>

<script>
export default {
    name:"LoginBtn",
    props:['btName'],
    methods:{
        loginClick(){
            this.$emit("loginSubmit")
        }
    },
}
</script>

<style>
.btn{
    padding: 20px 3px;
}
.lbtn{
    background-color: pink;
    height: 44px;
    border-radius: 22px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
}
</style>