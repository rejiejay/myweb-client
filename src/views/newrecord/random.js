/**
 * 首页 PC端口 与 手机端 相同的部分
 */
// 框架类
import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Modal, Toast } from 'antd-mobile';
import ReactMarkdown from 'react-markdown';
// 组件类
import './random.less';
// 轻轻类
import ajaxs from './../../api/newrecord/random';
// 初始化类
const clientHeight = document.documentElement.clientHeight || window.innerHeight || window.screen.height;

class recordrandom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '正在加载...',
            content: '正在加载...',
        };
        this.id = props.previewId;

        // 如果数据未被清空, 说明编辑状态下未提交啥的
        if ( props.previewTitle && props.previewContent ) {
            this.state = {
                title: props.previewTitle,
                content: props.previewContent,
            }
        }
    }

    /**
     * 组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求
     */
    componentDidMount() {
        const _this = this;
        
        this.getOneByRandom(); // 随机获取一条数据
    }

    getOneByRandom() {
        const _this = this;

        ajaxs.getOneByRandom().then(
            value => {
                _this.id = value.id;
                _this.setState({
                    title: value.title,
                    content: value.content,
                });
                _this.props.dispatch({ // 存储一下状态
                    type: 'index/setPreviewId',
                    id: value.id,
                    year: value.year,
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
            _this.props.dispatch(routerRedux.push('/mobile/index'));
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
            sessionStorage.setItem('autofocus', 'title');
        } else if (autofocuItem === 'content') { // 自动选中标题
            sessionStorage.setItem('autofocus', 'content');
        }
        
        // 存储信息 目的是为了进行对比
        sessionStorage.setItem('previewTitle', this.props.previewTitle);
        sessionStorage.setItem('previewContent', this.props.previewContent);
        this.props.dispatch(routerRedux.push('/mobile/preview/edit'))
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

        let junpToAdd = () => { // 只要不设置 previewId 就是新增
            this.props.dispatch({type: 'index/clearPreview'}); // 清空一下状态
            this.props.dispatch(routerRedux.push('/mobile/preview/edit'))
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
        let routerConfig = {
            pathname: url,
        }

        query ? routerConfig.query = query : null; // 初始化携带的参数 非必填

        this.props.dispatch(routerRedux.push(routerConfig));
    }
}

const mapStateToProps = (state) => ({
    user_islogin: state.user.isLogin,
    previewId: state.index.previewId,
    previewYear: state.index.previewYear,
    previewTitle: state.index.previewTitle,
    previewContent: state.index.previewContent,
});

export default connect(mapStateToProps)(recordrandom);
