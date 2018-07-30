import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { Icon, Modal, Toast } from 'antd-mobile';
import ReactMarkdown from 'react-markdown';

import './preview.less';

import ajaxs from './ajaxs';

const clientHeight = document.documentElement.clientHeight || window.innerHeight || window.screen.height;

class mobile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '正在加载...',
            content: '正在加载...',
        }
        this.id = props.previewId;

        if ( // 如果数据未被清空, 说明编辑状态下未提交啥的
            props.previewTitle &&
            props.previewContent
        ) {
            this.state = {
                title: props.previewTitle,
                content: props.previewContent,
            }
        }
    }

    // 组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求
    componentDidMount() {
        const _this = this;
        // 判断是否提交
        if (sessionStorage.isPreviewSave === 'true') { // 表示已经提交过了
            sessionStorage.removeItem('isPreviewSave'); // 仅一次
        } else { // 表示未提交
            // 判断是否从编辑页面返回
            if ( // 从编辑页面返回的情况
                this.props.previewTitle &&
                this.props.previewContent
            ) {
                // 判断从编辑页面返回的是 新增状态 还是 编辑状态
                if (this.props.previewId) { // 编辑状态

                } else { // 新增状态
                    Toast.loading('正在保存', 5); // 显示 正在保存
                    ajaxs.saveRecord(this.props.previewTitle, this.props.previewContent)
                    .then(
                        value => {
                            Toast.hide();
                            // 成功 保存状态
                            _this.props.dispatch({
                                type: 'index/setPreviewId',
                                id: value.id,
                                year: new Date().getFullYear(),
                                title: value.title,
                                content: value.content,
                            });
                        }, error => {
                            Toast.hide();
                            Modal.alert('自动保存记录出错', `原因: ${error}`, [
                                { text: '确定' },
                            ]);
                        }
                    );
                }
            } else { // 不是从编辑页面返回
                this.getOneByRandom(); // 随机获取一条数据
            }
        }
    }

    getOneByRandom() {
        const _this = this;

        Toast.loading('正在加载', 5); // 显示 正在加载
        ajaxs.getOneByRandom().then(
            value => {
                Toast.hide();
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
                Toast.hide();
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
        if (autofocuItem === 'title') { // 自动选中标题
            sessionStorage.setItem('autofocus', 'title');
        } else if (autofocuItem === 'content') { // 自动选中标题
            sessionStorage.setItem('autofocus', 'content');
        }
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
            <div className="mobile-preview">    
                {this.renderHeader()}

                {this.renderMDEditor()}

                {this.renderOperation()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
  user_islogin: state.user.isLogin,
  previewId: state.index.previewId,
  previewTitle: state.index.previewTitle,
  previewContent: state.index.previewContent,
})

export default connect(mapStateToProps)(mobile);
