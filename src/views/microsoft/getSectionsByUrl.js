// 框架类
import React, { Component } from 'react';
// 请求类
import { apibasicsget, apibasicsgethtml } from './ajaxs';
import { getToken, getStoragePagesStatus, getContentUrlBy } from './../../api/microsoft/index';
// 组件类
import loadPageVar from './../../utils/loadPageVar';
import Toast from './../../components/toast';
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
        this.access_token = "EwBwA8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAARxu/YrgsYkTrwdqkaLc18na/GmDfvEioSd+yN7q97qLjFjE2T89NJ9AjoL+j6Ae9v+B8ewJZzDHIN76ttQ6JDR0WGoRaaXo+EfrwQan7vqdQoRuMSwxHFO6ZeFHQft2tKNvR5oc44sX9exK//2ncFqkaMm/8jvuzQTC6WPSi8QTCUmBAJB8wLucHkyuJ+9WSZ6TxGgI74wFBsn5XBoMCsftWy5uL/T2NGaReYrbrS7u45uvhANlA7haKHCUCD9PAytGXk7jcUpzGbvweMM5kN01O9r1bIxsFLEPpym31yV7BzvCAcCeerZIMQw8JVnNag7+qmmLix2AcZdsYG4Q7I4DZgAACFTFfQqVlcDVQAK3FtH4fIeOzHwMnFXhsMrBs9djd7MsHiC0kOlMr5pcAG8daqFeTIfI9ZhNt1OtkCsJJpQtsUJ9RiBA+nY9Go16LWwvbnaZzpGvtaQKEMQe3xVGFha0m6oFOzazjLo0aOO8yJFDdKMBmK0GdXUlATBVxsupeCOLayBPpqsIBKGobReY8JBxQ1WO2oyx+OjiWvmWJjoQ4YLETDLRvMb6E/pPsrBzYh27Z5a5ed/zrtgutTLv+VCOVzrB0NDEPDVzNUVvyKxbZD/xjk2kilRdwrrzNAHsat9nXINhriZRzyjTlgAEuBb5Grc6UncT+nBdyvxpZaa559TKXEvizmBjfxE7OyYmSIcAKdG4hjGuN5xWHVtrpoVF1Y1nAFcxt/kdNnWYwZvuHbIbUFtK5rKdZEVRuFpYalaEGwXvswrvT5ONNptv850JJrov8zrGy7PStXsF5hzhgxw8JPuGG84majAic7yg1VG4n3Jubh1dmPrsAahczIWl3PMtDdl7+g4rH5CntnSgMXkwpqKhy+ErNn8GvyngyK46lLZ3QidHFYC/K2tYsZBFwuyLkKhHpXWJ8C/nAV0usxmZmnq1Iv40Eiy4u5uopKZO5x0Lwqociopnjt3+jsblI9IFDuU6uQn4CvSciMseUHsYFay0f8MiD5m5sROlWgcEfbzITnYg+um7ejaebHxL8PInPVmtZLmDOT1FHI+9P2h1KDOJljcoyItsr7s8pPxna55AS7MI3SRB547i0Gm+zVZoaSvgR4zUZNZ9Ag==";

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
                if (confirm(error + '是否跳转到授权页?')) {
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

                    val.value.map(item => {
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
                        window.history.back(-1); // 返回上一页即可
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
         * 通过 contentUrl 获取 HTML 内容
         * @param {string} contentUrl 
         */
        let getContentHtmlBy = contentUrl => {
            Toast.show(); // 弹出加载框

            apibasicsgethtml(contentUrl)
            .then(res => {
                Toast.destroy(); // 关闭加载框

                console.log(res);

                let divElement = window.document.createElement('div');

                divElement.innerHTML = res;

                let html_title = divElement.getElementsByTagName('title')[0].textContent; // 获取
                let html_body = divElement.getElementsByTagName('div')[0]; // 获取页面内容

                html_body = html_body ? html_body.innerHTML : '暂时无内容'; // 判断是否有内容

                _this.setState({
                    html_title: html_title ? html_title : '暂无标题',
                    html_body: html_body,
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
            console.log(res)
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
            <div className="microsoft" style={{minHeight: clientHeight}}>
                {this.state.errorMessage ? (<div>{_this.state.errorMessage}</div>) : ''}
                <div id='microsoft-title' className="microsoft-title">{this.state.html_title}</div>
                <div id='microsoft-body' data-absolute-enabled="true" className="microsoft-body" dangerouslySetInnerHTML={{__html: this.state.html_body}}></div>
                <div className="microsoft-operate flex-center">
                    <div className="microsoft-operate-botton" onClick={this.getNotebookByParentSectionId.bind(this)}>下一篇</div>
                </div>
            </div>
        );
    }
}

export default getSectionsByUrl;
