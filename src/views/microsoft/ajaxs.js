/**
 * 微软用的 get 请求
 */
export function apibasicsget(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            contentType: 'application/json; charset=utf-8',
            Authorization: window.sessionStorage.microsoft_access_token
        },
    }).then(
        response => response.json(),
        error => ({result: 0, message: error})
    );
}

/**
 * 微软用的 get 请求
 */
export function apibasicsgethtml(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            contentType: 'application/json; charset=utf-8',
            Authorization: window.sessionStorage.microsoft_access_token
        },
    }).then(
        response => response.text(),
        error => error.text(),
    );
}

/**
 * 微软用的 post 请求(暂时没用上)
 */
// export function apibasicspost() {
// }
