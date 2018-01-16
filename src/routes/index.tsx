import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router';
import { RouterStore, UserStore } from './../models';
import { Todo } from './Todo/index';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const history = createMemoryHistory();

const rootStores = {
  'STORE_USER': new UserStore('Use Mobx'),
  'STORE_ROUTER': new RouterStore(history)
};

// render react DOM
ReactDOM.render(
  <Provider {...rootStores} >
    <Router history={history} >
      <Switch>
        <Route path="/" component={Todo} />
      </Switch>
    </Router>
  </Provider >,
  document.getElementById('root')
);
