let config = (() => {
    let NODE_ENV = process.env.NODE_ENV || '';

    if (NODE_ENV === 'development') {
        return {
            url: 'localhost:7001',
        }
    } else {
        return {
            url: 'https://www.rejiejay.cn/',
        }
    }
})();

export default config
