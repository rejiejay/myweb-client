// 框架类
import React, {Component} from 'react';
import E from 'wangeditor';
// 样式类
import './index.scss';

class ReactWangEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: `editor${Math.floor(Math.random() * 100)}`
        }

        this.editor;
    }

    componentDidMount() {
        const _this = this;

        // 创建编辑器
        this.editor = new E(`#${this.state.id}`);
        
        this.editor.customConfig.onchange = function (html) {
                
            if (_this.props.edit_onchange) {
                _this.props.edit_onchange(html);
            }
        }

        this.editor.create();

        // 判断有没有初始化的值
        if (this.props.edit_html) {
            this.editor.txt.html(this.props.edit_html);
        }

        if (this.props.onRef) {
            this.props.onRef(this); // 通过父组件调用子组件的方法
        }
    }

    clearEdit() {
        this.editor.txt.html('');
    }
  
    render() {

        return (
            <div className="rejiejay-editor">
                <div className="rejiejay-editor-container" id={this.state.id}></div>
            </div>
        );
    }
}

export default ReactWangEditor;
