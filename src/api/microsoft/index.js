// 组件
import apibasics from "./../../components/apibasics";

/**
 * 获取token
 */
export function getToken() {
    // 请求参数
    let payloads = {}

    return apibasics.post('/microsoft/token', payloads, '获取token');
}

/**
 * 缓存所有页面
 * @param {array} allPages 所有页面
 */
export function storagePages(allPages) {
    // allPages: [
    //     {
    //         "contentUrl": "fdadadsd",
    //         "parentSectionId": "121222222222"
    //     }
    // ]

    // 请求参数
    let payloads = {
        allPages: allPages
    }

    return apibasics.post('/microsoft/pages/storage', payloads, '获取token');
}

/**
 * 查看缓存所有页面的状态
 * 400 表示 没有缓存状态
 * 233 表示 正在缓存
 * 1 表示 缓存已完成
 */
export function getStoragePagesStatus() {
    return apibasics.resget(`/microsoft/pages/status`, '查看缓存所有页面的状态');
}
