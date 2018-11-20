/**
 * 首页 PC端口 与 手机端 相同的部分
 */
// 框架类
import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
// 组件类
import { Pagination, Icon, Toast } from 'antd-mobile';
import './list.less';
// 请求类
import ajaxs from './../../api/english/list';
// 初始化

class english extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagenum: 1, // 页码
            pageCount: 0, // 一共有多少数据

            list: [
                // {
                //     id: '', // 唯一标识
                //     en_text : '', // 英文
                //     zh_text: '', // 中文
                //     creat_timestamp : '', // 时间戳
                // }
            ]
        };
    }

    componentDidMount() {
        this.getListBy(); // 获取页面数据
    }

    /**
     * 获取页面数据
     */
    getListBy() {
        const _this = this;

        ajaxs.getList(this.state.pagenum)
        .then(
            res => {
                _this.setState({
                    pageCount: (res && res.count) ? res.count : 1,
                    list: (res && res.list) ? res.list.map(val => {
                        val.isZh = false; // 是否中文
                        val.isEdit = false; // 是否编辑
                        return val;
                    }) : [],
                });
            }, error => {
                alert(error);
            }
        );
    }

    /**
     * 列表 内容
     */
    renderList() {
        const _this = this;

        /**
         * 切换中英文
         * @param {number} key 对应下标 
         */
        let switcherZHEN = key => {
            let newList = JSON.parse(JSON.stringify(_this.state.list));

            newList[key].isZh = !_this.state.list[key].isZh;

            _this.setState({
                list: newList
            });
        }

        /**
         * 切换为编辑状态
         * @param {number} key 对应下标 
         */
        let switcherisEdit = key => {
            let newList = JSON.parse(JSON.stringify(_this.state.list));

            newList[key].isEdit = !_this.state.list[key].isEdit;

            _this.setState({
                list: newList
            });
        }

        /**
         * 修改编辑的 处理函数
         * @param {string} val 修改内容
         * @param {number} key 数组的下标
         * @param {string} type 判断是输入英语还是输入中文 
         */
        let handleChange = (val, key, type) => {
            let newList = JSON.parse(JSON.stringify(_this.state.list));

            if (type === 'en_text') {
                newList[key].en_text = val;

            } else {
                newList[key].zh_text = val;

            }

            _this.setState({
                list: newList
            });
        }

        /**
         * 将单词转换问音频输出
         * @param {number} key 数组的下标
         */
        let text2audio = key => {
            let item = _this.state.list[key];

            /**
             * 调用百度 api 的方法
             * 这个方法在哪调用的？
             * 是在 models index 那个页面初始化的
             */
            let vid = document.getElementById('myVideo');
            vid.innerHTML = `<audio type="audio/mp3" src="http://tsn.baidu.com/text2audio?tex=${item.en_text}&lan=zh&cuid=15976713287&ctp=1&tok=${window.localStorage.getItem('baidu_text2audio_access_token')}" controls="controls" autoplay="autoplay"></audio>`;
        }

        /**
         * 提交 编辑操作 请求
         * @param {number} key 数组的下标
         */
        let affirmEdit = key => {
            let request = _this.state.list[key];

            ajaxs.edit(request.id, request.en_text, request.zh_text, this)
            .then(
                () => {
                    _this.getListBy();
                }, error => {
                    alert(error);
                }
            );
        }

        /**
         * 提交 删除操作 请求
         * @param {number} key 数组的下标
         */
        let affirmDel = key => {
            let request = _this.state.list[key];

            if (window.confirm('你确定要删除吗?')) {
                ajaxs.del(request.id, this)
                .then(
                    () => {
                        Toast.info('删除成功!', 1.5, _this.getListBy.bind(_this));
                    }, error => {
                        alert(error);
                    }
                );
            }
        }

        /**
         * 渲染展示页
         */
        let renderShow = (val, key) => {
            return (
                <div className="english-item-container">
                    <div className="english-item-text" onClick={() => switcherZHEN(key)}>{ val.isZh ? val.zh_text : val.en_text }</div>
                    <div className="english-item-operation flex-start">
                        <div className="item-operation-rest flex-rest" onClick={() => switcherZHEN(key)}></div>
                        <div className="operation-container-item" onClick={() => text2audio(key)}>阅读</div>
                        <div className="operation-container-item" onClick={() => switcherisEdit(key)}>编辑</div>
                        <div className="operation-container-item" onClick={() => affirmDel(key)}>删除</div>
                    </div>
                </div>
            )
        }

        /**
         * 渲染编辑页
         */
        let renderEdit = (val, key) => {
            return (
                <div className="english-item-container flex-start-center">
                    <div className="english-item-input flex-rest">
                        <div><input type="text" value={val.en_text} onChange={event => handleChange(event.target.value, key, 'en_text')} /></div>
                        <div><input type="text" value={val.zh_text} onChange={event => handleChange(event.target.value, key, 'zh_text')} /></div>
                    </div>
                    <div className="english-operate-edit">
                        <div className="english-affirm-edit" onClick={() => affirmEdit(key)}>提交</div>
                        <div className="english-cancel-edit" onClick={() => switcherisEdit(key)}>取消</div>
                    </div>
                    
                </div>
            )
        }

        return (
            <div className="english-list">
                {this.state.list.map((val, key) => (
                    <div key={key} className="english-item">
                        {/* 判断是否编辑 */}
                        { val.isEdit ? renderEdit(val, key) : renderShow(val, key) }
                    </div>
                ))}
            </div>
        )
    }

    /**
     * 底部分页 内容
     */
    renderPagination() {
        const _this = this;
        /**
         * 页面切换的方法
         * @param {number} num 页码 
         */
        let pageSwitcher = num => {
            _this.setState({
                pagenum: num,
            }, _this.getListBy);
        }

        return (
            <div className="pagination-container flex-center">
                <Pagination total={Math.ceil(this.state.pageCount / 10)}
                    className="custom-pagination-with-icon"
                    current={this.state.pagenum}
                    onChange={pageSwitcher}
                    locale={{
                        prevText: (<span className="arrow-align flex-start-center"><Icon type="left" />上一步</span>),
                        nextText: (<span className="arrow-align flex-start-center">下一步<Icon type="right" /></span>),
                    }}
                />
            </div>
        )
    }

    render() {
        const _this = this;

        /**
         * 点击随机获取列表数据的烦恼歌发
         */
        let goRandom = () => {
            ajaxs.getrandom()
            .then(
                res => {
                    _this.setState({
                        pagenum: 1,
                        list: res ? res.map(val => {
                            val.isZh = false; // 是否中文
                            val.isEdit = false; // 是否编辑
                            return val;
                        }) : [],
                    });
                }, error => {
                    alert(error);
                }
            )
        }

        return (
            <div className="english">
            
                {/* 这个用于 baidu 发音 的 api */}
                <div id='myVideo' className='English-audio'>
                    {/* <audio type="audio/mp3" src="http://tsn.baidu.com/text2audio?tex=value&lan=zh&cuid=15976713287&ctp=1&tok=24.b53eed642f92ed8bc4c21d61969ecf8e.2592000.1520344527.282335-10792466"  autoPlay={true} id='myVideo' controls="controls" autoPlay={true}></audio> */}
                </div>

                {/* 新增 */}
                <div className="top-operation flex-start">
                    <div className="english-add" onClick={() => this.jumpToRouter('/english/add')}>新增</div>
                    <div className="english-out-of-order" onClick={goRandom}>随机查询</div>
                </div>

                {/* 列表 */}
                {this.renderList()}

                {/* 分页器 */}
                {this.renderPagination()}
            </div>
        );
    }

    /**
     * 跳转到路由
     * @param {object} query 携带的参数 非必填
     */
    jumpToRouter(url, query) {
        let routerConfig = {
            pathname: url,
        }

        query ? routerConfig.query = query : null; // 初始化携带的参数 非必填

        this.props.dispatch(routerRedux.push(routerConfig));
    }
}

const mapStateToProps = (state) => ({
    user_islogin: state.user.isLogin,
});

export default connect(mapStateToProps)(english);
