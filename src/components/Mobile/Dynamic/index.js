import React, {Component} from 'react';
import { connect } from 'dva';
import shuffle from 'shuffle-array';

import DynamicItem from './DynamicItem';
import Toast from './../../toast';
import config from './../../../config';
import textFaces from './../../../utils/TextFaces.js';
import quickSortBy from './../../../utils/quickSortBy.js';

class Dynamic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',

      toastIsShow: false,
      toastMessage: '',

      isOperateShow: false,

      isShowPublish: false,

      isLoadListShow: false,

      isSortListShow: false,

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
      
      sortType: null, // date thoughtsCount upvote random
      sortByTimeIsOld: false
    }

    this.increaseShowNum = 5;
    this.loadType = 'new'; // new old random
    
    this.myemoji = textFaces();
    this.showMore.bind(this);
    this.sortBy.bind(this);
    this.sortByRandom.bind(this);
    this.loadNew.bind(this);
    this.loadOld.bind(this);
    this.loadRandom.bind(this);
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

      if (scrollTop >= offsetTop) {
        if (isOperateShow === false) {
          _this.myemoji = textFaces();
          _this.setState({isOperateShow: true});
          isOperateShow = true;
        }

        if (_this.state.isLoadListShow || _this.state.isSortListShow) {
          _this.setState({isLoadListShow: false, isSortListShow: false,});
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
          _this.setState({
            'isLoadListShow': false,
            'isSortListShow': false,
            'isOperateShow': false
          });
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

  loadNew() {
    let _this = this;

    if (this.loadType === 'new') {
      this.setState({
        isLoadListShow: false,
        toastIsShow: true,
        toastMessage: `${textFaces()} 你不能窥探未来噢~`
      });
      return
    }
    this.loadType = 'new';

    this.setState({
      isLoadListShow: false,
      toastIsShow: true,
      toastMessage: 'loading'
    });

    getDynamicByTime('new')
      .then(
        function (response) {
          return response.json()
        }, function (error) {
          _this.setState({
            toastIsShow: true,
            toastMessage: `提交数据发生错误, 原因: ${error}`
          })
          return { 'result': 0, 'message': '' }
        }
      ).then(function (val) {
        if (val.result === 1) {
          _this.setState({
            'toastIsShow': false,
            'toastMessage': '',

            'sortType': 'date', 
            'sortByTimeIsOld': false,
            'showDynamicNum': 8,
            'dynamicData': dealWithDynamicData(val.data)
          });
          _this.increaseShowNum = 5;
        } else {
          if (val.message) {
            _this.setState({
              toastIsShow: true,
              toastMessage: `提交数据发生错误, 原因: ${val.message}`
            })
          }
        }
      });
  }

  loadOld() {
    let _this = this;

    if (this.loadType === 'old') {
      this.setState({
        isLoadListShow: false,
        toastIsShow: true,
        toastMessage: `${textFaces()} 只能穿越到这里了~`
      });
      return
    }
    this.loadType = 'old';

    this.setState({
      isLoadListShow: false,
      toastIsShow: true,
      toastMessage: 'loading'
    });

    getDynamicByTime('old')
      .then(
        function (response) {
          return response.json()
        }, function (error) {
          _this.setState({
            toastIsShow: true,
            toastMessage: `提交数据发生错误, 原因: ${error}`
          })
          return { 'result': 0, 'message': '' }
        }
      ).then(function (val) {
        if (val.result === 1) {
          _this.setState({
            'toastIsShow': false,
            'toastMessage': '',
            'sortType': 'date', 
            'sortByTimeIsOld': true,
            'showDynamicNum': 8,
            'dynamicData': dealWithDynamicData(val.data)
          });
          _this.increaseShowNum = 5;
        } else {
          if (val.message) {
            _this.setState({
              toastIsShow: true,
              toastMessage: `提交数据发生错误, 原因: ${val.message}`
            })
          }
        }
      });
  }

  loadRandom() {
    let _this = this;

    this.loadType = 'random';

    this.setState({
      isLoadListShow: false,
      toastIsShow: true,
      toastMessage: 'loading'
    });

    getDynamicByRandom()
      .then(
        function (response) {
          return response.json()
        }, function (error) {
          _this.setState({
            toastIsShow: true,
            toastMessage: `提交数据发生错误, 原因: ${error}`
          })
          return { 'result': 0, 'message': '' }
        }
      ).then(function (val) {
        if (val.result === 1) {
          _this.setState({
            'toastIsShow': false,
            'toastMessage': '',
            'sortType': 'date', 
            'sortByTimeIsOld': false,
            'showDynamicNum': 8,
            'dynamicData': dealWithDynamicData(val.data)
          });
          _this.increaseShowNum = 5;
        } else {
          if (val.message) {
            _this.setState({
              toastIsShow: true,
              toastMessage: `提交数据发生错误, 原因: ${val.message}`
            })
          }
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
    let mydynamicList = [];

    mydynamicList = shuffle(this.state.dynamicData);
    this.setState({
      'sortByTimeIsOld': false,
      'sortType': 'random',
      'dynamicData': mydynamicList
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

  renderNavLoadList() {
    const _this = this;

    if (this.state.isLoadListShow) {
      return <div className='nav-load-list'>
        <div className='nav-sort-background' onClick={() => {
          _this.setState({'isLoadListShow': false});
        }}/>
        <div className='nav-sort-content'>
          <div className='nav-sort-item' onClick={() => {
            _this.loadNew()
          }}>按最新加载</div>
          <div className='nav-sort-separate'></div>
          <div className='nav-sort-item' onClick={() => {
            _this.loadRandom()
          }}>随机加载</div>
          <div className='nav-sort-separate'></div>
          <div className='nav-sort-item' onClick={() => {
            _this.loadOld()
          }}>按最久远加载</div>
        </div>
      </div>
    }
    return <div></div>
  }

  renderNavSortList() {
    const _this = this;

    if (this.state.isSortListShow) {
      return <div className='nav-sort-list'>
        <div className='nav-sort-background' onClick={() => {
          _this.setState({'isSortListShow': false});
        }}/>
        <div className='nav-sort-content'>
          <div className='nav-sort-item' onClick={() => {
            _this.sortBy('date')
          }}>时间 {this.state.sortByTimeIsOld ? '↑' : '↓'}</div>
          <div className='nav-sort-separate'></div>
          <div className='nav-sort-item' onClick={() => {
            _this.sortBy('thoughtsCount')
          }}>需记</div>
          <div className='nav-sort-separate'></div>
          <div className='nav-sort-item' onClick={() => {
            _this.sortBy('upvote')
          }}>赞同</div>
          <div className='nav-sort-separate'></div>
          <div className='nav-sort-item' onClick={() => {
            _this.sortByRandom()
          }}>乱序</div>
        </div>
      </div>
    }
    return <div></div>
  }

  renderDynamicNav() {
    const _this = this,
      sortType = this.state.sortType,
      sortByTimeIsOld = this.state.sortByTimeIsOld,
      sortName = () => {
        if (sortType === 'date') {
          if (sortByTimeIsOld) {
            return '时间 ↑'
          } else {
            return '时间 ↓'
          }
        } else if (sortType === 'thoughtsCount') {
          return '需记'
        } else if (sortType === 'upvote') {
          return '赞'
        } else if (sortType === 'random') {
          return '乱序'
        } else {
          return '排序'
        }
      }

    if (this.state.isOperateShow) {
      return <div className='dynamic-nav'>
        <div className='dynamic-nav-content'>
          <div className='dynamic-nav-load' onClick={() => {
            _this.setState({'isLoadListShow': true});
          }}><span></span><p>Reload</p></div>
          {this.renderNavLoadList.call(this)}
          <div className='dynamic-nav-title' onClick={() => {
            _this.setState({ toastMessage: `${textFaces()} 你点击我干嘛?`, toastIsShow: true })
          }}>{this.myemoji}</div>
          <div className='dynamic-nav-sort' onClick={() => {
            _this.setState({'isSortListShow': true});
          }}>{sortName()}</div>
          {this.renderNavSortList.call(this)}
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


let getDynamicByRandom = () => {
  return fetch(`${config.basicUrl}/dynamic/getdata/sortbyrandom`, { method: 'GET' })
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
