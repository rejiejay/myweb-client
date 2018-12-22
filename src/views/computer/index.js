// 框架类
import React, { Component } from 'react';
// 组件类
import NavHeard from './NavHeard/index';
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
            <React.Fragment>
                <NavHeard></NavHeard>
            </React.Fragment>
        )
    }
}

export default computer;
