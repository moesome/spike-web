import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import(/* webpackChunkName: "layout" */ './views/Layout.vue'),
      children:[
        {
          path: '/user/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "user" */ './views/user/Login.vue')
        },
        {
          path: '/spike/index',
          name: 'index',
          component: () => import(/* webpackChunkName: "index" */ './views/spike/Index.vue')
        },
        {
          path: '/spike/:itemId',
          name: 'item',
          component: () => import(/* webpackChunkName: "index" */ './views/spike/Item.vue')
        },
      ]
    },
  ]
})
