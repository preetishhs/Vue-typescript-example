import Vue from 'vue'
import Vuex from 'vuex'
import globalValues from '@/store/modules/globalValues'
import posts from '@/store/modules/posts'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    globalValues,
    posts
  }
})
export default store
