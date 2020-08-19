<template>
  <div class="register">
    <NavBar style="background-color: white;font-size:23px;margin-bottom:20px ">
      <div slot="center">Register</div>
      <van-button
            slot="right" 
            style="border:0;font-size:13px;color:pink;right:0;margin:0; height:4vh" 
            @click="lbtnClick"
        >登录
        </van-button>
    </NavBar>
    <logintext label1="姓名" 
      placeh="请输入姓名" 
      rule="^.{2,6}" 
      @handleInput="res => name = res"
    />
    <logintext  label1="账号"
      placeh="请输入账号" 
      style="margin-top:6px;"
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
    <logintext label1="确认密码" 
      placeh="请确认密码" 
      type="password" 
      style="margin-bottom:6px" 
      rule="^.{6,16}"
      @handleInput="res => checkpas = res"
    />
    <van-field label="手机号"
      placeholder="测试用，请忽略" 
      style="border-radius:2px;box-shadow:1px 1px 1px rgba(0,0,0,.1)"
    >
      <template #button>
        <van-button size="small"
         color="pink"
         type="primary"
         :loading="ress"
         @click="sendNum"
        >
          发送验证码
        </van-button>
       </template>
    </van-field>

    <login-btn btName="注册" @loginSubmit="loginSubmit"  />
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import logintext from "@/components/content/LoginTest.vue"
  import loginBtn from "@/components/content/LoginBtn"

  export default {
    name: "register",
    data(){
      return {
        name:'',
        pas:'',
        username:'',
        checkpas:'',
        ress:false
      }
    },
    components:{
      NavBar,
      logintext,
      loginBtn,
    },
    methods:{
      // biAlert(mes){
      //   Toast.fail({
      //     message:mes
      //   })
      // },
      async loginSubmit(){
        let resl = null;
        let rule2 = /^.{6,16}$/;
        let rule3 = /^.{2,6}$/
        if(rule2.test(this.pas) && rule3.test(this.name)  && rule2.test(this.username) && rule2.test(this.checkpas) ){
          if( this.pas == this.checkpas){
            const res = await this.$http.post("/register",{
              name:this.name,
              username:this.username,
              password:this.pas,
            });
            resl = res;
            console.log(resl)
            if(res.data.msg == '注册成功'){
              this.$toast.success(res.data.msg)
              localStorage.setItem('id',res.data.id)
              localStorage.setItem('token',res.data.objtoken)
              this.$router.push('/login')
            }else{
              this.$toast.fail(res.data.msg)
            }
            
            }else{
            //调用vant的轻提示
            this.$toast.fail('两次输入的密码不同')
            // this.biAlert("")
          }
        }else{
          if(!this.name){
            this.$toast.fail('姓名长为2~6')
            // this.biAlert("")
          }else if(!this.username){
            this.$toast.fail('账户长为6~16')
            // this.biAlert("")
          }else{
            this.$toast.fail('密码长为6~16')
            // this.biAlert("")
          }
        }
        console.log(resl);
      },
      lbtnClick(){
            this.$router.push('./login')
      },
      sendNum(){
        this.ress = true
        setTimeout((ress) =>{
          this.ress = false
        },6000)
      },
      
    }
    
  }
</script>

<style scoped>

</style>
