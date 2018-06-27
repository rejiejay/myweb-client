import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { Icon } from 'antd-mobile';
import ReactMarkdown from 'react-markdown';

import './preview.less';

const clientHeight = document.documentElement.clientHeight || window.innerHeight || window.screen.height;

class mobile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '标题',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.`,
        }
    }

    renderHeader() {
        const _this = this;

        let toHome = () => { // 跳转到主页
            _this.props.dispatch(routerRedux.push('/mobile/index'));
        }

        return (
            <div className="preview-header flex-start">    
                <div className="title-icon" onClick={toHome}>
                    <Icon type="left" />
                </div>
                <div className="title-input flex-rest" onClick={() => this.junpToEdit('title')}>
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
        let junpToAdd = () => {
            this.props.dispatch(routerRedux.push('/mobile/preview/edit'))
        }

        return (
            <div className="mobile-operation">
                <div className="mobile-operation-item"
                    onClick={junpToAdd}
                >新增</div>
                <div className="mobile-operation-item">下一篇</div>
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

export default connect()(mobile);
