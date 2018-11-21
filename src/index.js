// 框架类
import React from 'react';
import ReactDOM from 'react-dom';
// 自定义组件类
import RouterConfig from './routes/index';
import modelsInit from './models/init';
// css 样式类
import './index.scss';

// 渲染 react 组件
ReactDOM.render(<RouterConfig />, document.getElementById('root'));

// 初始化 顶层数据
modelsInit.all();

// 清空 '预加载' 样式
document.getElementById('loading').innerHTML = '';
