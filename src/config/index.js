import common from './config.default.js';
import local from './config.local.js';
import prod from './config.prod.js';

let main = () => {
    let config = common; // 共同配置
    let plugin = {};

    if (window.location.hostname === 'localhost' || process.env.NODE_ENV === 'development') {
        plugin = local;

    } else {
        
        plugin = prod;
    }

    for (let key in plugin) { // 配置
        config[key] = plugin[key];
    }

    return config;
}

export default main();
