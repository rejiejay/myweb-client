/**
 * 手机端 列表的模态框
 */
// 框架类
import React, { Component } from 'react';
// 样式类
import './index.scss';

// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

class mobileListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let isShow = this.props.isShow; // 用于判断是否显示这个模态框
        let colseHandle = this.props.colseHandle; // 关闭这个模态框触发的函数
        
        return isShow ? (
            <div className="list-modal flex-column-center">

                {/* 遮罩层 */}
                <div className="list-modal-shade" onClick={colseHandle}></div>

                {/* 主要内容区域 */}
                <div className="list-modal-main" 
                    style={{
                        marginTop: '35px',
                        width: `${clientWidth - 60}px`, 
                        height: `${clientHeight - 70}px`
                    }}
                >{this.props.children}</div>
            </div>
        ) : null;
    }
}

export default mobileListModal;
