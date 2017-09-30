import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import { connect } from 'dva';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  const PCside = dynamic({
    app,
    component: () => import('./PCside/index'),
  });

  const Mobile = dynamic({
    app,
    component: () => import('./Mobile/index'),
  });
  
  const Admin = dynamic({
    app,
    component: () => import('./Admin/index'),
  });
  
  const User = dynamic({
    app,
    component: () => import('./User/index'),
  });

  return (
    <Router history={history}>
      <Route>
        <Switch>
          <Route exact path="/" component={PCside} />
          <Route path="/mobile" component={Mobile} />
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={User} />
        </Switch>
      </Route>
    </Router>
  );
}  

export default RouterConfig;
