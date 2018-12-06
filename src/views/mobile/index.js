// 框架类
import React, { Component } from 'react';
// 样式类
import './index.scss';

let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

class computer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /**
     * 渲染 顶部横幅轮播图
     */
    renderHeadlineBanner() {
        return (
            <div className="mobile-headline-banner">
                <img alt="headline-banner-image" src='https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/page-assets/picture/mobile-headline-banner.png' />
            </div>
        );
    }

    /**
     * 渲染 描述横幅
     */
    renderDescribeBanner() {
        return (
            <div className="mobile-describe-banner">
                <div className="describe-banner-portrait">
                    <img alt="portrait" src='https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/page-assets/picture/portrait.png' />
                </div>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderHeadlineBanner() /* 渲染 顶部横幅轮播图 */}
                {this.renderDescribeBanner() /* 渲染 描述横幅 */}
            </React.Fragment>
        )
    }
}

export default computer;
