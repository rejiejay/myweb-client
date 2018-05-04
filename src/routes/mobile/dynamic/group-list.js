import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { 
  NavBar, Icon, Modal, 
} from 'antd-mobile';

import './index.less';

class DynamicGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // 渲染顶部的导航栏
  renderNavBar() {
    const ellipsisHandle = () => {
      Modal.operation([
        { text: '添加分组', onPress: () => {} },
        { text: '删除分组', onPress: () => {} },
        { text: '重名分组', onPress: () => {} }
      ]);
    }

    return (
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.dispatch(routerRedux.push('/mobile/index'))}
        rightContent={[
          <Icon 
            key="search"
            type="search" 
            style={{ marginRight: '16px' }}
          />,
          <Icon 
            key="ellipsis"
            onClick={ellipsisHandle}
            type="ellipsis" 
          />,
        ]}
      >动态分组</NavBar>
    )
  }

  // 渲染主要内容
  renderGroup() {

    return (
      <div className="group-main">
        {this.props.dynamicGroup.map((val, key) => (
          <div className="group-item" key={key}>

          </div>
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="dynamic-group">
        {this.renderNavBar()}

        {this.renderGroup()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dynamicGroup: state.dynamic.group,
})

export default connect(mapStateToProps)(DynamicGroup);
