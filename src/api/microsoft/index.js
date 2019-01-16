// 组件
import apibasics from "./../../components/apibasics";

// 获取token
export function getToken() {
    // 请求参数
    let payloads = {}

    return apibasics.post('/microsoft/token', payloads, '获取token');
}
