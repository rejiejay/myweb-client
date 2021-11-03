/**
 * 初始化微信JS-SDK
 */
import apibasics from "./apibasics";

/**
 * 获取公众号用于调用微信JS接口的权限验证配置信息
 */

let getWxConfig = () => apibasics.get(`/weixin/get/jssdkconfig?url=${encodeURIComponent(window.location.href.split('#')[0])}`, '获取公众号用于调用微信JS接口的权限验证配置信息')

 /**
 * 初始化微信JS-SDK
 * @param {Array} jsApiList
 */
let initJSSDK = function initJSSDK(jsApiList) {
    return new Promise((resolve, reject) => {
        getWxConfig() // 获取权限验证配置信息
        .then(
            wxConfig => {

                // 注册 配置成功的事件
                // eslint-disable-next-line no-undef
                wx.ready(function () { 
                    window.clearTimeout(window.initWxConfigTimer); // 清空超时的定时器
                    resolve(true);
                });

                // 注册 配置失败的事件
                // eslint-disable-next-line no-undef
                wx.error(function (res) {	
                    window.clearTimeout(window.initWxConfigTimer); // 清空超时的定时器
                    reject('初始化公众号用于调用微信JS接口的权限验证配置信息失败, 原因: ' + JSON.stringify(res));
                });

                // 初始化配置信息
                // eslint-disable-next-line no-undef
                wx.config({ 
                    debug: false,
                    appId: wxConfig.appId,
                    timestamp: wxConfig.timestamp,
                    nonceStr: wxConfig.nonceStr,
                    signature: wxConfig.signature,
                    jsApiList: jsApiList
                });

                // 设置 5秒 超时
                window.initWxConfigTimer = setTimeout(function () {
                    reject('初始化公众号用于调用微信JS接口的权限验证配置信息超时!');
                }, 5000);
            }, 
            error => reject(error)
        );
    });
}

export default initJSSDK;
