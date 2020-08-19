<template>
  <div class="home">
    <headt />
    <van-tabs v-model="active" animated sticky swipeable>
      <van-tab v-for="(item,index) in category" :title="item.title" :key="index">
        <van-list v-model="item.loading" :immediate-check="false" :finished="item.finished" finished-text="我也是有底线的" @load="onLoad" offset="400">
          <div class="detail-artical">
            <aitem
              class="a-item"
              v-for="(artical,articalIndex) in list"
              :key="articalIndex"
              :artical="artical"
            />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// import register from "@/views/register";
// @ is an alias to /
import headt from "@/components/content/headt.vue";
import aitem from "@/components/content/articalItem";

export default {
  name: "Home",
  data() {
    return {
      category: [],
      active: 0,
      //文章列表
      list: [],
      pageFlag:0,
    };
  },
  components: {
    headt,
    aitem,
  },
  methods: {
    //获取分类的名字，展示给导航栏
    async getTags() {
      const res = await this.$http.get("/category");
      console.log("1122");
      console.log(res);
      this.category = res;
      this.addItem(this.category);
    },
    //改造数据
    addItem(data) {
      // console.log('2')
      const items = data.map((item, index) => {
        // item.list=[];
        item.page = 0;
        item.pagesize = 12;
        //list插件loading和finished
        item.loading=false
        item.finished = false
        return item;
      });
      this.category = items;

      // console.log(this.category)
      this.getArtical();
    },
    //获取导航栏内的文章
    async getArtical() {
      const categoryIndex = this.getcategoryItem();
      // console.log(categoryIndex)
      //根据需求选择渲染的页数以及每页的条数
      // console.log('3')
      const res = await this.$http.get("/detail/" + categoryIndex._id, {
        params: {
          page: categoryIndex.page,
          pagesize: categoryIndex.pagesize,
        },
      });
      
       
       this.list.push(...res)
       categoryIndex.loading = false
       if(res.length < categoryIndex.pagesize){
         categoryIndex.finished = true
       }
      // console.log(this.list);
    },
    //获取对应的分类
    getcategoryItem() {
      // console.log('4')
      const categoryItem = this.category[this.active];
      return categoryItem;
    },
    onLoad(){
      //判断是哪个导航栏的
      const categoryIndex = this.getcategoryItem();
      setTimeout(() => {
        categoryIndex.page += 1
        this.getArtical()
      }, 2000);
    },
    //防抖函数
    debounce(func, wait) {
    let timer;
    return function() {
      let context = this; // 注意 this 指向
      let args = arguments; // arguments中存着e
      //如果timer不为空,那么就清空timer
      if (timer) clearTimeout(timer);
      //如果函数在队列中,timer不为空
      timer = setTimeout(() => {
        //队列执行func函数
        func.apply(this, args)
      }, wait)
    }
}
  },
  watch: {
    active() {
      // console.log("active")
      // this.getArtical()
      this.getArtical();
      // console.log(this.category.list)
    },
  },
  created() {
    this.getTags();
    //  this.getArtical()
  },
};
</script>
<style >
.detail-artical {
  display: flex;
  /* width: 45%; */
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
}
.a-item {
  width: 45vw;
  /* margin: 5px 0;*/
} 
</style>