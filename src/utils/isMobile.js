module.exports = function () {
    let isMobile = false;

    let myWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;

    if (myWidth <= 768) { // 保底策略
        isMobile = true;
    }

    ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod'].map(val => { // 其中一个满足设备条件跳转为手机端
        if (window.navigator.userAgent.indexOf(val) > 0) {
            isMobile = true;
        }
        return val;
    })

    return isMobile
}
