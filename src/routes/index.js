import React from 'react';
import { Router, Route } from 'dva/router';
import dynamic from 'dva/dynamic';

import isPC from './../utils/isPC';
import indexModel from './../models/index';
import dynamicModel from './../models/dynamic';
import userModel from './../models/user';

function RouterConfig({ history, app }) {

  indexModel.init(app);
  dynamicModel.init(app);
  userModel.init(app);

  const Computer = dynamic({ app, component: () => import('./computer/index') });

  const Mobile = dynamic({ app, component: () => import('./mobile/index') });
  const MobilePreview = dynamic({ app, component: () => import('./mobile/preview') });
  const MobilePreviewEdit = dynamic({ app, component: () => import('./mobile/preview-edit') });
  const DynamicPreview = dynamic({ app, component: () => import('./mobile/dynamic/preview') });
  const DynamicGroup = dynamic({ app, component: () => import('./mobile/dynamic/group') });
  const DynamicGroupList = dynamic({ app, component: () => import('./mobile/dynamic/group-list') });
  const DynamicEdit = dynamic({ app, component: () => import('./mobile/dynamic/edit') });

  const UserLogin = dynamic({ app, component: () => import('./user/login') });

  return (
    <Router history={history}>
      <div className="router-content">
        {browserRedirect(app)}
        <Route path="/pc/index" component={Computer} />

        <Route path="/mobile/index" component={Mobile} />
        <Route path="/mobile/preview/index" component={MobilePreview} />
        <Route path="/mobile/preview/edit" component={MobilePreviewEdit} />
        <Route path="/mobile/dynamic/preview" component={DynamicPreview} />
        <Route path="/mobile/dynamic/group" component={DynamicGroup} />
        <Route path="/mobile/dynamic/group-list" component={DynamicGroupList} />
        <Route path="/mobile/dynamic/edit" component={DynamicEdit} />
        
        <Route path="/user/login" component={UserLogin} />
      </div>
    </Router>
  );
}   

function browserRedirect(app) {
  const MobilePreview = dynamic({ app, component: () => import('./mobile/preview') });
  const Computer = dynamic({ app, component: () => import('./computer/index') });

  if (isPC()) {

    return (
      <Route exact path="/" component={MobilePreview} />
    )
  } else {

    return (
      <Route exact path="/" component={Computer} />
    )
  }
}

export default RouterConfig;
