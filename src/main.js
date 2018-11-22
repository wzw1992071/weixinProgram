// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "src/vuex/store"

console.log(router)
router.beforeEach((to, from, next)=>{
  console.log(to)
  if (to.meta.title) {
    document.title = to.meta.title
  }  
  next()
})


//初始化css样式
import "src/assets/css/normalize.css"
import "src/assets/font/iconfont.css"


// 引入饿了么UI组件库
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);


// 引入全局的指令和过滤器及工具
import directives from "src/directives.js"
import "src/filters.js"
import utils from "@/utils/utils.js"
Vue.prototype.$utils = utils
// 引入剪切板功能
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false

// 引入封装过的axios()
import axios from "src/api/http"
import * as Allhttp from "src/api/Allhttp"
Vue.prototype.$axios = axios
Vue.prototype.$http = Allhttp

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
