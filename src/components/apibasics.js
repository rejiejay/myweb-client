/**
 * ajaxs请求复用的抽象
 */
// 框架
import { Toast } from 'antd-mobile';
import axios from 'axios';
// 配置类
import config from "./../config/index";
// 组件类
import createSignature from './../utils/createSignature';

export default {
    /**
     * 基础 get请求
     * @param {string} url 请求的 url
     * @param {string} reason 请求的 原因
     */
    get: (url, reason) => new Promise((resolve, reject) => {

        Toast.loading(); // 弹出加载框
        fetch(`${config.url.origin}${url}`, {
            'method': 'GET',
            'contentType': 'application/json; charset=utf-8'
        }).then(
            response => response.json(),
            error => ({result: 0, message: error})
        ).then(val => {
            Toast.hide(); // 关闭加载框、
            if (val.result === 1) {
                resolve(val.data);
            } else {
                reject(`向服务器发起请求查找${reason}成功, 但是数据有误! 原因: ${val.message}`);
            }
        }).catch(error => {
            Toast.hide(); // 关闭加载框、
            reject(`向服务器发起请求查找${reason}失败, 原因: ${error}`)
        });
    }),

    /**
     * 基础 post请求
     * @param {string} url 请求的 url
     * @param {object} payloads 请求参数
     * @param {object} self 因为会页面跳转，所以这个一定是会请求的
     * @param {string} reason 请求的 原因
     */
    post: (url, payloads, self, reason) => new Promise((resolve, reject) => {
        Toast.loading(); // 弹出加载框
        axios({
            url: `${config.url.origin}${url}`, 
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-rejiejay-signature': createSignature(payloads),
            },
            data: payloads
        })
        .then(response => {
            Toast.hide(); // 关闭加载框、

            /**
             * 判断请求发起是否有问题
             */
            if (response.status === 200) {

                /**
                 * 判断服务器返回的数据
                 * 判断是否登录
                 */
                if (response.data && response.data.result === 1) {
                    resolve(response.data.data);

                } else if (response.data && response.data.result === 110) {
                    // 跳转到登录页面
                    self.props.dispatch(routerRedux.push('/user/login'));
                    reject(response.data.message);

                } else {
                    console.error(response); // 打印报错信息
                    reject(`向服务器发起请求查找${reason}失败, 原因: ${response.statusText}`)
                }
                
            } else {
                console.error(response); // 打印报错信息
                reject(`向服务器发起请求查找${reason}失败, 原因: ${response.statusText}`)
            }
        })
        .catch(error => {
            Toast.hide(); // 关闭加载框、
            console.error(error); // 打印报错信息
            reject(`向服务器发起请求查找${reason}失败, 原因: ${error}`)
        });
    }),
}
