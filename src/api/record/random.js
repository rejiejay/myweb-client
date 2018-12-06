// 组件
import apibasics from "./../../components/apibasics";

export default {
    /**
     * 获取一条记录
     */
    getOneByRandom: () => apibasics.get('/record/get/one', '获取记录'),
}
