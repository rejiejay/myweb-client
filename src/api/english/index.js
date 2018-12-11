// 组件
import apibasics from "./../../components/apibasics";

export default {
    /**
     * 获取 列表数据
     * @param {number} pagenum 多少页
     */
    getList: pagenum => apibasics.get(`/english/get/list?pagenum=${pagenum}`, '列表数据'),
    
    /**
     * 获取 随机查询
     */
    getrandom: () => apibasics.get(`/english/get/random`, '随机查询'),

    /**
     * 新增一条记录
     * @param {string} en_text 英文
     * @param {string} zh_text 中文
     */
    add: (en_text, zh_text) => {
        // 请求参数
        let payloads = {
            en_text: en_text,
            zh_text: zh_text,
        }

        return apibasics.post('/english/add', payloads, '新增记录');
    },
    
    /**
     * 编辑增一条记录
     * @param {string} id 唯一标识
     * @param {string} en_text 英文
     * @param {string} zh_text 中文
     */
    edit: (id, en_text, zh_text) => {
        // 请求参数
        let payloads = {
            id: id,
            en_text: en_text,
            zh_text: zh_text,
        }

        return apibasics.post('/english/edit', payloads, '编辑记录');
    },

    /**
     * 编辑增一条记录
     * @param {string} id 唯一标识
     */
    del: id => {
        // 请求参数
        let payloads = {
            id: id,
        }

        return apibasics.post('/english/del', payloads, '删除记录');
    },
}
