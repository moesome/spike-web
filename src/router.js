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
          path: '/item/index',
          name: 'index',
          component: () => import(/* webpackChunkName: "index" */ './views/item/Index.vue')
        },
        {
          path: '/item/:itemId',
          name: 'item',
          component: () => import(/* webpackChunkName: "index" */ './views/item/Item.vue')
        },
      ]
    },
  ]
})
