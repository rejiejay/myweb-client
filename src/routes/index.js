// import React from 'react';
// import { Router, Route } from 'dva/router';
// // import { routerRedux } from 'dva/router';
// // app._store.dispatch(routerRedux.push('/mobile/preview/index'));
// import dynamic from 'dva/dynamic';

// import isMobile from './../utils/isMobile';

// function RouterConfig({ history, app }) {
//     // 手机端 首页
//     let mobileHome = dynamic({ app, component: () => import('./../views/mobile-new/index') });
//     // 电脑端 首页
//     let pcHome = dynamic({ app, component: () => import('./../views/computer/index') });

//     return (
//         <Router history={history}>
//             <div className="router-content">
//                 {/* 登录页面 */}
//                 <Route path="/user/login" component={dynamic({ app, component: () => import('./../views/user/login') })} />


//                 {/* 重定向的页面, 用于判断是否PC端还是手机端 */}
//                 {isMobile() ? <Route exact path="/" component={mobileHome} /> : <Route exact path="/" component={dynamic({ app, component: () => import('./../views/computer/index') })} />}


//                 {/* PC端口页面 */}
//                 <Route path="/pc/index" component={pcHome} />


//                 {/* 手机端首页 */}
//                 <Route path="/mobile/index" component={mobileHome} />

                
//                 {/* 手机端 - 静态页 */}
//                 <Route path="/mobile/home" component={dynamic({ app, component: () => import('./../views/mobile/index') })} />
//                 {/* 手机端 - 预览页 */}
//                 <Route path="/mobile/preview/index" component={dynamic({ app, component: () => import('./../views/mobile/preview') })} />
//                 {/* 手机端 - 预览 - 编辑页 */}
//                 <Route path="/mobile/preview/edit" component={dynamic({ app, component: () => import('./../views/mobile/preview-edit') })} />
//                 {/* 手机端 - 动态预览 */}
//                 <Route path="/mobile/dynamic/preview" component={dynamic({ app, component: () => import('./../views/mobile/dynamic/preview') })} />
//                 {/* 手机端 - 动态 分组 */}
//                 <Route path="/mobile/dynamic/group" component={dynamic({ app, component: () => import('./../views/mobile/dynamic/group') })} />
//                 {/* 手机端 - 动态 分组 列表 */}
//                 <Route path="/mobile/dynamic/group-list" component={dynamic({ app, component: () => import('./../views/mobile/dynamic/group-list') })} />
//                 {/* 手机端 - 动态 分组 列表 编辑 */}
//                 <Route path="/mobile/dynamic/edit" component={dynamic({ app, component: () => import('./../views/mobile/dynamic/edit') })} />


//                 {/* 英语句子记录 */}
//                 <Route path="/english/list" component={dynamic({ app, component: () => import('./../views/english/list') })} />
//                 {/* 英语句子记录 - 新增部分 */}
//                 <Route path="/english/add" component={dynamic({ app, component: () => import('./../views/english/add') })} />

//                 {/* 新记录页面 */}
//                 <Route path="/record/random" component={dynamic({ app, component: () => import('./../views/newrecord/random') })} />
//                 {/* 新记录 - 编辑页面 */}
//                 <Route path="/record/list" component={dynamic({ app, component: () => import('./../views/newrecord/list') })} />
//                 {/* 新记录 - 编辑页面 */}
//                 <Route path="/record/edit" component={dynamic({ app, component: () => import('./../views/newrecord/edit') })} />
//             </div>
//         </Router>
//     );
// }

// export default RouterConfig;

// 框架类
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// 自定义组件类
import asyncComponent from './../components/asyncComponent';

class RouterConfig extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={asyncComponent(() => import('./../views/Home'))} />
                </Switch>
            </Router>
        );
    }
}

export default RouterConfig;
