let config = (() => {
    let NODE_ENV = process.env.NODE_ENV || '';

    if (NODE_ENV === 'development') {
        return {
            basicUrl: 'http://192.168.1.106:3000'
        }
    } else {

    }

})();

export default config
