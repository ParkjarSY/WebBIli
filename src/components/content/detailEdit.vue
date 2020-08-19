<template>
  <div class="detail-edit">
      <headt style="margin-bottom:15px" :userImg="model.user_img"/>
      <div class="uploadd">
        <van-uploader class="uploadImg " preview-size='100vw' :after-read="afterRead" />
        <detail-banner left="头像" > 
          <img class="userde-img" :src="model.user_img" slot="right" alt="" >
          
        </detail-banner>
      </div>
      <detail-banner 
        left="昵称" 
        @bannerClick="showa = true"
      > 
        <span slot="right">{{model.name}}</span>
      </detail-banner>

      <detail-banner 
        left="账号"
      > 
        <span slot="right">{{model.username}}</span>
      </detail-banner>

      <detail-banner 
        left="性别" 
        @bannerClick="sexShow = !sexShow"
      > 
        <span slot="right">{{showSex}}</span>
      </detail-banner>

      <detail-banner 
        left="个签" 
        @bannerClick="textShow = true"
      >
        <span slot="right">{{model.user_desc}}</span> 
        </detail-banner>

      <van-dialog v-model="showa" title="昵称" show-cancel-button @confirm="confirmClick">
        <van-field v-model="content" autofoces/>
      </van-dialog>
      <van-dialog v-model="textShow" title="个性签名" show-cancel-button @confirm="confirmText">
        <van-field v-model="textContent" type="textarea"  autofoces/>
      </van-dialog>
      <!-- <van-dialog v-model="sexShow" title="个性签名" show-cancel-button @confirm="confirmSex">
        <van-radio-group v-model="sex" class="sexradio" >
          <van-radio class="radioItem" name="男生"  checked-color="pink" >男生</van-radio>
          <van-radio class="radioItem" name="女生" checked-color="pink" >女生</van-radio>
          <van-radio class="radioItem" name="保密" checked-color="pink" >保密</van-radio>
        </van-radio-group>
      </van-dialog> -->

      <van-action-sheet v-model="sexShow" :actions="actions" @select="confirmSex" cancel-text="取消" />
      <div class="exitLogin exitLogina" @click="exitLogin">
        <div class="exitBtn">退出登录</div>
      </div>
      <div class="exitLogin" @click="backDetail">
        <div class="exitBtn">返回详情</div>
      </div>
      <!-- <detail-banner left="hhh"> </detail-banner> -->
  </div>
</template>

<script>
import headt from '@/components/content/headt'
import detailBanner from '@/components/content/detailBanner'
import Bus from '@/bus.js' ;
export default {
    name:'detailEdit',
    components:{
      headt,
      detailBanner,
    },
    data(){
        return {
            model:{},
            showa:false,
            showtitle:'',
            content:'',
            
            textShow:false,
            textContent:'',

            sexShow:false,
            sex:'女生',
            actions: [
              { name: '男' ,val:0}, 
              { name: '女' ,val:1}, 
              { name: '保密',val:2}
            ],
            showSex:'',
        }
    },
     methods:{
       //请求服务器信息
        async getInfo(){
          // console.log('111111111')
             const res = await this.$http.get('/user/'+localStorage.getItem('id'),{
               headers:{
                   'Authorization': 'Bearer ' + localStorage.getItem('token')
               }
            })
            this.model = res[0];
            //根据反馈信息判断男女
            this.showSex = this.jSex()
            console.log(this.model)
            console.log(this.model.user_img)
        },
        //退出登录和返回详情
        exitLogin(){
          this.$router.push('/login')
        },
        backDetail(){
          this.$router.push('/userInfo')
        },

        //将图片上传值服务器
        async afterRead(file){
          console.log(file)
          const formdata = new FormData()
          formdata.append('file',file.file)//后端规定的键名
          const res = await this.$http.post('/upload',formdata)
          // console.log('11111111111111111')
          // console.log(res)
          this.model.user_img = res.url
          //图片发给兄弟
          Bus.$emit('imgChange',this.model.user_img)
          console.log(this.model.user_img)
          this.userUpdata()
        },
        //将本地更改的信息上传
        async userUpdata(){
          //将本地的信息上传至服务器，修改
          const res = await this.$http.post('./update/' + localStorage.getItem('id'),this.model)
          console.log(res)
        },
        //更改姓名
        confirmClick(){
          this.$toast.success('更改成功')
          this.model.name = this.content
          this.userUpdata()
          // this.content = ''
        },
        //更改性别
        confirmSex(data){
          this.model.gender = data.val;
          console.log(this.model.gender)
           this.userUpdata();
           this.sexShow = !this.sexShow
           this.showSex = this.jSex()
        },
        //更改个性签名
        confirmText(){
          this.model.user_desc = this.textContent
          this.userUpdata();
        },
        //写出是男是女
        jSex(){
        let seex;
        if(this.model.gender == 0){
          seex = '男'
        }else if(this.model.gender == 1){
          seex = '女'
        }else{
          seex = '保密'
        }
        return seex;
      },
      
      
        
    },
    created(){
        this.getInfo();
        // console.log('2222')
    },

}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.detail-edit span{
   height: auto;
}
  .userde-img{
    width:45px;
    height: 45px;
    border-radius: 50%;
    background-color: pink;
  }
 
  .exitLogin{
    /* height:50px; */
    /* margin-top:25px ; */
    padding: 10px;
    font-size: 16px;
    text-align: center;
    /* width:100%; */
    background-color:#fafafa;
    border-right:1px solid rgba(0, 0, 0, .2);
    border-left:1px solid rgba(0, 0, 0, .2);
    border-bottom:1px solid rgba(0, 0, 0, .2);
    color:gray;
  }
   .exitLogina{
    margin-top:25px ;
    border-top: 1px solid rgba(0, 0, 0, .2);
  }
  /* .exitLogin :hover{
    background-color: white;
    color: black;
  } */
  .upplaodd{
    position: relative;
    /* height: 45px; */
    overflow: hidden;
  }
  .uploadImg{
    position: absolute;
    overflow: hidden;
    /* width:100vw; */
    opacity: 0;
   height: 10vh;
    
  }
  .sexradio{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 12px;
  }
  .radioItem{
    margin:3px;
  }
</style>