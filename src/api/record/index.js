// 组件
import apibasics from "./../../components/apibasics";

export default {
    /**
     * 获取一条记录
     */
    getOneByRandom: () => apibasics.get('/record/get/one', '获取记录'),
    
    /**
     * 根据id获取一条记录
     * @param {number} id 记录id
     */
    getOneById: id => apibasics.get(`/record/get/id?id=${id}`, '根据id获取一条记录'),
    
    /**
     * 获取 列表数据
     * @param {number} pagenum 多少页
     */
    getList: pagenum => apibasics.get(`/record/get/list?pagenum=${pagenum}`, '列表数据'),
    
    /**
     * 获取 随机查询
     */
    getrandom: () => apibasics.get('/record/get/random', '随机查询'),
    
    /**
     * 保存记录
     */
    saveRecord: (title, content) => {
        // 请求参数
        let payloads = {
            title: title,
            content: content,
        }

        return apibasics.post('/record/save', payloads, '保存记录');
    },

    /**
     * 编辑记录
     */
    editRecord: (id, title, content) => {
        // 请求参数
        let payloads = {
            id: parseInt(id, 10),    // 后面的参数是 10进制的意思 保证是number
            title: title,
            content: content,
        }

        return apibasics.post('/record/edit', payloads, '编辑记录');
    },

    /**
     * 删除记录
     */
    deleteRecord: id => {
        // 请求参数
        let payloads = {
            id: parseInt(id, 10),    // 保证是number
        }

        return apibasics.post('/record/delete', payloads, '删除记录');
    },
}
