let config = (() => {
    let NODE_ENV = process.env.NODE_ENV || '';

    if (NODE_ENV === 'development') {
        return {
            basicUrl: 'http://localhost:3000'
        }
    } else {
        return {
            basicUrl: 'http://119.29.140.46:1938'
        }
    }
})();

export default config
