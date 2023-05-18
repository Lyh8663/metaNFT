import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

// 引入uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 引入网络请求包 并将其挂载到原型上方便调用
import request from './request/http.js'
import api from './API/index.js'
Vue.prototype.$request = request
Vue.prototype.$api = api

import store from './store/index.js';
Vue.prototype.$store = store

const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif