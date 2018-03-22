// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';

import store from './store/index';
import router from './router';
import Index from './index.vue';

import './index.less';

// Vue.config.productionTip = false

Vue.use(Vuex);

// 取消首屏加载动画
document.getElementById('loading').innerHTML = '';

/* eslint-disable no-new */
new Vue({
  'el': '#app',
  'store': store,
  'components': { Index },
  'template': '<Index/>',
  router,
});
