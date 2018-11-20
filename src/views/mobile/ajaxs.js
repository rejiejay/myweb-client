import config from './../../config';
import axios from 'axios';
import createSignature from './../../utils/createSignature';
import { routerRedux } from 'dva/router';

const ajaxs = {
    // 主页的 文章数据 暂时只写在本地, 不上传数据库
    homePageArticles: [ 
        {
            picURL: '',
            title: 'Hi, 我是曾杰杰。',
            content: '欢迎来到我的个人网站, 没有关系你也不用, 没有关系你也不用, 没有关系你也不用给我机会反正我还有一生可以浪费。我就是这么一点点倔。'
        }
    ],

    // 主页的 Tab数据 以及查看更多的导航
    homePageTabs: [
        {
            name: '斗鱼',
            url: 'https://www.douyu.com/'
        }, {
            name: '百度',
            url: 'https://www.baidu.com/'
        }
    ],

    /**
     * 获取一条记录
     * @return {Promise} resolve(true) reject(error)
     */
    getOneByRandom() {
        return new Promise((resolve, reject) => {
            axios({
                url: `${config.url.origin}/record/get/one`, 
                method: 'get',
            })
            .then(response => {
                if (response.status === 200) {
                    if (
                        response.data && // 存在返回数据
                        response.data.result === 1 // 并且结果正确
                    ) {
                        resolve(response.data.data);
                    } else {
                        resolve(response.data.message);
                    }
                } else {
                    reject(response.statusText);
                }
            })
            .catch(error => {
                reject(error);
            })
        });
    },

    /**
     * 保存记录
     * @param {string} title 必填 标题
     * @param {string} content 必填 内容
     * @return {Promise} resolve(true) reject(error)
     */
    saveRecord(self, title, content) {
        
        let payloads = {
            title: title,
            content: content,
        }

        return new Promise((resolve, reject) => {
            axios({
                url: `${config.url.origin}/record/save`, 
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rejiejay-signature': createSignature(payloads),
                },
                data: payloads
            })
            .then(response => {
                if (response.status === 200) {
                    if (
                        response.data && // 存在返回数据
                        response.data.result === 1 // 并且结果正确
                    ) {
                        resolve(response.data.data);
                    } else if (
                        response.data && // 存在返回数据
                        response.data.result === 110 // 并且结果正确
                    ) {
                        // 跳转到登录页面
                        self.props.dispatch(routerRedux.push('/user/login'));
                        reject(response.data.message);
                    } else {
                        reject(response.data.message);
                    }
                } else {
                    reject(response.statusText);
                }
            })
            .catch(error => {
                reject(error);
            })
        });
    },

    /**
     * 编辑记录
     * @param {number} id 必填 唯一标识
     * @param {number} year 必填 所属年份
     * @param {string} title 必填 标题
     * @param {string} content 必填 内容
     * @return {Promise} resolve(true) reject(error)
     */
    editRecord(self, id, year, title, content) {
        
        let payloads = {
            id: parseInt(id, 10),    // 保证是number
            year: parseInt(year, 10),// 保证是number
            title: title,
            content: content,
        }

        return new Promise((resolve, reject) => {
            axios({
                url: `${config.url.origin}/record/edit`, 
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rejiejay-signature': createSignature(payloads),
                },
                data: payloads
            })
            .then(response => {
                if (response.status === 200) {
                    if (
                        response.data && // 存在返回数据
                        response.data.result === 1 // 并且结果正确
                    ) {
                        resolve(response.data.data);
                    } else if (
                        response.data && // 存在返回数据
                        response.data.result === 110 // 并且结果正确
                    ) {
                        // 跳转到登录页面
                        self.props.dispatch(routerRedux.push('/user/login'));
                        reject(response.data.message);
                    } else {
                        reject(response.data.message);
                    }
                } else {
                    reject(response.statusText);
                }
            })
            .catch(error => {
                reject(error);
            })
        });
    },

    /**
     * 编辑记录
     * @param {number} id 必填 唯一标识
     * @param {number} year 必填 所属年份
     * @return {Promise} resolve(true) reject(error)
     */
    deleteRecord(self, id, year) {
        
        let payloads = {
            id: parseInt(id, 10),    // 保证是number
            year: parseInt(year, 10) // 保证是number
        }

        return new Promise((resolve, reject) => {
            axios({
                url: `${config.url.origin}/record/delete`, 
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'x-rejiejay-signature': createSignature(payloads),
                },
                data: payloads
            })
            .then(response => {
                if (response.status === 200) {
                    if (
                        response.data && // 存在返回数据
                        response.data.result === 1 // 并且结果正确
                    ) {
                        resolve(response.data.data);
                    } else if (
                        response.data && // 存在返回数据
                        response.data.result === 110 // 并且结果正确
                    ) {
                        // 跳转到登录页面
                        self.props.dispatch(routerRedux.push('/user/login'));
                        reject(response.data.message);
                    } else {
                        reject(response.data.message);
                    }
                } else {
                    reject(response.statusText);
                }
            })
            .catch(error => {
                reject(error);
            })
        });
    }
}

export default ajaxs;