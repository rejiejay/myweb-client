import React, { Component } from 'react';

class AndroidRecordEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * 组件加载完毕之后立即执行
     */
    componentDidMount() {}

    render() {
        const myRender = (
            <div className="computer-main-android">
                
            </div>
        );

        if (this.props.navBarSelected === 'android') {
            return myRender;
        } else {
            return "";
        }
    }
}

export default AndroidRecordEvent;
