// 框架类
import React, { Component } from 'react';
// 请求类
import { apibasicsget } from './ajaxs';
import { getToken, storagePages, getStoragePagesStatus } from './../../api/microsoft/index';
// 组件类
import Toast from './../../components/toast';
// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

/**
 * 获取 OneNote notebook 所有的 pages
 * 这个页面是强制刷新所有 pages，就是说无论任何时候, 只要进入到这个页面就会进行重置所有页面
 */
class getAllPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
        }

        /**
         * 本地测试 (postman手动赋值)
         */
        this.access_token = "EwB4A8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAAZZTv7GHIm0iIZA4VcG0FteiCgT0DEYKQB9d24C6CHE2l3letHpUTFwk7UpfvIzrhOkoNZAFUJi6RL0Dbc5Z/0+qcXQE96OOHPh18pnFrOaikr7QCgJUPuCLm6fyGBkoVZdQK+G62SOtRc4ORhubJH7C+wH6ZTBsyl5ILtptrF3GHt0OHxbHxCTtwWnpHzdniAmE3qEkOxV1zFBaPm50F4qXtYNqm0BgefKRXypEq9PSyrV9ClXvGB29tY5oYukaZ5OPOtfDGWCB+ensfXsYn8dvb6XAwmCbzh1TvJ0DkIxrZSlwQy1LonHlV/mk6c1I9Hcsr4TqBHhx2w0BoeC3t34DZgAACPh8ZB4PXqwgSAIAm3aPvXpzm3yMUQvn5G447Pa1k09sKdVJQlzFu2EqwVFxkfUS2XIcFpcuFsfYPOfNOZthsP3XBMNg1Qh4ksIkuWp/+CUJ7H+5kABytVUaSTfN1YoeXJ2b4BKYYHeZe0yB0BjYAMuX+dbWGQah9YiSFOozLTPV9JKBiCuY2E9WHvgHsP8zieVubSaPSyMEDmkpekPa+t8Ok8ulyhd14LPLVP0tiZrS5rVe+A3rI411RHJ7TeZRXwnVyTm3ovgjO5xRBQfHG63rRmokkttaNe0lLrgwe6aMjWwhoPe1J1I0zL7N7J+pa/ZuKNi2igEx0gC7UGD67MxaZE3nvQl2MLWEupt5B08rPzdPYcqVlzYYCLgIKLQ7ZiYm89hMAU3Fmpz1VIUiXZhF7U3XBpZmWWNXTswXwxjpRcRiUaa/AlCuQcksxUtQxgLI5FaUBLGodq88M6XztvX+S+nnsQIqvGbwWa9oI0ELRnfzTEmjI3qxGZRONQEUMrsrtap6WWzPCrUAkFwfZNCna7bPX6kUuilhaw6p8aAmOqExr2LgnXEdQwhHjrLcTTDAyl27uG9MLbfMzWGsLiFFllNi1CowCiisFRHMVvPN5WEV4YJasm6uNHdRfsteJ/BlLU0t4msKVPoxYGqnrlzOQeEhgqlIsEKv3Uzn/24dur50kOhMxYn60bRAMR4u/f4s9dNg+hCrDF2jhwiSl6lBHP9KM0dfS3NnuEy1Mu4jaCraMYReRkMlTZpKcFewC/OSUN4sjbaidYUqNENtql6TkX0C";

        this.iteratorPagesByUrl.bind(this); // 因为会涉及到迭代, 将 this 绑定进去

        this.iteratorCount = 1; // 迭代次数
        this.myPages = []; // 迭代获取的页面
    }

    componentDidMount() {
        const _this = this;

        /**
         * 判断一下页面状态
         */
        getStoragePagesStatus()
        .then(res => {
            if (res.result === 1) {
                // 有缓存数据，但是 这个页面是强制刷新所有 pages，下一步
                _this.initAccessToken();

            } else if (res.result === 233) {
                // 正在缓存 OneNote notebook 所有的 pages, 跳转到【第四步】 轮询缓存所有页面的状态
                _this.iteratorStoragePagesStatus.call(_this);
                
            } else {
                // 压根就没有缓存OneNote notebook 所有的 pages, 直接下一步
                _this.initAccessToken();
            }

        }, error => {
            // 失败的情况下就不用管了, 直接下一步
            _this.initAccessToken();
        });

    }

    /**
     * 【第一步】 获取Token
     */
    initAccessToken() {
        const _this = this;

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

            if (window.confirm(`获取授权失败, 原因：${error}。是否跳转到授权页?`)) {
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
        apibasicsget(url)
        .then(val => {
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
                    return item;
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
        const _this = this;

        storagePages(this.myPages)
        .then(res => {
            _this.iteratorStoragePagesStatus(); // 执行缓存成功的情况下, 开始【第四步】轮询缓存所有页面的状态

        }, error => {
            
            alert(`缓存 OneNote 所有 pages 失败! 原因已经打印到桌面`);

            console.log(error);

            _this.setState({errorMessage: JSON.stringify(error)});
        });
    }

    /**
     * 【第四步】 轮询缓存所有页面的状态
     */
    iteratorStoragePagesStatus() {
        const _this = this;

        getStoragePagesStatus()
        .then(res => {
            if (res.result === 1) {
                alert('成功缓存所有页面');
                window.history.back(-1); // 返回上一页即可

            } else if (res.result === 233) {
                setTimeout(() => _this.iteratorStoragePagesStatus.call(_this), 2500); // 2.5秒后继续轮询
            }

        }, error => {
            
            alert(`轮询缓存所有页面的状态 失败! 原因已经打印到桌面`);

            console.log(error);

            _this.setState({errorMessage: JSON.stringify(error)});
        });
    }

    render() {
        const _this = this;

        return (
            <div className="microsoft">
                {this.state.errorMessage ? (
                    <div>
                        <div>
                            <button type="button" onClick={() => _this.iteratorPagesByUrl('https://graph.microsoft.com/v1.0/me/onenote/pages')}>重新获取</button>
                        </div>
                        <div>{_this.state.errorMessage}</div>
                    </div>
                ) : ''}
            </div>
        );
    }
}

export default getAllPages;
