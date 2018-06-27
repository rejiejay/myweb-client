import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { Icon, Modal, TextareaItem } from 'antd-mobile';

import './preview.less';

const clientWidth = document.documentElement.clientWidth || window.innerWidth || window.screen.width;
const clientHeight = document.documentElement.clientHeight || window.innerHeight || window.screen.height;

class mobile extends Component {
    constructor(props) {
        super(props);

        const initAutoFocus = () => {
            let autofocus = false;
            if (sessionStorage.autofocus) {
                autofocus = sessionStorage.autofocus // 如果有自动选中
            }
            sessionStorage.removeItem('autofocus');
            
            return autofocus
        }

        this.state = {
            isAdd: false, // 整个页面是否是新增
            title: '标题',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.`,
        }
      
        this.autofocus = initAutoFocus(); // false title content
    }

    renderHeader() {
        const _this = this;

        const turnBack = () => { // 返回上一页
          _this.props.dispatch(routerRedux.goBack());
        }

        const renderInputFocus = () => { // 渲染自动选中
            if (_this.autofocus && _this.autofocus === 'title') {
                return (
                    <input 
                        className="title-input" 
                        style={{width: clientWidth - 42 - 60}}
                        value={_this.state.title}
                        onChange={(event) => this.setState({title: event})}
                        placeholder="请输入动态记录标题"
                        autoFocus
                    />
                )
            } else {
                return (
                    <input 
                        className="title-input" 
                        style={{width: clientWidth - 42 - 60}}
                        value={_this.state.title}
                        onChange={(event) => this.setState({title: event})}
                        placeholder="请输入动态记录标题"
                    />
                )
            }
        }

        return (
            <div className="edit-header">
                <div 
                    className="title-icon"
                    onClick={turnBack}
                >
                    <Icon type="left" />
                </div>
                
                {renderInputFocus()}

                <div className="title-complete"
                >完成</div>
            </div>
        )
    }

    // 渲染 Markdown 富文本组件
    renderMDEditor() {
        const _this = this;
  
        const renderInputFocus = () => { // 渲染自动选中
            if (_this.autofocus && _this.autofocus === 'content') {
                return (
                    <TextareaItem
                        value={_this.state.content}
                        placeholder="请输入动态与记录"
                        autoHeight
                        onChange={(event) => this.setState({content: event})}
                        autoFocus
                    />
                )
            } else {
                return (
                    <TextareaItem
                        value={_this.state.content}
                        placeholder="请输入动态与记录"
                        onChange={(event) => this.setState({content: event})}
                        autoHeight
                    />
                )
            }
        }
  
        return (
            <div className="edit-input"
                style={{minHeight: clientHeight - (40 * 2)}}
            >
                {renderInputFocus()}
            </div>
        );
    }

    junpToEdit(autofocuItem) {
        if (autofocuItem === 'title') { // 自动选中标题
            sessionStorage.setItem('autofocus', 'title');
        } else if (autofocuItem === 'content') { // 自动选中标题
            sessionStorage.setItem('autofocus', 'content');
        }
        this.props.dispatch(routerRedux.push('/mobile/edit'))
    }

    // 渲染 删除按钮
    renderDelBtn() {
        const deleteHandle = () => {
            Modal.alert('删除', '你确定删除吗???', [
                { 
                    text: '确定', 
                    onPress: () => {
                        console.log('ok')
                    }, 
                    style: {
                        color: '#108ee9'
                    }
                }, { 
                    text: '取消', 
                    style: {
                        color: '#000'
                    }
                }, 
            ]);
        }

        return (
            <div className="preview-edit-delete"
                onClick={deleteHandle}
            >
                <svg t="1525580014005" viewBox="0 0 1024 1024" p-id="5532"
                    width="32" height="32">
                    <path d="M967.111111 173.511111H56.888889c-8.533333 0-14.222222-2.844444-19.911111-5.688889-5.688889-5.688889-8.533333-14.222222-8.533334-22.755555s2.844444-14.222222 8.533334-19.911111c5.688889-5.688889 11.377778-8.533333 19.911111-8.533334h910.222222c8.533333 0 14.222222 2.844444 19.911111 8.533334 5.688889 5.688889 8.533333 11.377778 8.533334 19.911111 0 8.533333-2.844444 14.222222-8.533334 19.911111-5.688889 5.688889-11.377778 8.533333-19.911111 8.533333zM674.133333 56.888889H349.866667c-8.533333 0-14.222222 0-19.911111-5.688889s-8.533333-11.377778-8.533334-19.911111 2.844444-14.222222 8.533334-19.911111c5.688889-8.533333 11.377778-11.377778 19.911111-11.377778h321.422222c8.533333 0 14.222222 2.844444 19.911111 8.533333s8.533333 11.377778 8.533333 19.911111-2.844444 14.222222-8.533333 19.911112-8.533333 8.533333-17.066667 8.533333zM381.155556 819.2V321.422222c0-8.533333 2.844444-14.222222 8.533333-19.911111s11.377778-8.533333 19.911111-8.533333 14.222222 2.844444 19.911111 8.533333c5.688889 5.688889 8.533333 11.377778 8.533333 19.911111v497.777778c0 8.533333-2.844444 14.222222-8.533333 19.911111-5.688889 5.688889-11.377778 8.533333-19.911111 8.533333s-14.222222-2.844444-19.911111-8.533333c-5.688889-5.688889-8.533333-11.377778-8.533333-19.911111z m204.8 0V321.422222c0-8.533333 2.844444-14.222222 8.533333-19.911111 5.688889-5.688889 11.377778-8.533333 19.911111-8.533333 8.533333 0 14.222222 2.844444 19.911111 8.533333s8.533333 11.377778 8.533333 19.911111v497.777778c0 8.533333-2.844444 14.222222-8.533333 19.911111-5.688889 5.688889-11.377778 8.533333-19.911111 8.533333-8.533333 0-14.222222-2.844444-19.911111-8.533333-5.688889-5.688889-8.533333-11.377778-8.533333-19.911111zM153.6 273.066667c5.688889-5.688889 11.377778-8.533333 19.911111-8.533334 8.533333 0 14.222222 2.844444 19.911111 8.533334s8.533333 11.377778 8.533334 19.911111v614.4c0 17.066667 5.688889 31.288889 17.066666 42.666666 14.222222 11.377778 28.444444 17.066667 45.511111 17.066667h497.777778c17.066667 0 31.288889-5.688889 42.666667-17.066667 11.377778-11.377778 17.066667-25.6 17.066666-42.666666V292.977778c0-8.533333 2.844444-14.222222 8.533334-19.911111 5.688889-5.688889 14.222222-8.533333 19.911111-8.533334 8.533333 0 14.222222 2.844444 19.911111 8.533334s8.533333 11.377778 8.533333 19.911111v642.844444c0 25.6-8.533333 45.511111-25.6 62.577778-17.066667 17.066667-36.977778 25.6-62.577777 25.6H233.244444c-25.6 0-45.511111-8.533333-62.577777-25.6-17.066667-17.066667-25.6-36.977778-25.6-62.577778V292.977778c0-8.533333 2.844444-14.222222 8.533333-19.911111z" 
                        fill="#606266" p-id="5533">
                    </path>
                </svg>
            </div>
        );
    }

    render() {
        return (
            <div className="mobile-preview-edit">    
                {this.renderHeader()}

                {this.renderMDEditor()}

                {this.renderDelBtn()}
            </div>
        )
    }
}

export default connect()(mobile);
