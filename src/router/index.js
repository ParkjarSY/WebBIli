import Vue from 'vue'
import VueRouter from 'vue-router'
import register from  "@/views/register"
import login from "@/views/login"
import home from '@/views/Home'
import article from '@/views/articalDetail'
// import changedetail from '../components/content/detailEdit'
// import userInfo from "../views/userInfo"

Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'home'
    },
    {
      path:'/home',
      // redirect:'home',
      component:home,
      meta:{
        keep:true,
      }
    },
    {
      path: "/register",
      component:register
    },
    {
      path:'/login',
      component:login,
    },
    {
      path:'/userInfo',
      component: () => import('@/views/userInfo'),
      // meta:{
      //   isToken:true,
      // }
    },
    {
      path:'/detailedit',
      component: () => import('@/components/content/detailEdit'),
      // meta:{
      //   isToken:true,
      // }
    },
    {
      path:'/article/:id',
      name:'article',
      component:article,
    },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//本地token被删除后，跳转页面转到登录页
router.beforeEach((to,from,next) =>{
  if(!localStorage.getItem('id') && !localStorage.getItem('token') && to.meta.isToken == true){
    router.push('/login')
    return
  }else{
    next()
  }
})

export default router
