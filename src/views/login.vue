<template>
  <div class="login">
      <NavBar style="background-color: white;font-size:23px;margin-bottom:20px;border-radius:2px">
        <div slot="center">Login</div>
        <van-button
            slot="right" 
            style="border:0;font-size:13px;color:pink;right:0;margin:0; height:4vh" 
            @click="lbtnClick"
        >注册
        </van-button>
    </NavBar>
    <logintext  label1="账号"
      placeh="请输入账号" 
      style="margin-top:10px; margin-bottom:6px"
      rule="^.{6,16}"
      @handleInput="res => username = res"
    />
    <logintext label1="密码" 
      placeh="请输入密码" 
      type="password"  
      class="inputR" 
      rule="^.{6,16}"
      @handleInput="res => pas = res"
    />
    <login-btn btName="登录" @loginSubmit="loginSubmit"  />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import logintext from "@/components/content/LoginTest.vue"
import loginBtn from "@/components/content/LoginBtn"


export default {
    name:'login',
    data(){
        return {
            username:"",
            pas:''
        }
    },
    components:{
        NavBar,
        loginBtn,
        logintext,
    },
    methods:{
        async loginSubmit(){
            let rule2 = /^.{6,16}$/;
            // let rule3 = /^.{2,6}$/;
            if(rule2.test(this.username) && rule2.test(this.pas)){
                const res = await this.$http.post('/login',{
                    username:this.username,
                    password:this.pas
                })
                // console.log(res);
                this.$toast.success(res.msg)
                this.$router.push('/userInfo')
            }else{
                this.$toast.fail('账号密码输入有误')
            }
        },
        lbtnClick(){
            this.$router.push('./register')
        },

    }
}
</script>

<style>

</style>