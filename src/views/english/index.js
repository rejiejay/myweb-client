/**
 * 英语列表页
 */
// 框架类
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

// 样式类
import './index.scss';

// 请求类
import ajaxs from './../../api/english/index';

// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

class english extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                // {
                //     id: '', // 唯一标识
                //     en_text : '', // 英文
                //     zh_text: '', // 中文
                //     creat_timestamp : '', // 时间戳
                // }
            ],
            
            /**
             * 排序方式 这个有持久化的需求
             * @param {string} time 时间排序 就是 默认排序 
             * @param {string} random 随机排序 
             */
            sortType: window.localStorage.englishSortType ? window.localStorage.englishSortType : 'time',
    
            /**
             * 新增模态框
             */
            isAddModalShow: false, // 是否显示新增模态框
            addTitle: '', // 新增的 标题
            addContent: '', // 新增的 内容
        }

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
                }, error => {
                    alert(error);
                }
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
            // 重置分页数据
            _this.pagenum = 1; // 页码
            _this.pageTotal = 1; // 一共有多少数据
            _this.isScrollLoding = false; // 是否正在加载分页..

            // 要切换的新排序方式
            let newSortType = sortType === 'time' ? 'random' : 'time';

            // 持久化 排序方式
            window.localStorage.setItem('englishSortType', newSortType);
            
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

        /**
         * 切换中英文
         * @param {number} key 对应下标 
         */
        let switcherZHEN = key => {
            let newList = JSON.parse(JSON.stringify(_this.state.list));

            newList[key].isZh = !_this.state.list[key].isZh;

            _this.setState({
                list: newList
            });
        }

        /**
         * 切换为编辑状态
         * @param {number} key 对应下标 
         */
        let switcherisEdit = key => {
            let newList = JSON.parse(JSON.stringify(_this.state.list));

            newList[key].isEdit = !_this.state.list[key].isEdit;

            _this.setState({
                list: newList
            });
        }

        /**
         * 修改编辑的 处理函数
         * @param {string} val 修改内容
         * @param {number} key 数组的下标
         * @param {string} type 判断是输入英语还是输入中文 
         */
        let handleChange = (val, key, type) => {
            let newList = JSON.parse(JSON.stringify(_this.state.list));

            if (type === 'en_text') {
                newList[key].en_text = val;

            } else {
                newList[key].zh_text = val;

            }

            _this.setState({
                list: newList
            });
        }

        /**
         * 将单词转换问音频输出
         * @param {number} key 数组的下标
         */
        let text2audio = key => {
            let item = _this.state.list[key];

            /**
             * 调用百度 api 的方法
             * 这个方法在哪调用的？
             * 是在 models index 那个页面初始化的
             * 整个项目启动的时候都会初始化一次 在 index.js models/init.js 下初始化
             */
            let vid = document.getElementById('myVideo');
            vid.innerHTML = `<audio type="audio/mp3" src="https://tsn.baidu.com/text2audio?tex=${item.en_text}&lan=zh&cuid=15976713287&ctp=1&tok=${window.localStorage.baidu_text2audio_access_token}" controls="controls" autoplay="autoplay"></audio>`;
        }

        /**
         * 提交 编辑操作 请求
         * @param {number} key 数组的下标
         */
        let affirmEdit = key => {
            let request = _this.state.list[key];

            ajaxs.edit(request.id, request.en_text, request.zh_text, this)
            .then(() => {
                _this.getListBy();

            }, error => alert(error));
        }

        /**
         * 提交 删除操作 请求
         * @param {number} key 数组的下标
         */
        let affirmDel = key => {
            let request = _this.state.list[key];

            if (window.confirm('你确定要删除吗?')) {
                ajaxs.del(request.id, this)
                .then(() => {
                    _this.getListBy();

                }, error => alert(error));
            }
        }

        return (
            <div className="english-list">
                {this.state.list.map((val, key) => (
                    <div key={key} className="english-item">

                        {/* 判断是否编辑 */}
                        { val.isEdit ? (
                            <div className="english-item-container flex-start-center">
                                <div className="english-item-input flex-rest">
                                    <div><input type="text" value={val.en_text} onChange={event => handleChange(event.target.value, key, 'en_text')} /></div>
                                    <div><input type="text" value={val.zh_text} onChange={event => handleChange(event.target.value, key, 'zh_text')} /></div>
                                </div>
                                <div className="english-operate-edit">
                                    <div className="english-affirm-edit" onClick={() => affirmEdit(key)}>提交</div>
                                    <div className="english-cancel-edit" onClick={() => switcherisEdit(key)}>取消</div>
                                </div>
                                
                            </div>
                        ) : (
                            <div className="english-item-container">
                                <div className="english-item-text" onClick={() => switcherZHEN(key)}>{ val.isZh ? val.zh_text : val.en_text }</div>
                                <div className="english-item-operation flex-start">
                                    <div className="item-operation-rest flex-rest" onClick={() => switcherZHEN(key)}></div>
                                    <div className="operation-container-item" onClick={() => text2audio(key)}>阅读</div>
                                    <div className="operation-container-item" onClick={() => switcherisEdit(key)}>编辑</div>
                                    <div className="operation-container-item" onClick={() => affirmDel(key)}>删除</div>
                                </div>
                            </div>
                        ) }

                    </div>
                ))}
            </div>
        )
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

    render() {
        const _this = this;

        /**
         * 点击随机获取列表数据的烦恼歌发
         */
        let goRandom = () => {
            ajaxs.getrandom()
            .then(
                res => {
                    _this.setState({
                        pagenum: 1,
                        list: res ? res.map(val => {
                            val.isZh = false; // 是否中文
                            val.isEdit = false; // 是否编辑
                            return val;
                        }) : [],
                    });
                }, error => {
                    alert(error);
                }
            )
        }

        return (
            <React.Fragment>
            
                {/* 这个用于 baidu 发音 的 api */}
                <div id='myVideo' className='English-audio'>
                    {/* <audio type="audio/mp3" src="http://tsn.baidu.com/text2audio?tex=value&lan=zh&cuid=15976713287&ctp=1&tok=24.b53eed642f92ed8bc4c21d61969ecf8e.2592000.1520344527.282335-10792466"  autoPlay={true} id='myVideo' controls="controls" autoPlay={true}></audio> */}
                </div>

                {/* 新增 */}
                <div className="top-operation flex-start">
                    <div className="english-add" onClick={() => this.jumpToRouter('/english/add')}>新增</div>
                    <div className="english-out-of-order" onClick={goRandom}>随机查询</div>
                </div>

                {this.renderHead() /* 渲染 头部 */}
                {this.renderList()/* 列表 */}
                {this.renderAddModal() /* 渲染 新增模态框 */}

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

const mapStateToProps = (state) => ({
    user_islogin: state.user.isLogin,
});

export default connect(mapStateToProps)(english);
