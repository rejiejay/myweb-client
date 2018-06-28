import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { Modal } from 'antd-mobile';
import userModal from './../../models/user';

import './index.less';

class login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalvisible: false,
            account: '',
            password: '',
        }
    }

    componentDidMount() {
        if (userModal.whetherLogin()) { // 判断 登录
            this.props.dispatch(routerRedux.push('/'));
        }
    }
  
    render() {
        const _this = this;

        const loginSubmit = () => {
            if (_this.state.account === 'rejiejay' && _this.state.password === 'qq1938167' ) {
                localStorage.setItem('rejiejay', JSON.stringify({
                    account: _this.state.account,
                    password: _this.state.password
                }));
                _this.props.dispatch({ type: 'user/setLogin' });
                _this.props.dispatch(routerRedux.push('/'));
            } else {
                _this.setState({modalvisible: true})
            }
        }

        return (
        <div className='login'>
            <Modal
                visible={this.state.modalvisible}
                transparent
                maskClosable={false}
                onClose={() => this.setState({modalvisible: false})}
                title="提示"
                footer={[{ 
                    text: '确认', 
                    onPress: () => this.setState({modalvisible: false}) 
                }]}
            >
                <div>账号密码错误</div>
            </Modal>

            <div className='login-contain'>
                <div className='login-icon'>
                    <img alt='login-icon' src="http://p6ygud9kn.bkt.clouddn.com/resume/rejiejay.png?imageView2/1/w/240/h/240/q/75|imageslim" />
                </div>
                <h1>欢迎来到 Rejiejay Web 站点</h1>
                <div className='login-input login-account'>

                    <input type='text' placeholder='请输入账号'
                    value={this.state.account}
                    onChange={event => this.setState({account: event.target.value})}
                    />
                </div>
                <div className='login-input login-password'>

                    <input type='password' placeholder='请输入密码'
                    value={this.state.password}
                    onChange={event => this.setState({password: event.target.value})}
                    />
                </div>
                <div className='login-operating'>

                    <div className='login-submit cursor-selected' onClick={loginSubmit}>登 录</div>

                    <div
                        className='login-tourists cursor-selected'
                        onClick={() => this.props.dispatch(routerRedux.push('/'))}
                    >使用游客进行访问</div>
                </div>
            </div>
        </div>
        )
    }
}

export default connect()(login);
