/**
 * 初始化所有的 models 的方法
 * @param {object} app 这个 app 是 dva 框架的 app 也就是 react 里面的 this
 */
import indexModel from './index';
import dynamicModel from './dynamic';
import userModel from './user';

const init = app => {
    app.model(indexModel.data);
    app.model(dynamicModel.data);
    app.model(userModel.data);

    // app.use({
    //     onAction: () => { 
    //     },
    // })

    // indexModel.init(app);
    // dynamicModel.init(app);
    // userModel.init(app);
}

export default init;
