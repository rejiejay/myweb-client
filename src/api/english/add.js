// 组件
import apibasics from "./../../components/apibasics";

export default {
    /**
     * 新增一条记录
     * @param {string} en_text 英文
     * @param {string} zh_text 中文
     * @param {object} self 因为会页面跳转，所以这个一定是会请求的
     */
    add: (en_text, zh_text, self) => {
        // 请求参数
        let payloads = {
            en_text: en_text,
            zh_text: zh_text,
        }

        return apibasics.post('/english/add', payloads, self, '新增记录');
    },
}
