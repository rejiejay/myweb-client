export const ReactReduxAction = function(text) {
	return{
		type: 'Async_Redux',
	  	text:text
	}
}

export const addUserInfo = function(json) {
	return{
		type: 'ADD_UserInfo',
	  	data: json
	}
}
