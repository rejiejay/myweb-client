import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { 
  NavBar, Icon, Drawer,
  List 
} from 'antd-mobile';
// import convertTime from './../../../utils/convertTime.js';

class DynamicGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSidebarOpen: false,
    };
  }

  render() {
    const _this = this;
    const isSidebarOpen = this.state.isSidebarOpen;
    const sidebar = (
      <List>
        <List.Item 
          onClick={() => _this.props.dispatch(routerRedux.push('/mobile/index'))}
        >主页</List.Item>
        {this.props.otherPages.map((val, index) => (
          <List.Item 
            key={index}
            onClick={() => window.location.href=val.url}
          >{val.name}</List.Item>
        ))}
      </List>
    );
    
    const sidebarHandle = () => {
      _this.setState({ isSidebarOpen: !isSidebarOpen });
    }

    return (
      <div className="dynamic-group">
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          sidebar={sidebar}
          open={isSidebarOpen}
          onOpenChange={sidebarHandle}
        >
          <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.dispatch(routerRedux.push('/mobile/index'))}
            rightContent={[
              <Icon 
                type="search" 
                style={{ marginRight: '16px' }}
              />,
              <Icon 
                onClick={sidebarHandle}
                type="ellipsis" 
              />,
            ]}
          >动态分组</NavBar>

        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  otherPages: state.index.otherPages,
})

export default connect(mapStateToProps)(DynamicGroup);
