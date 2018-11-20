// 框架类
import React, {Component} from 'react';
// 样式类
import './index.scss';
// 请求类
import ajaxs from "./../../api/login/index";

class login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: (window.localStorage && window.localStorage.rejiejay_password) ? localStorage.rejiejay_password : '',
        }
    }
  
    render() {
        const _this = this;

        const loginSubmit = () => {
            if (this.state.password.length !== 6) {
                return alert('密码不正确');
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
                        window.history.back(-1)

                    } else if (response.result === 6666) {
                        alert('恭喜你获得彩蛋~你被骗了！');

                    } else {
                        alert(`登录发生错误, 原因: ${response.message}`)
                    }
                }, error => alert(`登录发生错误, 原因: ${error}`)
            )
        }

        const getPassword = () => {
            if (window.confirm("关注'Re杰杰'公众号, 回复获取密码。")) {
                window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIzMzQ4Mjc1NA==&scene=124#wechat_redirect';
            }
        }

        return (
            <div className='login'>
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

                        <div className='login-tourists cursor-selected' onClick={getPassword}>获取密码</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default login;
