// 框架类
import React, {Component} from 'react';
// 样式类
import './login.scss';
// 请求类
import ajaxs from "./../../api/login";

let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

class login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: (window.localStorage && window.localStorage.rejiejay_password) ? localStorage.rejiejay_password : '',
        }
    }
  
    render() {
        const _this = this;

        /**
         * 登录的方法
         */
        const loginSubmit = () => {
            if (this.state.password.length !== 6) {
                return alert('密码不正确');
            }

            // 根据密码 登录
            ajaxs.login(this.state.password)
            .then(
                response => {
                    // 处理不同的状态
                    if (response.result === 1) {
                        alert('登录成功!');
                        localStorage.setItem('rejiejay_password', _this.state.password);
                        localStorage.setItem('rejiejay_token', response.data.token);
                        window.history.back(-1);

                    } else if (response.result === 6666) {
                        alert('恭喜你获得彩蛋~你被骗了！');

                    } else {
                        alert(`登录发生错误, 原因: ${response.message}`)
                    }
                    
                }, error => alert(`登录发生错误, 原因: ${error}`)
            )
        }

        /**
         * 弹出模态框的方法
         */
        const getPassword = () => {
            if (window.confirm("关注'Re杰杰'公众号, 回复获取密码。")) {
                // 跳转到我的公众号
                window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIzMzQ4Mjc1NA==&scene=124#wechat_redirect';
            }
        }

        return (
            <div className='login' style={{height: `${clientHeight}px`}}>
                <div className='login-contain'>
                    <div className='login-icon'>
                        <img alt='login-icon' src="https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/page-assets/picture/login-portrait.png" />
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

                        <div className='login-tourists cursor-selected' onClick={getPassword}>获取密码</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default login;
