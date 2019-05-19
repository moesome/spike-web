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
          path: '/users/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "user" */ './views/user/Login.vue')
        },
        {
          path: '/users/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "user" */ './views/user/Register.vue')
        },
        {
          path: '/spikes',
          name: 'spikes',
          component: () => import(/* webpackChunkName: "index" */ './views/spike/Index.vue')
        },
        {
          path: '/orders',
          name: 'orders',
          component: () => import(/* webpackChunkName: "index" */ './views/order/Index.vue')
        },
        {
          path: '/spikes/manage',
          name: 'manage',
          component: () => import(/* webpackChunkName: "index" */ './views/spike/Manage.vue')
        },
        {
          path: '/spikes/create',
          name: 'create',
          component: () => import(/* webpackChunkName: "spike" */ './views/spike/Create.vue')
        },
        {
          path: '/spikes/:id/edit',
          name: 'edit',
          component: () => import(/* webpackChunkName: "spike" */ './views/spike/Edit.vue')
        },
      ]
    },
  ]
})
