import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import axios from 'axios';
import { Modal } from 'antd-mobile';

import config from './../../config';

import './index.less';

let ajaxs = {
    /**
     * 登录
     * @param {string} password 必填 密码
     * @return {Promise} resolve(true) reject(error)
     */
    login(password) {
        return new Promise((resolve, reject) => {
            axios.get(`${config.url}/user/login?password=${password}`)
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(response.statusText);
                }
            })
            .catch(error => reject(error))
        });
    }
}

class login extends Component {
    constructor(props) {
        super(props);

        let initPassword = () => {
            if (window.localStorage && window.localStorage.rejiejay_password) {
                return localStorage.rejiejay_password;
            } else {
                return '';
            }
        }

        this.state = {
            // 模态框
            modal: {
                visible: false,
                content: ''
            },
            modalvisible: true,
            password: initPassword(),
        }
    }
  
    render() {
        const _this = this;

        const loginSubmit = () => {
            if (this.state.password.length !== 6) {
                return this.setState({modal: {
                    visible: true,
                    content: '密码不正确'
                }});
            }

            // 登录
            ajaxs.login(this.state.password)
            .then(
                response => {
                    // 成功
                    if (response.result === 1) {
                        alert('登录成功!');
                        localStorage.setItem('rejiejay_password', _this.state.password);
                        localStorage.setItem('rejiejay_token', response.data.token);
                        _this.props.dispatch(routerRedux.push('/'));
                    } else if (response.result === 6666) {
                        _this.setState({modal: {
                            visible: true,
                            content: '恭喜你获得彩蛋~你被骗了！'
                        }});
                    } else {
                        _this.setState({modal: {
                            visible: true,
                            content: `登录发生错误, 原因: ${response.message}`
                        }});
                    }
                }, error => _this.setState({modal: {
                    visible: true,
                    content: `登录发生错误, 原因: ${error}`
                }})
            )

            // if (_this.state.account === 'rejiejay' && _this.state.password === 'qq1938167' ) {
            //     localStorage.setItem('rejiejay', JSON.stringify({
            //         account: _this.state.account,
            //         password: _this.state.password
            //     }));
            //     _this.props.dispatch({ type: 'user/setLogin' });
            //     _this.props.dispatch(routerRedux.push('/'));
            // } else {
            //     _this.setState({modal: true})
            // }
        }

        const getPassword = () => {
            if (window.confirm) {
                if (window.confirm("关注'Re杰杰'公众号, 回复获取密码。")) {
                    window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIzMzQ4Mjc1NA==&scene=124#wechat_redirect';
                }
            } else {
                _this.setState({modal: {
                    visible: true,
                    content: "关注'Re杰杰'公众号, 回复获取密码。"
                }})
            }
        }

        return (
        <div className='login'>
            <Modal
                visible={this.state.modal.visible}
                transparent
                maskClosable={false}
                onClose={() => this.setState({modal: {visible: false, content: ''}})}
                title="提示"
                footer={[{ 
                    text: '确认', 
                    onPress: () => this.setState({modal: {visible: false, content: ''}}) 
                }]}
            >
                <div>{this.state.modal.content}</div>
            </Modal>

            <div className='login-contain'>
                <div className='login-icon'>
                    <img alt='login-icon' src="http://p6ygud9kn.bkt.clouddn.com/resume/rejiejay.png?imageView2/1/w/240/h/240/q/75|imageslim" />
                </div>
                <h1>欢迎来到 Rejiejay Web 站点</h1>
                <div className='login-input login-password'>

                    <input type='text' placeholder='请输入密码'
                    value={this.state.password}
                    onChange={event => this.setState({password: event.target.value})}
                    />
                </div>
                <div className='login-operating'>

                    <div className='login-submit cursor-selected' onClick={loginSubmit}>登 录</div>

                    <div
                        className='login-tourists cursor-selected'
                        onClick={getPassword}
                    >获取密码</div>
                </div>
            </div>
        </div>
        )
    }
}

export default connect()(login);
