// 初始化 UserInfo 的 state
const initialState = {
	// 身份有3种状态 1.Islogin 2.Visitor 3.Unknown 初始化是 Unknown
	Identity:"Unknown"
}



const userInfo = (state = initialState, action) => {
	switch (action.type) {
		case 'change_identity':
			state.Identity = action.data
			let newstate = Object.assign({}, state); 
			return newstate
		default:
			return state
	}
}

export default userInfo