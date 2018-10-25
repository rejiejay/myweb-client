/**
 * 首页 PC端口 与 手机端 相同的部分
 */
// 框架类
import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
// 组件类
import { Pagination, Icon } from 'antd-mobile';
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
        const _this = this;

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

                if (res.list && res.count) {
                    _this.setState({
                        isZh: false, // 是否中文
                        isEdit: false, // 是否编辑
                        pageCount: res.count,
                        list: res.list
                    });
                } else {
                    alert(`数据有误`);
                }
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

            newList[key].isEdit = true;

            _this.setState({
                list: newList
            });
        }

        let handleChange = () => {

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
                        <div className="operation-container-item" onClick={() => switcherisEdit(key)}>编辑</div>
                        <div className="operation-container-item">删除</div>
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
                        <div><input type="text" value={val.en_text} onChange={handleChange} /></div>
                        <div><input type="text" value={val.zh_text} onChange={handleChange} /></div>
                    </div>
                    <div className="english-affirm-edit">提交</div>
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
        return (
            <div className="english">
                {/* 新增 */}
                <div className="english-add" onClick={() => this.jumpToRouter('/english/add')}>新增</div>

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
