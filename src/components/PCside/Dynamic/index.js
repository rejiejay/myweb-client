import React, {Component} from 'react';
import { connect } from 'dva';
import shuffle from 'shuffle-array';

import DynamicItem from './DynamicItem';
import config from './../../../config';
import quickSortBy from './../../../utils/quickSortBy.js';

class Dynamic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      isSubmiting: false,

      showDynamicNum: 5,
      dynamicData: [
        // {
        //   '_id': '59d0aa8a9d53b82a4cdff15d',
        //   'isDelete': false,
        //   'date': 1506847370000,
        //   'title': '标题',
        //   'content': '内容',
        //   'thoughtsCount': 0,
        //   'thoughtsIsSelected': false,
        //   'upvote': 0,
        //   'upvoteIsSelected': false
        // }
      ],

      sortType: 'date', // thoughtsCount upvote random
      sortByTimeIsOld: false
    }

    this.increaseShowNum = 5;
    this.loadType = 'new'; // new old random
  }

  componentWillMount() {
    let _this = this;

    getDynamicByTime()
      .then(
        function (response) {
          return response.json()
        }, function (error) {
          alert(`提交数据发生错误, 原因: ${error}`);
          return { 'result': 0, 'message': '' }
        }
      ).then(function (val) {
        if (val.result === 1) {
          _this.setState({dynamicData: dealWithDynamicData(val.data)});
        } else {
          if (val.message) { alert(`提交数据发生错误, 原因: ${val.message}`) }
        }
      });
  }

  submitData() {
    let _this = this,
      mytitle = this.state.title,
      myContent = this.state.content;
    
    if (this.state.isSubmiting) { return } 
    if (!myContent) {
      alert('提交的内容不能为空!');
      return
    }
    
    this.setState({isSubmiting: true});

    fetch(`${config.basicUrl}/dynamic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body:JSON.stringify({
        title: mytitle,
        content: myContent
      })
    }).then(
        function (response) {
          return response.json()
        }, function (error) {
          _this.setState({isSubmiting: false});
          alert(`提交数据发生错误, 原因: ${error}`);

          return {
            'result': 0,
            'message': ''
          }
        }
      ).then(function (val) {
        if (val.result === 1) {
          _this.setState({
            title: '',
            content: '',
            isSubmiting: false
          });

          getDynamicByTime()
            .then(
              function (response) {
                return response.json()
              }, function (error) {
                alert(`提交数据发生错误, 原因: ${error}`);
                return { 'result': 0, 'message': '' }
              }
            ).then(function (val) {
              if (val.result === 1) {
                _this.setState({dynamicData: dealWithDynamicData(val.data)});
              } else {
                if (val.message) { alert(`提交数据发生错误, 原因: ${val.message}`) }
              }
            });
          alert('成功');
        } else {
          if (val.message) { alert(`提交数据发生错误, 原因: ${val.message}`) }
          _this.setState({isSubmiting: false});
        }
      });

  }

  loadNew() {
    let _this = this;

    if (this.loadType === 'new') { return }
    this.loadType = 'new';

    getDynamicByTime('new')
      .then(
        function (response) {
          return response.json()
        }, function (error) {
          alert(`提交数据发生错误, 原因: ${error}`);
          return { 'result': 0, 'message': '' }
        }
      ).then(function (val) {
        if (val.result === 1) {
          _this.setState({
            'sortType': 'date', 
            'sortByTimeIsOld': false,
            'showDynamicNum': 5,
            'dynamicData': dealWithDynamicData(val.data)
          });
          _this.increaseShowNum = 5;
        } else {
          if (val.message) { alert(`提交数据发生错误, 原因: ${val.message}`) }
        }
      });
  }

  loadOld() {
    let _this = this;

    if (this.loadType === 'old') { return }
    this.loadType = 'old';

    getDynamicByTime('old')
      .then(
        function (response) {
          return response.json()
        }, function (error) {
          alert(`提交数据发生错误, 原因: ${error}`);
          return { 'result': 0, 'message': '' }
        }
      ).then(function (val) {
        if (val.result === 1) {
          _this.setState({
            'sortType': 'date', 
            'sortByTimeIsOld': false,
            'showDynamicNum': 5,
            'dynamicData': dealWithDynamicData(val.data)
          });
          _this.increaseShowNum = 5;
        } else {
          if (val.message) { alert(`提交数据发生错误, 原因: ${val.message}`) }
        }
      });
  }

  loadRandom() {
    let _this = this;

    this.loadType = 'random';

    getDynamicByRandom()
      .then(
        function (response) {
          return response.json()
        }, function (error) {
          alert(`提交数据发生错误, 原因: ${error}`);
          return { 'result': 0, 'message': '' }
        }
      ).then(function (val) {
        if (val.result === 1) {
          _this.setState({
            'sortType': 'date', 
            'sortByTimeIsOld': false,
            'showDynamicNum': 5,
            'dynamicData': dealWithDynamicData(val.data)
          });
          _this.increaseShowNum = 5;
        } else {
          if (val.message) { alert(`提交数据发生错误, 原因: ${val.message}`) }
        }
      });
  }

  sortBy(sortType) {
    let mydynamicList = [],
      dynamicData = this.state.dynamicData,
      mysortType = this.state.sortType,
      sortByTimeIsOld = this.state.sortByTimeIsOld;

    // 从其他的排序 转移到 日期排序
    if (sortType === 'date' && mysortType !== 'date') {
      if (sortByTimeIsOld) {
        mydynamicList = quickSortBy(dynamicData, 'date', true);
      } else {
        mydynamicList = quickSortBy(dynamicData, 'date');
      }
      this.setState({
        'sortType': 'date',
        'dynamicData': mydynamicList
      });
    }

    // 重复点击 日期排序
    if (sortType === 'date' && mysortType === 'date') {
      let sortIsOld
      // 如果日期是从古老到现代, 那么应该转换为 日期从现代到古老
      if (sortByTimeIsOld) {
        sortIsOld = false;
        mydynamicList = quickSortBy(dynamicData, 'date');
      } else {
        sortIsOld = true;
        mydynamicList = quickSortBy(dynamicData, 'date', true);
      }
      this.setState({
        sortByTimeIsOld: sortIsOld,
        'sortType': 'date',
        'dynamicData': mydynamicList
      });
    }

    // 从其他的排序 转移到 需记排序
    if (sortType === 'thoughtsCount' && mysortType !== 'thoughtsCount') {
      mydynamicList = quickSortBy(dynamicData, 'thoughtsCount');
      this.setState({
        'sortByTimeIsOld': false,
        'sortType': 'thoughtsCount',
        'dynamicData': mydynamicList
      });
    }

    // 从其他的排序 转移到 点赞排序
    if (sortType === 'upvote' && mysortType !== 'upvote') {
      mydynamicList = quickSortBy(dynamicData, 'upvote');
      this.setState({
        'sortByTimeIsOld': false,
        'sortType': 'upvote',
        'dynamicData': mydynamicList
      });
    }
  }

  sortByRandom() {
    let mydynamicList = [],
      dynamicData = this.state.dynamicData;

    mydynamicList = shuffle(dynamicData);
    this.setState({
      'sortByTimeIsOld': false,
      'sortType': 'random',
      'dynamicData': mydynamicList
    });
  }

  showMore() {
    let myNum = this.state.showDynamicNum + this.increaseShowNum,
      myLength = this.state.dynamicData.length,
      showDynamicNum = this.state.showDynamicNum;

    if (showDynamicNum === myLength) { return }

    if (myNum > myLength) {
      myNum = myLength;
    }

    this.increaseShowNum += 2;
    this.setState({showDynamicNum: myNum});
  }

  renderSubmitBtn() {
    let _this = this,
    isSubmiting = this.state.isSubmiting;

    if (isSubmiting) {
      return <div
        className='publish-submiting'
      >正在发布...</div>;
    } else {
      return <div
        onClick={_this.submitData.bind(_this)}
        className='publish-submit'
      >发布</div>;
    } 
  }

  renderDynamicList() {
    let _this = this,
      myList = [],
      dataList = this.state.dynamicData,
      ListNum = this.state.showDynamicNum;
  
    if (dataList.length === 0) {
      return <div>暂无数据</div>
    }
    
    if (ListNum > dataList.length) {
      ListNum = dataList.length;
    }
  
    for (let i = 0; i < ListNum; i++) {
      myList.push(
        <DynamicItem
          key={i}
          id={i}
          updateState={(itemState, id) => {
            let myDynamicData = _this.state.dynamicData.slice(0);

            myDynamicData[id] = itemState;
            _this.setState({dynamicData: myDynamicData});
          }}
          data={dataList[i]}
        />
      )
    }
    return <div>{myList}</div>;
  }

  renderShowMore() {
    let allDynamicNum = this.state.dynamicData.length,
      showNum = this.state.showDynamicNum;

    if (allDynamicNum === showNum) {
      return <div></div>
    }

    return <div 
      className='dynamic-item-showMore'
      onClick={this.showMore.bind(this)}
    >显示更多</div>
  }

  render() {
    return (
      <div className='dynamic-main'>
        <div className='publish-main'>
          <h2>发布动态</h2>
          <div className='publish-content'>
            <div className='publish-title'>
              <input
                type="text"
                placeholder='请输入标题'
                value={this.state.title}
                onChange={function (event) {
                  this.setState({title: event.target.value})
                }.bind(this)}
              />
            </div>
            <div className='publish-textarea'>
              <textarea
                rows="3"
                cols="20"
                placeholder='请输入内容'
                value={this.state.content}
                onChange={function (event) {
                  this.setState({content: event.target.value})
                }.bind(this)}
              />
            </div>
            {this.renderSubmitBtn.call(this)}
          </div>
        </div>
        <div className='dynamic-list'>
          <h2>动态列表</h2>
          <div className='dynamic-operate'>
            <div className='dynamic-reload'>
              <h3>加载</h3>
              <DynamicButton
                isSelected={this.loadType === 'new'}
                canRepeat={false}
                buttonName={'按最新加载'}
                myClick={function () { this.loadNew.call(this) }.bind(this)}
              />
              <DynamicButton
                isSelected={this.loadType === 'random'}
                canRepeat={true}
                buttonName={'随机加载'}
                myClick={function () { this.loadRandom.call(this) }.bind(this)}
              />
              <DynamicButton
                isSelected={this.loadType === 'old'}
                canRepeat={false}
                buttonName={'按最久远加载'}
                myClick={function () { this.loadOld.call(this) }.bind(this)}
              />
            </div>
            <div className='dynamic-sort'>
              <h3>排序</h3>
              <DynamicButton
                isSelected={this.state.sortType === 'date'}
                canRepeat={true}
                buttonName={'时间'}
                myClick={function () { this.sortBy('date') }.bind(this)}
                pointer={(function () {
                  if (this.state.sortByTimeIsOld) {
                    return ' ↑'
                  } else {
                    return ' ↓'
                  }
                }.bind(this))()}
              />
              <DynamicButton
                isSelected={this.state.sortType === 'thoughtsCount'}
                canRepeat={false}
                buttonName={'需记'}
                myClick={function () { this.sortBy('thoughtsCount') }.bind(this)}
              />
              <DynamicButton
                isSelected={this.state.sortType === 'upvote'}
                canRepeat={false}
                buttonName={'赞'}
                myClick={function () { this.sortBy('upvote') }.bind(this)}
              />
              <DynamicButton
                isSelected={this.state.sortType === 'random'}
                canRepeat={true}
                buttonName={'乱序'}
                myClick={function () { this.sortByRandom.call(this) }.bind(this)}
              />
            </div>
          </div>
          {this.renderDynamicList.call(this)}
          {this.renderShowMore.call(this)}
        </div>
      </div>
    )
  }
}

let DynamicButton = ({isSelected, canRepeat, buttonName, myClick, pointer}) => {
  if (isSelected) {
    if (canRepeat) {
      return <div 
        onClick={myClick}
        className='dynamic-button-selected'
      >{buttonName}{pointer}</div>
    } else {
      return <div
        className='dynamic-button-selected'
      >{buttonName}{pointer}</div>
    }
  } else {
    return <div 
      onClick={myClick}
      className='dynamic-button'
    >{buttonName}{pointer}</div>
  }
};

let SubmitBtn = ({isSubmiting}) => (
  <button>{(() => { if (isSubmiting) { return '正在提交'; } else { return '提交'; } })()}</button>
);


let getDynamicByTime = (sequenceType) => {
  let sort = sequenceType || 'new';

  if (sort === 'old') {
    return fetch(`${config.basicUrl}/dynamic/getdata/sortbytime?sequence=old`, { method: 'GET' })
  }
  return fetch(`${config.basicUrl}/dynamic/getdata/sortbytime?sequence=new`, { method: 'GET' })
}

let getDynamicByRandom = () => {
    return fetch(`${config.basicUrl}/dynamic/getdata/sortbyrandom`, { method: 'GET' })
}


let dealWithDynamicData = (data) => {
  return data.map((val) => ({
    '_id': val._id,
    'isDelete': false,
    'date': val.date,
    'title': val.title,
    'content': val.content,
    'thoughtsCount': val.thoughtsCount,
    'thoughtsIsSelected': false,
    'upvote': val.upvote,
    'upvoteIsSelected': false
  }));
}

export default connect()(Dynamic);
