// 框架类
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
// 组件类
import NavHeard from './NavHeard/index';
import Copyright from './../../components/Copyright';
// 请求类
import recordAjaxs from './../../api/record';
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
             * 导航栏（不需要持久化）
             * @param {String} home 首页合集部分
             * @param {String} resume 简历和作品
             * @param {String} record 记录
             * @param {String} english 英语
             */
            navBarSelected: 'home',
        };
    }

    /**
     * 组件加载完毕之后立即执行
     */
    componentDidMount() {
        this.initBannerRecord(); // 初始化 横幅描述 随机记录
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
        let navSelectHandle = item => _this.setState({navBarSelected: item});

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
        return this.state.navBarSelected === 'record' ? (
            <div className="computer-main-record">
            </div>
        ) : '';
    }

    /**
     * 渲染 英语
     */
    renderEnglish() {
        return this.state.navBarSelected === 'english' ? (
            <div className="computer-main-english">
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
