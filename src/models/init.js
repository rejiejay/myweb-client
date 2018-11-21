/**
 * 初始化 redux 顶层数据的方法
 */
import user from './user'
import ajaxs from './../api/models'

const modelsInit = {
    all: function all() {
        // this.rejiejayToken();
        this.baiduText2audioToken();
    },

    /**
     * 暂时不用初始化这个
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

        }, error => {}); // 失败不做处理， 封装好的 http 已经打印
    },
}

export default modelsInit;
