// 组件
import apibasics from "./../../components/apibasics";

export default {
    /**
     * 登录
     * @param {string} password 登录密码
     */
    login: password => apibasics.resget(`/user/login?password=${password}`, '登录'),
}
