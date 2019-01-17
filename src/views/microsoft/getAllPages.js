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
        this.access_token = "EwBwA8l6BAAURSN/FHlDW5xN74t6GzbtsBBeBUYAARxu/YrgsYkTrwdqkaLc18na/GmDfvEioSd+yN7q97qLjFjE2T89NJ9AjoL+j6Ae9v+B8ewJZzDHIN76ttQ6JDR0WGoRaaXo+EfrwQan7vqdQoRuMSwxHFO6ZeFHQft2tKNvR5oc44sX9exK//2ncFqkaMm/8jvuzQTC6WPSi8QTCUmBAJB8wLucHkyuJ+9WSZ6TxGgI74wFBsn5XBoMCsftWy5uL/T2NGaReYrbrS7u45uvhANlA7haKHCUCD9PAytGXk7jcUpzGbvweMM5kN01O9r1bIxsFLEPpym31yV7BzvCAcCeerZIMQw8JVnNag7+qmmLix2AcZdsYG4Q7I4DZgAACFTFfQqVlcDVQAK3FtH4fIeOzHwMnFXhsMrBs9djd7MsHiC0kOlMr5pcAG8daqFeTIfI9ZhNt1OtkCsJJpQtsUJ9RiBA+nY9Go16LWwvbnaZzpGvtaQKEMQe3xVGFha0m6oFOzazjLo0aOO8yJFDdKMBmK0GdXUlATBVxsupeCOLayBPpqsIBKGobReY8JBxQ1WO2oyx+OjiWvmWJjoQ4YLETDLRvMb6E/pPsrBzYh27Z5a5ed/zrtgutTLv+VCOVzrB0NDEPDVzNUVvyKxbZD/xjk2kilRdwrrzNAHsat9nXINhriZRzyjTlgAEuBb5Grc6UncT+nBdyvxpZaa559TKXEvizmBjfxE7OyYmSIcAKdG4hjGuN5xWHVtrpoVF1Y1nAFcxt/kdNnWYwZvuHbIbUFtK5rKdZEVRuFpYalaEGwXvswrvT5ONNptv850JJrov8zrGy7PStXsF5hzhgxw8JPuGG84majAic7yg1VG4n3Jubh1dmPrsAahczIWl3PMtDdl7+g4rH5CntnSgMXkwpqKhy+ErNn8GvyngyK46lLZ3QidHFYC/K2tYsZBFwuyLkKhHpXWJ8C/nAV0usxmZmnq1Iv40Eiy4u5uopKZO5x0Lwqociopnjt3+jsblI9IFDuU6uQn4CvSciMseUHsYFay0f8MiD5m5sROlWgcEfbzITnYg+um7ejaebHxL8PInPVmtZLmDOT1FHI+9P2h1KDOJljcoyItsr7s8pPxna55AS7MI3SRB547i0Gm+zVZoaSvgR4zUZNZ9Ag==";

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
