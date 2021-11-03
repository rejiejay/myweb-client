// 框架类
import React, { Component } from 'react';
// 请求类
import { apibasicsget, apibasicsgethtml } from './ajaxs';
import { getToken, getStoragePagesStatus, getContentUrlBy } from './../../api/microsoft/index';
// 组件类
import loadPageVar from './../../utils/loadPageVar';
import Toast from './../../components/toast';
// 配置类
import config from "./../../config/index";
// 样式类
import './style.scss';
// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

/**
 * 根据Url的名称获取笔记本的分区
 */
class getSectionsByUrl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html_title: '', // 渲染到页面上的 html 标题
            html_body: '', // 渲染到页面上的 html 内容

            errorMessage: '',
        }

        /**
         * 本地测试 (postman手动赋值)
         */
        this.access_token = "EwB4A8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAAWHpYF8s0AXaCX7DlWe2boxJfIZr0u5uykZ/55a0h/lhq+SkNWeq6SFqEo7TN8yAzaxaLlTc3s6Jmr5x4omk8dtql4X592EAvOKE0Z8CjAFrlZNi0yxbf/obiTC814DOM2FL8Fvl3synkFN/h8+fpM5D9qlRpadmWpbkwoJcaZFhseEdF4bDVxmcKsSkOE702Knfp1ozPOGdmSxAW50Tlj/H00/AvBuI5ioqDc8oV/0VAo3E2jqgouIvzX0qxrMTQY0chIqCS1DMjskC2sZLqLFiNkPj1bARtYrZV7kWKKLGRPvu0JP5Mx+RAoIU6Bn00d8mpv0Je1Xn1sp7GEr8VRQDZgAACLKPP22YERd0SAKPsbW/FA/4/BWkRbjqWZhfj+3STCtOgX9CJ6flb5G3TtSecMblJ7/w8pPB4sR5roS/HoTxYVzkLGebaVyJ0riB3FljL64Wdi25umHTg7xWq1bFb3eSju2/Y/LGuiohr/ELXaCY2BK/6VhYZan8CnsrKPoTzUNNUoouc6BtK0eM9LQbL2KmQPIHXI05Ds+u7u9uuOdFvGzy7hl7cNJiiGJjjTx9TKYUC7DNQN0KM2gkGtcv3v+9J7UnQ4iiy2O2bDy9oGzgXPklyy0gXrj411r3sdBgYPbRpK9h1DlMFcl21xkigk8M6s4Of4DvLBSpe2BYAH9J0uvU49gAQs4Yl3h8zSTRfz1iBvRwK37ww9ynwanbf9GwuelPJsaz3TG+V0Zw9O+v1KtsZTUeFLtSFp2+ZJJBTmv+D7AxUa68tX8LI4RyE790uOBErp0w1df5CgDcNR1gW0LsSU69Lc3/9T3uNNYgNny5bx8fck2p4hC3epcuBoGHMZaCawotNouXyBN7cP5D8aNaEHirY98yfTOMlv6ts/saY1Lou1nfF7KWPDKbgzRxvWZ7JgxtPuS8W1KCR76EYs1HVl8kkHGTiTtTSQVpF0HUhz3iGTblJVDVTSuEnMQ2PWuZDwig16vxvJP86Ba9Zpz1rFLKhdNbXo31tSamyuPKS0oTUyuRdIkjXMHtfZWrJS4Hicu6/CN5pu7Cbhcnx7BRcJaasUxnpYlZvoZvR7vLieUtSupwjYbbDX/NfapvRFBI6MukqD9dweqYMXwUndcewX0C";

        this.parentSectionId = false;
    }

    componentDidMount() {
        const _this = this;

        let sections = loadPageVar('sections');

        /**
         * 【第一步】 获取Token
         */
        let getAccessToken = () => {
            // 判断是不是本地环境
            if (window.location.hostname === 'localhost') {
                // 本地环境的情况下, 直接跳转到第二步
                window.sessionStorage.setItem('microsoft_access_token', this.access_token);
                return isPagesExpire();
            }

            // 生产环境下, 获取一次token
            getToken()
            .then(res => {
                window.sessionStorage.setItem('microsoft_access_token', res);
                _this.access_token = res;

                isPagesExpire(); // 第二步

            }, error => {
                if (window.confirm(error + '是否跳转到授权页?')) {
                    window.location.href = 'microsoft/authorize.html';
                }
            });
        }

        /**
         * 【第二步】 查询数据库缓存 contentUrl 及 parentSection id 是否过期
         */
        let isPagesExpire = () => {
            getStoragePagesStatus()
            .then(res => {
                if (res.result === 1) {
                    // 判断是否过期
                    if (new Date().getTime() < res.data.expire_timestamp) {
                        // 未过期的情况下，
                        getsections();

                    } else {
                        // 过期则 跳转到 OneNote notebook 缓存 所有的 pages
                        window.location.href = '#/microsoft/onenote/pages'; // 跳转到 缓存 OneNote notebook 所有的 pages
                    }
    
                } else if (res.result === 233) {
                    // 正在缓存 OneNote notebook 所有的 pages
                    window.location.href = '#/microsoft/onenote/pages'; // 跳转到 缓存 OneNote notebook 所有的 pages
                    
                } else {
                    // 压根就没有缓存OneNote notebook 所有的 pages
                    window.location.href = '#/microsoft/onenote/pages'; // 跳转到 缓存 OneNote notebook 所有的 pages
                }
    
            }, error => {
                
                alert(`轮询缓存所有页面的状态 失败! 原因已经打印到桌面`);
    
                console.log(error);
    
                _this.setState({errorMessage: JSON.stringify(error)});
            });

        }

        /**
         * 【第三步】 查询所有分区
         */
        let getsections = () => {
            Toast.show(); // 弹出加载框

            apibasicsget('https://graph.microsoft.com/v1.0/me/onenote/sections?$top=100')
            .then(val => {
                Toast.destroy(); // 关闭加载框

                console.log(val)
                // 判断获取的参数是否有效
                if (val && val['@odata.context'] && val.value && val.value instanceof Array && val.value.length > 0) {
                    // 有效的情况下， 判断 url 的分区是否能够匹配成功
                    _this.parentSectionId = false;

                    console.log('sections', sections);

                    val.value.map(item => {
                        console.log('item.displayName', item.displayName);
                        if (item.displayName === sections) {
                            _this.parentSectionId = item.id;
                        }
                         
                        return item;
                    });
                    
                    // 判断是否匹配成功
                    if (_this.parentSectionId) {
                        // 匹配成功的情况下根据分区id随机查询 OneNote notebook 
                        _this.getNotebookByParentSectionId.call(_this);

                    } else {
                        alert(`匹配无此 ${sections} 笔记本!`);
                    }
                }
    
            }, error => {
                Toast.destroy(); // 关闭加载框
                
                alert(`匹配分区 失败! 原因已经打印到桌面`);
    
                console.log(error);
    
                _this.setState({errorMessage: JSON.stringify(error)});
            });
        }

        getAccessToken();
    }

    /**
     * 根据分区id随机查询 OneNote notebook 
     */
    getNotebookByParentSectionId() {
        const _this = this;

        /**
         * 替换所有 string 的方法
         */
        let replaceAll = string => new Promise((resolved, rejected) => {
            // 需要匹配字符串
            let matchedString = ` src="https://graph.microsoft.com/v1.0/users('454766952@qq.com')/onenote/resources/`;
            // 替换为的字符串
            let targetString = ` src="${config.url.origin}/microsoft/pages/img?access_token=${window.sessionStorage.microsoft_access_token}&encode_url=`;

            /**
             * 迭代替换的方法
             */
            let thisreplace = thisstring => {
                // 判断是否匹配到链接
                if (thisstring.indexOf(matchedString) !== -1) {
                    // 匹配成功
                    // 替换字符串
                    let newstring = thisstring.replace(matchedString, targetString);
                    // 迭代执行
                    thisreplace(newstring);
                    
                } else {
                    // 匹配失败
                    // 表示替换完成
                    resolved(thisstring);
                }
            }

            thisreplace(string);
        });

        /**
         * 通过 contentUrl 获取 HTML 内容
         * @param {string} contentUrl 
         */
        let getContentHtmlBy = contentUrl => {
            Toast.show(); // 弹出加载框

            apibasicsgethtml(contentUrl)
            .then(res => {
                Toast.destroy(); // 关闭加载框

                let divElement = window.document.createElement('div');

                divElement.innerHTML = res;

                let html_title = divElement.getElementsByTagName('title')[0].textContent; // 获取

                replaceAll(res)
                .then(replaceString => {
                    _this.setState({
                        html_title: html_title ? html_title : '暂无标题',
                        html_body: replaceString,
                    });
                });

            }, error => {
                Toast.destroy(); // 关闭加载框

                alert(`通过 contentUrl 获取 HTML 内容 失败! 原因已经打印到桌面`);
    
                console.log(error);
    
                _this.setState({errorMessage: JSON.stringify(error)});

            });

        }

        getContentUrlBy(this.parentSectionId)
        .then(res => {
            getContentHtmlBy(res.key_value);

        }, error => {
            alert(`根据分区id随机查询 OneNote notebook 失败! 原因已经打印到桌面`);

            console.log(error);

            _this.setState({errorMessage: JSON.stringify(error)});
        });
    }

    render() {
        const _this = this;

        return (
            <React.Fragment>
                {this.state.errorMessage ? (<div>{_this.state.errorMessage}</div>) : ''}

                <div id='microsoft-title' className="microsoft-title">{this.state.html_title}</div>

                <div className="microsoft-operate">
                    <div className="microsoft-operate-botton" onClick={this.getNotebookByParentSectionId.bind(this)}>下一篇</div>
                </div>
                
                <div>
                    <div id='microsoft-body' data-absolute-enabled="true" className="microsoft-body" dangerouslySetInnerHTML={{__html: this.state.html_body}}></div>
                </div>
            </React.Fragment>
        );
    }
}

export default getSectionsByUrl;
