/**
 * 首页 PC端口 与 手机端 相同的部分
 */
// 框架类
import React, { Component } from 'react';
import { connect } from 'react-redux';
// 组件类
import './home.scss';

class homepcmobile extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    render() {
        return (
            <div className="homepcmobile">
            <div className="homepcmobile-title flex-center">你好，你<span>{this.props.rejiejay_token ? '已登录' : '未登录'}</span></div>
                <div className="homepcmobile-link" onClick={() => this.jumpToRouter('/reuseme')}>手机端(废弃)</div>
                <div className="homepcmobile-link" onClick={() => this.jumpToRouter('/user/login')}>跳转到登录页面</div>

                <div className="homepcmobile-link-title">英语</div>
                <div className="homepcmobile-link" onClick={() => this.jumpToRouter('/english/list')}>英语记录页</div>
                
                <div className="homepcmobile-link-title">记录</div>
                <div className="homepcmobile-link" onClick={() => this.jumpToRouter('/record/random')}>详情</div>
                <div className="homepcmobile-link" onClick={() => this.jumpToRouter('/record/list')}>列表</div>
            </div>
        );
    }

    /**
     * 跳转到路由
     */
    jumpToRouter(url) {
        window.location.href = `./#${url}`
    }
}

const mapStateToProps = state => {
    return {
        rejiejay_token: state.user.rejiejay_token,
    }
};

export default connect(mapStateToProps)(homepcmobile);
