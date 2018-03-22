import Vue from 'vue';
import Router from 'vue-router';

import isMobile from './../utils/isMobile';

// 异步组件 Webpack 2 动态 import 定义代码分块点 (split point) 实现路由组件的懒加载
const PC = () => import('./PC/index');
const Mobile = () => import('./Mobile/index');

Vue.use(Router);

let configuration = {
  config: {
    routes: [
    ]
  },

  initHomePage() {
    if (isMobile) {
      let routes = this.config.routes.concat({
        path: '/',
        name: 'Mobile',
        alias: '/Mobile',
        component: Mobile
      }, {
        path: '/PC',
        name: 'PC',
        component: PC
      });

      this.config.routes = routes;
    } else {
      let routes = this.config.routes.concat({
        path: '/',
        name: 'PC',
        alias: '/PC',
        component: PC
      },{
        path: '/Mobile',
        name: 'Mobile',
        component: Mobile
      });

      this.config.routes = routes;
    }
  },

  init() {
    this.initHomePage();

    return this.config;
  }
}

export default new Router(configuration.init());
