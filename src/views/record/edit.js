/**
 * 编辑页面
 */
import React, {Component} from 'react';
import Icon from 'antd-mobile/lib/icon/index';
import Modal from 'antd-mobile/lib/modal/index';
import TextareaItem from 'antd-mobile/lib/textarea-item/index';
// 样式类
import 'antd-mobile/lib/icon/style/css';
import 'antd-mobile/lib/modal/style/css';
import 'antd-mobile/lib/textarea-item/style/css';
import './edit.scss';
// 请求
import ajaxs from './../../api/record/edit';
// 组件类
import convertTime from './../../utils/convertTime.js';
// 初始化类
const clientWidth = document.documentElement.clientWidth || window.innerWidth || window.screen.width;
const clientHeight = document.documentElement.clientHeight || window.innerHeight || window.screen.height;

class recordedit extends Component {
    constructor(props) {
        super(props);

        /**
         * 实现自动选中功能
         * @return {boolean/string} false title content
         */
        const initAutoFocus = () => {
            let autofocus = false;
            if (sessionStorage.autofocus) {
                autofocus = sessionStorage.autofocus // 如果有自动选中
            }
            sessionStorage.removeItem('autofocus');
            
            return autofocus
        }

        this.state = {
            title: window.sessionStorage.rejiejay_record_title ? window.sessionStorage.rejiejay_record_title : '',
            content: window.sessionStorage.rejiejay_record_content ? window.sessionStorage.rejiejay_record_content : '',
        }
      
        this.autofocus = initAutoFocus();
    }

    renderHeader() {
        const _this = this;
        const isLogin = this.props.user_islogin; // 本来这个是用来判断登录的，这个需求 暂时这样吧，以后再弄
        
        /**
         * 返回上一页
         */
        const turnBack = () => {
            window.history.back(-1);
        }

        /**
         * 提交
         */
        const submit = () => {
            let title = this.state.title;
            let content = this.state.content;

            if (content === '') {
                return Modal.alert('提示', '内容不能为空', [
                    { text: '确定' },
                ]);
            }

            if (title === '') {
                title = `记录${convertTime.dateToYYYYmmDDhhMM(new Date())}`
            }

            // 判断是否编辑
            if (window.sessionStorage.rejiejay_record_id) { // 表示编辑状态
                ajaxs.editRecord(
                    _this,
                    window.sessionStorage.rejiejay_record_id, 
                    '2018', // 这个以后删掉，这个需求是伪需求
                    title, 
                    content
                ).then(
                    value => {
                        // 成功 保存状态 并且返回上一页
                        // 暂时不做
                        // sessionStorage.setItem('isPreviewSave', 'true'); // 表示已经提交了
                        // _this.props.dispatch({
                        //     type: 'index/setPreviewId',
                        //     id: value.id,
                        //     year: value.year,
                        //     title: value.title,
                        //     content: value.content,
                        // });
                        alert('修改成功');
                        turnBack();

                    }, error => {
                        Modal.alert('修改记录出错', `原因: ${error}`, [
                            { text: '确定' },
                        ]);
                    }
                );
                
            } else {
                ajaxs.saveRecord(this, title, content)
                .then(
                    value => {
                        // 成功 保存状态 并且返回上一页
                        // 暂时不做
                        // sessionStorage.setItem('isPreviewSave', 'true'); // 表示已经提交了
                        //     _this.props.dispatch({
                        //     type: 'index/setPreviewId',
                        //     id: value.id,
                        //     year: new Date().getFullYear(), // 新增使用的是现在的年份
                        //     title: value.title,
                        //     content: value.content,
                        // });

                        alert('保存成功');
                        turnBack();
                        
                    }, error => {
                        Modal.alert('保存记录出错', `原因: ${error}`, [
                            { text: '确定' },
                        ]);
                    }
                );
            }
        }

        /**
         * 渲染输入框
         */
        const renderInputFocus = () => { 
            const InputTitleHandle = event => {
                // _this.props.dispatch({
                //     type: 'index/setPreviewTitle',
                //     title: event.target.value
                // });
                _this.setState({title: event.target.value})
            }

            return (
                <input 
                    className="title-input" 
                    style={{width: clientWidth - 42 - 60, background: isLogin ? '#1890ff' : '#F56C6C'}}
                    value={_this.state.title}
                    onChange={InputTitleHandle}
                    placeholder="请输入动态记录标题"
                    autoFocus={(_this.autofocus && _this.autofocus === 'title') ? true : false }
                />
            )
        }


        return (
            <div className="edit-header" style={{background: isLogin ? '#1890ff' : '#F56C6C'}}>
                <div 
                    className="title-icon"
                    onClick={turnBack}
                    style={{background: isLogin ? '#1890ff' : '#F56C6C'}}
                >
                    <Icon type="left" />
                </div>
                
                {renderInputFocus()}

                <div className="title-complete"
                    style={{background: isLogin ? '#1890ff' : '#F56C6C'}}
                    onClick={submit}
                >完成</div>
            </div>
        )
    }

    // 渲染 Markdown 富文本组件
    renderMDEditor() {
        const _this = this;
  
        let minHeight = () => {
            if (window.sessionStorage.rejiejay_record_id) { // 编辑状态下
                return clientHeight - 80
            } else {
                return clientHeight - 40
            }
        }

        /**
         * 渲染输入框
         */
        const renderInputFocus = () => {
            const InputContentHandle = value => {
                // _this.props.dispatch({
                //     type: 'index/setPreviewContent',
                //     content: value
                // });
                _this.setState({content: value});
            }

            return (
                <TextareaItem
                    value={_this.state.content}
                    placeholder="请输入动态与记录"
                    autoHeight
                    onChange={InputContentHandle}
                    style={{minHeight: minHeight() - 30}}
                    autoFocus={(_this.autofocus && _this.autofocus === 'content') ? true : false}
                />
            )
        }
  
        return (
            <div className="edit-input"
                style={{minHeight: minHeight()}}
            >
                {renderInputFocus()}
            </div>
        );
    }

    /**
     * 渲染 删除按钮
     */
    renderDelBtn() {
        const _this = this;
        const deleteHandle = () => {
            Modal.alert('删除', '你确定删除吗???', [
                { 
                    text: '确定', 
                    onPress: () => {
                        ajaxs.deleteRecord(
                            _this,
                            window.sessionStorage.rejiejay_record_id, 
                            '2018', // 这个以后删掉，这个需求是伪需求
                        ).then(() => {
                                window.history.back(-1);

                        }, error => {
                                Modal.alert('删除记录出错', `原因: ${error}`, [
                                    { text: '确定' },
                                ]);
                        });
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

        // 判断页面是否编辑
        if (window.sessionStorage.rejiejay_record_id) {
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
    }

    render() {
        return (
            <div className="rejiejay-record-edit">    
                {this.renderHeader()}

                {this.renderMDEditor()}

                {this.renderDelBtn()}
            </div>
        )
    }
}

export default recordedit;
