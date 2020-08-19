<template>
  <div class="artical-detail">
    <headt />
    <div class="aitem-detail">
      <div class="item-video">
        <video controls="controls" :src="articleItem.content"></video>
      </div>
      <div class="item-info">
        <div class="item-title">
          <span>
            <span class="i-t">{{acategory.title}}</span>
            {{articleItem.name}}
          </span>
          <span class="i-t1" @click="showInfo">{{isShow? '收起详情':'查看详情'}}</span>
        </div>
        <div class="item-information" v-show="isShow">
          <div class="i-s">
            <span class="i-s1">作者:{{articleUser.name}}</span>
            <span class="i-s2">日期:{{articleItem.date}}</span>
          </div>
          <p class="i-p1">评论：{{commentlen}}</p>
          <img class="i-i" :src="articleUser.user_img" alt />
        </div>
      </div>
    </div>
    <div class="commend-d">
      <articalitem class="acommends" v-for="(item,index) in commend" :artical='item' :key="index"/>
    </div>
  </div>
</template>

<script>
import headt from "@/components/content/headt";
import articalitem from '@/components/content/articalItem'
export default {
  name: "articaldetail",
  data() {
    return {
      articleItem: {},
      articleUser: {},
      isShow: false,
      commentlen: "无评论",
      commend:{},
      acategory:'',
    };
  },
  // props:['aId'],
  components: {
    headt,
    articalitem,
  },
  methods: {
    async getArticleItems() {
      // console.log(this.$route.params)
      //传递参数用router，接收用route!!!!!!!!!!!!!!!!
      const res = await this.$http.get("/article/" + this.$route.params.id);
      console.log(res);
      this.articleItem = res[0];
      this.articleUser = res[0].userinfo;
      this.acategory = res[0].category
      if (res[0].commentlen) {
        this.commentlen = res[0].commentlen;
      }
    },
    showInfo() {
      this.isShow = !this.isShow;
    },
    async getCommandItems(){
      const res = await this.$http.get('/commend')
      console.log(res)
      this.commend = res
    },
  },
  created() {
    this.getArticleItems();
    this.getCommandItems()
  },
  watch:{
    $route(){
      this.getArticleItems();
      this.getCommandItems()
    }
  }
};
</script>

<style>
.artical-detail{
  background-color: white;
}
.item-info {
  position: relative;
  background-color: white;
  padding-top: 3px;
  /* margin-bottom: 5px; */

}
.item-information {
  color: rgba(5, 5, 5, 0.6);
  font-size: 12px;
  margin-left: 10px;
  margin-top: 5px;
  /*position: absolute;*/
}

.i-s2 {
  margin-left: 10px;
  margin-right: 8px;
}
.item-video {
  width: 100%;
}
.item-video video {
  width: 100%;
}
.item-title {
  font-size: 15px;

  margin-left:5px;
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
}
.i-t1 {
  margin-right: 8px;
  font-size: 12px;
  padding-top: 6px;
  color: cornflowerblue;
}
.i-t {
  background-color: #f4f4f4;
  /*line-height: 15px;*/
  padding: 2px;
  color: pink;
  font-size: 11px;
  margin-right: 2px;
  border-radius: 6px;
}
.acommends{
  /* flex: 1; */
  width: 45vw;
  margin-bottom: 12px;
  border-bottom: 1px solid #555454;
  /* transform: scaleX(0.5); */
}
.commend-d{
  /* margin-top:20px;
  margin-left: 10px; */
  padding-top: 15px;
   flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
  background-color: #fafafa;
}
</style>
