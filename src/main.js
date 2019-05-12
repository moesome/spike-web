import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import './axios.config.js';
import { Layout } from 'ant-design-vue';
Vue.use(Layout);
import { Row } from 'ant-design-vue';
Vue.use(Row);
import { Col } from 'ant-design-vue';
Vue.use(Col);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
