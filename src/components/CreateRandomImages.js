/**
 * 请求失败
 * @param {number} id 图片的id 
 * @param {number} width 图片的宽度
 * @param {number} height 图片的高度
 * @return {string} 失败封装的结果
 */
const CreateRandomImages = (id, width, height) => {
    let random = id ? id : Math.floor(Math.random() * 70); // 目前有70张

    if (width && height) {
        return {
            id: random,
            url: `http://p6ygud9kn.bkt.clouddn.com/myweb/collection/mywallpaper%20%28${random}%29.jpg?imageView2/1/w/${width}/h/${height}/q/100|imageslim`
        };
    } else {
        return {
            id: random,
            url: `http://p6ygud9kn.bkt.clouddn.com/myweb/collection/mywallpaper%20%28${random}%29.jpg`
        };
    }
}

export default CreateRandomImages;
