import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import request from "@/request"


Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$http = request//可以把封装好的http再任意组件使用this获取到
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
