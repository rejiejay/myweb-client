/**
 * 单一状态树 唯一数据源 (SSOT)
 */
let myState = {
    /**
     * 登录凭证 用于判断是否登录
     */
    rejiejay_token: window.localStorage.rejiejay_token ? window.localStorage.rejiejay_token : false,
}

/**
 * user 用户的 redux 函数
 * @param {object} state 单一状态树 唯一数据源 (SSOT) 如果不传入值
 * @param {object} action 请求操作数据库的动作
 */
const user = (state = myState, action) => {
    /**
     * 用于拦截 action 的操作
     * 拦截成功返回 state
     */
    switch (action.type) {
        case 'ADD_TODO':
            return state
        default:
            return state
    }
}

export default user
