/**
 * 列表页
 */
// 框架类
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
// 组件类
import Icon from 'antd-mobile/lib/icon/index';
import Pagination from 'antd-mobile/lib/pagination/index';
// 样式类
import 'antd-mobile/lib/icon/style/css';
import 'antd-mobile/lib/pagination/style/css';
import './list.scss';
// 请求类
import ajaxs from './../../api/record';
// 初始化

class recordlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagenum: 1, // 页码
            pageCount: 0, // 一共有多少数据

            list: [
                // {
                //     content: "你好",
                //     id: 1,
                //     record_data: 4,
                //     record_day: 12,
                //     record_month: 1,
                //     record_week: 3,
                //     timestamp: 123123123,
                //     title: "hi",
                // }
            ]
        };
    }

    componentDidMount() {
        this.getListBy(); // 获取页面数据
    }

    /**
     * 获取页面数据
     */
    getListBy() {
        const _this = this;

        ajaxs.getList(this.state.pagenum)
        .then(
            res => {
                _this.setState({
                    pageCount: (res && res.count) ? res.count : 1,
                    list: (res && res.list) ? res.list.map(val => {
                        return val;
                    }) : [],
                });
            }, error => {
                alert(error);
            }
        );
    }

    /**
     * 列表 内容
     */
    renderList() {
        const _this = this;

        /**
         * 跳转到编辑页面
         */
        let jumptoEdit  = (id, title, content) => {
            // 存储信息
            window.sessionStorage.setItem('rejiejay_record_id', id);
            window.sessionStorage.setItem('rejiejay_record_title', title);
            window.sessionStorage.setItem('rejiejay_record_content', content);
            _this.jumpToRouter('/record/edit');
        }

        return (
            <div className="record-list-render">
                {this.state.list.map((val, key) => (
                    <div key={key} className="render-item ReactMarkdown" onClick={() => jumptoEdit(val.id, val.title, val.content)}>
                        <div className="render-item-title">{val.title}</div>
                        <div className="render-item-content"><ReactMarkdown source={val.content} /></div>
                    </div>
                ))}
            </div>
        )
    }

    /**
     * 底部分页 内容
     */
    renderPagination() {
        const _this = this;
        /**
         * 页面切换的方法
         * @param {number} num 页码 
         */
        let pageSwitcher = num => {
            _this.setState({
                pagenum: num,
            }, _this.getListBy);
        }

        return (
            <div className="pagination-container flex-center">
                <Pagination total={Math.ceil(this.state.pageCount / 10)}
                    className="custom-pagination-with-icon"
                    current={this.state.pagenum}
                    onChange={pageSwitcher}
                    locale={{
                        prevText: (<span className="arrow-align flex-start-center"><Icon type="left" />上一步</span>),
                        nextText: (<span className="arrow-align flex-start-center">下一步<Icon type="right" /></span>),
                    }}
                />
            </div>
        )
    }


    render() {
        return (
            <div className="rejiejay-record-list">

                {/* 列表 */}
                {this.renderList()}

                {/* 分页器 */}
                {this.renderPagination()}
            </div>
        );
    }

    /**
     * 跳转到路由
     * @param {object} query 携带的参数 非必填
     */
    jumpToRouter(url, query) {
        window.location.href = `./#${url}`;
    }
}

export default recordlist;
