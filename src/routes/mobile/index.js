import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import { 
  Modal, Drawer, List,
  Icon
} from 'antd-mobile';

import MobileHome from './home.js';
import convertTime from './../../utils/convertTime.js';
import svg_add from './../../assets/add.svg';

const clientWidth = document.documentElement.clientWidth || window.innerWidth || window.screen.width;

class mobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSidebarOpen: false,
      selectedTabs: 'home', // home dynamic group
      sortMode: '时间↓'
    };
  }

  // 侧边栏
  SidebarHandle() {
    this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
  }

  // 首页 - 分页
  renderHome() {
    if (this.state.selectedTabs === 'home') {
      return (
        <div className="mobile-home">
 
          <div className="home-header">
            <div className="header-name">个人动态</div>
            <div 
              className="header-label"
              onClick={this.SidebarHandle.bind(this)}
            >
              <span>查看更多</span>
              <Icon type='right' />
            </div>
          </div>
 
          <div className="home-redirect">
            <div className="redirect-content">
              {this.props.otherPages.map((val, key) => (
                <div key={key}
                  onClick={() => window.location.href=val.url}
                >{val.name}</div>
              ))}
            </div>
          </div>
          <MobileHome/>
        </div>
      )
    }
  }

  // 动态 - 分页
  renderDynamic() {
    const _this = this;
    const selectedTabState = this.state.selectedTabs;
    const sortList = {
      timeUp: '时间↑',
      timeDowm: '时间↓',
      approval: '赞同',
      shuffle: '乱序',
    };

    let sortordHandle = (sortord) => {
      _this.setState({
        sortMode: sortList[sortord]
      });
    }

    let dynamicHandle = () => {
      if (selectedTabState === 'dynamic') {
        Modal.operation([
          { text: '按照最久远时间↑', onPress: () => sortordHandle('timeUp') },
          { text: '按照最新时间↓', onPress: () => sortordHandle('timeDowm') },
          { text: '按照赞同量', onPress: () => sortordHandle('approval') },
          { text: '乱序', onPress: () => sortordHandle('shuffle') },
        ]);
      } else {
        _this.setState({selectedTabs: 'dynamic'});
      }
    }

    if (this.state.selectedTabs === 'dynamic') {
      return (
        <div className="mobile-dynamic">
          <div className="dynamic-header">
            <div className="header-name">100/100 条动态</div>
            <div 
              className="header-label"
              onClick={dynamicHandle}
            >
              <span>按照{this.state.sortMode}排序</span>
              <Icon type='down' />
            </div>
          </div>

          {this.props.dynamicList.map((val, key) => (
            <div className="dynamic-item" key={key}>
              {key === 0 ? <div className="dynamic-line"/> : null}
              <div className="dynamic-contained">
                <div className="dynamic-title">{val.title}</div>
                <div 
                  className={val.content.length > 90 ? "dynamic-content dynamic-ellipsis" : "dynamic-content"}
                  >{val.content}</div>
                <div className="dynamic-other">
                  <div>
                    {val.read} 阅读
                    <span>·</span>
                    {val.read} 赞同
                    <span>·</span>
                    {convertTime.dateToYYYYmmDDhhMM(new Date(val.time))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    }
  }

  // 分组 - 分页
  renderGroup() {
    const groupWidth = (clientWidth - (15 * 3) - 4) / 2;

    const renderChildren = children => {
      let childrenCount = children.length;

      if (childrenCount > 0) {
        let renderItem = [];
        childrenCount = childrenCount >= 3 ? 3 : childrenCount;

        for (let i = 0; i < childrenCount; i++) {
          renderItem.push(
            <div key={i}
              className="group-children"
            >{children[i].title}</div>
          )
        }

        return renderItem
      } else {
        return <div className="group-children">暂无内容</div>
      }
    }

    if (this.state.selectedTabs === 'group') {
      return (
        <div className="mobile-group">
          <div className="group-header">
            <div className="header-name">动态分组</div>
            <div 
              className="header-label"
              onClick={() => this.props.dispatch(routerRedux.push('/mobile/dynamic/edit'))}
            >
              <span>查看详情</span>
              <Icon type='right' />
            </div>
          </div>

          <div className="group-list">
            {this.props.dynamicGroup.map((val, key) => (
              <div key={key}
                className="group-item"
                style={{width: `${groupWidth}px`}}
              >
                <div className="item-content">
                  <div className="group-title">{val.name}</div>
                  {renderChildren(val.children)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  // 顶部分页栏
  renderTabs() {
    const _this = this;
    const selectedTabState = this.state.selectedTabs;

    let changeTabs = (selectedTabs) => {
      _this.setState({selectedTabs: selectedTabs});
    }

    return (
      <div className="mobile-tabs">
        <div 
          className={selectedTabState === 'home'? 'isActivated' : ''}
          onClick={() => changeTabs('home')}
        ><span>主页</span></div>
        <div
          className={selectedTabState === 'dynamic'? 'isActivated' : ''}
          onClick={() => changeTabs('dynamic')}
        ><span>动态</span></div>
        <div 
          className={selectedTabState === 'group'? 'isActivated' : ''}
          onClick={() => changeTabs('group')}
        ><span>分组</span></div>
      </div>
    )
  }

  render() {
    const _this = this;
    const selectedTabs = this.state.selectedTabs;

    const sidebar = (
      <List>{this.props.otherPages.map((val, index) => (
        <List.Item 
          key={index}
          onClick={() => window.location.href=val.url}
        >{val.name}</List.Item>
      ))}</List>
    );

    const addDynamic = () => {
      if (selectedTabs === 'group') {
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/group'));
      } else {
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/edit'));
      }
    }

    return (
      <div className="mobile">
        <Drawer
          className="my-drawer"
          style={{ minHeight: document.documentElement.clientHeight }}
          enableDragHandle
          sidebar={sidebar}
          open={this.state.isSidebarOpen}
          onOpenChange={this.SidebarHandle.bind(this)}
        >
          {this.renderTabs()}

          {this.renderHome()}
          {this.renderDynamic()}
          {this.renderGroup()}

          <div 
            className="mobile-addDynamic"
            onClick={addDynamic}
          >
            <img alt="add-svg" src={svg_add} />
          </div>

          <div className="mobile-bottom">
            <div className="bottom-describe">粤ICP备17119404号 Copyright © Rejiejay曾杰杰</div>
          </div>
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  otherPages: state.index.otherPages,
  dynamicList: state.dynamic.list,
  dynamicGroup: state.dynamic.group,
})

export default connect(mapStateToProps)(mobile);
