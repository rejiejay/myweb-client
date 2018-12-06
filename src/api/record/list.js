// 组件
import apibasics from "./../../components/apibasics";

export default {
    /**
     * 获取 列表数据
     * @param {number} pagenum 多少页
     */
    getList: pagenum => apibasics.get(`/record/get/list?pagenum=${pagenum}`, '列表数据'),
    
    /**
     * 保存记录
     */
    saveRecord: (self, title, content) => {
        // 请求参数
        let payloads = {
            title: title,
            content: content,
        }

        return apibasics.post('/record/save', payloads, self, '保存记录');
    },

    /**
     * 编辑记录
     */
    editRecord: (self, id, year, title, content) => {
        // 请求参数
        let payloads = {
            id: parseInt(id, 10),    // 保证是number
            year: parseInt(year, 10),// 保证是number
            title: title,
            content: content,
        }

        return apibasics.post('/record/edit', payloads, self, '编辑记录');
    },
}
