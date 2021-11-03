/**
 * 单一状态树 唯一数据源 (SSOT)
 */
let myState = {
    /**
     * 登录凭证 用于判断是否登录
     * 为什么存储在这里? 
     * 因为用户登录是会分发状态的
     * react redux 是有监听这个东西的改变的
     * 所以当这个东西一旦改变，所有的组件也是跟着改变的 （单向数据流） 
     */
    rejiejay_token: window.localStorage.rejiejay_token ? window.localStorage.rejiejay_token : false,

    /**
     * 百度音频的应用程序编程接口凭证
     * 为什么存储在这里? 
     * 因为 总得有个地方存，那存在这个地方就更加规范一些
     */
    baidu_text2audio_access_token: window.localStorage.baidu_text2audio_access_token ? window.localStorage.baidu_text2audio_access_token : false,
}

/**
 * 更改 store 中的状态的一些方法抽象
 */
const mutations = {
    /**
     * 初始化 百度音频的应用程序编程接口凭证 到state
     */
    initBaiduText2audioToken: function initBaiduText2audioToken(states, param) {
        let mystates = JSON.parse(JSON.stringify(states)); // 深度复制一下， 防止 react 的刷新 state 机制 教程 不生效

        window.localStorage.setItem('baidu_text2audio_access_token', param);
        mystates.baidu_text2audio_access_token = param;

        return mystates;
    },
}

/**
 * user 用户的 redux 函数
 * @param {object} state 单一状态树 唯一数据源 (SSOT) 如果不传入值 则使用的是我们默认的值
 * @param {object} action 请求操作数据库的动作
 */
const user = (state = myState, action) => {
    /**
     * 用于拦截 action 的操作
     * 拦截成功返回 state
     * 相当于 匹配路由
     */
    switch (action.type) {
        case 'init_rejiejay_token':
            return state
        
        case 'init_baidu_audio_token':
            return mutations.initBaiduText2audioToken(state, action.data);
        default:
            return state
    }
}

export default user
