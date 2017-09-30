import dva, { connect } from 'dva';

import fetch from 'dva/fetch';
import React from 'react';
import less from './index.less';

import models from './models';
import routes from './routes';

const app = dva();

app.model(models);

app.router(routes);

app.start('#root');
