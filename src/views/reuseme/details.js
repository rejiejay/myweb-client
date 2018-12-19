// 框架类
import React, { Component } from 'react';
// 组件类
import ReusemeHeader from './reuseme-header';
// 样式类
import './details.scss';

class details extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        
        return (
            <React.Fragment>
                <ReusemeHeader title="作品详情" />

                <div className="resume-details">
                </div>
            </React.Fragment>
        )
    }
}

export default details;
