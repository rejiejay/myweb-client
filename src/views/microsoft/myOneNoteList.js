// 框架类
import React, { Component } from 'react';
// 样式类
import './style.scss';
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
                value: '', // 对应 OneNote 里面的分区
                label: '', // 页面显示的名称
                describe: '', // 可有可无的描述
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/page-assets/picture/very_sorry.png', // 图片
            }, 
        ];

        /**
         * 跳转到详情页面
         */
        let jumpToOneNoteDetails = parentSectionId => window.location.href = `./?parentSectionId=${parentSectionId}#/microsoft/onenote/sections`;

        return (
            <div className="microsoft-onenote-list" style={{minHeight: clientHeight}}>
                {list.map((val, key) => (
                    <div className="list-item" key={key}>
                        <div className="list-item-container" onClick={() => jumpToOneNoteDetails(val.value)}>

                            {/* 图片 */}
                            <div className="list-item-img" 
                                style={{
                                    /* 长和高的比例为 345:150 计算， 实际高清图为 690:300 */
                                    width: `${clientWidth - 30}px`, 
                                    height: `${Math.floor( (clientWidth - 30) * 150 / 345 ) }px`
                                }}>
                                <img alt="item" src={val.imgsrc} />
                            </div>

                            {/* 描述 */}
                            <div className="list-item-describe">
                                <div className="item-describe-title">{val.label}</div>
                                {val.describe ? (<div className="item-describe-content">{val.describe}</div>) : ''}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default myOneNoteList;
