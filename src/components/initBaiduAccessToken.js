/**
 * 初始化百度 access_token 的方法
 */

// 组件类
import apibasics from "./apibasics";

const initBaiduAccessToken = () => {
    apibasics.get(`/baidu/getAccessToken`, '百度应用程序编程接口(Application Programming Interface)的凭证(token)')
    .then(
        res => {
            // res 就是 百度的 token
            window.localStorage.setItem('baidu_text2audio_access_token', res);
        }, error => alert(error)
    );
}

export default initBaiduAccessToken;
