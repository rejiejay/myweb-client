// B站源码
module.exports = (() => {
  let ua = window.navigator.userAgent,
    agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod'],
    isPC = true;

    for (let i = 0, len = agents.length; i < len; i++) {
    if (ua.indexOf(agents[i]) > 0) {
      isPC = false;
      break;
    }
  }
  
  return !isPC;
})();
