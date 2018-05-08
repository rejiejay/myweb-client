import basrFetch from './../utils/basrFetch';

const ajaxs = {
    getDynamicByList: function() {
        return basrFetch.get('/dynamic/getbylist', '动态信息列表');
    }
}

export default ajaxs;
