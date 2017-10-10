import dva, { connect } from 'dva';

import fetch from 'dva/fetch';
import React from 'react';

import index from './index.less';
import Dynamic from './components/PCside/Dynamic/index.less';
import NavHeard from './components/PCside/NavHeader/index.less';
import Login from './components/User/Login/index.less';

import models from './models';
import routes from './routes';

const app = dva();

app.model(models);

app.router(routes);

app.start('#root');
