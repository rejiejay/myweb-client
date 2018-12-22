// 框架类
import React, { Component } from 'react';
// 样式类
import './index.scss';

/**
 * PC端的头部 因为这个一定 是 多页面复用的
 */
class Copyright extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="copyright-component">
                <div className="copyright-describe">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div>
            </div>
        );
    }
}

export default Copyright;
