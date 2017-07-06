import fetch from 'isomorphic-fetch'

// fetch 数据
function fetchDynamicMessage() {
  return function (dispatch) {
    return fetch('/Dynamic.json')
      .then(response => response.json())
      .then(
        json => dispatch(DynamicAciton(json))
      )
  }
}


// 生成 Action 的函数
function DynamicAciton(json) {
  // 测试 fetch 来的数据
  // console.log(json)
  return {
    type: 'GET_DynamicMessage',
    data: json
  }
}

// 传入 dispatch
export default function DynamicAction(type, data) {
  return (dispatch, getState) => {
  	return dispatch(fetchDynamicMessage())
  }
}



