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
             * 排序方式
             * @param {string} time 时间排序 就是 默认排序 
             * @param {string} random 随机排序 
             */
            sortType: 'time',

            /**
             * 新增模态框
             */
            isAddModalShow: false, // 是否显示新增模态框
            addTitle: '', // 新增的 标题
            addContent: '', // 新增的 内容
        };

        /**
         * 分页相关
         */
        this.pagenum = 1; // 页码
        this.pageTotal = 1; // 一共有多少数据
        this.isScrollLoding = false; // 是否正在加载分页..
    }

    componentDidMount() {
        this.getListBy(); // 获取页面数据
        

		window.addEventListener('scroll', this.scrollHandle.bind(this)); // 添加滚动事件，检测滚动到页面底部
    }
    
    componentWillUnmount() {
        this.isScrollLoding = true; // 阻塞掉 正在加载分页
		window.removeEventListener('scroll', this.scrollHandle.bind(this)); // 移除滚动事件，检测滚动到页面底部
    }

    /**
     * 获取页面数据
     * @param {Boolean} isLodeMore 是否 新增 分页 加载
     */
    getListBy(isLodeMore) {
        const _this = this;
        let sortType = this.state.sortType; // 排序方式

        /**
         * 根据时间 获取页面数据
         */
        let ajaxsGetList = () => {
            ajaxs.getList(_this.pagenum)
            .then(
                res => {
                    // 设置分页为 不是正在加载
                    _this.isScrollLoding = false;
    
                    // 校验一下数据
                    if (!res || !res.pageTotal || !res.list) {
                        return alert(`列表数据有误!`);
                    }
    
                    _this.pageTotal = res.pageTotal;
                    
                    // 判断是否 新增 分页 加载
                    if (isLodeMore) {
                        _this.setState({ list: JSON.parse(JSON.stringify(_this.state.list)).concat(res.list) });
                        
                    } else { // 如果是首次加载
                        _this.setState({ list: res.list });
    
                    }
    
                }, error => alert(error)
            );
        }
        
        /**
         * 随机 获取页面数据
         */
        let ajaxsGetRandom = () => {
            ajaxs.getrandom()
            .then(
                res => {
                    _this.pagenum = 1; // 因为 随机查询 页码是无限的, 所以页面每次设置为 1
                    _this.pageTotal = 2; // 因为 随机查询 是无限的, 所以页面每次设置为 2
                    _this.isScrollLoding = false; // 设置分页为 不是正在加载
    
                    // 校验一下数据
                    if (!res || !res instanceof Array || res.length === 0) {
                        return alert(`列表数据有误!`);
                    }
                    
                    // 判断是否 新增 分页 加载
                    if (isLodeMore) {
                        _this.setState({ list: JSON.parse(JSON.stringify(_this.state.list)).concat(res) });
                        
                    } else { // 如果是首次加载
                        _this.setState({ list: res });
    
                    }

                }, error => alert(error)
            );

        }

        // 先判断排序方式
        if (sortType === 'time') {
            ajaxsGetList(); // 根据时间排序获取

        } else {
            ajaxsGetRandom(); // 随机获取

        }

    }

    /**
     * 滚动事件 处理函数
     */
    scrollHandle() {
        let screenHeight = window.screen.height; // 屏幕的高度
        let clientHeight = document.getElementById('root').clientHeight; // 页面的总高度
        let myScrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动的距离

        if (
            screenHeight + myScrollTop >= clientHeight - 50 && // (屏幕高度 + 滚动的距离) 必须 (大于整个页面的总高度 - 50像素的预留空间)
            this.isScrollLoding === false && // 并且页面不是请求状态
            this.pagenum < this.pageTotal // 并且 目前的页码 必须小于 总页码
        ) {
            this.pagenum = this.pagenum + 1; // 请求的页码 加一
            this.getListBy(true); // 开始请求 并且 该请求 设置为 新增列表
        }
    }

    /**
     * 渲染头部
     */
    renderHead() {
        const _this = this;
        let sortType = this.state.sortType; // 排序方式

        /**
         * 打开新增模态框的方法
         */
        let openAddModal = () => _this.setState({isAddModalShow: true});

        /**
         * 切换排序方式的方法
         */
        let sortTypeSwitcher = () => {
            _this.pagenum = 1; // 页码
            _this.pageTotal = 1; // 一共有多少数据
            _this.isScrollLoding = false; // 是否正在加载分页..
            
            _this.setState({
                sortType: sortType === 'time' ? 'random' : 'time'
            }, _this.getListBy);
        };

        return (
            <div className="record-head flex-start">
                <div className="record-head-item" onClick={sortTypeSwitcher}>
                    <span style={{
                        borderRight: '1px solid #ddd'
                    }}>{sortType === 'time' ? '切换随机' : '返回默认'}排序</span>
                </div>
                <div className="record-head-item" onClick={openAddModal}>
                    <span>新增记录</span>
                </div>
            </div>
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

                {this.renderHead() /* 渲染头部 */}
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
