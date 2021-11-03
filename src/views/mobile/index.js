// 框架类
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
// 样式类
import './index.scss';
// 请求类
import recordAjaxs from './../../api/record';
import englishAjaxs from './../../api/english';
// 自定义组件类
import Copyright from './../../components/Copyright';
// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

class mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /**
             * 导航栏
             * @param {string} all 主页
             * @param {string} resume 作品
             * @param {string} record 记录
             * @param {string} english 英语
             */
            navBarStatus: window.localStorage.navBarStatus ? window.localStorage.navBarStatus : 'all',

            /**
             * 用于渲染 横幅描述 随机记录的 id
             * 如果不存在 表示 显示 web前端开发 · 人机互联网络（深圳）有限公司 的那一行 默认的 横幅描述
             * 为什么有这个？ 因为我 首屏 需要显示 一些自己的想法 这是我的需求 
             */
            bannerRandomDescribeId: window.localStorage.BanRandomDesId ? window.localStorage.BanRandomDesId : false,
            bannerRecordTitle: '', // 横幅描述 的 随机记录 标题
            bannerRecordContent: '', // 横幅描述 的 随机记录 内容

            reusemeList: [], // 简历 列表数据 这里简单几条重要的数据即可 7 条数据即可
            recordList: [], // 记录 列表数据
            englishList: [], // 英语 列表数据
        };
    }

    /**
     * 组件加载完毕之后立即执行
     */
    componentDidMount() {
        this.initBannerRecord(); // 初始化 横幅描述 随机记录
        this.getRecordList(); // 获取 记录列表
        this.getEnglishList(); // 获取 英语列表
    }

    /**
     * 初始化 横幅描述 随机记录
     */
    initBannerRecord() {
        const _this = this;

        // 判断本地是否存在 id
        if (window.localStorage.BanRandomDesId) {
            // 如果存在, 则根据id查询 记录
            recordAjaxs.getOneById(parseInt(window.localStorage.BanRandomDesId, 10))
            .then(
                value => _this.setState({
                    bannerRecordTitle: value.title,
                    bannerRecordContent: value.content,
                }), 
                error => alert(error)
            );
        }
    }

    /**
     * 获取 记录列表
     */
    getRecordList() {

        recordAjaxs.getList( 1 /* 首页只获取一页数据即可 */)
        .then(
            res => {
                this.setState({recordList: res.list});

            }, error => alert(error)
        );
    }

    /**
     * 获取 英语列表
     */
    getEnglishList() {

        englishAjaxs.getList( 1 /* 首页只获取一页数据即可 */)
        .then(
            res => {
                this.setState({englishList: res.list});

            }, error => alert(error)
        );
    }

    /**
     * 渲染 顶部横幅轮播图
     */
    renderHeadlineBanner() {
        return (
            <div className="mobile-headline-banner">
                <img alt="headline" src='https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/page-assets/picture/mobile-headline-banner.png' />
            </div>
        );
    }

    /**
     * 渲染 描述横幅
     */
    renderDescribeBanner() {
        const _this = this;

        let GitHub = (
            <svg width="28" height="28" t="1530086884294" className="GitHub" viewBox="0 0 1049 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2539" >
                <path fill="#191717" d="M524.979332 0C234.676191 0 0 234.676191 0 524.979332c0 232.068678 150.366597 428.501342 358.967656 498.035028 26.075132 5.215026 35.636014-11.299224 35.636014-25.205961 0-12.168395-0.869171-53.888607-0.869171-97.347161-146.020741 31.290159-176.441729-62.580318-176.441729-62.580318-23.467619-60.841976-58.234462-76.487055-58.234463-76.487055-47.804409-32.15933 3.476684-32.15933 3.476685-32.15933 53.019436 3.476684 80.83291 53.888607 80.83291 53.888607 46.935238 79.963739 122.553122 57.365291 152.97411 43.458554 4.345855-33.897672 18.252593-57.365291 33.028501-70.402857-116.468925-12.168395-239.022047-57.365291-239.022047-259.012982 0-57.365291 20.860106-104.300529 53.888607-140.805715-5.215026-13.037566-23.467619-66.926173 5.215027-139.067372 0 0 44.327725-13.906737 144.282399 53.888607 41.720212-11.299224 86.917108-17.383422 131.244833-17.383422s89.524621 6.084198 131.244833 17.383422C756.178839 203.386032 800.506564 217.29277 800.506564 217.29277c28.682646 72.1412 10.430053 126.029806 5.215026 139.067372 33.897672 36.505185 53.888607 83.440424 53.888607 140.805715 0 201.64769-122.553122 245.975415-239.891218 259.012982 19.121764 16.514251 35.636014 47.804409 35.636015 97.347161 0 70.402857-0.869171 126.898978-0.869172 144.282399 0 13.906737 9.560882 30.420988 35.636015 25.205961 208.601059-69.533686 358.967656-265.96635 358.967655-498.035028C1049.958663 234.676191 814.413301 0 524.979332 0z" p-id="2540"></path>
                <path fill="#191717" d="M199.040177 753.571326c-0.869171 2.607513-5.215026 3.476684-8.691711 1.738342s-6.084198-5.215026-4.345855-7.82254c0.869171-2.607513 5.215026-3.476684 8.691711-1.738342s5.215026 5.215026 4.345855 7.82254z m-6.953369-4.345856M219.900283 777.038945c-2.607513 2.607513-7.82254 0.869171-10.430053-2.607514-3.476684-3.476684-4.345855-8.691711-1.738342-11.299224 2.607513-2.607513 6.953369-0.869171 10.430053 2.607514 3.476684 4.345855 4.345855 9.560882 1.738342 11.299224z m-5.215026-5.215027M240.760389 807.459932c-3.476684 2.607513-8.691711 0-11.299224-4.345855-3.476684-4.345855-3.476684-10.430053 0-12.168395 3.476684-2.607513 8.691711 0 11.299224 4.345855 3.476684 4.345855 3.476684 9.560882 0 12.168395z m0 0M269.443034 837.011749c-2.607513 3.476684-8.691711 2.607513-13.906737-1.738342-4.345855-4.345855-6.084198-10.430053-2.607513-13.037566 2.607513-3.476684 8.691711-2.607513 13.906737 1.738342 4.345855 3.476684 5.215026 9.560882 2.607513 13.037566z m0 0M308.555733 853.526c-0.869171 4.345855-6.953369 6.084198-13.037566 4.345855-6.084198-1.738342-9.560882-6.953369-8.691711-10.430053 0.869171-4.345855 6.953369-6.084198 13.037566-4.345855 6.084198 1.738342 9.560882 6.084198 8.691711 10.430053z m0 0M351.145116 857.002684c0 4.345855-5.215026 7.82254-11.299224 7.82254-6.084198 0-11.299224-3.476684-11.299224-7.82254s5.215026-7.82254 11.299224-7.82254c6.084198 0 11.299224 3.476684 11.299224 7.82254z m0 0M391.126986 850.049315c0.869171 4.345855-3.476684 8.691711-9.560882 9.560882-6.084198 0.869171-11.299224-1.738342-12.168395-6.084197-0.869171-4.345855 3.476684-8.691711 9.560881-9.560882 6.084198-0.869171 11.299224 1.738342 12.168396 6.084197z m0 0"  p-id="2541"></path>
            </svg>
        );

        let zhihu = (
            <svg width="32" height="32" t="1530086892405" className="zhihu" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2973"  >
                <path fill="#006CE2" d="M544.059897 959.266898h-64.949141c-228.633593 0-415.697442-187.063849-415.697442-415.697442v-64.949141c0-228.633593 187.063849-415.697442 415.697442-415.697442h64.949141c228.633593 0 415.697442 187.063849 415.697442 415.697442v64.949141c-0.001024 228.633593-187.064873 415.697442-415.697442 415.697442z" p-id="2974"></path>
                <path fill="#FFFFFF" d="M513.358696 494.912378h-84.12549c1.331051-13.311533 4.791783-49.517142 4.791783-70.01635 0-20.499208-0.26621-50.049562-0.26621-50.049563h84.65791v-13.311533c0-17.837106-7.720095-25.823412-14.110163-25.823412H357.08615s4.259363-14.642584 8.252516-29.816564c3.993153-15.175004 13.045323-36.471819 13.045323-36.471819-51.913034 3.460732-55.995265 41.974179-67.354248 76.405394-11.358984 34.431216-20.232998 51.380613-36.73803 88.917273 22.8951 0 45.523989-11.180828 55.107556-26.622042 9.583567-15.441215 13.932008-33.543507 13.932008-33.543507h51.114403v48.629434c0 17.39274-3.194522 72.056954-3.194522 72.056953h-91.225111c-15.973635 0-24.492361 40.28784-24.492361 40.28784h110.215112c-6.921465 62.473387-21.830259 87.498168-42.772809 125.833459-20.94255 38.336314-76.405395 81.907754-76.405395 81.907754 33.809717 9.583567 71.347401-2.928312 87.320012-18.103317 15.973635-15.175004 29.550354-40.998416 39.401155-60.017086 9.849777-19.01867 18.103316-53.659782 18.103317-53.659782l89.449693 110.481322s3.993153-19.966788 5.324204-32.478666c1.331051-12.512903-0.621498-21.741181-3.816021-29.19609-3.194522-7.453885-12.778089-17.748028-25.557201-32.656823-12.778089-14.908794-39.578287-43.57144-39.578287-43.57144s-13.045323 9.583567-23.16131 17.304686c7.453885-18.103316 13.399587-65.667909 13.399587-65.667909h100.808677v-16.683187c0.002048-14.551458-6.031708-24.135025-14.905722-24.135025zM750.117843 329.500632H557.019214a3.54981 3.54981 0 0 0-3.549811 3.54981v358.510375a3.54981 3.54981 0 0 0 3.549811 3.549811h33.145216l12.112563 41.530836 66.820804-41.530836h81.020046a3.54981 3.54981 0 0 0 3.54981-3.549811V333.050442a3.54981 3.54981 0 0 0-3.54981-3.54981zM713.024525 654.112211h-43.128097l-50.714064 32.212457-8.918042-32.212457h-15.441214V368.723631h118.202441V654.112211z" p-id="2975"></path>
            </svg>
        );

        let qzone = (
            <svg width="28" height="28" t="1530086920405" className="qzone" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3366" >
                <path fill="#FFCE00" d="M504.768 24.224c-5.216 2.144-19.872 17.728-19.872 21.28 0 1.184-22.944 49.888-51.072 108.064S381.568 262.56 380.16 266.592c-1.184 3.776-3.328 8.288-4.256 9.696-1.184 1.408-7.808 14.176-14.88 28.384-7.552 15.616-15.616 28.608-20.096 32.16-10.88 9.216-3.552 8.288-221.312 32.64C21.248 380.576 10.368 382.24 4.48 387.68c-4.256 3.776-5.92 17.504-2.848 25.536 0.96 2.112 43.264 42.336 94.112 89.376 160.768 148.48 150.368 138.08 150.368 149.184 0 5.44-3.296 25.056-7.104 43.968-4.032 18.912-12.992 66.208-20.32 105.216s-15.84 83.712-18.912 99.296c-16.32 83.232-16.544 85.6-8.032 94.592 8.032 8.512 17.248 7.552 41.6-4.736 22.688-11.584 24.832-12.768 69.504-39.008 16.32-9.472 37.6-21.76 47.296-27.2s27.648-16.064 39.712-23.392 22.464-13.248 23.168-13.248c0.48 0 7.808-4.256 16.064-9.472s15.84-9.44 16.8-9.44c0.96 0 9.472-4.736 18.912-10.624 22.464-13.952 41.856-21.056 52.96-18.912 4.736 0.96 16.064 5.44 25.056 10.4 23.648 12.544 172.608 98.368 218.944 126.016 39.488 23.648 51.072 28.128 64.544 24.576 8.992-2.144 11.584-15.136 8.512-40.896-1.408-11.584-3.552-24.608-4.736-29.088-1.888-7.552-9.696-49.408-28.608-154.4-8.736-49.888-8.736-50.848 10.88-58.176 27.2-10.176 39.968-19.136 35.008-24.128-1.664-1.664-16.8 0.256-48.224 5.92-58.4 10.624-70.464 12.288-132.16 17.984-70.208 6.624-135.008 8.032-221.568 4.96-67.616-2.368-148-8.288-152.512-11.104-3.552-2.368-1.888-9.696 3.552-14.432 2.848-2.592 38.784-28.384 79.68-57.44 128.16-90.784 211.392-150.848 218.24-157.248 11.808-11.104 10.88-11.584-38.304-17.984-77.792-9.92-98.112-11.584-224.864-17.504-42.336-1.888-80.64-4.256-85.12-4.96-46.336-7.808 189.856-29.088 289.632-26.016 65.504 1.888 142.592 7.328 187.968 13.248 42.336 5.664 44.928 6.144 44.928 10.88 0 3.776-4.48 7.104-104.032 75.648-40.896 28.384-84.416 58.4-96.704 66.912-12.064 8.512-24.576 17.248-27.424 19.136-13.248 8.992-57.696 39.968-69.984 48.928-7.808 5.664-13.952 11.808-13.952 13.728 0 4.48 11.584 7.328 47.296 11.584 94.816 11.104 271.2 17.248 279.008 9.472 1.664-1.664 1.408-6.848-1.184-17.728-1.888-8.288-3.552-16.096-3.552-17.248 0-3.328 40.192-43.52 95.744-95.52 146.816-137.6 150.144-140.928 150.144-151.808 0-9.472-7.808-17.984-19.392-20.8-5.664-1.408-39.488-5.216-75.2-8.736-35.712-3.328-75.2-7.104-87.488-8.288-12.288-1.408-38.304-4.032-57.92-6.144-74.944-7.552-97.888-10.4-103.328-12.992-10.4-4.736-20.096-24.128-91.744-185.376C537.824 44.8 533.344 35.584 526.24 29.216c-5.888-5.44-15.104-7.552-21.504-4.96z" p-id="3367"></path>
            </svg>
        );

        let WeChat = (
            <svg width="28" height="28" t="1530087055467" className="WeChat" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3087">
                <path fill="#50B674" d="M352.814545 385.396364m-33.512727 0a33.512727 33.512727 0 1 0 67.025455 0 33.512727 33.512727 0 1 0-67.025455 0Z" p-id="3088"></path>
                <path fill="#50B674" d="M502.690909 384.465455m-33.512727 0a33.512727 33.512727 0 1 0 67.025454 0 33.512727 33.512727 0 1 0-67.025454 0Z" p-id="3089"></path>
                <path fill="#50B674" d="M576.232727 534.341818m-23.272727 0a23.272727 23.272727 0 1 0 46.545455 0 23.272727 23.272727 0 1 0-46.545455 0Z" p-id="3090"></path>
                <path fill="#50B674" d="M694.458182 536.203636m-23.272727 0a23.272727 23.272727 0 1 0 46.545454 0 23.272727 23.272727 0 1 0-46.545454 0Z" p-id="3091"></path>
                <path fill="#50B674" d="M512 0C229.003636 0 0 229.003636 0 512s229.003636 512 512 512 512-229.003636 512-512S794.996364 0 512 0z m-87.505455 630.225455c-26.996364 0-48.407273-5.585455-75.403636-11.17091l-75.403636 37.236364 21.410909-64.232727c-53.992727-37.236364-85.643636-85.643636-85.643637-145.221818 0-102.4 96.814545-182.458182 215.04-182.458182 105.192727 0 198.283636 64.232727 216.901819 150.807273-6.516364-0.930909-13.963636-0.930909-20.48-0.93091-102.4 0-182.458182 76.334545-182.458182 170.356364 0 15.825455 2.792727 30.72 6.516363 44.683636-7.447273 0-13.963636 0.930909-20.48 0.93091z m314.647273 75.403636l15.825455 53.992727-58.647273-32.581818c-21.410909 5.585455-42.821818 11.170909-64.232727 11.170909-102.4 0-182.458182-69.818182-182.458182-155.461818s80.058182-155.461818 182.458182-155.461818c96.814545 0 182.458182 69.818182 182.458182 155.461818 0 47.476364-31.650909 90.298182-75.403637 122.88z" p-id="3092"></path>
            </svg>
        );

        let Email = (
            <svg width="28" height="28" t="1530087360579" className="Email" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3621" >
                <path fill="#00A9FA" d="M735.872 968.96H241.28c-112.256 0-203.264-91.008-203.264-203.264V271.104C38.016 158.848 129.024 67.84 241.28 67.84h494.592c112.256 0 203.264 91.008 203.264 203.264v494.592c0 112.256-91.008 203.264-203.264 203.264z" p-id="3622"></path>
                <path fill="#FFFFFF" d="M538.112 560.768L768 330.88c-5.504-3.328-11.776-4.736-18.304-4.736H227.84c-5.76 0-11.52 1.28-16.64 3.712l230.912 230.912c26.368 26.368 69.376 26.368 96 0zM192.384 346.752c-3.584 6.016-5.504 12.8-5.504 20.096v302.976c0 8.32 2.56 15.872 6.784 22.144l172.8-171.52-174.08-173.696z" p-id="3623"></path>
                <path fill="#FFFFFF" d="M555.648 578.432c-17.408 17.664-40.704 27.392-65.664 27.392-24.832 0-48.256-9.856-65.92-27.392l-39.936-39.936-170.88 169.088c4.48 2.048 9.344 3.072 14.592 3.072h521.856c7.04 0 13.568-1.792 19.328-5.248L597.888 536.192l-42.24 42.24zM785.792 348.544L615.808 518.272l170.496 168.96c2.56-5.248 3.968-11.008 3.968-17.408V366.848c0-6.528-1.408-12.8-4.48-18.304z" p-id="3624"></path>
            </svg>
        );

        let work = (
            <svg width="16" height="16" t="1530089102080" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2479">
                <path fill="#909399" d="M512.3 691.5c-69.2 0-125.5-56.3-125.5-125.5s56.3-125.5 125.5-125.5S637.8 496.8 637.8 566c0 25.8-7.8 50.5-22.5 71.6-5.7 8.1-16.8 10.1-24.9 4.5-8.1-5.7-10.1-16.8-4.5-24.9 10.5-15.1 16-32.7 16-51.1 0-49.4-40.2-89.6-89.6-89.6-49.4 0-89.6 40.2-89.6 89.6s40.2 89.6 89.6 89.6c8.1 0 16.1-1.1 23.8-3.2 9.4-2.6 19.4 2.9 22.1 12.5 2.6 9.5-3 19.4-12.5 22.1-10.8 2.9-22.1 4.4-33.4 4.4z" p-id="2480"></path>
                <path fill="#909399" d="M924.5 584H619c-9.9 0-17.9-8-17.9-17.9s8-17.9 17.9-17.9h305.5c9.9 0 17.9 8 17.9 17.9s-8 17.9-17.9 17.9zM404 584H100.1c-9.9 0-17.9-8-17.9-17.9s8-17.9 17.9-17.9H404c9.9 0 17.9 8 17.9 17.9s-8 17.9-17.9 17.9zM754.2 261.4c-9.9 0-17.9-8-17.9-17.9v-53.8c0-22.7-7.3-35.8-44.8-35.8H333.1c-37.5 0-44.8 13.1-44.8 35.8v53.8c0 9.9-8 17.9-17.9 17.9s-17.9-8-17.9-17.9v-53.8c0-32.7 14-71.7 80.7-71.7h358.5c66.7 0 80.7 39 80.7 71.7v53.8c-0.2 9.9-8.3 17.9-18.2 17.9z" p-id="2481"></path>
                <path fill="#909399" d="M870.7 906.6H153.8c-49.4 0-89.6-40.2-89.6-89.6V315.2c0-49.4 40.2-89.6 89.6-89.6h716.9c49.4 0 89.6 40.2 89.6 89.6V817c0.1 49.4-40.1 89.6-89.6 89.6zM153.8 261.4c-29.6 0-53.8 24.1-53.8 53.8V817c0 29.6 24.1 53.8 53.8 53.8h716.9c29.6 0 53.8-24.1 53.8-53.8V315.2c0-29.6-24.1-53.8-53.8-53.8H153.8z" p-id="2482"></path>
            </svg>
        );

        let people = (
            <svg width="16" height="16" t="1530089123352" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4368" >
                <path fill="#909399" d="M921.087359 990.72v-35.2A410.24 410.24 0 0 0 661.887359 576a307.2 307.2 0 1 0-300.8 0 410.24 410.24 0 0 0-256 380.8v35.2H101.887359a32 32 0 0 0 32 32 32 32 0 0 0 32-32v-34.56a345.6 345.6 0 0 1 691.2 0v35.2a31.36 31.36 0 0 0 31.36 30.08 32 32 0 0 0 32.64-32zM270.207359 307.2A241.28 241.28 0 1 1 511.487359 548.48 241.28 241.28 0 0 1 270.207359 307.2z" p-id="4369" ></path>
            </svg>
        );

        let pohone = (
            <svg width="16" height="16" t="1530089132707" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5187" >
                <path fill="#909399" d="M772.654545 900.654545l-13.963636-4.654545C165.236364 714.472727 128 265.309091 125.672727 260.654545V232.727273l155.927273-116.363637 160.581818 209.454546-81.454545 90.763636c27.927273 95.418182 174.545455 200.145455 242.036363 242.036364l109.381819-74.472727 190.836363 169.890909-130.327273 146.618181zM172.218182 258.327273c2.327273 25.6 44.218182 416.581818 586.472727 588.8l83.781818-88.436364-128-114.036364-104.727272 69.818182-11.636364-6.981818c-9.309091-6.981818-249.018182-146.618182-279.272727-290.909091l-2.327273-11.636363 72.145454-79.127273L279.272727 183.854545l-107.054545 74.472728z" p-id="5188" ></path>
            </svg>
        );

        let EmailSmall = (
            <svg width="16" height="16" t="1530089152476" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6601" >
                <path fill="#909399" d="M879.430882 178.6314 144.567072 178.6314c-42.85197 0-77.733409 34.881438-77.733409 77.67815l0 511.272429c0 42.906206 34.881438 77.787644 77.733409 77.787644l734.86381 0c42.852994 0 77.733409-34.881438 77.733409-77.787644L957.164291 256.30955C957.164291 213.512838 922.283876 178.6314 879.430882 178.6314zM512.818133 567.18895l-351.655082-336.698438L859.560322 230.490511 512.818133 567.18895zM879.430882 793.511535 144.567072 793.511535c-14.302751 0-25.875321-11.627828-25.875321-25.929556L118.691751 264.116353 492.947574 622.541629c5.240351 5.021364 11.901051 7.479345 18.560728 7.479345 4.256954 0 8.295943-1.309832 12.117992-3.275603 4.095271-1.201361 8.024767-3.00238 11.244089-6.16849L905.305179 260.894985l0 506.685971C905.305179 781.882684 893.733633 793.511535 879.430882 793.511535z" p-id="6602" ></path>
            </svg>
        );

        /**
         * 跳转到 登录 的方法
         */
        const jumpToLogin = () => {
            window.location.href = './#/user/login';
        }

        /**
         * 随机获取 一条记录
         */
        const getOneRecordByRandom = () => {
            recordAjaxs.getOneByRandom()
            .then(
                value => {
                    // 缓存id 持久化
                    window.localStorage.setItem('BanRandomDesId', value.id);

                    _this.setState({
                        bannerRandomDescribeId: value.id,
                        bannerRecordTitle: value.title,
                        bannerRecordContent: value.content,
                    });
                }, error => alert(error)
            );
        }

        /**
         * 恢复 描述横幅 默认状态 的方法
         */
        const bannerRecover = () => {
            window.localStorage.removeItem('BanRandomDesId');

            _this.setState({ bannerRandomDescribeId: false });
        }

        /**
         * 渲染昵称 同时判断是否登录
         */
        const renderNameByLogin = (() => {

            // 用 token 判断是否登录, token 错误的也没关系， 因为 就算 token 错误的也会进行跳转
            if (_this.props.rejiejay_token) {
                return (
                    <div className="banner-title-name">曾杰杰</div>
                );
            } else {
                return (
                    <div className="banner-title-name" onClick={() => jumpToLogin()}>请登录</div>
                );
            }
        })();

        /**
         * 渲染 横幅的描述
         */
        const renderBannerDescribe = (() => {
            // 判断 是否存在 随机记录的 id 
            if (_this.state.bannerRandomDescribeId) {
                // 渲染随机的一条记录
                return (
                    <div className="describe-banner-record ReactMarkdown">
                        <div className="banner-main-title" onClick={getOneRecordByRandom}>{_this.state.bannerRecordTitle}</div>
                        <div className="banner-main-content" onClick={getOneRecordByRandom}><ReactMarkdown source={_this.state.bannerRecordContent} /></div>
                        <div className="banner-main-operate flex-start">
                            <div className="main-operate-left flex-rest"></div>
                            <div className="main-operate-edit" 
                                style={{
                                    paddingRight: '15px', 
                                    color: '#F56C6C'
                                }}
                                onClick={() => window.location.href = `./?pageType=edit&id=${_this.state.bannerRandomDescribeId}#/record/list`}
                            >编辑</div>
                            <div className="main-operate-more" 
                                onClick={bannerRecover /** 因为没有过多的状态, 所以点击更多的时候 返回默认状态 【这个是诱导按钮】 */} 
                                style={{color: '#F56C6C'}}
                            >更多</div>
                        </div>
                    </div>
                );

            } else {
                // 如果不存在 随机记录的 id，则渲染 默认的 横幅描述
                return (
                    <div className="describe-banner-main" onClick={getOneRecordByRandom /** 不管点击哪里 都随机查询一条记录 */}>

                        <div className="banner-describe-row flex-start-center">
                            <div className="describe-row-icon">{work}</div>
                            <div className="describe-row-label">web前端开发 · 人机互联网络（深圳）有限公司</div>
                        </div>
                        
                        <div className="banner-describe-row flex-start-center">
                            <div className="describe-row-icon">{people}</div>
                            <div className="describe-row-label">男 · {new Date().getFullYear() - 1994}岁 · 本科 · {new Date().getFullYear() - 2016}年工作经验 · 深圳</div>
                        </div>
                        
                        <div className="banner-describe-row flex-start-center">
                            <div className="describe-row-icon">{pohone}</div>
                            <div className="describe-row-label" style={{paddingRight: '10px'}}>15976713287</div>
                            <div className="describe-row-icon">{EmailSmall}</div>
                            <div className="describe-row-label flex-rest"><a href="mailto:454766952@qq.com">454766952@qq.com</a></div>
                            <div className="describe-row-more" style={{color: '#F56C6C'}}>更多</div>
                        </div>

                    </div>
                );
            }
        })();

        return (
            <div className="mobile-describe-banner">

                {/* 描述横幅 头像 */}
                <div className="describe-banner-portrait">
                    <img alt="portrait" src='https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/page-assets/picture/portrait.png' />
                </div>

                {/* 描述横幅 内容 */}
                <div className="describe-banner-container">

                    {/* 个人简历按钮 */}
                    <div className="describe-banner-operate flex-start">
                        <div className="flex-rest"></div>
                        <div className="banner-operate-resume">个人简历</div>
                    </div>

                    {/* 标题 */}
                    <div className="describe-banner-title flex-start-center">
                        {renderNameByLogin}
                        <div className="flex-rest"></div>
                        <div className="banner-title-icon flex-start-center">
                            <a href="https://github.com/rejiejay">{GitHub}</a>
                            <a href="https://www.zhihu.com/people/Rejiejay/">{zhihu}</a>
                            <a href="https://user.qzone.qq.com/454766952/">{qzone}</a>
                            <a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIzMzQ4Mjc1NA==&scene=124#wechat_redirect">{WeChat}</a>
                            <a href="mailto:454766952@qq.com">{Email}</a>
                        </div>
                    </div>

                    {/* 内容区域 */}
                    {renderBannerDescribe}
                </div>
            </div>
        );
    }

    /**
     * 渲染 导航栏
     */
    renderNavBar() {
        const _this = this;
        const navBarStatus = this.state.navBarStatus;
        /**
         * 切换导航栏的函数
         * @param {string} item 
         */
        const navBarSwitcher = item => {
            window.localStorage.setItem('navBarStatus', item); // 导航栏的状态缓存下来
            _this.setState({navBarStatus: item})
        };

        return (
            <div className="mobile-navigation-bar">
                <div className="navigation-bar-container flex-start">
                    <div onClick={() => navBarSwitcher('all')} className={`navigation-bar-item ${navBarStatus === 'all' ? 'bar-item-active' : ''}`}>
                        <span>主页</span>
                    </div>
                    <div onClick={() => navBarSwitcher('resume')} className={`navigation-bar-item ${navBarStatus === 'resume' ? 'bar-item-active' : ''}`}>
                        <span>作品</span>
                    </div>
                    <div onClick={() => navBarSwitcher('record')} className={`navigation-bar-item ${navBarStatus === 'record' ? 'bar-item-active' : ''}`}>
                        <span>记录</span>
                    </div>
                    <div onClick={() => navBarSwitcher('english')} className={`navigation-bar-item ${navBarStatus === 'english' ? 'bar-item-active' : ''}`}>
                        <span>英语</span>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * 渲染 主页
     */
    renderMainList() {
        // 主页的数据
        let articlesList = [
            {
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/mobile-list/articles-1.png',
                title: 'Hi, 我是曾杰杰。',
                content: '欢迎来到我的个人网站, 没有关系你也不用, 没有关系你也不用, 没有关系你也不用给我机会反正我还有一生可以浪费。我就是这么一点点倔。',
                onclickevent: () => {},
            }, {
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/mobile-list/articles-2.png',
                title: '英语背诵 (*°▽°)ﾉ',
                content: '去复习您的英语吧，your magistrate！',
                onclickevent: () => { window.location.href = './#/english/recite' },
            }, {
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/mobile-list/articles-3.png',
                title: '复习笔记列表',
                content: '回去看看你写的笔记吧，Miss (＾Ｕ＾)ノ~ＹＯ！',
                onclickevent: () => { window.location.href = './#/microsoft/onenote/list' },
            },
        ]

        return this.state.navBarStatus === 'all' ? (
            <div className="mobile-list-all">
                
                {articlesList.map((val, key) => (
                    <div className="mobile-list-item" key={key}>
                        <div className="list-item-container" onClick={val.onclickevent}>

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
                                <div className="item-describe-title">{val.title}</div>
                                <div className="item-describe-content">{val.content}</div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        ) : null;
    }

    /**
     * 渲染 简历
     */
    renderReusemeList() {
        /**
         * 跳转到 简历列表
         */
        let jumpToReusemeList = () => window.location.href = `./#/reuseme/list`;

        /**
         * 简历的数据
         * 这里的数据为什么要和列表页的数据分开?
         * 因为两个地方是不同的数据, 这里展示 7 条数据即可
         */
        let reusemeList = [
            {
                id: 'cdimms', // 数据唯一标识
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/cdimms/banner.png',
                title: '智慧监控管理系统',
                content: '“智慧监控管理系统”是使用Vue框架，以及Java Spring Boot服务的前后端分离项目，是中国人保财险一套智能的监管系统。提供了车行，支公司和团队的监控功能，并且支持表单以及统计进行智能分析和预测，给车行服务人员提供方便的工具。帮助其管理现有车商，支公司，团队、拓展新业务，创造业务的机会。',
            }, {
                id: 'flgx', // 数据唯一标识
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/flgx/banner.png',
                title: '金车管家',
                content: '“金车管家”是使用Vue框架，以及Java Spring Boot服务的前后端分离项目，面向“保险销售人员、保险代理人员或其他车务、保险相关从业人员”的展业工具，帮助其管理现有客户、拓展新客户，创造客户接触机会，给客户提供加油、洗车、保养等高品质优惠服务，给业务经理分成。',
            }, {
                id: 'picccarwash',
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-car-wash/banner.png',
                title: '深圳人保财险PICC洗车项目',
                content: '人保洗车项目是使用Play框架编写的全栈的Java Web的项目, 与另一套Java服务集成后台管理端，可随时导入新增门店，客户端全深圳城市的人保洗车门店情况；通过目的门店站搜索、筛选，微信定位、可以快速定位到要查询的门店，一键导航洗车门店。',
            }, {
                id: 'pingandealere',
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/pingan-dealer-E/banner.png',
                title: '深圳平安财险车商小程序',
                content: '车商小程序是在平安科技体系下的一个小程序项目，汇集多家汽车经销商，提供维修保养、新车试驾、保险询价等线上服务。',
            }, {
                id: 'picccharger',
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/picc-charger/banner.png',
                title: '充电桩新能源项目',
                content: '充电桩是使用Vue框架，后台是Java和C#提供服务的前后端分离项目，该项目对接中国人保,中石化,特来电等多家公司的服务。可以快速定位到要查询的充电桩，一键启动充电。',
            }, {
                id: 'ycpd',
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/ycpd/banner.png',
                title: '养车频道车主端',
                content: '养车频道车主端是使用Vue前端框架, 后台为C#以及JAVA的平台项目，平台近四百家商户，以及几十家合作伙伴，为超过10万名车主提供过服务。',
            }, {
                id: 'divingtime',
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/reuseme/divingtime/banner.png',
                title: '潜游时光商城',
                content: '潜游时光商城是使用了jquery与React Dva多种前端技术，后台为Java服务前后端分离的电商网站。网站兼容PC端以及移动端。',
            }, {
                id: 'divingtimeuserinfor',
                imgsrc: 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/page-assets/picture/very_sorry.png',
                title: '潜游时光用户信息收集',
                content: '潜游时光用户信息收集是承担了业务流程优化的一个项目。项目使得客服人员工作量大幅度下降。优化用户体验，同时为网站积累用户以及数据量便于以后拓展使用。',
            },
        ];

        /**
         * 跳转到作品详情
         */
        let jumpToReusemeRetails = id => window.location.href = `./?id=${id}#/reuseme/details`;

        return this.state.navBarStatus === 'resume' ? (
            <div className="mobile-list-resume">

                <div className="list-resume-title flex-start" onClick={jumpToReusemeList}>
                    <div className="resume-title-lable flex-rest">简历作品</div>
                    <div className="resume-title-add  flex-start-center">
                        <span>更多</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                            <path fill="#F56C6C" d="M12.2928932,2.70710678 C11.9023689,2.31658249 11.9023689,1.68341751 12.2928932,1.29289322 C12.6834175,0.902368927 13.3165825,0.902368927 13.7071068,1.29289322 L23.7071068,11.2928932 C24.0976311,11.6834175 24.0976311,12.3165825 23.7071068,12.7071068 L13.7071068,22.7071068 C13.3165825,23.0976311 12.6834175,23.0976311 12.2928932,22.7071068 C11.9023689,22.3165825 11.9023689,21.6834175 12.2928932,21.2928932 L21.5857864,12 L12.2928932,2.70710678 Z" id="Path-2"></path>
                        </svg>
                    </div>
                </div>
                
                {reusemeList.map((val, key) => (
                    <div className="mobile-list-item" key={key}>
                        <div className="list-item-container" onClick={() => jumpToReusemeRetails(val.id)}>

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
                                <div className="item-describe-title">{val.title}</div>
                                <div className="item-describe-content">{val.content}</div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* 查看更多 按钮 */}
                <div className="list-resume-operate" onClick={jumpToReusemeList}>
                    <div className="resume-operate-container">查看更多</div>
                </div>

            </div>
        ) : null;

    }

    /**
     * 渲染 记录
     */
    renderRecordList() {
        /**
         * 跳转到 编辑
         * @param {string || number} id 要修改的记录的唯一标识
         */
        let jumpToEditBy = id => window.location.href = `./?pageType=edit&id=${id}#/record/list`;

        /**
         * 跳转到 新增
         */
        let jumpToAdd = () => window.location.href = './?pageType=add#/record/list';

        /**
         * 跳转到 查看更多
         */
        let jumpToViewMore = () => window.location.href = './#/record/list';

        return this.state.navBarStatus === 'record' ? (
            <div className="mobile-list-record">

                <div className="list-record-title flex-start">
                    <div className="record-title-lable flex-rest" onClick={jumpToViewMore}>个人动态</div>
                    <div className="record-title-add  flex-start-center" onClick={jumpToAdd}>
                        <span>新增</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                            <path fill="#F56C6C" d="M12.2928932,2.70710678 C11.9023689,2.31658249 11.9023689,1.68341751 12.2928932,1.29289322 C12.6834175,0.902368927 13.3165825,0.902368927 13.7071068,1.29289322 L23.7071068,11.2928932 C24.0976311,11.6834175 24.0976311,12.3165825 23.7071068,12.7071068 L13.7071068,22.7071068 C13.3165825,23.0976311 12.6834175,23.0976311 12.2928932,22.7071068 C11.9023689,22.3165825 11.9023689,21.6834175 12.2928932,21.2928932 L21.5857864,12 L12.2928932,2.70710678 Z" id="Path-2"></path>
                        </svg>
                    </div>
                </div>

                {this.state.recordList.map((val, key) => (
                    <div className="mobile-list-item" key={key}>
                        <div className="list-item-container" onClick={() => jumpToEditBy(val.id)}>
                            <div className="item-describe-title">{val.title}</div>
                            <div className="item-describe-content markdown-body" dangerouslySetInnerHTML={{__html: val.content}}></div>
                        </div>
                    </div>
                ))}

                {/* 查看更多 按钮 */}
                <div className="list-record-operate" onClick={jumpToViewMore}>
                    <div className="record-operate-container">查看更多</div>
                </div>
            
            </div>
        ) : null;
    }

    /**
     * 渲染 英语
     */
    renderEnglishList() {
        /**
         * 跳转到 编辑
         */
        let jumpToEnglish = () => window.location.href = `./#/english/list`;

        return this.state.navBarStatus === 'english' ? (
            <div className="mobile-list-english" onClick={jumpToEnglish}>
            
                {this.state.englishList.map((val, key) => (
                    <div className="mobile-list-item" key={key}>
                        <div className="list-item-container">
                            <div className="item-describe-entext">{val.en_text}</div>
                        </div>
                    </div>
                ))}
                
                <div className="list-record-operate">
                    <div className="record-operate-container">查看更多</div>
                </div>
            
            </div>
        ) : null;
    }

    render() {
        return (
            <React.Fragment>
                {this.renderHeadlineBanner() /* 渲染 顶部横幅轮播图 */}
                {this.renderDescribeBanner() /* 渲染 描述横幅 */}
                {this.renderNavBar() /* 渲染 导航栏 */}
                {this.renderMainList() /* 渲染 主页 */}
                {this.renderReusemeList() /* 渲染 简历 */}
                {this.renderRecordList() /* 渲染 记录 */}
                {this.renderEnglishList() /* 渲染 英语 */}
                <Copyright></Copyright>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        rejiejay_token: state.user.rejiejay_token, // 用于判断是否登录的 token
    }
};

export default connect(mapStateToProps)(mobile);
