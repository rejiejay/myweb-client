const user = {
	data: {
		namespace: 'user',

		state: {
            isLogin: false,
		},

		reducers: {
            setLogin: state => { // 登录
				return { ...state, isLogin: true }
			},
        }
    },
    
    whetherLogin() { // 判断 登录
        
        if (localStorage.rejiejay_token) {
            if (localStorage.rejiejay_token) {
                return true
            } else {
                return false
            }
        }
        return false
    },

	init: function (app) {
        if (this.whetherLogin()) { // 判断 登录
            app._store.dispatch({ type: 'user/setLogin' });
        }
	}
}

export default user;
