/**
 * 英语列表页
 */
// 框架类
import React, { Component } from 'react';

// 样式类
import './recite.scss';

// 请求类
import ajaxs from './../../api/english/index';

// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;

class english extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }
    
    componentWillUnmount() {
    }


    render() {
        return (
            <React.Fragment>
                <div>1</div>
            </React.Fragment>
        );
    }
}

export default english;
