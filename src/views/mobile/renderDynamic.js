import { routerRedux } from 'dva/router';
import { Modal, Icon } from 'antd-mobile';
import DynamicList from './../../components/moblie/dynamic-list.js';

/**
 * 渲染 动态 - 分页
 * 数据来源于 redux dynamic
 */
let renderDynamic = function () {
    const _this = this;
    const selectedTabState = this.state.selectedTabs;
    const sortList = {
      timeUp: '时间↑',
      timeDowm: '时间↓',
      approval: '赞同',
      shuffle: '乱序',
    };

    let sortordHandle = sortord => {
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

    const jumpToGroupEdit = dynamic => { // 跳转到编辑页面
      _this.props.dispatch({             // 设置 选中的分组 id 以及编辑页面 和 预览页面
        type: 'dynamic/initEditPage',
        selectGroupId: dynamic.whichGroup.id,
        edit: dynamic,
        preview: {        // 预览页面
          title: dynamic.title,
          content: dynamic.content,
        },
      });

      if (_this.initSelectGroup(dynamic.whichGroup.id)) { // 如果成功过滤则 逐步跳转
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/group'));
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/group-list'));
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/preview'));
      } else { // 如果过滤失败则 直接跳转
        _this.props.dispatch(routerRedux.push('/mobile/dynamic/preview'));
      }
    }

    if (this.state.selectedTabs === 'dynamic') {
      return (
        <div className="mobile-dynamic">
          <div className="dynamic-header">
            <div className="header-name">{this.props.dynamicList.length}/{this.props.dynamicTotal} 条动态</div>
            <div 
              className="header-label"
              onClick={dynamicHandle}
            >
              <span>按照{this.state.sortMode}排序</span>
              <Icon type='down' />
            </div>
          </div>

          <DynamicList 
            data={this.props.dynamicList} 
            dynamicClick={dynamicItem => jumpToGroupEdit(dynamicItem)}
          />
        </div>
      )
    }
}

export default renderDynamic;
