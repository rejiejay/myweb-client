// 框架类
import React, { Component } from 'react';
// 样式类
import './style.scss';
// 组件类
import createRandomColor from './../../utils/createRandomColor';
// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

/**
 * 我的所有onenote列表
 * 这个页面不需要做增删查改, 自己写代码发布就可以了, 增删查改的工作量太大
 */
class myOneNoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let list = [
            {
                value: 'english-idea', // 对应 OneNote 里面的分区
                icon: '想法', // 页面显示的名称
                label: '英语d想法', // 页面显示的名称
            }, {
                value: 'english-recite', // 对应 OneNote 里面的分区
                icon: '背诵', // 页面显示的名称
                label: '英语文章-背诵', // 页面显示的名称
            }, 
        ];

        /**
         * 跳转到详情页面
         */
        let jumpToOneNoteDetails = parentSectionId => window.location.href = `./?parentSectionId=${parentSectionId}#/microsoft/onenote/sections`;

        return (
            <div className="microsoft-onenote-list" style={{minHeight: clientHeight}}>
                {list.map((val, key) => (
                    <div className="onenote-item" 
                        style={{width: `${(clientWidth - 15) / 2}px`}}
                        key={key}
                        onClick={() => jumpToOneNoteDetails(val.value)}
                    >
                        <div className="onenote-item-border">
                            <div className="onenote-item-container">
                                <div className="onenote-item-icon flex-center"
                                    style={{backgroundColor: createRandomColor()}}
                                >{val.icon}</div>
                                <div className="onenote-item-describe flex-center">{val.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default myOneNoteList;
