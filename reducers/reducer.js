import { combineReducers } from 'redux'



// State 
const initialState = {
    text : 'Hello world'
}

// Action
function changeText(){
    return {
        type: 'CHANGE_TEXT',
        newText: 'Hello Stark'
    }
}

// reducer
function Testreducer (state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([ action.text ])
    default:
      return state
  }
}




/* ———————————————— 上方Testreducer测试，目的理解 Action State Reducer ——————————————————————————— */

import { RECEIVE_POSTS } from '../actions/actions.js'


//这个是 postsByReddit 的 state 是 更新留言板的 (需要更改)
function GuestsMessage(state = { }, action) {
  switch (action.type) {
    case 'GET_GuestsMessage':
      return Object.assign( [] , action.data )
    default:
      return state
  }
}
/* ———————————————————————— 上方为 留言板 Reducer ——————————————————————————————————————————— */

// 操纵 时光轴 Reducer
function TimelineDynamicReducer (state = {}, action) {
  switch (action.type) {
    case 'GET_DynamicMessage':
      return Object.assign( [] , action.data )
    default:
      return state
  }
}




// 将所有的reducer结合为一个,传给store
const reducer = combineReducers({
  Testreducer,
  GuestsMessage,
  TimelineDynamicReducer
})

export default reducer