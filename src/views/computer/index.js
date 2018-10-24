// 框架类
import React, { Component } from 'react';
import { connect } from 'dva';
// 组件类
import HomePcMobile from './../common/home';
// 样式类
import './index.less';

class computer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="computer">
                <HomePcMobile />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(computer);
