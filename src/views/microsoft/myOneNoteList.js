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
                value: 'english-recite', 
                icon: '背诵',
                label: '英语文章-背诵',
            }, {
                value: 'zhihu', 
                icon: '知乎',
                label: '待消化的知识',
            }, {
                value: 'gong-wu-yuan', 
                icon: '公务员',
                label: '相关知识点',
            },
        ];

        /**
         * 跳转到详情页面
         */
        let jumpToOneNoteDetails = sections => window.location.href = `./?sections=${sections}#/microsoft/onenote/sections`;

        return (
            <div className="microsoft-onenote-list" style={{minHeight: `${(clientHeight - 30)}px`}}>
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
                
                <div className="my-microsoft-operate flex-center">
                    <div className="microsoft-operate-botton" onClick={() => window.location.href = '#/microsoft/onenote/pages'}>刷新数据</div>
                </div>
            </div>
        );
    }
}

export default myOneNoteList;
