import config from "./../../config/index";
import { Toast } from 'antd-mobile';

export default {
    /**
     * 获取 列表数据
     * @param {number} pagenum 多少页
     */
    getList: pagenum => new Promise((resolve, reject) => {
        let requestReason = '列表数据';

        Toast.loading(); // 弹出加载框
        fetch(`${config.url.origin}/english/get/list?pagenum=${pagenum}`, {
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
                reject(`向服务器发起请求查找${requestReason}成功, 但是数据有误! 原因: ${val.message}`);
            }
        }).catch(error => {
            Toast.hide(); // 关闭加载框、
            reject(`向服务器发起请求查找${requestReason}失败, 原因: ${error}`)
        });
    }),
}
