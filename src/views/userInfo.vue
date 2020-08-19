<template>
    <div class="userInfo">
       <headt/>
       <img src="" alt="" class="userimg" />
       <user-detail/>
       
    </div>
</template>

<script>

import headt from "@/components/content/headt"
import userDetail from "@/views/userComponents/userDetail"

export default {
    name:'userInfo',
    data(){
        return {
            setImg:null,
        }
    },
    
    components:{
        headt,
        userDetail,
    },
    

}
</script>

<style>
    .userimg{
        width: 100%;
        height: 100px;
    }
</style>    