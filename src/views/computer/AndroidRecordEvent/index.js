// 框架类
import React, { Component } from 'react';
// 样式类
import './index.scss';

class AndroidRecordEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageType: "record", // record event

            inputRecordTitle: "",
        }
    }

    /**
     * 组件加载完毕之后立即执行
     */
    componentDidMount() { }

    render() {
        const myRender = (
            <div className="computer-main-android">
                {this.renderInput.call(this) /** 渲染 导航栏部分 */}
            </div>
        );

        return this.props.navBarSelected === "android" ? myRender : "";
    }

    // 渲染输入部分
    renderInput() {
        const _this = this;
        const pageType = this.state.pageType;
        function editSwitcher() {
            if (pageType === "record") {
                _this.setState({ pageType: "event" });
            } else {
                _this.setState({ pageType: "record" });
            }
        }

        return (
            <div className="android-input">
                <div className="android-input-title flex-start-center">
                    <div className="title-left flex-rest">
                        {pageType}
                    </div>
                    <div className="add-top-btn" onClick={() => editSwitcher()}>切换</div>
                </div>

                {this.renderInputByRecord.call(this)}
                {this.renderInputByEvent.call(this)}
            </div>
        );
    }

    // 输入 记录
    renderInputByRecord() {
        const _this = this;
        const inputRecordTitle = this.state.inputRecordTitle;
        const inputRecordContent = this.state.inputRecordContent;

        const inputTitleHandle = event => _this.setState({ inputRecordTitle: event.target.value });
        const inputContentHandle = event => _this.setState({ inputRecordContent: event.target.value });

        const myRender = (
            <div className="android-input-record">

                <div className="record-add-title flex-start">
                    <input className="flex-rest"
                        value={inputRecordTitle}
                        onChange={inputTitleHandle}
                        placeholder="Input you record title..."
                    />
                </div>

                <div className="record-add-content flex-start">
                    <textarea className="flex-rest"
                        value={inputRecordContent}
                        onChange={inputContentHandle}
                        placeholder="Input you record content..."
                    />
                </div>

            </div>
        );

        return this.state.pageType === "record" ? myRender : "";
    }

    // 输入 事件
    renderInputByEvent() {
        const myRender = (
            <div className="android-input-event">

            </div>
        );

        return this.state.pageType === "event" ? myRender : "";
    }
}

export default AndroidRecordEvent;
