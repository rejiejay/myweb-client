// 框架类
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
// 组件类
import NavHeard from './NavHeard/index';
import Copyright from './../../components/Copyright';
import convertTime from './../../utils/convertTime';
// 请求类
import recordAjaxs from './../../api/record';
import englishAjaxs from './../../api/english/index';
// 样式类
import './index.scss';
// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

class computer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 横幅描述的内容
            bannerRecordContent: '',

            /**
             * 导航栏
             * @param {String} home 首页合集部分
             * @param {String} resume 简历和作品
             * @param {String} record 记录
             * @param {String} english 英语
             */
            navBarSelected: window.localStorage.computer_nav ? window.localStorage.computer_nav : 'home',

            /**
             * 记录 排序方式
             * @param {string} time 时间排序 就是 默认排序 
             * @param {string} random 随机排序 
             */
            recordSortType: 'time',

            /**
             * 记录列表数据
             */
            recordList: [
                // {
                //     id: 276,
                //     isEdit: false,
                //     title: "123123123123", // 标题
                //     content: "", // 内容
                //     timestamp: 1544597707534, // 时间戳
                // }
            ],

            /**
             * 新增 记录
             */
            addRecordTitle: '', // 新增 记录 标题
            addRecordContent: '', // 新增 记录 内容

            /**
             * 记录 分页相关
             */
            recordPagenum: 1, // 页码
            recordPageTotal: 1, // 一共有多少数据
            recordPaginationNum: 1, // 记录页跳转的数据

            /**
             * 英语 排序方式
             * @param {string} time 时间排序 就是 默认排序 
             * @param {string} random 随机排序 
             */
            englishSortType: 'time',

            /**
             * 英语 列表数据
             */
            englishList: [
                // {
                //     id: '', // 唯一标识
                //     isEdit: false,
                //     en_text : '', // 英语原文
                //     zh_text: '', // 中文注释
                //     creat_timestamp : '', // 时间戳
                // }
            ],

            /**
             * 新增 英语
             */
            addEnglishEN: '', // 新增 英语 英语原文
            addEnglishZH: '', // 新增 英语 中文注释

            /**
             * 英语 分页相关
             */
            englishPagenum: 1, // 页码
            englishPageTotal: 1, // 一共有多少数据
            englishPaginationNum: 1, // 记录页跳转的数据


        };
    }

    /**
     * 组件加载完毕之后立即执行
     */
    componentDidMount() {
        
        this.initBannerRecord(); // 初始化 横幅描述 随机记录

        this.getRecordListBy(); // 获取 记录 数据
        this.getEnglishListBy(); // 获取 英语 数据
    }

    /**
     * 初始化 横幅描述 随机记录
     */
    initBannerRecord() {
        const _this = this;

        recordAjaxs.getOneByRandom()
        .then(
            value => _this.setState({ bannerRecordContent: value.content }), 
            error => alert(error)
        );
    }

    /**
     * 获取 记录 页面数据
     * @param {Boolean} isLodeMore 是否 新增 分页 加载
     */
    getRecordListBy() {
        const _this = this;
        let recordSortType = this.state.recordSortType; // 排序方式

        /**
         * 数据转换函数
         * @param {Array} list 数据查询出来的列表数据
         */
        let dataHandle = list => {
            return list.map(val => {
                val.isEdit = false;

                return val;
            });
        }

        if (recordSortType === 'time') {
            recordAjaxs.getList(_this.state.recordPagenum)
            .then(
                res => {
                    // 校验一下数据
                    if (!res || !res.pageTotal || !res.list) {
                        return alert(`列表数据有误!`);
                    }
                    
                    _this.setState({ 
                        recordList: dataHandle(res.list),
                        recordPageTotal: res.pageTotal,
                    });
    
                }, error => alert(error)
            );

        } else {

            recordAjaxs.getrandom()
            .then(
                res => {
                    // 校验一下数据
                    if (!res || !res instanceof Array || res.length === 0) {
                        return alert(`列表数据有误!`);
                    }
    
                    _this.setState({ recordList: dataHandle(res) });

                }, error => alert(error)
            );
            
        }

    }

    /**
     * 获取 英语 页面数据
     * @param {Boolean} isLodeMore 是否 新增 分页 加载
     */
    getEnglishListBy() {
        const _this = this;
        let englishSortType = this.state.englishSortType; // 排序方式

        /**
         * 数据转换函数
         * @param {Array} list 数据查询出来的列表数据
         */
        let dataHandle = list => {
            return list.map(val => {
                val.isEdit = false;

                return val;
            });
        }

        if (englishSortType === 'time') {
            englishAjaxs.getList(_this.state.englishPagenum)
            .then(
                res => {
                    // 校验一下数据
                    if (!res || !res.pageTotal || !res.list) {
                        return alert(`列表数据有误!`);
                    }
                    
                    _this.setState({ 
                        englishList: dataHandle(res.list),
                        englishPageTotal: res.pageTotal,
                    });
    
                }, error => alert(error)
            );

        } else {

            englishAjaxs.getrandom()
            .then(
                res => {
                    // 校验一下数据
                    if (!res || !res instanceof Array || res.length === 0) {
                        return alert(`列表数据有误!`);
                    }
    
                    _this.setState({ englishList: dataHandle(res) });

                }, error => alert(error)
            );
            
        }

    }

    /**
     * 渲染个人信息横幅
     */
    renderUserInfor() {
        return (
            <div className="computer-user-infor">
                <div className="computer-infor-container">
                    <div className="computer-infor-portrait">
                        <img alt="portrait" src='https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/page-assets/picture/portrait.png' />
                    </div>

                    <h1>Re傲慢的曾杰杰</h1>
                    <h2>Hi, Rejiejay.</h2>

                    <div className="computer-infor-content ReactMarkdown" onClick={this.initBannerRecord.bind(this)}>
                        <ReactMarkdown source={this.state.bannerRecordContent} />
                    </div>

                    <div className="computer-infor-describe flex-start-center" style={{paddingTop: '15px'}}>
                        <svg width="16" height="16" t="1530089102080" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2479">
                            <path fill="#303133" d="M512.3 691.5c-69.2 0-125.5-56.3-125.5-125.5s56.3-125.5 125.5-125.5S637.8 496.8 637.8 566c0 25.8-7.8 50.5-22.5 71.6-5.7 8.1-16.8 10.1-24.9 4.5-8.1-5.7-10.1-16.8-4.5-24.9 10.5-15.1 16-32.7 16-51.1 0-49.4-40.2-89.6-89.6-89.6-49.4 0-89.6 40.2-89.6 89.6s40.2 89.6 89.6 89.6c8.1 0 16.1-1.1 23.8-3.2 9.4-2.6 19.4 2.9 22.1 12.5 2.6 9.5-3 19.4-12.5 22.1-10.8 2.9-22.1 4.4-33.4 4.4z" p-id="2480"></path>
                            <path fill="#303133" d="M924.5 584H619c-9.9 0-17.9-8-17.9-17.9s8-17.9 17.9-17.9h305.5c9.9 0 17.9 8 17.9 17.9s-8 17.9-17.9 17.9zM404 584H100.1c-9.9 0-17.9-8-17.9-17.9s8-17.9 17.9-17.9H404c9.9 0 17.9 8 17.9 17.9s-8 17.9-17.9 17.9zM754.2 261.4c-9.9 0-17.9-8-17.9-17.9v-53.8c0-22.7-7.3-35.8-44.8-35.8H333.1c-37.5 0-44.8 13.1-44.8 35.8v53.8c0 9.9-8 17.9-17.9 17.9s-17.9-8-17.9-17.9v-53.8c0-32.7 14-71.7 80.7-71.7h358.5c66.7 0 80.7 39 80.7 71.7v53.8c-0.2 9.9-8.3 17.9-18.2 17.9z" p-id="2481"></path>
                            <path fill="#303133" d="M870.7 906.6H153.8c-49.4 0-89.6-40.2-89.6-89.6V315.2c0-49.4 40.2-89.6 89.6-89.6h716.9c49.4 0 89.6 40.2 89.6 89.6V817c0.1 49.4-40.1 89.6-89.6 89.6zM153.8 261.4c-29.6 0-53.8 24.1-53.8 53.8V817c0 29.6 24.1 53.8 53.8 53.8h716.9c29.6 0 53.8-24.1 53.8-53.8V315.2c0-29.6-24.1-53.8-53.8-53.8H153.8z" p-id="2482"></path>
                        </svg>
                        <span>web前端开发 · 深人机互联</span>
                    </div>

                    <div className="computer-infor-describe flex-start-center">
                        <svg width="16" height="16" t="1530089123352" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4368" >
                            <path fill="#303133" d="M921.087359 990.72v-35.2A410.24 410.24 0 0 0 661.887359 576a307.2 307.2 0 1 0-300.8 0 410.24 410.24 0 0 0-256 380.8v35.2H101.887359a32 32 0 0 0 32 32 32 32 0 0 0 32-32v-34.56a345.6 345.6 0 0 1 691.2 0v35.2a31.36 31.36 0 0 0 31.36 30.08 32 32 0 0 0 32.64-32zM270.207359 307.2A241.28 241.28 0 1 1 511.487359 548.48 241.28 241.28 0 0 1 270.207359 307.2z" p-id="4369" ></path>
                        </svg>
                        <span>男 · {new Date().getFullYear() - 1994}岁 · 本科 · {new Date().getFullYear() - 2016}年 · 深圳</span>
                    </div>

                    <div className="computer-infor-describe flex-start-center">
                        <svg width="16" height="16" t="1530089152476" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6601" >
                            <path fill="#303133" d="M879.430882 178.6314 144.567072 178.6314c-42.85197 0-77.733409 34.881438-77.733409 77.67815l0 511.272429c0 42.906206 34.881438 77.787644 77.733409 77.787644l734.86381 0c42.852994 0 77.733409-34.881438 77.733409-77.787644L957.164291 256.30955C957.164291 213.512838 922.283876 178.6314 879.430882 178.6314zM512.818133 567.18895l-351.655082-336.698438L859.560322 230.490511 512.818133 567.18895zM879.430882 793.511535 144.567072 793.511535c-14.302751 0-25.875321-11.627828-25.875321-25.929556L118.691751 264.116353 492.947574 622.541629c5.240351 5.021364 11.901051 7.479345 18.560728 7.479345 4.256954 0 8.295943-1.309832 12.117992-3.275603 4.095271-1.201361 8.024767-3.00238 11.244089-6.16849L905.305179 260.894985l0 506.685971C905.305179 781.882684 893.733633 793.511535 879.430882 793.511535z" p-id="6602" ></path>
                        </svg>
                        <span style={{textDecoration: 'underline'}}>454766952@qq.com</span>
                    </div>

                    <div className="computer-infor-describe flex-start-center">
                        <svg width="16" height="16" t="1530089132707" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5187" >
                            <path fill="#303133" d="M772.654545 900.654545l-13.963636-4.654545C165.236364 714.472727 128 265.309091 125.672727 260.654545V232.727273l155.927273-116.363637 160.581818 209.454546-81.454545 90.763636c27.927273 95.418182 174.545455 200.145455 242.036363 242.036364l109.381819-74.472727 190.836363 169.890909-130.327273 146.618181zM172.218182 258.327273c2.327273 25.6 44.218182 416.581818 586.472727 588.8l83.781818-88.436364-128-114.036364-104.727272 69.818182-11.636364-6.981818c-9.309091-6.981818-249.018182-146.618182-279.272727-290.909091l-2.327273-11.636363 72.145454-79.127273L279.272727 183.854545l-107.054545 74.472728z" p-id="5188" ></path>
                        </svg>
                        <span>15976713287</span>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * 渲染 导航栏部分
     */
    renderNavigation() {
        const _this = this;

        /**
         * 导航栏列表
         */
        let navList = [
            {
                value: 'home', // 导航栏的唯一标识
                lable: '主页' // 标签名称
            }, {
                value: 'resume',
                lable: '作品'
            }, {
                value: 'record',
                lable: '记录'
            }, {
                value: 'english',
                lable: '英语'
            },
        ];

        /**
         * 导航栏选择
         */
        let navSelectHandle = item => {
            window.localStorage.setItem('computer_nav', item); // 持久化需求
            _this.setState({navBarSelected: item});
        };

        return (
            <div className="computer-main-navigation flex-start-center">
                {navList.map((val, key) => (
                    <div className="computer-navigation-item" 
                        key={key}
                        onClick={() => navSelectHandle(val.value)}
                    >
                        <span className={this.state.navBarSelected === val.value ? 'navigation-item-selected' : ''}>{
                            val.lable
                        }</span>
                    </div>
                ))}
            </div>
        );
    }

    /**
     * 渲染 首页部分
     */
    renderHome() {
        return this.state.navBarSelected === 'home' ? (
            <div className="computer-main-home">
            </div>
        ) : '';
    }

    /**
     * 渲染 简历和作品
     */
    renderResume() {
        return this.state.navBarSelected === 'resume' ? (
            <div className="computer-main-resume">
            </div>
        ) : '';
    }

    /**
     * 渲染 记录
     */
    renderRecord() {
        const _this = this;
        let recordList = this.state.recordList; // 记录列表数据
        let recordSortType = this.state.recordSortType; // 记录排序方式
        let addRecordTitle = this.state.addRecordTitle; // 新增 记录 标题
        let addRecordContent = this.state.addRecordContent; // 新增 记录 内容
        let recordPagenum = this.state.recordPagenum; // 页码
        let recordPageTotal = this.state.recordPageTotal; // 一共有多少数据
        let recordPaginationNum = this.state.recordPaginationNum; // 要跳转的页码

        /**
         * 数据提交 的处理函数
         */
        let submitHandle = () => {
            if (!addRecordContent) {
                return alert('内容不能为空');
            }

            let mytitle = addRecordTitle ? addRecordTitle : `记录 ${convertTime.dateToYYYYmmDDhhMM(new Date())}`;
            
            recordAjaxs.saveRecord(mytitle, addRecordContent)
            .then(
                () => _this.setState({ addRecordTitle: '', addRecordContent: '' }, _this.getRecordListBy.bind(_this)), 
                error => alert(error)
            );
        }

        /**
         * 标题 输入框 处理函数
         */
        const inputTitleHandle = event => _this.setState({addRecordTitle: event.target.value});

        /**
         * 内容 输入框 处理函数
         */
        const inputContentHandle = event => _this.setState({addRecordContent: event.target.value});


        /**
         * 编辑标题 输入框 处理函数
         */
        const editTitleHandle = (val, index) => {
            let newRecordList = recordList.concat([]);
            newRecordList[index].title = val;
            _this.setState({recordList: newRecordList});
        };

        /**
         * 编辑内容 输入框 处理函数
         */
        const editContentHandle = (val, index) => {
            let newRecordList = recordList.concat([]);
            newRecordList[index].content = val;
            _this.setState({recordList: newRecordList});
        };

        /**
         * 排序方式 处理函数
         */
        const sortTypeHandle = event => _this.setState({recordSortType: event.target.value}, _this.getRecordListBy.bind(_this));

        /**
         * 通过下标 切换编辑状态
         * @param {number} index 要切换编辑状态的下标
         */
        const editSwitcher = index => {
            let newRecordList = recordList.concat([]);
            newRecordList[index].isEdit = !newRecordList[index].isEdit;
            _this.setState({recordList: newRecordList});
        }

        /**
         * 保存编辑
         */
        const editSubmit = index => {
            let id = recordList[index].id;
            let title = recordList[index].title;
            let content = recordList[index].content;

            // 必须要判断 编辑的 内容 是否为空
            if (!content) {
                return alert('内容不能为空');
            }

            // 初始化标题, 当标题为空的时候 
            let mytitle = title ? title : `记录 ${convertTime.dateToYYYYmmDDhhMM(new Date())}`;

            recordAjaxs.editRecord(id, mytitle, content)
            .then(
                () => { // 修改成功
                    _this.getRecordListBy.call(_this)

                }, error => alert(error)
            );
        }

        /**
         * 删除一个项目
         */
        const delItem = index => {
            // 询问是否确认删除
            if (window.confirm('是否删除此条数据?') === false) {
                // 不删除的情况, 阻止往下执行即可
                return false
            }
            
            recordAjaxs.deleteRecord(recordList[index].id)
            .then(() => { // 记录删除成功
                _this.getRecordListBy.call(_this)

            }, error => alert(error));
        }

        /**
         * 渲染分页
         */
        const renderPagination = () => {
            // 只有时间排序才有分页
            if (recordSortType !== 'time') {
                return '';
            }

            let paginationItem = (<div className="list-pagination-item" key="default">1</div>);

            /**
             * 下一页
             */
            const nextPageHandle = () => {
                // 判断是否可以下一页
                if (recordPagenum >= recordPageTotal) {
                    return false
                }

                let newPageNum = recordPagenum + 1;

                _this.setState(
                    {
                        recordPagenum: newPageNum,
                        recordPaginationNum: newPageNum
                    }, 
                    _this.getRecordListBy.bind(_this)
                );
            }

            /**
             * 上一页
             */
            const previousPageHandle = () => {
                // 判断是否可以上一页
                if (recordPagenum <= 1) {
                    return false
                }

                let newPageNum = recordPagenum - 1;

                _this.setState(
                    {
                        recordPagenum: newPageNum,
                        recordPaginationNum: newPageNum
                    }, 
                    _this.getRecordListBy.bind(_this)
                );
            }

            /**
             * 选择跳转
             */
            const jumpBySelect = pageNum => {
                // 是否当前页
                if (pageNum === recordPagenum) {
                    return false
                }

                _this.setState(
                    {
                        recordPagenum: pageNum,
                        recordPaginationNum: pageNum
                    }, 
                    _this.getRecordListBy.bind(_this)
                );
            }

            /**
             * 输入跳转
             */
            const jumpByInputHandle = event => {
                // 判断是否合法
                let newPageNum = event.target.value;
                if (event.target.value <= 1) {
                    newPageNum = 1;
                    
                } else if (event.target.value >= recordPageTotal) {
                    newPageNum = recordPageTotal;

                }

                _this.setState({recordPaginationNum: newPageNum});
            }

            /**
             * 输入跳转确认
             */
            const jumpByInputConfirm = () => {
                // 是否当前页
                if (recordPaginationNum === recordPagenum) {
                    return false
                }

                _this.setState(
                    {
                        recordPagenum: recordPaginationNum,
                        recordPaginationNum: recordPaginationNum
                    }, 
                    _this.getRecordListBy.bind(_this)
                );
            }

            // 总页数 小于 9 页的情况
            if (recordPageTotal < 9) {
                // 显示全部页码
                let paginationItemList = [];
                for (let i = 0; i < recordPageTotal; i++) {
                    paginationItemList.push(
                        <div key={`${i}11`}
                            className={`list-pagination-item ${recordPagenum === (i + 1) ? 'pagination-item-selected' : ''}`} 
                            onClick={() => jumpBySelect(i + 1)}
                        >{i + 1}</div>
                    );
                }

                paginationItem = paginationItemList;

            } else {
                // 总页数大于 9 页的时候
                let paginationItemList = [];

                // 当前页数 是否在1~5区间内?
                if (recordPagenum <= 5) {
                    // 在这个区间内的话 显示1~5
                    for (let i = 0; i <= 5; i++) {
                        paginationItemList.push(
                            <div key={`${i}11`}
                                className={`list-pagination-item ${recordPagenum === (i + 1) ? 'pagination-item-selected' : ''}`} 
                                onClick={() => jumpBySelect(i + 1)}
                            >{i + 1}</div>
                        );
                    }
                    paginationItemList.push(<div className="list-pagination-point" key={`112`}>...</div>); // 显示点点点
                    paginationItemList.push(<div className="list-pagination-item" key={`1${recordPageTotal}1`} onClick={() => jumpBySelect(recordPageTotal)}>{recordPageTotal}</div>); // 最后一页

                // 当前页数是否在倒数第五页内?
                } else if (recordPagenum >= (recordPageTotal - 5)) {
                    paginationItemList.push(<div className="list-pagination-item" key={`1222`} onClick={() => jumpBySelect(1)}>1</div>); // 显示第一页
                    paginationItemList.push(<div className="list-pagination-point" key={`123321`}>...</div>); // 显示点点点

                    // 显示最后5页
                    for (let i = 6; i >= 0; i--) {
                        paginationItemList.push(
                            <div key={`222${i}`}
                                className={`list-pagination-item ${recordPagenum === (recordPageTotal - i) ? 'pagination-item-selected' : ''}`} 
                                onClick={() => jumpBySelect(recordPageTotal - i)}
                            >{recordPageTotal - i}</div>
                        );
                    }

                // 表示在区间内
                } else {
                    paginationItemList.push(<div className="list-pagination-item" key={`3331`} onClick={() => jumpBySelect(1)}>1</div>); // 显示第一页
                    paginationItemList.push(<div className="list-pagination-point" key={`3332`}>...</div>); // 显示点点点

                    // 显示当前页码5前后5页码的数据
                    for (let i = -2; i <= 2; i++) {
                        paginationItemList.push(
                            <div key={`${i}333`}
                                className={`list-pagination-item ${recordPagenum === (recordPagenum + i) ? 'pagination-item-selected' : ''}`} 
                                onClick={() => jumpBySelect(recordPagenum + i)}
                            >{recordPagenum + i}</div>
                        );
                    }

                    paginationItemList.push(<div className="list-pagination-point" key={`3334`}>...</div>); // 显示点点点
                    paginationItemList.push(<div className="list-pagination-item" key={`3335`} onClick={() => jumpBySelect(recordPageTotal)}>{recordPageTotal}</div>); // 最后一页
                }

                paginationItem = paginationItemList;
            }

            return (
                <div className="record-list-pagination flex-center">
                    <div className="list-pagination-container flex-start-center">
                        <div className="list-pagination-item list-pagination-left flex-center" onClick={previousPageHandle}>
                            <svg viewBox="64 64 896 896" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
                        </div>
                        {paginationItem}
                        <div className="list-pagination-item list-pagination-right flex-center" onClick={nextPageHandle}>
                            <svg viewBox="64 64 896 896" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
                        </div>

                        <div className="list-pagination-input flex-start-center">
                            <div className="pagination-input-container">
                                <input 
                                    value={recordPaginationNum}
                                    onChange={jumpByInputHandle}
                                />
                            </div>
                            <div className="pagination-input-submit" onClick={jumpByInputConfirm}>跳转</div>
                        </div>
                    </div>
                </div>
            )
        }

        return this.state.navBarSelected === 'record' ? (
            <div className="computer-main-record">

                {/* 新增部分 */}
                <div className="computer-record-add">
                    <div className="record-add-top flex-start-bottom">
                        <div className="flex-rest">Add records</div>
                        <div className="add-top-btn" onClick={submitHandle}>Create new record</div>
                    </div>

                    <div className="record-add-title flex-start">
                        <input className="flex-rest" 
                            value={addRecordTitle}
                            onChange={inputTitleHandle}
                            placeholder="Input you record title..." 
                        />
                    </div>

                    <div className="record-add-content flex-start">
                        <textarea className="flex-rest" 
                            value={addRecordContent}
                            onChange={inputContentHandle}
                            placeholder="Input you record content..."
                        />
                    </div>
                </div>

                {/* 列表部分 */}
                <div className="computer-record-list">
                    <div className="record-list-title flex-start-bottom">
                        <div className="flex-rest">All records</div>
                        {recordSortType === 'random' ? <div className="list-random-refresh" onClick={_this.getRecordListBy.bind(_this)}>Refresh</div> : ""}
                        <div className="list-title-select">
                            <select 
                                value={recordSortType}
                                onChange={sortTypeHandle}
                            >
                                <option value ="time">时间排序</option>
                                <option value="random">随机排序</option>
                            </select>
                        </div>
                    </div>

                    <div className="record-list-main">
                        {recordList.map((val, key) => (
                            <div className={`list-main-item ${key % 2 == 0 ? 'list-item-left' : ''}`}
                                key={key}
                            >
                                {val.isEdit ? (
                                    <div className="main-item-edit">
                                        <div className="record-edit-title flex-start">
                                            <input className="flex-rest" 
                                                value={val.title}
                                                onChange={event => editTitleHandle(event.target.value, key)}
                                                placeholder="Input you record title..." 
                                            />
                                        </div>
                                        <div className="record-edit-content flex-start">
                                            <textarea className="flex-rest" 
                                                value={val.content}
                                                onChange={event => editContentHandle(event.target.value, key)}
                                                placeholder="Input you record content..."
                                            />
                                        </div>
                                        <div className="record-edit-operate flex-start">
                                            <div className="record-edit-submit" onClick={() => editSubmit(key)}>确认</div>
                                            <div className="record-edit-del" onClick={() => delItem(key)}>删除</div>
                                            <div className="record-edit-cancel" onClick={() => editSwitcher(key)}>取消</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="main-item-container" onClick={() => editSwitcher(key)}>
                                        <div className="list-item-title">{val.title}</div>
                                        <div className="list-item-content ReactMarkdown"><ReactMarkdown source={val.content} /></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                {renderPagination() /* 分页部分 */}
            </div>
        ) : '';
    }

    /**
     * 渲染 英语
     */
    renderEnglish() {
        const _this = this;
        let englishList = this.state.englishList; // 英语列表数据
        let englishSortType = this.state.englishSortType; // 英语 排序方式
        let addEnglishEN = this.state.addEnglishEN; // 新增 英语 英语原文
        let addEnglishZH = this.state.addEnglishZH; // 新增 英语 中文注释
        let englishPagenum = this.state.englishPagenum; // 页码
        let englishPageTotal = this.state.englishPageTotal; // 一共有多少数据
        let englishPaginationNum = this.state.englishPaginationNum; // 要跳转的页码

        /**
         * 数据提交 的处理函数
         */
        let submitHandle = () => {
            if (!addEnglishEN || !addEnglishZH) {
                return alert('内容不能为空');
            }

            englishAjaxs.add(addEnglishEN, addEnglishZH)
            .then(
                () => _this.setState({ addEnglishEN: '', addEnglishZH: '' }, _this.getEnglishListBy.bind(_this)), 
                error => alert(error)
            );
        }

        /**
         * 标题 输入框 处理函数
         */
        const inputENHandle = event => _this.setState({addEnglishEN: event.target.value});

        /**
         * 内容 输入框 处理函数
         */
        const inputZHHandle = event => _this.setState({addEnglishZH: event.target.value});


        /**
         * 编辑标题 输入框 处理函数
         */
        const editENHandle = (val, index) => {
            let newEnglishList = englishList.concat([]);
            newEnglishList[index].en_text = val;
            _this.setState({englishList: newEnglishList});
        };

        /**
         * 编辑内容 输入框 处理函数
         */
        const editZHHandle = (val, index) => {
            let newEnglishList = englishList.concat([]);
            newEnglishList[index].zh_text = val;
            _this.setState({englishList: newEnglishList});
        };

        /**
         * 排序方式 处理函数
         */
        const sortTypeHandle = event => _this.setState({englishSortType: event.target.value}, _this.getEnglishListBy.bind(_this));

        /**
         * 通过下标 切换编辑状态
         * @param {number} index 要切换编辑状态的下标
         */
        const editSwitcher = index => {
            let newEnglishList = englishList.concat([]);
            newEnglishList[index].isEdit = !newEnglishList[index].isEdit;
            _this.setState({englishList: newEnglishList});
        }

        /**
         * 保存编辑
         */
        const editSubmit = index => {
            let id = englishList[index].id;
            let en_text = englishList[index].en_text;
            let zh_text = englishList[index].zh_text;

            // 必须要判断 编辑的 内容 是否为空
            if (!en_text || !zh_text) {
                return alert('内容不能为空');
            }

            englishAjaxs.edit(id, en_text, zh_text)
            .then(
                () => { // 修改成功
                    _this.getEnglishListBy.call(_this)

                }, error => alert(error)
            );
        }

        /**
         * 删除一个项目
         */
        const delItem = index => {
            // 询问是否确认删除
            if (window.confirm('是否删除此条数据?') === false) {
                // 不删除的情况, 阻止往下执行即可
                return false
            }
            
            englishAjaxs.del(englishList[index].id)
            .then(() => { // 记录删除成功
                _this.getEnglishListBy.call(_this)

            }, error => alert(error));
        }

        /**
         * 渲染分页
         */
        const renderPagination = () => {
            // 只有时间排序才有分页
            if (englishSortType !== 'time') {
                return '';
            }

            let paginationItem = (<div className="list-pagination-item" key="default">1</div>);

            /**
             * 下一页
             */
            const nextPageHandle = () => {
                // 判断是否可以下一页
                if (englishPagenum >= englishPageTotal) {
                    return false
                }

                let newPageNum = englishPagenum + 1;

                _this.setState(
                    {
                        englishPagenum: newPageNum,
                        englishPaginationNum: newPageNum
                    }, 
                    _this.getEnglishListBy.bind(_this)
                );
            }

            /**
             * 上一页
             */
            const previousPageHandle = () => {
                // 判断是否可以上一页
                if (englishPagenum <= 1) {
                    return false
                }

                let newPageNum = englishPagenum - 1;

                _this.setState(
                    {
                        englishPagenum: newPageNum,
                        englishPaginationNum: newPageNum
                    }, 
                    _this.getEnglishListBy.bind(_this)
                );
            }

            /**
             * 选择跳转
             */
            const jumpBySelect = pageNum => {
                // 是否当前页
                if (pageNum === englishPagenum) {
                    return false
                }

                _this.setState(
                    {
                        englishPagenum: pageNum,
                        englishPaginationNum: pageNum
                    }, 
                    _this.getEnglishListBy.bind(_this)
                );
            }

            /**
             * 输入跳转
             */
            const jumpByInputHandle = event => {
                // 判断是否合法
                let newPageNum = event.target.value;
                if (event.target.value <= 1) {
                    newPageNum = 1;
                    
                } else if (event.target.value >= englishPageTotal) {
                    newPageNum = englishPageTotal;

                }

                _this.setState({englishPaginationNum: newPageNum});
            }

            /**
             * 输入跳转确认
             */
            const jumpByInputConfirm = () => {
                // 是否当前页
                if (englishPaginationNum === englishPagenum) {
                    return false
                }

                _this.setState(
                    {
                        englishPagenum: englishPaginationNum,
                        englishPaginationNum: englishPaginationNum
                    }, 
                    _this.getEnglishListBy.bind(_this)
                );
            }

            // 总页数 小于 9 页的情况
            if (englishPageTotal < 9) {
                // 显示全部页码
                let paginationItemList = [];
                for (let i = 0; i < englishPageTotal; i++) {
                    paginationItemList.push(
                        <div key={`${i}11`}
                            className={`list-pagination-item ${englishPagenum === (i + 1) ? 'pagination-item-selected' : ''}`} 
                            onClick={() => jumpBySelect(i + 1)}
                        >{i + 1}</div>
                    );
                }

                paginationItem = paginationItemList;

            } else {
                // 总页数大于 9 页的时候
                let paginationItemList = [];

                // 当前页数 是否在1~5区间内?
                if (englishPagenum <= 5) {
                    // 在这个区间内的话 显示1~5
                    for (let i = 0; i <= 5; i++) {
                        paginationItemList.push(
                            <div key={`${i}11`}
                                className={`list-pagination-item ${englishPagenum === (i + 1) ? 'pagination-item-selected' : ''}`} 
                                onClick={() => jumpBySelect(i + 1)}
                            >{i + 1}</div>
                        );
                    }
                    paginationItemList.push(<div className="list-pagination-point" key={`112`}>...</div>); // 显示点点点
                    paginationItemList.push(<div className="list-pagination-item" key={`1${englishPageTotal}1`} onClick={() => jumpBySelect(englishPageTotal)}>{englishPageTotal}</div>); // 最后一页

                // 当前页数是否在倒数第五页内?
                } else if (englishPagenum >= (englishPageTotal - 5)) {
                    paginationItemList.push(<div className="list-pagination-item" key={`1222`} onClick={() => jumpBySelect(1)}>1</div>); // 显示第一页
                    paginationItemList.push(<div className="list-pagination-point" key={`123321`}>...</div>); // 显示点点点

                    // 显示最后5页
                    for (let i = 6; i >= 0; i--) {
                        paginationItemList.push(
                            <div key={`222${i}`}
                                className={`list-pagination-item ${englishPagenum === (englishPageTotal - i) ? 'pagination-item-selected' : ''}`} 
                                onClick={() => jumpBySelect(englishPageTotal - i)}
                            >{englishPageTotal - i}</div>
                        );
                    }

                // 表示在区间内
                } else {
                    paginationItemList.push(<div className="list-pagination-item" key={`3331`} onClick={() => jumpBySelect(1)}>1</div>); // 显示第一页
                    paginationItemList.push(<div className="list-pagination-point" key={`3332`}>...</div>); // 显示点点点

                    // 显示当前页码5前后5页码的数据
                    for (let i = -2; i <= 2; i++) {
                        paginationItemList.push(
                            <div key={`${i}333`}
                                className={`list-pagination-item ${englishPagenum === (englishPagenum + i) ? 'pagination-item-selected' : ''}`} 
                                onClick={() => jumpBySelect(englishPagenum + i)}
                            >{englishPagenum + i}</div>
                        );
                    }

                    paginationItemList.push(<div className="list-pagination-point" key={`3334`}>...</div>); // 显示点点点
                    paginationItemList.push(<div className="list-pagination-item" key={`3335`} onClick={() => jumpBySelect(englishPageTotal)}>{englishPageTotal}</div>); // 最后一页
                }

                paginationItem = paginationItemList;
            }

            return (
                <div className="english-list-pagination flex-center">
                    <div className="list-pagination-container flex-start-center">
                        <div className="list-pagination-item list-pagination-left flex-center" onClick={previousPageHandle}>
                            <svg viewBox="64 64 896 896" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
                        </div>
                        {paginationItem}
                        <div className="list-pagination-item list-pagination-right flex-center" onClick={nextPageHandle}>
                            <svg viewBox="64 64 896 896" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path></svg>
                        </div>

                        <div className="list-pagination-input flex-start-center">
                            <div className="pagination-input-container">
                                <input 
                                    value={englishPaginationNum}
                                    onChange={jumpByInputHandle}
                                />
                            </div>
                            <div className="pagination-input-submit" onClick={jumpByInputConfirm}>跳转</div>
                        </div>
                    </div>
                </div>
            )
        }

        return this.state.navBarSelected === 'english' ? (
            <div className="computer-main-english">

                {/* 新增部分 */}
                <div className="computer-english-add">
                    <div className="english-add-top flex-start-bottom">
                        <div className="flex-rest">Add english</div>
                        <div className="add-top-btn" onClick={submitHandle}>Create new english</div>
                    </div>

                    <div className="english-add-title flex-start">
                        <textarea className="flex-rest" 
                            value={addEnglishEN}
                            onChange={inputENHandle}
                            placeholder="Input you english text..." 
                        />
                    </div>

                    <div className="english-add-content flex-start">
                        <textarea className="flex-rest" 
                            value={addEnglishZH}
                            onChange={inputZHHandle}
                            placeholder="Input you english tip..."
                        />
                    </div>
                </div>

                {/* 列表部分 */}
                <div className="computer-english-list">
                    <div className="english-list-title flex-start-bottom">
                        <div className="flex-rest">All english items</div>
                        {englishSortType === 'random' ? <div className="list-random-refresh" onClick={_this.getEnglishListBy.bind(_this)}>Refresh</div> : ""}
                        <div className="list-title-select">
                            <select 
                                value={englishSortType}
                                onChange={sortTypeHandle}
                            >
                                <option value ="time">时间排序</option>
                                <option value="random">随机排序</option>
                            </select>
                        </div>
                    </div>

                    <div className="english-list-main">
                        {englishList.map((val, key) => (
                            <div className={`list-main-item ${key % 2 == 0 ? 'list-item-left' : ''}`}
                                key={key}
                            >
                                {val.isEdit ? (
                                    <div className="main-item-edit">
                                        <div className="english-edit-title flex-start">
                                            <textarea className="flex-rest" 
                                                value={val.en_text}
                                                onChange={event => editENHandle(event.target.value, key)}
                                                placeholder="Input you english text..." 
                                            />
                                        </div>
                                        <div className="english-edit-content flex-start">
                                            <textarea className="flex-rest" 
                                                value={val.zh_text}
                                                onChange={event => editZHHandle(event.target.value, key)}
                                                placeholder="Input you english tip..."
                                            />
                                        </div>
                                        <div className="english-edit-operate flex-start">
                                            <div className="english-edit-submit" onClick={() => editSubmit(key)}>确认</div>
                                            <div className="english-edit-del" onClick={() => delItem(key)}>删除</div>
                                            <div className="english-edit-cancel" onClick={() => editSwitcher(key)}>取消</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="main-item-container" onClick={() => editSwitcher(key)}>
                                        <div className="list-item-content">{val.en_text}</div>
                                        <div className="list-item-tip">{val.zh_text}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                {renderPagination() /* 分页部分 */}
            </div>
        ) : '';
    }

    render() {
        return (
            <React.Fragment>
                <NavHeard></NavHeard>

                {/* 内容区域部分 */}
                <div className="rejiejay-computer flex-column-center" style={{minHeight: `${clientHeight - 81 - 60 - 25}px`}}>
                    <div className="rejiejay-computer-container flex-start-top">
 
                        {/* 左边 个人信息部分 */}
                        {this.renderUserInfor.call(this)}

                        {/* 右 边主要内容部分 */}
                        <div className="rejiejay-computer-main flex-rest">
 
                            {this.renderNavigation.call(this) /** 渲染 导航栏部分 */}

                            {this.renderHome.call(this) /** 渲染 首页部分 */}
                            {this.renderResume.call(this) /** 渲染 简历和作品 */}
                            {this.renderRecord.call(this) /** 渲染 记录 */}
                            {this.renderEnglish.call(this) /** 渲染 英语 */}

                        </div>
                    </div>
                </div>

                <Copyright></Copyright>
            </React.Fragment>
        )
    }
}

export default computer;
