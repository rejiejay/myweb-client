// 框架类
import React, {Component} from 'react';
import E from 'wangeditor';
// 样式类
import './index.scss';

class ReactWangEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        const _this = this;

        // 创建编辑器
        let editor = new E('#editor');
        
        editor.customConfig.onchange = function (html) {
                
            if (_this.props.edit_onchange) {
                _this.props.edit_onchange(html);
            }
        }

        editor.create();

        // 判断有没有初始化的值
        if (this.props.edit_html) {
            editor.txt.html(this.props.edit_html);
        }
    }
  
    render() {

        return (
            <div className="rejiejay-editor">
                <div id='editor'></div>
            </div>
        );
    }
}

export default ReactWangEditor;
