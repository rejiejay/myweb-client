// 框架类
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
// 组件类
import ReusemeHeader from './reuseme-header';
import loadPageVar from './../../utils/loadPageVar';
// 样式类
import './details.scss';
// 初始化
let clientWidth = document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth;
let clientHeight = document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight;
// 简历键值对数据
let reusemekeyvaldata = {

}

class details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                // {
                //     title: '',
                //     content: '',
                // },
            ],
        };
    }

    /**
     * 组件加载完毕之后立即执行
     */
    componentDidMount() {
        // 初始化简历数据的“键(key)”值
        let datakeyName = loadPageVar('id');

        if (datakeyName) {
            // 初始化页面数据
            let pageData = reusemekeyvaldata[datakeyName];
    
            // 复制进 state 里
            if (pageData) {
                this.setState({
                    list: pageData
                });
            }
        }
    }

    render() {
        
        return (
            <React.Fragment>
                <ReusemeHeader title="作品详情" />

                <div className="resume-details" style={{minHeight: `${clientHeight - 50}px`}}>
                
                    {this.state.list.map((item, key) => (
                        <div className="resume-details-item" key={key}>
                            <div className="details-item-container">
                                <div className="details-item-title">{item.title}</div>
                                <div className="details-item-main ReactMarkdown">
                                    <ReactMarkdown source={item.content} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        )
    }
}

export default details;
