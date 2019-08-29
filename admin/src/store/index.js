import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import pageInfo from './modules/info' //首页状态
const store = new Vuex.Store({
  modules: {
    pageInfo
  }
})

export default store
