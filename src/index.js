import dva from 'dva';

// import 'antd-mobile/dist/antd-mobile.less';
import './index.less';

import indexModel from './models/index';
import dynamicModel from './models/dynamic';
import userModel from './models/user';
import routes from './routes';

const app = dva();

app.model(indexModel.data);
app.model(dynamicModel.data);
app.model(userModel.data);

app.router(routes);

document.getElementById('loading').innerHTML = '';

app.start('#root');
