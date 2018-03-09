import React, {Component} from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

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
            return <div className='navHeader-login'>ヾ(◍°∇°◍)ﾉﾞ</div>
        } else {
            return <div className='navHeader-login'><Link to="/user">登录</Link></div>
        }
    }

    render() {
        return (
            <div className='navHeader'>
                <span>
                    <div className='navHeader-logo'></div>
                    <div className='navHeader-SeparLine'></div>
                    <div className='navHeader-Menu'>Menu</div>
                </span>
                {this.renderLogin.call(this)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin
})

export default connect(mapStateToProps)(NavHeader);