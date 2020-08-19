<template>
   <nav-bar class="nav">
            <img src="#" slot="left" alt="logo" class="logo-icon" @click="goHome"/>
            <div slot="center" class="input-search">
               <div class="vicon"><van-icon name="search" /></div>
               <div class="vtext">Search</div>
            </div>
            <div slot="right" class="icons" >
            <!-- <img :src="setImg" alt="head" v-if="setImg" @click="goDetail"> -->
            <img :src="setImg" alt="head"  @click="goDetail">
            <div class="download" >下载App</div>
            </div>
        </nav-bar>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Bus from '@/bus.js'
export default {
    name:'headt',
    components:{
        NavBar,

    },
    data(){
        return {
            setImg:null,
            
        }
    },
    // props:['userImg'],
    created(){
        Bus.$on('imgChange',this.getImg)
        console.log('mounted')
    },
    methods:{
        getImg(imga){
            this.setImg = imga
            console.log(imga)
            console.log(this.setImg)
            console.log('11111')
        },
        goDetail(){
            this.$router.push('/userInfo')
        },
        goHome(){
            this.$router.push('/home')
        },
        async getInfo(){
            const res = await this.$http.get('/user/'+localStorage.getItem('id'),{
               headers:{
                   'Authorization': 'Bearer ' + localStorage.getItem('token')
               }
            })
            this.setImg = res[0].user_img
        },
    },
    created(){
        this.getInfo()
    },
}
</script>

<style>
.logo-icon{
        height: 95%;
        width: 90%;
        background-color: pink;
    }
    .nav{
      background-color: white; 
      
    }
    .input-search{
        position: relative;
        background-color: rgba(0, 0, 0, .2);
        flex:1;
        justify-content: center;
        align-items: center;
        height: 55%;
        border-radius: 10px;
        width: 90%;
        color: rgba(0, 0, 0, 0.4);
        /* overflow: hidden; */
    }
    .vicon{
        width: 3vw;
        height: 3vh;
        position:absolute;
        top:50%;
       transform: translateY(-50%);

    }
    .vtext{
        font-size: 2.6vh;
        font-weight: 300;
        position: absolute;
        left: 15px;
        top:50%;
        transform: translateY(-50%);
    }
    
    .icons{
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .icons img{
        width:5vmax;
        height:5vmax;
        border-radius: 50%;
        background-color: pink;
    }
    .download{
        background-color: pink;
        color: white;
        display: flex;
        border-radius: 3px;
        font-size: 1.5vmax;
        height: 4.5vmax;
        width: 8vmax;
        justify-content: center;
        align-items: center;
        margin-left: 1.5vmax;
        /* right: 4px; */
        

        

    }
</style>