import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// 当此组件加载的时候使用 
Vue.use(Router);

export default new Router({
  'routes': [
    {
      'path': '/',
      'name': 'HelloWorld',
      'component': () => import(/* webpackChunkName: "HelloWorld" */ '@/components/HelloWorld') // 懒加载
    }
  ]
});
