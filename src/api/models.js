// 组件
import apibasics from "./../components/apibasics";

export default {
    /**
     * 获取 百度音频的应用程序编程接口凭证
     */
    getBaiduText2audioToken: () => apibasics.get('/baidu/text2audio/token', '获取百度音频的应用程序编程接口凭证'),
}
