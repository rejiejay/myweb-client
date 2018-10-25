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

        ajaxs.getList(this.state.pagenum)
        .then(
            res => {
                if (res.list && res.count) {
                    _this.setState({
                        isZh: false, // 是否中文
                        pageCount: res.count,
                        list: res.list
                    });
                } else {
                    alert(`数据有误`);
                }
            }, error => {
                alert(error);
            }
        )
    }

    /**
     * 分页器
     */
    renderPagination() {
        return (
            <div className="pagination-container flex-start-center">
                <Pagination total={5}
                    className="custom-pagination-with-icon"
                    current={1}
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

        return (
            <div className="english">
                {/* 列表 */}
                <div className="english-list">
                    {this.state.list.map((val, key) => (
                        <div key={key} className="english-item flex-start-center">
                            <div className="english-item-left flex-rest" onClick={() => switcherZHEN(key)}>{ val.isZh ? val.zh_text : val.en_text }</div>
                            <div className="english-item-right">删除</div>
                        </div>
                    ))}
                </div>

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
