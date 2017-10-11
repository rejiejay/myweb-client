import React, {Component} from 'react';
import { connect } from 'dva';

import DynamicItem from './DynamicItem';
import Toast from './../../toast';
import config from './../../../config';
import textFaces from './../../../utils/TextFaces.js';

class Dynamic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',

      isOperateShow: false,

      toastIsShow: false,
      toastMessage: '',

      isShowPublish: false,

      showDynamicNum: 8,
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
    }

    this.increaseShowNum = 5;

    this.myemoji = textFaces();
    this.showMore.bind(this);
  }

  componentDidMount() {
    let isOperateShow = false,
      isShowIng = false;
    const _this = this,
      myDOM = document.getElementById('dynamic');
    
    window.onscroll = (event) => {
      // 发表动态 离最顶部的偏移量
      let offsetTop = myDOM.offsetTop,
        // 发表动态 的总高度
        scrollHeight = myDOM.scrollHeight,
        // 可视窗口 离最顶部的偏移量
        scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
        // 可视窗口 的总高度
        windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

      if (scrollTop > offsetTop) {
        if (isOperateShow === false) {
          _this.myemoji = textFaces();
          _this.setState({isOperateShow: true});
          isOperateShow = true;
        }

        if (isShowIng === false && _this.state.isShowPublish === false) {
          if( (scrollTop + windowHeight) >= (scrollHeight + offsetTop) ){
            _this.showMore();
            isShowIng = true;
            setTimeout(() => {
              isShowIng = false;
            },500);
          }
        }
      } else {
        if (isOperateShow === true) {
          _this.setState({isOperateShow: false});
          isOperateShow = false;
        }
      }
    }

    getDynamicByTime()
      .then((response) => (response.json()),
        (error) => {
          _this.setState({ toastIsShow: true, toastMessage: `加载数据发生错误, 原因: ${error}` });
          return { 'result': 0, 'message': '' }
      }).then((val) => {
        if (val.result === 1) {
          _this.setState({dynamicData: dealWithDynamicData(val.data)});
        } else {
          if (val.message) {
            _this.setState({ toastIsShow: true, toastMessage: `加载的数据有误, 原因: ${val.message}` });
          }
        }
      });
  }
  
  submitData() {
    let _this = this,
      mytitle = this.state.title,
      myContent = this.state.content;
    
    if (this.props.isLogin === false) {
      _this.setState({
        toastIsShow: true,
        toastMessage: '(。・＿・。)ﾉI’m sorry~ 你没有登录/限权!',
      })
      return
    }
    if (!myContent) {
      _this.setState({
        toastIsShow: true,
        toastMessage: `${textFaces()} 提交的内容不能为空噢!`,
      })
      return
    }
    
    this.setState({
      isShowPublish: false,
      toastIsShow: true,
      toastMessage: 'loading'
    });

    fetch(`${config.basicUrl}/dynamic`, {
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        'title': mytitle,
        'content': myContent
    })}).then((response) => (response.json()),  (error) => {
      _this.setState({ toastIsShow: true, toastMessage: `提交数据发生错误, 原因: ${error}` });
      return { 'result': 0, 'message': '' }
    }).then( (val) => {
      if (val.result === 1) {
        _this.setState({
          title: '',
          content: '',
          toastIsShow: true,
          toastMessage: `${textFaces()} 正在努力提交!`
        });

        getDynamicByTime()
        .then( (response) => ( response.json() ),
          (error) => {
            _this.setState({ toastIsShow: true, toastMessage: `数据提交成功, 但是获取数据失败, 原因: ${error}` })
            return { 'result': 0, 'message': '' }
        }).then( (val) => {
          if (val.result === 1) {
            _this.setState({
              dynamicData: dealWithDynamicData(val.data),
              toastIsShow: true,
              toastMessage: 'Thanks♪(･ω･)ﾉ 恭喜你,数据提交成功!'
            })
          } else {
            if (val.message) {  _this.setState({ toastIsShow: true, toastMessage: `提交数据成功, 但是获取的数据有误, 原因: ${val.message}` });
            }
          }
        });
      } else {
        if (val.message) {  _this.setState({ toastIsShow: true, toastMessage: `提交数据发生错误, 原因: ${val.message}` }); }
      }
    });
  }

  showMore() {
    let _this = this,
      myNum = this.state.showDynamicNum + this.increaseShowNum,
      myLength = this.state.dynamicData.length,
      showDynamicNum = this.state.showDynamicNum;

    if (showDynamicNum === myLength) { return }

    if (myNum > myLength) {
      myNum = myLength;
    }

    this.increaseShowNum += 2;
    this.setState({
      'toastIsShow': true,
      'toastMessage': 'loading',
      'showDynamicNum': myNum
    });

    setTimeout(() => {
      _this.setState({
        'toastIsShow': false,
        'toastMessage': ''
      });
    },500);
  }

  renderDynamicNav() {
    let isOperateShow = this.state.isOperateShow;

    if (isOperateShow) {
      return <div className='dynamic-nav'>
        <div className='dynamic-nav-content'>
          <div className='dynamic-nav-load'><span></span><p>Reload</p></div>
          <div className='dynamic-nav-title'>{this.myemoji}</div>
          <div className='dynamic-nav-sort'>排序</div>
        </div>
      </div>
    }
    return <div className='dynamic-nav dynamic-nav-hidden'></div>
  }

  renderDynamicPublish() {
    const _this = this,
      isOperateShow = this.state.isOperateShow;

    if (isOperateShow) {
      return <div className='dynamic-publish'
        onClick={() => {
          _this.setState({isShowPublish: true});
        }}
      >+ 发布动态</div>
    }
    return <div className='dynamic-publish dynamic-publish-hidden'>+ 发布动态</div>
  }

  renderDynamicList() {
    let _this = this,
      myList = [],
      dataList = this.state.dynamicData,
      ListNum = this.state.showDynamicNum;
  
    if (dataList.length === 0) {
      return <div></div>
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

  renderLoadMore() {
    let allDynamicNum = this.state.dynamicData.length,
      showDynamicNum = this.state.showDynamicNum;

    if (allDynamicNum < showDynamicNum || allDynamicNum === showDynamicNum) {
      return <div className='dynamic-item-LoadMore'>
        已加载所有
      </div>
    }

    return <div className='dynamic-item-LoadMore'>正在加载 . . .</div>
  }

  renderPublishModal() {
    const _this = this,
      isShowPublish = this.state.isShowPublish;

    if (isShowPublish) {
      return <div className='dynamic-publish-modal'>
        <div className='publish-nav'
          onClick={() => {
            _this.setState({isShowPublish: false});
          }}
        >
          <span>{"<"}</span>
          <div>back</div>
        </div>
        <div className='publish-main'>
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
          <div className='publish-content'>
            <textarea
              rows="10"
              cols="20"
              type="text"
              placeholder='请输入内容'
              value={this.state.content}
              onChange={function (event) {
                this.setState({content: event.target.value})
              }.bind(this)}
            />
          </div>
          <div className='publish-submit'
            onClick={() => {
              _this.submitData();
            }}
          >
            <div>发布</div>
          </div>
        </div>
      </div>
    }
    return <div></div>
  }

  render() {
    return (
      <div className='dynamic' id='dynamic'>
        {this.renderDynamicNav.call(this)}
        <div className='dynamic-content'>
          {this.renderDynamicList.call(this)}
          {this.renderLoadMore.call(this)}
        </div>
        {this.renderDynamicPublish.call(this)}
        {this.renderPublishModal.call(this)}
        <Toast
          isShow={this.state.toastIsShow}
          message={this.state.toastMessage}
          hideToast={function () { this.setState({ toastIsShow: false }) }.bind(this)}
        />
      </div>
    )
  }
}

let dealWithDynamicData = (data) => ( data.map((val) => ({
  '_id': val._id,
  'isDelete': false,
  'date': val.date,
  'title': val.title,
  'content': val.content,
  'thoughtsCount': val.thoughtsCount,
  'thoughtsIsSelected': false,
  'upvote': val.upvote,
  'upvoteIsSelected': false
})))

let getDynamicByTime = (sequenceType) => {
  let sort = sequenceType || 'new';

  if (sort === 'old') {
    return fetch(`${config.basicUrl}/dynamic/getdata/sortbytime?sequence=old`, { method: 'GET' })
  }
  return fetch(`${config.basicUrl}/dynamic/getdata/sortbytime?sequence=new`, { method: 'GET' })
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin
})

export default connect(mapStateToProps)(Dynamic);
