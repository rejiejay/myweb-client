// 组件
import apibasics from "./../components/apibasics";

export default {
    /**
     * 获取 百度音频的应用程序编程接口凭证
     */
    getBaiduText2audioToken: () => apibasics.get('/baidu/text2audio/token', '获取百度音频的应用程序编程接口凭证'),

    /**
     * 获取 微信公众号的全局唯一接口调用凭据
     */
    getWeixinGlobalAccessToken: () => apibasics.get('/weixin/get/global_access_token', '获取微信公众号的全局唯一接口调用凭据'),
}
