<template>
  <div class="user-detail">
    <div class="userdi">
        <div ><img class="user-img" :src="srcI" alt=""></div>
        <div class="user-edit">
            <div class="user-fan">
                <p class="pp">
                    <span>{{fans}}</span>
                    <span>粉丝</span>
                </p >
                <p class="pa"></p>
                <p class="pp">
                    <span>{{follows}}</span>
                    <span>关注</span>
                </p>
                <p class="pa"></p>
                <p class="pp">
                    <span>{{getGood}}</span>
                    <span>获赞</span>
                </p>
            </div>
            <div class="user-ed" @click="detailEdit" >编辑资料</div>
        </div>    
    </div>
    <div class="self-info">
           <h2>{{name}} <img :src="sexImg"/></h2>
           <p>{{self}}</p>
    </div>
        <div @click="showmore" class="show-more">
            <span class="more">{{showre? '收起详情':'展开详情'}}</span>
             <div v-show="showre" class="show-re">
                 <span class="show-uid">uid:{{uid}}</span>
            </div>
        </div>
        <div>
            <span>
                
            </span>
            <span>

            </span>
        </div>
    </div>
  
</template>

<script>
// import Bus from '@/bus.js' 
export default {
    name:'userDetail',
    data(){
        return{
            fans:0,
            follows:0,
            getGood:0,
            name:" ",
            self:"既然选择了远方 便只顾风雨兼程",
            showre:false,
            uid:1212121,
            srcI:null,
            sexImg:null,
        }
    },
    methods:{
        showmore(){
            this.showre = !this.showre
        },
        async getUserInfo(){
            const res = await this.$http.get('/user/'+localStorage.getItem('id'),{
               headers:{
                   'Authorization': 'Bearer ' + localStorage.getItem('token')
               }
            })
            // console.log('detail')
            console.log(res);
            this.name = res[0].name
            this.uid = res[0].username
            console.log(this.srcI = res[0].user_img)
            this.srcI = res[0].user_img
            //把图片发给兄弟
            // Bus.$emit('imgChange',this.srcI)
            if(res[0].user_desc){
                this.self = res[0].user_desc
            }
        },
        detailEdit(){
            this.$router.push('/detailedit')
        },
    },
    created(){
        this.getUserInfo()
      
    },
    
}
</script>

<style>
    *{
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
        padding: 0;
    }
    .user-detail{
        background-color: white;
        /* padding: 0 10px; */

    }
    .userdi{
        margin: 0;
        padding: 6px;
        display: flex;
        padding-bottom:12px ;
        /* border-bottom: 1px solid grey; */

    }
    .user-img{
        width: 90px;
        height: 90px;
        background-color: pink;
        margin-right: 20px;
        border-radius: 50%;
    }
    .user-fan{
        display: flex;
        font-size: 13px;
    }
    .user-edit{
        flex: 1;
        padding-top:5px ;
        /* display: flex;
        justify-content: center;
        align-items: center; */
    }
    .user-edit .pp{
        flex: 1;
        display: flex;
        justify-items: center;
        align-items: center;
        flex-direction: column;
    }
    .pa{
        margin-top: 20px;
        width: 1px;
        height: 25px;
        background-color: rgba(0, 0, 0, .3);
    }
    .user-ed{
       /* background-color: springgreen; */
       margin-top: 5px;
       color:pink;
       font-weight: 500;
       display: flex;
       justify-content: center;
       align-items: center;
       border:2px solid pink;
       width: 85%;
       height: 20%;
       margin-left: 14px;
       font-size: 5vw;
       padding: 5px 0;
       border-radius: 5px;
    }
    .self-info {
        margin-left: 5px;
    }

    .self-info h2{
        font-size: 25px;
        font-weight: 500;
        margin-left: 12px;
        margin-top: 8px;
        margin-bottom: 6px;
    }
    .self-info p{
        font-size: 13px;
        color: grey;
    }
    
    .more{
        /* position: absolute; */
        /* background-color: salmon; */
        /* right: 5%; */
        margin-left: 79%;
        color: rgb(73, 172, 218);
    }
    .show-re{
        padding: 2px 0;
        padding-bottom:2px;
        /* border-top: 1px solid gray; */
        background-color: rgba(0,0,0, .1);
        transition: all 1s;
    }
    .show-uid{
        border-radius: 5px;
        padding: 0 6px;
        width:15%;
        font-size: 12px;
        background-color: rgba(0, 0, 0, .3);
        /* display: flex;
        align-items: center; */
        
    }
</style>