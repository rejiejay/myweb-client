import React from 'react';
import { Router, Route } from 'dva/router';
// import { routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';

import isMobile from './../utils/isMobile';
import indexModel from './../models/index';
import dynamicModel from './../models/dynamic';
import userModel from './../models/user';

function RouterConfig({ history, app }) {

    indexModel.init(app);
    dynamicModel.init(app);
    userModel.init(app);

    return (
        <Router history={history}>
            <div className="router-content">

                {/* 重定向的页面 */}
                {browserRedirect(app)}


                {/* PC端口页面 */}
                <Route path="/pc/index" component={dynamic({ app, component: () => import('./../views/computer/index') })} />


                {/* 手机端首页 */}
                <Route path="/mobile/index" component={dynamic({ app, component: () => import('./../views/mobile/index') })} />
                {/* 手机端预览页 */}
                <Route path="/mobile/preview/index" component={dynamic({ app, component: () => import('./../views/mobile/preview') })} />
                <Route path="/mobile/preview/edit" component={dynamic({ app, component: () => import('./../views/mobile/preview-edit') })} />
                <Route path="/mobile/dynamic/preview" component={dynamic({ app, component: () => import('./../views/mobile/dynamic/preview') })} />
                <Route path="/mobile/dynamic/group" component={dynamic({ app, component: () => import('./../views/mobile/dynamic/group') })} />
                <Route path="/mobile/dynamic/group-list" component={dynamic({ app, component: () => import('./../views/mobile/dynamic/group-list') })} />
                <Route path="/mobile/dynamic/edit" component={dynamic({ app, component: () => import('./../views/mobile/dynamic/edit') })} />

                {/* 登录页面 */}
                <Route path="/user/login" component={dynamic({ app, component: () => import('./../views/user/login') })} />
            </div>
        </Router>
    );
}

/**
 * 用于判断是否PC端还是手机端的方法
 */
function browserRedirect(app) {
    /**
     * 判断一下是否手机端
     */
    if (isMobile()) {
        /**
         * 判断是否有参数, 
         * 有参数说明一定是进行操作的，所以跳到在预览页面
         * 因为预览页面就是根据ID进行查询
         */
        // if (window.location.href.indexOf('?') === -1 && window.location.hash !== '#/mobile/preview/index') {
        //     app._store.dispatch(routerRedux.push('/mobile/preview/index'));
        // }
        return (
            <Route exact path="/" component={dynamic({ app, component: () => import('./../views/mobile/index') })} />
        )
    } else {

        return (
            <Route exact path="/" component={dynamic({ app, component: () => import('./../views/computer/index') })} />
        )
    }
}

export default RouterConfig;
