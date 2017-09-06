import React from 'react';
import { render } from 'react-dom';

// 引入React-Router模块
import { Router, Route, hashHistory, IndexRoute} from 'react-router';

// redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import reducer from './reducers';

const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer
  }),
  // 生产环境务必删掉
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// Create an enhanced history that syncs navigation events with the store 
const history = syncHistoryWithStore(hashHistory, store);



import Toplayer from './component/index.js';
import PCside from './component/PCside/index.js';
import Mobile from './component/Mobile/index.js';

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Toplayer}>
        <IndexRoute component={PCside}/>
        <Route path="/mobile" component={Mobile}/>
      </Route>
    </Router>
  </Provider>,
document.getElementById('root')
);