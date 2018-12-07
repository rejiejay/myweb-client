// 框架类
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// 自定义组件类
import asyncComponent from './../components/asyncComponent';
import rootReducer from './../models';
import isMobile from './../utils/isMobile';

// 将 redux 初始化进去
const store = createStore(rootReducer);

class RouterConfig extends Component {
    render() {
        // 手机端 首页
        let mobileHome = asyncComponent(() => import('./../views/mobile/index'));
        // // 电脑端 首页
        let pcHome = asyncComponent(() => import('./../views/computer/index'));

        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/" exact component={isMobile ? mobileHome : pcHome} />
                        
                        {/* 登录页面 */}
                        <Route path="/user/login" component={asyncComponent(() => import('./../views/user/login'))} />

                        {/* 记录列表 */}
                        <Route path="/record/list" component={asyncComponent(() => import('./../views/record/list'))} />
                        
                        {/* 简历页面 这几个页面新版都会改掉 */}
                        {/* <Route path="/reuseme" component={asyncComponent(() => import('./../views/reuseme/index'))} /> */}

                        {/* 英语 这几个页面新版都会改掉 */}
                        {/* <Route path="/english/list" component={asyncComponent(() => import('./../views/english/list'))} />
                        <Route path="/english/add" component={asyncComponent(() => import('./../views/english/add'))} /> */}

                        {/* 记录页 这几个页面新版都会改掉 */}
                        {/* <Route path="/record/random" component={asyncComponent(() => import('./../views/record/random'))} />
                        <Route path="/record/edit" component={asyncComponent(() => import('./../views/record/edit'))} />
                        <Route path="/record/list" component={asyncComponent(() => import('./../views/record/list'))} /> */}

                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default RouterConfig;
