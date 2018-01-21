import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    startShow: false
  },
  mutations: {
    boxShow: function () {
      this.state.startShow = !this.state.startShow
    }
  }
})
export default store
