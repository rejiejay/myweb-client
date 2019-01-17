// 框架类
import React, { Component } from 'react';
// 请求类
import { getToken } from './../../api/microsoft/index';
// 组件类
import Toast from './../../components/toast';
// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

/**
 * 获取 OneNote notebook 所有的 pages
 */
class english extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
        }

        /**
         * 本地测试 (postman手动赋值)
         */
        this.access_token = "EwBwA8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAAbHxySpDQGxWtl2+0WOPl0F4X72SFEQBBjUG9HLexj2iqlzoTHxEyazBAYq6hOb8vId3jm9er74rWHDGJHM06rrEFFlr78nrhfzI2IGmtTEzA863/h+NQo71ZvUtZasHNPvWXJevnDjTL/bAkZ5ffXPUdq/VFJA604jd894ifsu76t1NnpItmCHw7+7ZOT6jjWWh8e4kh1sF+7YyMldW6iZs1b4xuvj9WBYbjumduuUThzD3Jdjn6jcibqxdo3WtBCuaBRnS6A1q+aN/UDXmUDNfXtA3seHYnjcbXyuTj0YoK9ng6GcAiY5XkT9bYTomcw+p1MN7EqZkRSFKd5bcxDADZgAACPZSRpX0E84IQAJWURnk+sOmwBP5TFFFnFacTDd7OtXHwyaHTxX1a2iN/UrzajhbLu9ZjTKOJUxaMyqKxgDWus0ej/DWd5kkxzhIY1r/pZKHq3O+O7lTiyjiF/4TAtHOIJSy9E8zQKK5nRZirTINUfJbV9fX/BNjZtL7GyhrU58dCHaAYOCZsIQpZ+J86+fzGvIW5XiOSobIazpFrKpiW8wWT1Ruk1KSHJcGzp4juwOOoamfAQQ504dv0Vln252K0bV6XcxAUXnI1QcXsIYWE9aQA9roLs0VJWsz8vJ93UOrj7IEtPi2zuoSRcOh/NvPZKrOBVhQd0AcULZl0QxRnAN03TBBMUIgdlRzw7tTvNjCWdskfkcYnORO0FSdm/MpVejwF9zfM6IVDghLnylRxL1TYP6JA4st/IaGbwWTtbifxFBZ9Hupsn9e33+G4K8nKq5P5sS3xvSyB65pYjpvGx80r4+Ep8ekhdHIvdjYSB6pyFJG6Yfs8pDxxT0rIMumUWoSAM4GLJLg9g8iu9vWSiKqtTI1IvuY2MUCdk4PQrDarvosWGjTp2ELluGcSnjRh9OffqTCxJ+xzi0VWF2KcH4s9uKu/cGURitK6H78IP0qy/9T4lcQR1vQtK0hmDwmA27np0IrUcOWoehmt9OHZDUKrT88kBVDkRRbvWmDo4ajmLGDn9/1Mw2RBuxptNJnpsDtFkw/LMRqlgZbBPNUPEiWbbnbxKVx7a7NoRMvguhHXv+yhkkl6R/yYQomBmrY+hUgPpllq8XvyJ99Ag==";

        this.iteratorPagesByUrl.bind(this); // 因为会涉及到迭代, 将 this 绑定进去

        this.iteratorCount = 1; // 迭代次数
        this.myPages = []; // 迭代获取的页面
    }

    componentDidMount() {
        const _this = this;

        /**
         * 【第一步】 获取Token
         */
        if (window.location.hostname === 'localhost') { // 判断是不是本地环境
            // 本地环境的情况下, 直接跳转到第二步
            window.sessionStorage.setItem('microsoft_access_token', this.access_token);
            return _this.iteratorPagesByUrl('https://graph.microsoft.com/v1.0/me/onenote/pages');
        }

        // 生产环境下, 获取一次token
        getToken()
        .then(res => {
            window.sessionStorage.setItem('microsoft_access_token', res);
            _this.access_token = res;

            _this.iteratorPagesByUrl('https://graph.microsoft.com/v1.0/me/onenote/pages'); // 第二步

        }, error => {
            _this.setState({errorMessage: JSON.stringify(error)});

            if (confirm(`获取授权失败, 原因：${error}。是否跳转到授权页?`)) {
                window.location.href = 'microsoft/authorize.html';
            }
        });
    }

    /**
     * 【第二步】 迭代获取所有页面
     */
    iteratorPagesByUrl(url) {
        const _this = this;

        /**
         * 判断是否第一次迭代
         */
        if (url === 'https://graph.microsoft.com/v1.0/me/onenote/pages') {
            // 如果是第一次迭代的情况下, 初始化参数
            this.iteratorCount = 1;
            this.myPages = [];
        }

        Toast.show(); // 弹出加载框
        fetch(url, {
            'method': 'GET',
            headers: {
                'contentType': 'application/json; charset=utf-8',
                'Authorization': _this.access_token
            },
        }).then(
            response => response.json(),
            error => ({result: 0, message: error})
        ).then(val => {
            Toast.destroy(); // 关闭加载框

            // 判断获取的参数是否有效
            if (val && val['@odata.context'] && val.value && val.value instanceof Array && val.value.length > 0) {
                // 参数有效的情况下, 缓存获取到的页面
                _this.iteratorCount++;
                val.value.map(item => {
                    _this.myPages.push({
                        contentUrl: item.contentUrl, // 缓存 contentUrl
                        parentSectionId: item.parentSection.id, // 以及 父分区的唯一标识
                    });
                });

                // 判断是否存在其他页面
                if (val['@odata.nextLink']) {
                    // 如果存在, 则进行迭代
                    _this.iteratorPagesByUrl(val['@odata.nextLink']);

                } else {
                    // 如果 不存在其他页面的情况下, 跳转到第三步
                    _this.storageIteratorPages();

                }

            } else {
                // 如果参数无效, 那么可能是报错了
                console.log(val); // 打印报错信息
                
                _this.setState({errorMessage: JSON.stringify(val)});
            }

        }).catch(error => {
            // 获取失败的情况下
            Toast.destroy(); // 关闭加载框
            
            alert(`获取 OneNote 所有 pages 失败! 原因已经打印到桌面`);

            console.log(error);

            _this.setState({errorMessage: JSON.stringify(error)});
        });
    }

    /**
     * 【第三步】 缓存 迭代获取的所有页面
     */
    storageIteratorPages() {
    }

    render() {
        const _this = this;

        return (
            <div className="microsoft">
                {this.state.errorMessage ? (
                    <div>
                        <div>
                            <button type="button" onClick={_this.iteratorPagesByUrl('https://graph.microsoft.com/v1.0/me/onenote/pages')}>重新获取</button>
                        </div>
                        <div>{_this.state.errorMessage}</div>
                    </div>
                ) : ''}
            </div>
        );
    }
}

export default english;
