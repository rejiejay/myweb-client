import { combineReducers } from 'redux'
import todos from './todos'
import userInfo from './userInfo'

const todoApp = combineReducers({
  todos,
  userInfo
})

export default todoApp



