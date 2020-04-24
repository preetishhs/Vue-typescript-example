import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Element UI
import ElementUI from 'element-ui'
import '@/assets/styles/element.scss'
Vue.use(ElementUI)

//styles
import '@/assets/styles/app.scss'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
