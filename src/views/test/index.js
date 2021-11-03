// 框架类
import React, {Component} from 'react';
import E from 'wangeditor';
import ReactWangEditor from './../../components/ReactWangEditor';

class test extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        // 创建编辑器
        // this.editor = new E('#editor');
        // this.editor.create();
    }

    gethtml() {
        console.log(this.editor.txt.html())
        console.log(this.editor.txt.text())
    }

    getJSON() {
        console.log(this.editor.txt.getJSON())
        console.log(JSON.stringify(this.editor.txt.getJSON()))
    }
  
    render() {
        return (
            <div>
                <ReactWangEditor edit_html="123"/>

                {/* <div id='editor'></div>

                <div onClick={this.gethtml.bind(this)}>读取内容</div>
                <div onClick={this.getJSON.bind(this)}>获取 JSON 格式的内容</div> */}
            </div>
        );
    }
}

export default test;
