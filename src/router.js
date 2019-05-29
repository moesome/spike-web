import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "layout" */ './views/Layout.vue'),
      children:[
        {
          path: '/users/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "user" */ './views/user/Login.vue')
        },
        {
          path: '/users/create',
          name: 'users.create',
          component: () => import(/* webpackChunkName: "user" */ './views/user/Create.vue')
        },
        {
          path: '/users/:id/edit',
          name: 'users.edit',
          component: () => import(/* webpackChunkName: "user" */ './views/user/Edit.vue')
        },
        {
          path: '/spikes',
          name: 'spikes',
          component: () => import(/* webpackChunkName: "spike" */ './views/spike/Index.vue')
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import(/* webpackChunkName: "order" */ './views/order/Index.vue')
        },
        {
          path: '/spikes/manage',
          name: 'spikes.manage',
          component: () => import(/* webpackChunkName: "spike" */ './views/spike/Manage.vue')
        },
        {
          path: '/spikes/create',
          name: 'spikes.create',
          component: () => import(/* webpackChunkName: "spike" */ './views/spike/Create.vue')
        },
        {
          path: '/spikes/:id/edit',
          name: 'spikes.edit',
          component: () => import(/* webpackChunkName: "spike" */ './views/spike/Edit.vue')
        },
        {
          path: '/',
          name: 'home',
          component: () => import(/* webpackChunkName: "spike" */ './views/Home.vue')
        },
        {
          path: '/gift',
          name: 'gift',
          component: () => import(/* webpackChunkName: "spike" */ './views/gift/Gift.vue')
        },
      ]
    },
  ]
})
