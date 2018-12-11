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
import loadPageVar from './../../utils/loadPageVar';

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
                //     timestamp: 123123123,
                //     title: "hi",
                // }
            ],

            /**
             * 排序方式 这个有持久化的需求
             * @param {string} time 时间排序 就是 默认排序 
             * @param {string} random 随机排序 
             */
            sortType: window.localStorage.recordSortType ? window.localStorage.recordSortType : 'time',

            /**
             * 新增模态框
             */
            isAddModalShow: false, // 是否显示新增模态框
            addTitle: '', // 新增的 标题
            addContent: '', // 新增的 内容

            /**
             * 编辑模态框
             */
            isEditorModalShow: false, // 是否显示 编辑模态框
            editorId: null, // 编辑记录的 唯一标识
            editorTitle: '', // 编辑记录的 标题
            editorContent: '', // 编辑记录的 内容
            stepStack: [ // 上一篇, 下一篇的堆栈
                // {
                //     id: 1,
                //     title: '',
                //     content: '',
                // }
            ],
        };

        /**
         * 分页相关
         */
        this.pagenum = 1; // 页码
        this.pageTotal = 1; // 一共有多少数据
        this.isScrollLoding = false; // 是否正在加载分页..
    }

    componentDidMount() {
        let pageType = loadPageVar('pageType'); // 页面状态
        let recordId = loadPageVar('id'); // 记录的唯一标识

        this.getListBy(); // 获取页面数据

        window.addEventListener('scroll', this.scrollHandle.bind(this)); // 添加滚动事件，检测滚动到页面底部

        // 判断页面是否 新增
        if (pageType && pageType === 'add') {
            // 如果页面是新增 打开 新增的模态框
            this.setState({isAddModalShow: true});

        } else if (pageType && recordId && pageType === 'edit') {
            // 如果页面是编辑状态 
            this.initEdit(recordId);

        }
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
     * 刷新页面数据
     */
    refreshList() {
        this.pagenum = 1;
        this.pageTotal = 1;
        this.isScrollLoding = false;

        this.getListBy();
    }

    /**
     * 初始化编辑
     * @param {number} id 记录的唯一标识
     */
    initEdit(id) {
        const _this = this;

        ajaxs.getOneById(id)
        .then(res => {
            // 缓存 要修改的数据（之后会用来进行对比的）
            window.sessionStorage.setItem('recordEditorId', res.id);
            window.sessionStorage.setItem('recordEditorTitle', res.title);
            window.sessionStorage.setItem('recordEditorContent', res.content);

            // 修改 页面的状态
            _this.setState({
                isEditorModalShow: true,
                editorId: res.id,
                editorTitle: res.title,
                editorContent: res.content,
            
            // 重新获取最新的数据
            }, _this.refreshList.call(_this));

        }, error => alert(error));
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
            // 重置分页数据
            _this.pagenum = 1; // 页码
            _this.pageTotal = 1; // 一共有多少数据
            _this.isScrollLoding = false; // 是否正在加载分页..

            // 要切换的新排序方式
            let newSortType = sortType === 'time' ? 'random' : 'time';

            // 持久化 排序方式
            window.localStorage.setItem('recordSortType', newSortType);
            
            // 修改页面状态, 并且获取数据
            _this.setState({
                sortType: newSortType
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
        const _this = this;
        
        return (
            <div className="record-list">
                {this.state.list.map((val, key) => (
                    <div className="list-item ReactMarkdown" 
                        key={key} 
                        onClick={() => _this.initEdit(val.id)}
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

                    }, _this.refreshList.call(_this));
                    
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

    /**
     * 渲染 编辑模态框
     */
    renderEditorModal() {
        const _this = this;
        let editorTitle = this.state.editorTitle; // 编辑的 标题
        let editorContent = this.state.editorContent; // 编辑的 内容
        let stepStack = this.state.stepStack; // 上一篇, 下一篇的堆栈

        /**
         * 数据提交 的处理函数
         */
        let submitHandle = () => {
            // 必须要判断 编辑的 内容 是否为空
            if (!editorContent) {
                return alert('内容不能为空');
            }

            // 初始化标题, 当标题为空的时候 
            let mytitle = editorTitle ? editorTitle : `记录 ${convertTime.dateToYYYYmmDDhhMM(new Date())}`;

            ajaxs.editRecord(this.state.editorId, mytitle, editorContent)
            .then(
                () => { // 修改成功
                    // 删除缓存
                    window.sessionStorage.removeItem('recordEditorId');
                    window.sessionStorage.removeItem('recordEditorTitle');
                    window.sessionStorage.removeItem('recordEditorContent');

                    // 修改页面状态
                    _this.setState({
                        isEditorModalShow: false, // 关闭修改成功的模态框
                        editorId: '', // 清空 id
                        editorTitle: '', // 清空 标题
                        editorContent: '', // 清空 内容

                    // 重新获取最新的数据
                    }, _this.refreshList.call(_this));
                    
                }, error => alert(error)
            );
        }

        /**
         * 模态框关闭 的处理函数
         */
        let colseHandle = () => {
            // 因为 100% 是有数据的, 所以每次关闭的时候 校验一次是否数据（未）修改的情况
            if (editorTitle === window.sessionStorage.recordEditorTitle && editorContent === window.sessionStorage.recordEditorContent) {
                // 既然数据未修改 那直接关闭模态框即可
                return _this.setState({isEditorModalShow: false});
            }

            // 检测到数据发生改变, 弹出提示框 询问是否需要保存
            if (window.confirm('你的数据尚未保存, 你是否需要保存?')) {
                // 如果需要保存， 提交一次即可， 提交成功会关闭模态框的
                submitHandle();

            } else {

                // 如果确认不需要保存, 那么直接关闭模态框即可
                return _this.setState({isEditorModalShow: false});
            }
        }

        /**
         * 数据删除 的处理函数
         */
        let deleteHandle = () => {
            // 询问是否确认删除
            if (window.confirm('是否删除此条数据?') === false) {
                // 不删除的情况, 阻止往下执行即可
                return false
            }

            ajaxs.deleteRecord(window.sessionStorage.recordEditorId)
            .then(() => { // 记录删除成功

                // 删除缓存
                window.sessionStorage.removeItem('recordEditorId');
                window.sessionStorage.removeItem('recordEditorTitle');
                window.sessionStorage.removeItem('recordEditorContent');
                    
                // 更新页面状态
                _this.setState({
                    isEditorModalShow: false, // 关闭模态框
                    editorId: null, // 清空id
                    editorTitle: '', // 清空 标题
                    editorContent: '', // 清空 内容

                // 重新获取最新的数据
                }, _this.refreshList.call(_this));

            }, error => alert(error));
        }

        /**
         * 上一篇
         */
        let preRecordHandle = () => {
            // 先判断堆栈是否无内容
            if (stepStack.length <= 1) {
                // 没有内容的情况下不执行
                return false;
            }

            // 如果有内容，堆栈退出一条
            let newStepStack = JSON.parse(JSON.stringify(stepStack));
            newStepStack.pop();

            // 持久化堆栈
            window.sessionStorage.setItem('stepStack', JSON.stringify(newStepStack));

            // 初始化到到页面上
            _this.setState({
                stepStack: newStepStack

            }, _this.initEdit(newStepStack[newStepStack.length - 1].id));
        }

        /**
         * 下一篇
         */
        let nextRecordHandle = () => {
            let newStepStack = stepStack.concat([]);

            // 先判断是不是第一次点击
            if (stepStack.length <= 0) {
                // 如果是第一次点击，那么本条记录也是要进行缓存的
                newStepStack.push({
                    id: window.sessionStorage.recordEditorId,
                    title: window.sessionStorage.recordEditorTitle,
                    content: window.sessionStorage.recordEditorContent,
                });
            }

            // 随机获取 一条数据
            ajaxs.getOneByRandom()
            .then(
                value => {
                    // 堆栈的一个项
                    let stepStackItem = {
                        id: value.id,
                        title: value.title,
                        content: value.content,
                    }
                    // 新的堆栈
                    newStepStack.push(stepStackItem);

                    // 持久化堆栈
                    window.sessionStorage.setItem('stepStack', JSON.stringify(newStepStack));

                    // 初始化到到页面上
                    _this.setState({
                        stepStack: newStepStack
                    }, _this.initEdit(value.id));

                }, error => alert(error)
            );
        }

        /**
         * 标题 输入框 处理函数
         */
        const inputTitleHandle = event => _this.setState({editorTitle: event.target.value});
        
        /**
         * 内容 输入框 处理函数
         */
        const contentTitleHandle = event => _this.setState({editorContent: event.target.value});

        return (
            <MobileListModal isShow={this.state.isEditorModalShow} colseHandle={colseHandle}>
                <div className="editor-modal">
                    
                    {/* 标题部分 */}
                    <div className="editor-modal-title flex-start-center">
                        <input className="flex-rest" 
                            value={editorTitle}
                            onChange={inputTitleHandle}
                            placeholder="请输入标题" 
                        />
                        <div className="modal-title-close" onClick={colseHandle}>X</div>
                    </div>

                    {/* 内容部分 */}
                    <div className="editor-modal-content flex-center" style={{height: `${clientHeight - 70 - 50 - 50}px` /** 这里的高度很好算的 模态框上下边距为 70, 再减去 标题 50，以及底部操作按钮 50 */}}>
                        <textarea 
                            style={{
                                height: `${clientHeight - 70 - 50 - 50 - 30}px`, 
                                width: `${clientWidth - 62 - 30}px`
                            }}
                            value={editorContent}
                            onChange={contentTitleHandle}
                            placeholder="请输入内容"
                        />
                    </div>
                    
                    {/* 操作按钮部分 */}
                    <div className="editor-modal-operate flex-start-center">

                        <div className="modal-operate-item" onClick={deleteHandle}>
                            <span style={{borderRight: '1px solid #ddd'}}>删除</span>
                        </div>

                        <div className="modal-operate-item" onClick={submitHandle}>
                            <span style={{borderRight: '1px solid #ddd'}}>保存</span>
                        </div>

                        <div className="modal-operate-item" onClick={preRecordHandle}>
                            <span style={{
                                borderRight: '1px solid #ddd', 
                                color: `${stepStack.length > 1 ? '#303133' : '#909399'}`, // 堆栈必须大于零的时候才可以点击上一篇
                            }}>上一篇</span>
                        </div>

                        <div className="modal-operate-item" onClick={nextRecordHandle}>
                            <span>下一篇</span>
                        </div>
                    </div>
                </div>
            </MobileListModal>
        );
    }

    render() {
        return (
            <React.Fragment>

                {this.renderHead() /* 渲染 头部 */}
                {this.renderList() /* 渲染 列表页 */}
                {this.renderAddModal() /* 渲染 新增模态框 */}
                {this.renderEditorModal() /* 渲染 编辑模态框 */}

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
