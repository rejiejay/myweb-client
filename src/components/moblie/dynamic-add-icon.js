import React, {Component} from 'react';
import { connect } from 'dva';

import './dynamic-add-icon.less';

// 底部组件
class AddDynamic extends Component {
  render() {
    return (
      <div 
        className="dynamic-add-icon"
        onClick={this.props.clickCallBack}
      >
        <img alt="add-svg" src="http://p6ygud9kn.bkt.clouddn.com/myweb/icon/add.png?imageView2/1/w/96/h/96/q/75|imageslim" />
      </div>
    )
  }
}

export default connect()(AddDynamic);
