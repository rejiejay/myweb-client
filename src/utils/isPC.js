module.exports = function () {
    let isPC = true;

    let myWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;

    if (myWidth <= 768) { // 保底策略
        isPC = false;
    }

    ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod'].map(val => { // 其中一个满足设备条件跳转为手机端
        if (window.navigator.userAgent.indexOf(val) > 0) {
            isPC = false;
        }
        return val;
    })

    if (isPC) {
        return false
    }

    return true
}
