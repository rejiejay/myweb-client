import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router';
import { asyncComponent } from 'react-async-component';
declare let System: any;

import { RouterStore, UserStore } from './../models';

import English from './English/index';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const history = createHashHistory();

const rootStores = {
  'STORE_USER': new UserStore('Use Mobx'),
  'STORE_ROUTER': new RouterStore(history)
};

// render react DOM
ReactDOM.render(
  <Provider {...rootStores} >
    <Router history={history} >
      <Switch>
        <Route exact path="/" component={English} />
        <Route path="/todo/" component={asyncComponent({ resolve: () => System.import('./Todo/index') })} />
        <Route path="/version/2/home" component={asyncComponent({ resolve: () => System.import('./Version-2.0.0/index') })} />
      </Switch>
    </Router>
  </Provider >,
  document.getElementById('root')
);
