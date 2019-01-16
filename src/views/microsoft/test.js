// 框架类
import React, { Component } from 'react';
// 请求类
import { getToken } from './../../api/microsoft/index';
// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

/**
 * 用于测试微软的接口
 */
class english extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /**
             * 页面列表
             */
            pageList: [
            ],
        }

        /**
         * 这个可以根据postman手动赋值
         */
        this.access_token = "EwB4A8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAARv2RVeVWgJ1vJOHs6uRSQrWUQBJbwu93XGyWVQpY6ruEKKY7eMPBpTdVWzzNdQzgDjQADxYMkOfSLRurA7KZLL1MN2tN7lVjo6rSmDE10LfCjHIE11n1LPiWoS2FnLlJIOS6zQM370syuGQZXAytEhhs/MVjXL04IpGQgCTZJ/q+vHhLLQ0ZAPl9cRArMxD0g2d0kcIYpXE7csAsm7sQ0aFPcFyxflrDT8V/VvuSFL6Zkh3CP78e9TQVt8n26vmuSa4YV/ZdH/9VenyoYfjRGXQUKJRjswk+TdPmF/QdbdALHpJGpWNS9TDeZbkBAGc/Yves7yxmqxnV5h3Qgf8TwEDZgAACMwy/pnHxQvhSALCSqMa7ukk3pskKPXjXQebjJdKX9KiLjSS8W10b+WnMR4aTLE3OW7H0h1SNle54wnMraSNEGUavdmOTlbUIRRTe0FQTiRqPIAfn5/J0DwyngZ2tNNc5mz8DVHXDVInNy2iRuFSYJ1dFSI6DMgoPYsEeMuCWW4LOq18AT2D7lY4wYvEo4ETS0uoEPB/4psMp+/ERicnQ+LEBadDLDsCi5i+iH1suZI98OUW3DzkNgewi612ZXMhLTQuLehsFguy20dEKeZsK/X6H12OwNudN2h5t13VBc2KhjvPq8ydwZQTcxgYd52ZwDwcInbsd+mNAobuZ1ZeE9Bk1hEgwglcWOTHvFzDyq8MHqB4lriRpPAjTysrEADQtc/VyiLA+A6CKoPX6D5lva1XsaQX6XRetUPaX34cufN/JLSfNuX5cDaNRSHEKkVX0IU0gxs0EIhLSPs/0dqQjOTFrqx3QBTmthwp6ii5gyTirbb3OR/rUs9HzAeA96swOC9/xNVOy4CR9igl4HXi+UMisVUcF8p/qlVpevj7ZAqf8U1Gl9LCuSe6xCqTDHDbGStG4rUeDpnSWle30y7OlzH9TlAlyXYSm9YQxkB8FvcF2a6yN5k/vNt6fJhg2v/IW1aMoIl0Pfek22WZIqxbFEsAgO+geCzxT77eZnn3cftVndXUK5aAblIw/Q+jPjIy/bdaFejNrM2ybViOzsDWNgUkEWxLla+6qKY0bdWNVPqyZj+l4Owvpf2lydGSz1M0aLS3cczqI0wM9Bk3cFfdzgphNn0C";
    }

    componentDidMount() {
        if (window.location.hostname !== 'localhost') {
            this.getToken(); // 不是测试环境的时候才获取token
        }
    }

    /**
     * 获取token
     */
    getToken() {
        const _this = this;

        getToken()
        .then(res => {
            _this.access_token = res;

        }, error => alert(error));
    }

    /**
     * 获取我的笔记本
     */
    getnotebooks() {
        fetch('https://graph.microsoft.com/v1.0/me/onenote/notebooks', {
            'method': 'GET',
            headers: {
                'contentType': 'application/json; charset=utf-8',
                'Authorization': this.access_token
            },
        }).then(
            response => response.json(),
            error => ({result: 0, message: error})
        ).then(val => {
            console.log(val)
            let res = {
                "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('454766952%40qq.com')/onenote/notebooks",
                "value": [
                    {
                        "id": "0-C4CA69B2C470620B!755", // 笔记本的唯一标识符
                        "self": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/notebooks/0-C4CA69B2C470620B!755",
                        "createdDateTime": "2019-01-14T08:20:08.243Z",
                        "displayName": "\u66fe\u6770\u6770 \u7b14\u8bb0\u672c", // Unicode编码 http://tool.chinaz.com/tools/unicode.aspx
                        "lastModifiedDateTime": "2019-01-14T08:23:54.79Z",
                        "isDefault": false,
                        "userRole": "Owner",
                        "isShared": false,
                        "sectionsUrl": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/notebooks/0-C4CA69B2C470620B!755/sections",
                        "sectionGroupsUrl": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/notebooks/0-C4CA69B2C470620B!755/sectionGroups",
                        "createdBy": {
                            "user": {
                                "id": "C4CA69B2C470620B",
                                "displayName": "\u6770 \u66fe"
                            }
                        },
                        "lastModifiedBy": {
                            "user": {
                                "id": "C4CA69B2C470620B",
                                "displayName": "\u6770 \u66fe"
                            }
                        },
                        "links": { // 用于打开笔记本的链接。
                            "oneNoteClientUrl": { // OneNote 本机客户端
                                "href": "onenote:https://d.docs.live.net/c4ca69b2c470620b/%e6%96%87%e6%a1%a3/%e6%9b%be%e6%9d%b0%e6%9d%b0%20%e7%ac%94%e8%ae%b0%e6%9c%ac"
                            },
                            "oneNoteWebUrl": { //  OneNote Online (需要翻墙)
                                "href": "https://onedrive.live.com/redir.aspx?cid=c4ca69b2c470620b&page=edit&resid=C4CA69B2C470620B!755"
                            }
                        }
                    },
                    {
                        "id": "0-C4CA69B2C470620B!699",
                        "self": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/notebooks/0-C4CA69B2C470620B!699",
                        "createdDateTime": "2018-10-30T07:31:09.377Z",
                        "displayName": "\u6770 \u7684\u7b14\u8bb0\u672c", // 杰 的笔记本
                        "lastModifiedDateTime": "2019-01-16T10:49:19.41Z",
                        "isDefault": true,
                        "userRole": "Owner",
                        "isShared": false,
                        "sectionsUrl": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/notebooks/0-C4CA69B2C470620B!699/sections",
                        "sectionGroupsUrl": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/notebooks/0-C4CA69B2C470620B!699/sectionGroups",
                        "createdBy": {
                            "user": {
                                "id": "C4CA69B2C470620B",
                                "displayName": "\u6770 \u66fe"
                            }
                        },
                        "lastModifiedBy": {
                            "user": {
                                "id": "C4CA69B2C470620B",
                                "displayName": "\u6770 \u66fe"
                            }
                        },
                        "links": {
                            "oneNoteClientUrl": {
                                "href": "onenote:https://d.docs.live.net/c4ca69b2c470620b/%e6%96%87%e6%a1%a3/%e6%9d%b0%20%e7%9a%84%e7%ac%94%e8%ae%b0%e6%9c%ac"
                            },
                            "oneNoteWebUrl": {
                                "href": "https://onedrive.live.com/redir.aspx?cid=c4ca69b2c470620b&page=edit&resid=C4CA69B2C470620B!699"
                            }
                        }
                    }
                ]
            }

        }).catch(error => console.log(error));
    }

    /**
     * 列出我的笔记本分区
     */
    getsections() {
        const _this = this;

        fetch('https://graph.microsoft.com/v1.0/me/onenote/sections', {
            'method': 'GET',
            headers: {
                'contentType': 'application/json; charset=utf-8',
                'Authorization': this.access_token
            },
        }).then(
            response => response.json(),
            error => ({result: 0, message: error})
        ).then(val => {
            console.log(val)

            let res = {
                "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('454766952%40qq.com')/onenote/sections",
                "value": [
                    {
                        "id": "0-C4CA69B2C470620B!701",
                        "self": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/sections/0-C4CA69B2C470620B!701",
                        "createdDateTime": "2018-10-30T07:31:18.36Z",
                        "displayName": "\u5feb\u901f\u7b14\u8bb0", // 快速笔记 分区名称。 Unicode编码 http://tool.chinaz.com/tools/unicode.aspx
                        "lastModifiedDateTime": "2019-01-16T11:04:31.02Z",
                        "isDefault": false,
                        "pagesUrl": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/sections/0-C4CA69B2C470620B!701/pages",
                        "createdBy": {
                            "user": {
                                "id": "C4CA69B2C470620B",
                                "displayName": "\u6770 \u66fe"
                            }
                        },
                        "lastModifiedBy": {
                            "user": {
                                "id": "C4CA69B2C470620B",
                                "displayName": "\u6770 \u66fe"
                            }
                        },
                        "parentNotebook@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('454766952%40qq.com')/onenote/sections('0-C4CA69B2C470620B%21701')/parentNotebook/$entity",
                        "parentNotebook": {
                            "id": "0-C4CA69B2C470620B!699",
                            "displayName": "\u6770 \u7684\u7b14\u8bb0\u672c", // 杰 的笔记本
                            "self": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/notebooks/0-C4CA69B2C470620B!699"
                        },
                        "parentSectionGroup@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('454766952%40qq.com')/onenote/sections('0-C4CA69B2C470620B%21701')/parentSectionGroup/$entity",
                        "parentSectionGroup": null
                    },
                    {
                        "id": "0-C4CA69B2C470620B!757",
                        "self": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/sections/0-C4CA69B2C470620B!757",
                        "createdDateTime": "2019-01-14T08:20:13.46Z",
                        "displayName": "\u5feb\u901f\u7b14\u8bb0", // 快速笔记
                        "lastModifiedDateTime": "2019-01-14T08:23:54.79Z",
                        "isDefault": false,
                        "pagesUrl": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/sections/0-C4CA69B2C470620B!757/pages",
                        "createdBy": {
                            "user": {
                                "id": "C4CA69B2C470620B",
                                "displayName": "\u6770 \u66fe"
                            }
                        },
                        "lastModifiedBy": {
                            "user": {
                                "id": "C4CA69B2C470620B",
                                "displayName": "\u6770 \u66fe"
                            }
                        },
                        "parentNotebook@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('454766952%40qq.com')/onenote/sections('0-C4CA69B2C470620B%21757')/parentNotebook/$entity",
                        "parentNotebook": {
                            "id": "0-C4CA69B2C470620B!755",
                            "displayName": "\u66fe\u6770\u6770 \u7b14\u8bb0\u672c", // 曾杰杰 笔记本
                            "self": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/notebooks/0-C4CA69B2C470620B!755"
                        },
                        "parentSectionGroup@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('454766952%40qq.com')/onenote/sections('0-C4CA69B2C470620B%21757')/parentSectionGroup/$entity",
                        "parentSectionGroup": null
                    }
                ]
            }

        }).catch(error => console.log(error));

    }

    /**
     * 列出我的页面
     */
    getonenotepages() {
        const _this = this;

        fetch('https://graph.microsoft.com/v1.0/me/onenote/pages', {
            'method': 'GET',
            headers: {
                'contentType': 'application/json; charset=utf-8',
                'Authorization': this.access_token
            },
        }).then(
            response => response.json(),
            error => ({result: 0, message: error})
        ).then(val => {
            console.log(val)
            _this.setState({
                pageList: val.value
            });

            let res = {
                "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('454766952%40qq.com')/onenote/pages",
                "value": [
                    {
                        "id": "0-b0d3e01c12c64d76a45962d54f5cb68c!253-C4CA69B2C470620B!757",
                        "self": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/pages/0-b0d3e01c12c64d76a45962d54f5cb68c!253-C4CA69B2C470620B!757",
                        "createdDateTime": "2019-01-14T16:20:14Z",
                        "title": "123123",
                        "createdByAppId": "ONDC Notebooks",

                        // 页面的 HTML 内容的 URL。只读。
                        "contentUrl": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/pages/0-b0d3e01c12c64d76a45962d54f5cb68c!253-C4CA69B2C470620B!757/content",
                        "lastModifiedDateTime": "2019-01-14T16:20:14Z",

                        // 用于打开页面的链接。
                        "links": {
                            "oneNoteClientUrl": {
                                "href": "onenote:https://d.docs.live.net/c4ca69b2c470620b/%e6%96%87%e6%a1%a3/%e6%9b%be%e6%9d%b0%e6%9d%b0%20%e7%ac%94%e8%ae%b0%e6%9c%ac/%E5%BF%AB%E9%80%9F%E7%AC%94%E8%AE%B0.one#123123&section-id=b3e34e39-c4cb-4d02-b010-e6aa42a5707a&page-id=56e5bed8-ba08-4be9-abbe-0248cfc3a2b2&end"
                            },
                            "oneNoteWebUrl": {
                                "href": "https://onedrive.live.com/redir.aspx?cid=c4ca69b2c470620b&page=edit&resid=C4CA69B2C470620B!755&parId=C4CA69B2C470620B!144&wd=target%28%E5%BF%AB%E9%80%9F%E7%AC%94%E8%AE%B0.one%7Cb3e34e39-c4cb-4d02-b010-e6aa42a5707a%2F123123%7C56e5bed8-ba08-4be9-abbe-0248cfc3a2b2%2F%29"
                            }
                        },
                        "parentSection@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('454766952%40qq.com')/onenote/pages('0-b0d3e01c12c64d76a45962d54f5cb68c%21253-C4CA69B2C470620B%21757')/parentSection/$entity",
                        "parentSection": {
                            "id": "0-C4CA69B2C470620B!757",
                            "displayName": "\u5feb\u901f\u7b14\u8bb0",
                            "self": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/sections/0-C4CA69B2C470620B!757"
                        }
                    },
                    {
                        "id": "0-6acc390397444dbb9cf050c53e501421!1-C4CA69B2C470620B!701",
                        "self": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/pages/0-6acc390397444dbb9cf050c53e501421!1-C4CA69B2C470620B!701",
                        "createdDateTime": "2019-01-14T09:43:55Z",
                        "title": "\u5bf9\u63a5\u5fae\u8f6fOneNote",
                        "createdByAppId": "",
                        "contentUrl": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/pages/0-6acc390397444dbb9cf050c53e501421!1-C4CA69B2C470620B!701/content",
                        "lastModifiedDateTime": "2019-01-14T13:03:23Z",
                        "links": {
                            "oneNoteClientUrl": {
                                "href": "onenote:https://d.docs.live.net/c4ca69b2c470620b/%e6%96%87%e6%a1%a3/%e6%9d%b0%20%e7%9a%84%e7%ac%94%e8%ae%b0%e6%9c%ac/%E5%BF%AB%E9%80%9F%E7%AC%94%E8%AE%B0.one#%E5%AF%B9%E6%8E%A5%E5%BE%AE%E8%BD%AFOneNote&section-id=3c43b59e-1035-42d7-91e6-b5e36b5d0b8d&page-id=e297fc0e-8408-4e0a-96c2-3d6d8f22f97b&end"
                            },
                            "oneNoteWebUrl": {
                                "href": "https://onedrive.live.com/redir.aspx?cid=c4ca69b2c470620b&page=edit&resid=C4CA69B2C470620B!699&parId=C4CA69B2C470620B!144&wd=target%28%E5%BF%AB%E9%80%9F%E7%AC%94%E8%AE%B0.one%7C3c43b59e-1035-42d7-91e6-b5e36b5d0b8d%2F%E5%AF%B9%E6%8E%A5%E5%BE%AE%E8%BD%AFOneNote%7Ce297fc0e-8408-4e0a-96c2-3d6d8f22f97b%2F%29"
                            }
                        },
                        "parentSection@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('454766952%40qq.com')/onenote/pages('0-6acc390397444dbb9cf050c53e501421%211-C4CA69B2C470620B%21701')/parentSection/$entity",
                        "parentSection": {
                            "id": "0-C4CA69B2C470620B!701",
                            "displayName": "\u5feb\u901f\u7b14\u8bb0",
                            "self": "https://graph.microsoft.com/v1.0/users/454766952@qq.com/onenote/sections/0-C4CA69B2C470620B!701"
                        }
                    }
                ]
            }
        }).catch(error => console.log(error));
    }

    /**
     * 获取单独页面
     */
    getpagesid(url) {
        const _this = this;

        fetch(url, {
            'method': 'GET',
            headers: {
                'contentType': 'application/json; charset=utf-8',
                'Authorization': this.access_token
            },
        }).then(
            response => response.json(),
            error => ({result: 0, message: error})
        ).then(val => {
            console.log(val)

        }).catch(error => console.log(error));

    }

    render() {
        const _this = this;

        return (
            <div className="microsoft">
                <button type="button" onClick={this.getnotebooks.bind(this)}>获取我的笔记本</button>
                <button type="button" onClick={this.getsections.bind(this)}>列出我的笔记本分区</button>
                <button type="button" onClick={this.getonenotepages.bind(this)}>列出我的页面</button>

                <h1>页面列表 pageList</h1>
                {this.state.pageList.map((val, key) => {
                    return (<div key={key}>
                        <button type="button" onClick={() => _this.getpagesid(val.contentUrl)}>获取单独页面: {val.title}</button>
                    </div>)
                })}

            </div>
        );
    }
}

export default english;
