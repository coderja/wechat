import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const tolist = new Vuex.Store({
  state: {
    list = []
  },
  mutations: {
    increment: state => state.list
  }
})
export default tolist
