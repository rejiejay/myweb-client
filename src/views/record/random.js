/**
 * 首页 PC端口 与 手机端 相同的部分
 */
// 框架类
import React, { Component } from 'react';
import Icon from 'antd-mobile/lib/icon/index';
import Modal from 'antd-mobile/lib/modal/index';
import ReactMarkdown from 'react-markdown';
// 样式类
import 'antd-mobile/lib/icon/style/css';
import 'antd-mobile/lib/modal/style/css';
import './random.scss';
// 请求类
import ajaxs from './../../api/record/random';
// 初始化类
const clientHeight = document.documentElement.clientHeight || window.innerHeight || window.screen.height;

class recordrandom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '正在加载...',
            content: '正在加载...',
        };
    }

    /**
     * 组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求
     */
    componentDidMount() {
        this.getOneByRandom(); // 随机获取一条数据
    }

    getOneByRandom() {
        const _this = this;

        ajaxs.getOneByRandom()
        .then(
            value => {
                _this.id = value.id;
                _this.setState({
                    title: value.title,
                    content: value.content,
                });
            }, error => {
                Modal.alert('获取记录出错', `原因: ${error}`, [
                    { text: '取消' },
                    { text: '重新获取', onPress: () => _this.getOneByRandom() },
                ])
            }
        )
    }

    renderHeader() {
        const _this = this;
        const isLogin = this.props.user_islogin;

        let toHome = () => { // 跳转到主页
            _this.jumpToRouter('/');
        }

        return (
            <div className="preview-header flex-start">    
                <div className="title-icon" onClick={toHome} style={{background: isLogin ? '#1890ff' : '#F56C6C'}}>
                    <Icon type="left" />
                </div>
                <div className="title-input flex-rest" onClick={() => this.junpToEdit('title')} style={{background: isLogin ? '#1890ff' : '#F56C6C'}}>
                    {this.state.title}
                </div>
            </div>
        )
    }

    junpToEdit(autofocuItem) {
        // 存储自动选中
        if (autofocuItem === 'title') { // 自动选中标题
            window.sessionStorage.setItem('autofocus', 'title');
        } else if (autofocuItem === 'content') { // 自动选中标题
            window.sessionStorage.setItem('autofocus', 'content');
        }
        
        // 存储信息
        window.sessionStorage.setItem('rejiejay_record_id', this.id);
        window.sessionStorage.setItem('rejiejay_record_title', this.state.title);
        window.sessionStorage.setItem('rejiejay_record_content', this.state.content);
        this.jumpToRouter('/record/edit');
    }

    // 渲染 Markdown 富文本组件
    renderMDEditor() {
        return (
            <div className="ReactMarkdown"
                style={{minHeight: clientHeight - (40 * 2) - (15 * 2)}}
                onClick={() => this.junpToEdit('content')}
            >
                <ReactMarkdown source={this.state.content} />
            </div>
        );
    }

    // 渲染
    renderOperation() {
        const isLogin = this.props.user_islogin;

        let junpToAdd = () => {
            // 清空掉 sessionStorage 数据就是 新增
            window.sessionStorage.removeItem('rejiejay_record_id');
            window.sessionStorage.removeItem('rejiejay_record_title');
            window.sessionStorage.removeItem('rejiejay_record_content');
            this.jumpToRouter('/record/edit');
        }

        return (
            <div className="mobile-operation">
                <div className="mobile-operation-item"
                    style={{background: isLogin ? '#1890ff' : '#F56C6C'}}
                    onClick={junpToAdd}
                >新增</div>
                <div 
                    className="mobile-operation-item" 
                    style={{background: isLogin ? '#1890ff' : '#F56C6C'}}
                    onClick={this.getOneByRandom.bind(this)}
                >下一篇</div>
            </div>
        );

    }

    render() {
        return (
            <div className="rejiejay-record-random">    
                {this.renderHeader()}

                {this.renderMDEditor()}

                {this.renderOperation()}
            </div>
        )
    }

    /**
     * 跳转到路由
     * @param {object} query 携带的参数 非必填
     */
    jumpToRouter(url, query) {
        window.location.href = `./#${url}`;
    }
}

export default recordrandom;
