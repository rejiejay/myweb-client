import dva, { connect } from 'dva';

import fetch from 'dva/fetch';
import React from 'react';
import less from './index.less';

import Index from './routes';

const app = dva();

app.model({
  namespace: 'user',
  state: {},
  reducers: {
  }
});

app.router(require('./routes/index'));

app.start('#root');
