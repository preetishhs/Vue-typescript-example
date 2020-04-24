import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () =>
      import(/* webpackChunkName: "ModifyBlog" */ '@/views/Article.vue')
  },
  {
    path: '/modify',
    name: 'modify',
    component: () =>
      import(/* webpackChunkName: "ModifyBlog" */ '@/views/ModifyBlog.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () =>
      import(/* webpackChunkName: "CreateItem" */ '@/views/Edit.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () =>
      import(/* webpackChunkName: "EditItem" */ '@/views/Edit.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "about" */ '@/views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
