import React, {Component} from 'react';
import { connect } from 'dva';

import config from './../../../config';
import time from './../../../utils/time.js';
import quickSortBy from './../../../utils/quickSortBy.js';
import shuffle from './../../../utils/shuffle.js';

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
        //   'date': 1506847370000,
        //   'title': '标题',
        //   'content': '内容',
        //   'thoughtsCount': 0,
        //   'upvote': 0
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
          _this.setState({dynamicData: val.data});
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
            'dynamicData': val.data
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
            'dynamicData': val.data
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
            'dynamicData': val.data
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

  render() {
    return (
      <div className='PC-Main'>
        <h2>发布动态</h2>
        <div>
          <div>
            <h3>请输入标题</h3>
            <input type="text" value={this.state.title} onChange={function (event) { this.setState({title: event.target.value}) }.bind(this)} />
          </div>
          <div>
            <h3>请输入标题</h3>
            <textarea rows="3" cols="20" value={this.state.content} onChange={function (event) { this.setState({content: event.target.value}) }.bind(this)} />
          </div>
          <div onClick={this.submitData.bind(this)} >
            <SubmitBtn isSubmiting={this.state.isSubmiting} />
          </div>
        </div>
          <h2>动态列表</h2>
          <div>
            <h3>加载</h3>
            <button onClick={this.loadNew.bind(this)}>按最新加载</button>
            <button onClick={this.loadRandom.bind(this)}>随机加载</button>
            <button onClick={this.loadOld.bind(this)}>按最久远加载</button>
          </div>
          <div>
            <h3>排序</h3>
            <button onClick={function () { this.sortBy('date') }.bind(this)}>时间 {(function () { if (this.state.sortByTimeIsOld) { return '↑' } else { return '↓' } }.bind(this))()}</button>
            <button onClick={function () { this.sortBy('thoughtsCount') }.bind(this)}>需记</button>
            <button onClick={function () { this.sortBy('upvote') }.bind(this)}>赞</button>
            <button onClick={this.sortByRandom.bind(this)}>乱序</button>
          </div>
          <DynamicList
            dataList={this.state.dynamicData}
            ListNum={this.state.showDynamicNum}
          />
          <button onClick={this.showMore.bind(this)}>加载更多</button>
      </div>
    )
  }
}

let SubmitBtn = ({isSubmiting}) => (
  <button>{(() => { if (isSubmiting) { return '正在提交'; } else { return '提交'; } })()}</button>
);

let DynamicList = ({dataList, ListNum}) => {
  let myList = [];

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
        data={dataList[i]}
      />
    )
  }
  return <div>{myList}</div>;
};

let DynamicItem = ({data: data}) => {
  return (
    <div>
      <h4>{data.title}</h4>
      <div>{data.content}</div>
      <div>
        <div>点赞 {data.upvote}</div>
        <div>
          <button>-</button>
          需记 {data.thoughtsCount}
          <button>+</button>
        </div>
        <div>{time.timestampToyyyyMMddHHmmFormat(data.date)}</div>
      </div>
    </div>
  )
}

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

export default connect()(Dynamic);
