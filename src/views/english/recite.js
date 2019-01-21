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

class english extends Component {
    constructor(props) {
        super(props);
        this.state = {
            en_text : '', // 英文
            zh_text: '', // 中文
            isZh: false, // 是否展示提示
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
