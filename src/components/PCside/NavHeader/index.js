import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';

class NavHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'isLogin': this.props.isLogin
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            'isLogin': nextProps.isLogin
        });
    }

    renderLogin() {
        let _this = this,
            isLogin = this.state.isLogin;
    
        if (isLogin) {
            return <div className='cursor-selected'>管理</div>
        } else {
            return <div className='cursor-selected'><Link to="/user" className='cursor-selected'>登录</Link></div>
        }
    }

    render() {
        return (
            <div className='navHeader'>
                <div className='navHeader-center'>
                    <div className='navHeader-logo'>
                        <span className='navHeader-logo-img'/>
                        曾杰杰 · 个人网站
                    </div>
                    <div className='navHeader-list'>
                        <div><Link to="/mobile" className='cursor-selected'>手机端</Link></div>
                        <div><a href='https://github.com/cwwjie/myWeb-Client' target='_blank' className='cursor-selected'>源码</a></div>
                    </div>
                    <div className='navHeader-user'>
                        {this.renderLogin.call(this)}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin
})

export default connect(mapStateToProps)(NavHeader);