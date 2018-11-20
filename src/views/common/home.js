/**
 * 首页 PC端口 与 手机端 相同的部分
 */
// 框架类
import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
// 组件类
import './home.less';

class homepcmobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="homepcmobile">
            <div className="homepcmobile-title flex-center">你好，你<span>{this.props.user_islogin ? '已登录' : '未登录'}</span></div>

                <div className="homepcmobile-link" onClick={() => this.jumpToRouter('/english/list')}>跳转到 英语记录页</div>
                <div className="homepcmobile-link" onClick={() => this.jumpToRouter('/mobile/home')}>跳转到手机端首页</div>
                <div className="homepcmobile-link" onClick={() => this.jumpToRouter('/record/random')}>跳转到记录页</div>
                <div className="homepcmobile-link" onClick={() => this.jumpToRouter('/record/list')}>跳转到记录列表页</div>
                <div className="homepcmobile-link" onClick={() => this.jumpToRouter('/user/login')}>跳转到登录页面</div>
            </div>
        );
    }

    /**
     * 跳转到路由
     * @param {object} query 携带的参数 非必填
     */
    jumpToRouter(url, query) {
        let routerConfig = {
            pathname: url,
        }

        query ? routerConfig.query = query : null; // 初始化携带的参数 非必填

        this.props.dispatch(routerRedux.push(routerConfig));
    }
}

const mapStateToProps = (state) => ({
    user_islogin: state.user.isLogin,
});

export default connect(mapStateToProps)(homepcmobile);
