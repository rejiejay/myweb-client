/**
 * 英语列表页
 */
// 框架类
import React, { Component } from 'react';

// 样式类
import './recite.scss';

// 请求类
import ajaxs from './../../api/english/index';

// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

/**
 * 背诵统计
 */
let ReciteCount = {
    /**
     * 背诵的获取状态（主要是用于判断是否过期）
     * @returns {number} count 背诵多少次
     * @returns {Booleans} isExpire 是否过期
     * @returns {Booleans} isExpire 是否过期
     */
    getStatus: function getStatus() {
        let myRecite = window.localStorage.rejiejay_english_recite ? JSON.parse(window.localStorage.rejiejay_english_recite) : false;
        let myStatus = {
            count: 0,
            isExpire: true,
            expire_timestamp: (new Date().getTime() + 1000 * 60 * 60 * 24),
        }
        
        // 判断是否空值
        if (!myRecite || !myRecite.expire_timestamp) {
            // 空值的情况下, 初始化一下状态, 再返回（过期）状态
            window.localStorage.setItem('rejiejay_english_recite', JSON.stringify(myStatus));
            return myStatus;
        }

        /**
         * 非空值的情况下，判断是否过期
         */
        if (myRecite.expire_timestamp < new Date().getTime()) { // 过期时间是否小于现在时间
            // 小于的情况下表示已经过期返回（过期）状态
            return myStatus;
        } else {
            // 未过期返回值即可（未过期）
            return myRecite;
        }
    },

    /**
     * 背诵的次数 + 1;
     * @returns {number} count 背诵多少次
     * @returns {Booleans} isExpire 是否过期
     * @returns {Booleans} isExpire 是否过期
     */
    add: function add() {
        // 先获取一下状态
        let myStatus = this.getStatus();

        // 判断是否过期
        if (myStatus.isExpire) {
            // 过期的情况下, 初始化新的值, 再返回
            let newExpireStatus = {
                count: 1, // 只有一次
                isExpire: false, // 未过期
                expire_timestamp: (new Date().getTime() + 1000 * 60 * 60 * 24),
            }
            window.localStorage.setItem('rejiejay_english_recite', JSON.stringify(newExpireStatus));

            return newExpireStatus;
        } 
        
        // 未过期情况下， 初始化 背诵的次数 + 1; 的状态
        let myNewStatus =  {
            count: myStatus.count + 1,
            isExpire: false, // 未过期
            expire_timestamp: myStatus.expire_timestamp,
        }
        console.log(myNewStatus.count)
        // 存储新的状态
        window.localStorage.setItem('rejiejay_english_recite', JSON.stringify(myNewStatus));

        // 返回新的值
        return myNewStatus; 
    },
}

class english extends Component {
    constructor(props) {
        super(props);
        this.state = {
            en_text : '', // 英文
            zh_text: '', // 中文
            isZh: false, // 是否展示提示

            reciteCount: ReciteCount.getStatus().count, // 背诵统计次数
        }
    }

    componentDidMount() {
        this.getrandom();
    }

    getrandom() {
        const _this = this;

        ajaxs.getrandom(1)
        .then(
            res => {
                if (res && res.length > 0) {
                    _this.setState({
                        id : res[0].id, // 唯一标识
                        en_text : res[0].en_text, // 英文
                        zh_text: res[0].zh_text, // 中文
                        isZh: false, // 取消是否展示提示

                        reciteCount: ReciteCount.add().count
                    });
                }

            }, error => alert(error)
        );
    }

    textSwitchover() {
        this.setState({isZh: !this.state.isZh});
    }

    text2audio() {
        /**
         * 调用百度 api 的方法
         * 这个方法在哪调用的？
         * 是在 models index 那个页面初始化的
         * 整个项目启动的时候都会初始化一次 在 index.js models/init.js 下初始化
         */
        let vid = document.getElementById('myVideo');
        vid.innerHTML = `<audio type="audio/mp3" src="https://tsn.baidu.com/text2audio?tex=${this.state.en_text}&lan=zh&cuid=15976713287&ctp=1&tok=${window.localStorage.baidu_text2audio_access_token}" controls="controls" autoplay="autoplay"></audio>`;
    }

    render() {
        return (
            <div className="english-recite flex-column-center" style={{height: `${clientHeight}px`}}>
                {/* 这个用于 baidu 发音 的 api */}
                <div id='myVideo' className='english-audio'>
                    {/* <audio type="audio/mp3" src="http://tsn.baidu.com/text2audio?tex=value&lan=zh&cuid=15976713287&ctp=1&tok=24.b53eed642f92ed8bc4c21d61969ecf8e.2592000.1520344527.282335-10792466"  autoPlay={true} id='myVideo' controls="controls" autoPlay={true}></audio> */}
                </div>
                
                <div className="english-recite-count">今日复习次数：{this.state.reciteCount}</div>
                
                <div className="english-recite-container flex-rest flex-center" onClick={this.textSwitchover.bind(this)}>
                    <div className="english-recite-content">{this.state.isZh ? this.state.zh_text : this.state.en_text}</div>
                </div>
                <div className="english-recite-operate flex-start-center">
                    <div className="flex-rest" onClick={this.text2audio.bind(this)}>翻译</div>
                    <div className="recite-operate-line"></div>
                    <div className="flex-rest" onClick={() => window.location.href = `./?id=${this.state.id}#/english/list`}>编辑</div>
                    <div className="recite-operate-line"></div>
                    <div className="flex-rest" onClick={this.getrandom.bind(this)}>下一组</div>
                </div>
                
                <div className="microsoft-operate flex-center">
                    <div className="microsoft-operate-botton" onClick={() => window.location.href = `./?sections=english-idea#/microsoft/onenote/sections`}>碰见不会的单词怎么办？</div>
                </div>
            </div>
        );
    }
}

export default english;
