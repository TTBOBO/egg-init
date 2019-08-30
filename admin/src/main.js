import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { ajaxGet, ajaxPost, ajaxDelete, ajaxPut } from './api/axios'
import store from './store/index'
import "animate.css"
Vue.use(ElementUI)
Vue.prototype.$ajaxGet = ajaxGet
Vue.prototype.$ajaxPost = ajaxPost
Vue.prototype.$ajaxDelete = ajaxDelete
Vue.prototype.$ajaxPut = ajaxPut
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
