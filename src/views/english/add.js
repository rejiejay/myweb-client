/**
 * 首页 PC端口 与 手机端 相同的部分
 */
// 框架类
import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
// 组件类
import { TextareaItem } from 'antd-mobile';
import './add.less';
// 请求类
import ajaxs from './../../api/english/add';
// 初始化

class englishAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            en_text: '', // 英文内容
            zh_text: '', // 中文内容
        };
    }

    render() {
        const _this = this;
        /**
         * 输入框输入处理函数
         * @param {string} val 修改的值
         * @param {string} key 修改所对应的键
         */
        let handleChange = (val, key) => {
            if (key === 'zh_text') {
                _this.setState({zh_text: val});
            } else {
                _this.setState({en_text: val});
            }
        }

        /**
         * 新增提交
         */
        let submit = () => {
            ajaxs.add(this.state.en_text, this.state.zh_text, this)
            .then(
                res => {
                    _this.props.dispatch(routerRedux.goBack());
                }, error => {
                    alert(error);
                }
            )
        }

        return (
            <div className="rejiejay-english-add">
                
                <div className="english-add-title flex-center">请注意，你<span>{this.props.user_islogin ? '已登录' : '未登录'}</span></div>

                <div className="english-add-input">
                    <TextareaItem
                        value={this.state.en_text}
                        onChange={value => handleChange(value, 'en_text')}
                        placeholder="Please input English"
                        autoHeight
                        style={{minHeight: 75}}
                    />
                </div>
                
                <div className="english-add-input">
                    <TextareaItem
                        value={this.state.zh_text}
                        onChange={value => handleChange(value, 'zh_text')}
                        placeholder="请输入翻译"
                        autoHeight
                        style={{minHeight: 75}}
                    />
                </div>

                <div className="english-add-submit" onClick={submit}>提交</div>
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

export default connect(mapStateToProps)(englishAdd);
