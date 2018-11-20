// 组件
import apibasics from "../../components/apibasics";

export default {
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

    /**
     * 删除记录
     */
    deleteRecord: (self, id, year) => {
        // 请求参数
        let payloads = {
            id: parseInt(id, 10),    // 保证是number
            year: parseInt(year, 10) // 保证是number
        }

        return apibasics.post('/record/delete', payloads, self, '删除记录');
    },
}
