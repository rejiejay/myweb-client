import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import docCookies from './../../../utils/cookies.js';
import Toast from './../../toast';
import config from './../../../config';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isLogin': this.props.isLogin,
      'account': '',
      'password': '',

      'toastIsShow': false,
      'toastMessage': '',
    }
    
    this.renderMain.bind(this);
    this.skipToMain.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      'isLogin': nextProps.isLogin
    });
  }
  
  loginSubmit() {
    let _this = this,
      account = this.state.account,
      password = this.state.password;

    if (account === '' || password === '') {
      this.setState({ 'toastIsShow': true, 'toastMessage': '(＃￣～￣＃) 用户名与密码不能为空' });
      return
    }

    this.setState({ 'toastIsShow': true, 'toastMessage': '' });

    fetch(`${config.basicUrl}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        'account': account,
        'password': password
      })
    }).then(
      (response) => (response.json()),
      (error) => {
        _this.setState({ toastIsShow: true, toastMessage: `提交数据发生错误, 原因: ${error}` })
        return { 'result': 0, 'message': '' }
      }).then((val) => {
        docCookies.removeItem('token');
        if (val.result === 1) {
          _this.setState({ toastIsShow: false, toastMessage: '' });
          docCookies.setItem(
            'token',
            val.data,
            new Date(Date.parse(new Date()) + 86400000)
          );
          _this.props.dispatch({ type: 'user/checkLogin' });
        } else if (val.result === 2) {
          _this.setState({ toastIsShow: true, toastMessage: '(｡•ˇ‸ˇ•｡) 登录失败, 账号密码错误.' });
        } else {
          if (val.message) { _this.setState({ toastIsShow: true, toastMessage: `登录失败, 原因: ${val.message}` }) }
        }
      })
  }

  skipToMain() {
    let myClientWidth = document.body.clientWidth;

    if (myClientWidth <= 768) {
      this.props.dispatch(routerRedux.push('/mobile'));
      return
    }
    this.props.dispatch(routerRedux.push('/'));
  }

  renderMain() {
    let _this = this,
      isLogin = this.state.isLogin;

    if (isLogin) {
      return <div
        className='login-success'
        onClick={() => {_this.skipToMain()}}
      >
        <div className='login-icon'></div>
        <h1>登录成功</h1>
      </div>
    }
    return <div className='login-contain'>
      <div className='login-icon'></div>
      <h1>欢迎来到 Rejiejay Web 站点</h1>
      <div className='login-input login-account'>
        <input type='text' placeholder='请输入账号'
          value={_this.state.account}
          onChange={(event) => { _this.setState({account: event.target.value}) }}
        />
      </div>
      <div className='login-input login-password'>
        <input type='password' placeholder='请输入密码'
          value={_this.state.password}
          onChange={(event) => { _this.setState({password: event.target.value}) }}
        />
      </div>
      <div className='login-operating'>
        <div className='login-submit cursor-selected'
          onClick={() => { _this.loginSubmit.call(_this) }}
        >登 录</div>
        <div
          className='login-tourists cursor-selected'
          onClick={() => {
            docCookies.removeItem('token');
            _this.skipToMain();
          }}
        >使用游客进行访问</div>
      </div>
    </div>
  }

  render() {
    return (
      <div className='login'>
        {this.renderMain.call(this)}
        <Toast
          isShow={this.state.toastIsShow}
          message={this.state.toastMessage}
          hideToast={function () { this.setState({ toastIsShow: false }) }.bind(this)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin
})
  
export default connect(mapStateToProps)(Login);
