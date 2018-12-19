// 框架类
import React, { Component } from 'react';
// 样式类
import './reuseme-header.scss';

class ReusemeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        
        return (
            <div className="reuseme-header flex-start-center">
                <div className="reuseme-header-left" onClick={() => window.history.back()}>
                    <svg width="20" height="20" t="1545222261135" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1018" >
                        <path d="M532.526499 904.817574L139.506311 511.797385 532.526499 118.777197c12.258185-12.258185 12.432147-32.892131-0.187265-45.51052-12.707416-12.707416-32.995485-12.703323-45.511543-0.187265L75.166957 484.739123c-7.120165 7.120165-10.163477 17.065677-8.990768 26.624381-1.500167 9.755178 1.5104 20.010753 8.990768 27.491121l411.660734 411.660734c12.258185 12.258185 32.892131 12.432147 45.511543-0.187265 12.707416-12.707416 12.7023-32.995485 0.187265-45.51052z" p-id="1019" fill="#FF3333"></path>
                    </svg>
                </div>
                <div className="reuseme-header-mian flex-rest">{this.props.title}</div>
                <div className="reuseme-header-right">
                    <svg width="24" height="24" t="1545222015731" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1993">
                        <path d="M258.402 440.997c39.213 0 71.008 31.793 71.008 71.004s-31.793 71.004-71.008 71.004c-39.213 0-71.008-31.793-71.008-71.004s31.795-71.004 71.008-71.004z" p-id="1994" fill="#FF3333"></path>
                        <path d="M511.999 440.997c39.213 0 71.008 31.793 71.008 71.004s-31.793 71.004-71.008 71.004c-39.213 0-71.008-31.793-71.008-71.004s31.795-71.004 71.008-71.004z" p-id="1995" fill="#FF3333"></path>
                        <path d="M765.596 440.997c39.213 0 71.008 31.793 71.008 71.004s-31.793 71.004-71.008 71.004c-39.212 0-71.008-31.793-71.008-71.004s31.795-71.004 71.008-71.004z" p-id="1996" fill="#FF3333"></path>
                    </svg>
                </div>
            </div>
        )
    }
}

export default ReusemeHeader;
