/**
 * ajaxs请求复用的抽象
 */
// 配置类
import config from "./../config/index";
// 组件类
import Toast from './toast';
import createSignature from './../utils/createSignature';

export default {
    /**
     * 基础 get请求
     * @param {string} url 请求的 url
     * @param {string} reason 请求的 原因
     */
    get: (url, reason) => new Promise((resolve, reject) => {

        Toast.show(); // 弹出加载框
        fetch(`${config.url.origin}${url}`, {
            'method': 'GET',
            'contentType': 'application/json; charset=utf-8'
        }).then(
            response => response.json(),
            error => ({result: 0, message: error})
        ).then(val => {
            Toast.destroy(); // 关闭加载框、

            if (val.result === 1) {
                resolve(val.data);
            } else {
                console.error(val.message); // 打印报错信息
                reject(`向服务器发起请求查找${reason}成功, 但是数据有误! 原因: ${val.message}`);
            }

        }).catch(error => {
            Toast.destroy(); // 关闭加载框、
            console.error(error); // 打印报错信息
            reject(`向服务器发起请求查找${reason}失败, 原因: ${error}`)
        });
    }),

    /**
     * 基础 post请求
     * @param {string} url 请求的 url
     * @param {object} payloads 请求参数
     * @param {string} reason 请求的 原因
     */
    post: (url, payloads, reason) => new Promise((resolve, reject) => {
        Toast.show(); // 弹出加载框

        fetch(`${config.url.origin}${url}`, {
            'method': 'POST',
            'headers':{
                'Content-Type': 'application/json',
                'x-rejiejay-signature': createSignature(payloads),
            },
            'body': JSON.stringify(payloads) 
        }).then(
            response => ( response.json() ),
            error => ({'result': '1', 'message': error})
        ).then(val => {
            Toast.destroy(); // 关闭加载框、

            if (val.result === 1) {
                resolve(val.data);

            } else if (val.result === 110) {
                window.location.href = './#/user/login';
                reject(`您未登录噢~`);
                
            } else {
                console.error(val.message); // 打印报错信息
                reject(`向服务器发起请求查找${reason}成功, 但是数据有误! 原因: ${val.message}`);
            }

        }).catch(error => {
            Toast.destroy(); // 关闭加载框、
            console.error(error); // 打印报错信息
            reject(`向服务器发起请求查找${reason}失败, 原因: ${error}`)
        });
    }),

    
    /**
     * 不判断result的 get请求
     * @param {string} url 请求的 url
     * @param {string} reason 请求的 原因
     */
    resget: (url, reason) => new Promise((resolve, reject) => {

        Toast.show(); // 弹出加载框
        fetch(`${config.url.origin}${url}`, {
            'method': 'GET',
            'contentType': 'application/json; charset=utf-8'
        }).then(
            response => response.json(),
            error => ({result: 0, message: error})
        ).then(val => {
            Toast.destroy(); // 关闭加载框、

            resolve(val);

        }).catch(error => {
            Toast.destroy(); // 关闭加载框、
            console.error(error); // 打印报错信息
            reject(`向服务器发起请求查找${reason}失败, 原因: ${error}`)
        });
    }),

    /**
     * 不判断result的 post请求
     * @param {string} url 请求的 url
     * @param {object} payloads 请求参数
     * @param {string} reason 请求的 原因
     */
    respost: (url, payloads, reason) => new Promise((resolve, reject) => {
        Toast.show(); // 弹出加载框

        fetch(`${config.url.origin}${url}`, {
            'method': 'POST',
            'headers':{
                'Content-Type': 'application/json',
                'x-rejiejay-signature': createSignature(payloads),
            },
            'body': JSON.stringify(payloads) 
        }).then(
            response => ( response.json() ),
            error => ({'result': '1', 'message': error})
        ).then(val => {
            Toast.destroy(); // 关闭加载框

            if (val.result === 110) {
                window.location.href = './#/user/login';
                return reject(`您未登录噢~`);
            } 

            resolve(val);

        }).catch(error => {
            Toast.destroy(); // 关闭加载框
            console.error(error); // 打印报错信息
            reject(`向服务器发起请求查找${reason}失败, 原因: ${error}`)
        });
    }),
}
