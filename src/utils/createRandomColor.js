/**
 * 生成随机颜色
 */
module.exports = function createRandomColor() {
    let stringArray = [
        '#409EFF',
        '#67C23A',
        '#E6A23C',
        '#F56C6C',
        '#909399',
        '#f5222d',
        '#fa541c',
        '#fa8c16',
        '#faad14',
        '#d4b106',
        '#a0d911',
        '#52c41a',
        '#13c2c2',
        '#1890ff',
        '#2f54eb',
        '#722ed1',
        '#eb2f96',
    ];
 
    let index = Math.round(Math.random() * (stringArray.length - 1)); // 随机下标

    return stringArray[index];
};

