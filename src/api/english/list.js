// 组件
import apibasics from "./../../components/apibasics";

export default {
    /**
     * 获取 列表数据
     * @param {number} pagenum 多少页
     */
    getList: pagenum => apibasics.get(`/english/get/list?pagenum=${pagenum}`, '列表数据'),
}
