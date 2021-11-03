/**
 * 初始化 redux 顶层数据的方法
 */
import user from './user';
import ajaxs from './../api/models';
import initJSSDK from './../components/initJSSDK';

const modelsInit = {
    /**
     * 初始化所有的方法
     */
    all: function all() {
        // this.rejiejayToken(); // 初始化 判断是否登录
        this.baiduText2audioToken(); // 初始化 百度音频的应用程序编程接口凭证
        // 判断是不是非本地情况
        if (window.location.hostname !== 'localhost') {
            this.initWXshare(); // 服务器的情况下 初始化 微信 分享
        }
    },

    /**
     * 初始化 微信 分享
     */
    initWXshare: function initWXshare() {
        let title = '曾杰杰小屋'; // 分享的标题
        let desc = '欢迎光临，快找个位置坐。'; // 分享的描述
        let link = window.location.href.split('#')[0]; // 分享链接
        let imgUrl = 'https://rejiejay-1251940173.cos.ap-guangzhou.myqcloud.com/myweb/page-assets/picture/wx_sharer.png'; // 分享的图片
        
        initJSSDK(['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage'])
        .then(
            () => {
                console.log('成功初始化jssdk!');
                /**
                 * 初始化“分享给朋友”及“分享到QQ”按钮的分享
                 */
                wx.updateAppMessageShareData({ 
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgUrl, // 分享图标
                }, function(res) { 
                    console.log('成功“分享给朋友”及“分享到QQ”', res);
                }); 
                
                /**
                 * 初始化“分享到朋友圈”及“分享到QQ空间”
                 */
                wx.updateTimelineShareData({ 
                    title: title,
                    link: link,
                    imgUrl: imgUrl, // 分享图标
                }, function(res) { 
                    console.log('成功“分享到朋友圈”及“分享到QQ空间”', res);
                }); 

                /**
                 * 初始化“分享到朋友圈”
                 */
                wx.onMenuShareTimeline({
                    title: title,
                    link: link,
                    imgUrl: imgUrl, // 分享图标
                    success: function (res) {
                        console.log('成功“分享到朋友圈”', res);
                    },
                }); 

                /**
                 * 初始化“分享给朋友”及“分享到QQ”按钮的分享
                 */
                wx.onMenuShareAppMessage({
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgUrl, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function (res) {
                        console.log('成功“分享给朋友”', res);
                    }
                });
                
            }, error => console.log(error)
        );
    },

    /**
     * 暂时不用初始化这个
     * 因为目前使用 window.localStorage.rejiejay_token 判断是否登录
     * 而且不判断合法性
     */
    rejiejayToken: function rejiejayToken() {
    },

    /**
     * 初始化 百度音频的应用程序编程接口凭证
     */
    baiduText2audioToken: function baiduText2audioToken() {
        ajaxs.getBaiduText2audioToken()
        .then(val => {

            // 存储到 redux （react 顶层）
            let acion = {
                type: 'init_baidu_audio_token', // 相当于一个请求的url链接
                data: val, // 相当于 post 请求 携带的 参数
            }
            
            user(undefined, acion); // 相当于一个请求，而且是100% 会成功的请求

        }, error => {}); // 失败不做处理， 封装好的 http 已经打印到控制台
    },
}

export default modelsInit;
