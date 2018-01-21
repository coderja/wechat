import Vue from 'vue'
import App from './App'
import router from '../router/index'
import store from '../store/index'
import VueResource from 'vue-resource'
import axios from 'axios'

import 'lib-flexible/flexible.js'
require('@/less/index.less')

Vue.prototype.axios = axios
// 组件调用this.axios.get(...)
// Vue.prototype.$ajax = axios
// 换个名字 组件调用this.$ajax.get(...)
window.axios = axios
// 组件中调用 axios.get(...)

Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
