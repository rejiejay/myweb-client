// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';

// Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(ElementUI);

// 取消首屏加载动画
document.getElementById('loading').innerHTML = '';

/* eslint-disable no-new */
new Vue({
  'el': '#app',
  router,
  // VueRouter : {
  //   afterHooks: []
  //   app: Vue$3 {_uid: 0, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: Vue$3, …}
  //   apps: [Vue$3]
  //   beforeHooks: []
  //   fallback: false
  //   history: HashHistory {router: VueRouter, base: "", current: {…}, pending: null, ready: true, …}
  //   matcher: {match: ƒ, addRoutes: ƒ}
  //   mode: "hash"
  //   options: {routes: Array(1)}
  //   resolveHooks: []
  // }
  'components': { App }, // 本质是组件 包含 Vue 实例可用组件的哈希表。 
  'template': '<App/>' // '<div>A custom component!</div>'
});
