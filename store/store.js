import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './../reducers/reducer.js'


const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

// let store = function createStore(initialState) {
// 	const store = createStoreWithMiddleware(reducer, initialState);
// 	return store
// }

// let store = createStore(reducer)
// export default store


function configureStore(initialState) {
  	const store = createStoreWithMiddleware(reducer, initialState);
  	
  	return store
}

const store = configureStore()

// 下方是测试 store 
// console.log(store.getState())


export default store

