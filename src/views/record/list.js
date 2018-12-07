/**
 * 列表页
 */
// 框架类
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

// 样式类
import './list.scss';

// 组件类
import MobileListModal from './../../components/MobileListModal';
import convertTime from './../../utils/convertTime';

// 请求类
import ajaxs from './../../api/record';

// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

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
            ],

            /**
             * 新增模态框
             */
            isAddModalShow: true, // 是否显示新增模态框
            addTitle: '', // 新增的 标题
            addContent: '', // 新增的 内容
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

            }, error => alert(error)
        );
    }

    /**
     * 列表 内容
     */
    renderList() {
        return (
            <div className="record-list">
                {this.state.list.map((val, key) => (
                    <div className="list-item ReactMarkdown" 
                        key={key} 
                    >
                        <div className="list-item-title">{val.title}</div>
                        <div className="list-item-content"><ReactMarkdown source={val.content} /></div>
                    </div>
                ))}
            </div>
        );
    }

    /**
     * 渲染 新增模态框
     */
    renderAddModal() {
        const _this = this;
        let addTitle = this.state.addTitle; // 新增的 标题
        let addContent = this.state.addContent; // 新增的 内容

        /**
         * 模态框关闭 的处理函数
         */
        let colseHandle = () => {
            // 判断 内容 和 标题 是不是为空
            if (!addContent && !addTitle) {
                // 为空的情况下 直接关闭模态框 即可
                return _this.setState({isAddModalShow: false});

            } else {
                // 如果存在内容, 询问是否需要关闭
                if (window.confirm('你的数据尚未保存, 你是否关闭?')) {

                    // 如果确认关闭, 直接关闭模态框
                    return _this.setState({isAddModalShow: false});
                }
            }
        }

        /**
         * 数据提交 的处理函数
         */
        let submitHandle = () => {
            if (!addContent) {
                return alert('内容不能为空');
            }

            let mytitle = addTitle ? addTitle : `记录 ${convertTime.dateToYYYYmmDDhhMM(new Date())}`;
            
            ajaxs.saveRecord(mytitle, addContent)
            .then(
                () => {
                    _this.setState({
                        isAddModalShow: false,
                        addTitle: '',
                        addContent: '',
                    });
                    
                }, error => alert(error)
            );
        }

        /**
         * 标题 输入框 处理函数
         */
        const inputTitleHandle = event => _this.setState({addTitle: event.target.value});
        
        /**
         * 内容 输入框 处理函数
         */
        const contentTitleHandle = event => _this.setState({addContent: event.target.value});

        return (
            <MobileListModal isShow={this.state.isAddModalShow} colseHandle={colseHandle}>
                <div className="add-modal">
                    
                    {/* 标题部分 */}
                    <div className="add-modal-title flex-start-center">
                        <input className="flex-rest" 
                            value={addTitle}
                            onChange={inputTitleHandle}
                            placeholder="请输入标题" 
                        />
                        <div className="modal-title-close" onClick={colseHandle}>X</div>
                    </div>

                    {/* 内容部分 */}
                    <div className="add-modal-content flex-center" style={{height: `${clientHeight - 70 - 50 - 50}px` /** 这里的高度很好算的 模态框上下边距为 70, 再减去 标题 50，以及底部操作按钮 50 */}}>
                        <textarea 
                            style={{
                                height: `${clientHeight - 70 - 50 - 50 - 30}px`, 
                                width: `${clientWidth - 62 - 30}px`
                            }}
                            value={addContent}
                            onChange={contentTitleHandle}
                            placeholder="请输入内容"
                        />
                    </div>
                    
                    {/* 操作按钮部分 */}
                    <div className="add-modal-operate" onClick={submitHandle}>
                        <div className="modal-operate-container">保存</div>
                    </div>
                </div>
            </MobileListModal>
        );
    }

    render() {
        return (
            <React.Fragment>

                {this.renderList() /* 渲染列表页 */}
                {this.renderAddModal() /* 渲染新增模态框 */}

            </React.Fragment>
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
