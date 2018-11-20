// 框架类
import React, { Component } from 'react';
// 组件类
import HomePcMobile from './../common/home';
// 样式类
import './index.scss';

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

export default computer;
