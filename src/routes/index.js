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
                        {/* 首页 */}
                        <Route path="/" exact component={isMobile ? mobileHome : pcHome} />
                        <Route path="/computer" exact component={pcHome} />
                        <Route path="/mobile" exact component={mobileHome} />

                        {/* 测试 */}
                        <Route path="/test" component={asyncComponent(() => import('./../views/test/index'))} />

                        {/* 登录页面 */}
                        <Route path="/user/login" component={asyncComponent(() => import('./../views/user/login'))} />

                        {/* 简历页 */}
                        <Route path="/reuseme/list" component={asyncComponent(() => import('./../views/reuseme/index'))} />
                        <Route path="/reuseme/details" component={asyncComponent(() => import('./../views/reuseme/details'))} />

                        {/* 记录列表 */}
                        <Route path="/record/list" component={asyncComponent(() => import('./../views/record/list'))} />

                        {/* 英语列表 */}
                        <Route path="/english/list" component={asyncComponent(() => import('./../views/english'))} />
                        <Route path="/english/recite" component={asyncComponent(() => import('./../views/english/recite'))} />
                        
                        {/* 微软 */}
                        <Route path="/microsoft/test" component={asyncComponent(() => import('./../views/microsoft/test'))} />{/* 用于测试页面 */}
                        <Route path="/microsoft/onenote/pages" component={asyncComponent(() => import('./../views/microsoft/getAllPages'))} />{/* 获取 OneNote notebook 所有的 pages */}
                        <Route path="/microsoft/onenote/sections" component={asyncComponent(() => import('./../views/microsoft/getSectionsByUrl'))} />{/* 根据Url的名称获取笔记本的分区 */}
                        <Route path="/microsoft/onenote/list" component={asyncComponent(() => import('./../views/microsoft/myOneNoteList'))} />{/* 我的所有onenote列表 */}
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default RouterConfig;
