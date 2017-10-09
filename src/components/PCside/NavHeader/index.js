import React, {Component} from 'react';
import { connect } from 'dva';

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
        let isLogin = this.state.isLogin;
    
        if (isLogin) {
            return <div className='cursor-selected'>管理</div>
        } else {
            return <div className='cursor-selected'>登录</div>
        }
    }

    render() {
        return (
            <div className='navHeader'>
                <div className='row-center'>
                    <div className='navHeader-logo'>
                        <span className='navHeader-logo-img'/>
                        曾杰杰 · 个人网站
                    </div>
                    <div className='navHeader-list'>
                        <div className='cursor-selected'>菜单</div>
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