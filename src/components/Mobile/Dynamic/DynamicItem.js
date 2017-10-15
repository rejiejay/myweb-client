import React, {Component} from 'react';
import { connect } from 'dva';

import time from './../../../utils/time.js';
import config from './../../../config';
import Toast from './../../toast';
import Confirm from './../../confirm';
import textFaces from './../../../utils/TextFaces.js';

class DynamicItem extends Component {
    constructor(props) {
        super(props);
        
        this.id = props.id;
        this.updateState = props.updateState;

        this.state = props.data;
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
            this.state.toastIsShow = false;
            this.state.toastMessage = '';
            
            this.state.isConfirmShow = false;   

            this.state.operateIsShow = false;

            this.state.modalIsShow = false;
            this.state.modalTitle = props.data.title;
            this.state.modalContent = props.data.content;
            
        this.itemUpvoted.bind(this);
        this.operateThoughtsCount.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let myNextState = nextProps.data;

        myNextState.toastIsShow = false;
        myNextState.toastMessage = '';

        myNextState.operateIsShow = this.state.operateIsShow;

        myNextState.modalIsShow = nextProps.data.modalIsShow;
        myNextState.modalTitle = nextProps.data.modalTitle;
        myNextState.modalContent = nextProps.data.modalContent;
        myNextState.isConfirmShow = this.state.isConfirmShow;

        this.id = nextProps.id;
        this.updateState = nextProps.updateState;

        this.setState(myNextState);
    }

    renderTitle() {
        if (this.state.title) {
            return <h4>{this.state.title}</h4>
        }else {
            return <div></div>
        }
    }

    itemUpvoted() {
        const _this = this,
            upvoteIsSelected = this.state.upvoteIsSelected || false;

        if (upvoteIsSelected) {
            this.setState({
                toastIsShow: true,
                toastMessage: `${textFaces()} 你不能再赞同的更多了!`
            });
            return
        }

        this.setState({
            operateIsShow: false,
            toastIsShow: true,
            toastMessage: 'loading'
        });
        fetch(`${config.basicUrl}/dynamic/update/upvote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body:JSON.stringify({
                id: _this.state._id
            })
        }).then((response) => (
            response.json()
        ), (error) => {
            _this.setState({
                toastIsShow: true,
                toastMessage: `提交数据发生错误, 原因: ${error}`
            })
            return { 'result': 0, 'message': '' }
        }).then((val) => {
            if (val.result === 1) {
                let myId = _this.id,
                    myDate = _this.state;

                myDate.upvote++
                myDate.upvoteIsSelected = true;

                _this.updateState(myDate, myId);

                _this.setState({
                    toastIsShow: false,
                    toastMessage: ''
                });
            } else {
                if (val.message) {
                    _this.setState({
                        toastIsShow: true,
                        toastMessage: `提交数据发生错误, 原因: ${val.message}`
                    }) 
                }
            }
        })
    }

    renderUpvote() {
        const _this = this,
            upvoteIsSelected = this.state.upvoteIsSelected || false;

        if (upvoteIsSelected) {
            return <div className='dynamic-item-upvoted'>
                {this.state.upvote} 赞同
            </div>
        }

        return <div
            className='dynamic-item-upvote'
            onClick={() => {_this.itemUpvoted()}}
        >
            {this.state.upvote} 赞同
        </div>
    }

    renderThoughtsCount() {
        const _this = this,
            thoughtsIsSelected = this.state.thoughtsIsSelected || false,
            thoughtsCount = this.state.thoughtsCount;

        if (thoughtsIsSelected) {
            return <div className='dynamic-item-thoughtsCounted'>
                {this.state.thoughtsCount} 需记
            </div>
        }

        return <div className='dynamic-item-thoughtsCount'>
            {this.state.thoughtsCount} 需记
        </div>
    }
    
    deleteItem() {
        const _this = this;

        if (this.props.isLogin === false) {
            this.setState({
                toastIsShow: true,
                toastMessage: '(。・＿・。)ﾉI’m sorry~ 你没有登录/限权!',
            })
            return
        }

        this.setState({
            operateIsShow: false,
            toastIsShow: true,
            toastMessage: 'loading'
        });

        fetch(`${config.basicUrl}/dynamic/delete`, {
            mode: 'cors',
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body:JSON.stringify({
                id: _this.state._id
            })
        }).then(
            (response) => ( response.json() ),
            (error) => ({ 'result': 0, 'message': error }
        )).then((val) => {
            if (val.result === 1) {
                let myId = _this.id,
                    myDate = _this.state;

                myDate.isDelete = true;
                _this.updateState(myDate, myId);
                _this.setState({
                    toastIsShow: false,
                    toastMessage: ''
                });
            } else {
                _this.setState({ toastIsShow: true, toastMessage: `提交数据发生错误, 原因: ${val.message}` })
            }
        })

    }

    submitData() {
        const _this = this,

            title = this.state.title,
            content = this.state.content,

            myId = this.state._id,
            mytitle = this.state.modalTitle,
            myContent = this.state.modalContent;

        if (this.props.isLogin === false) {
            _this.setState({ toastIsShow: true, toastMessage: '(。・＿・。)ﾉI’m sorry~ 你没有登录/限权!' });
            return
        }
        if (myContent === content && mytitle === title) {
            _this.setState({ toastIsShow: true, toastMessage: `${textFaces()} 你没有修改任何内容哎!` });
            return
        }
        if (!myContent) {
            _this.setState({ toastIsShow: true, toastMessage:  `${textFaces()} 或许你想删除?` });
            return
        }
        
        this.setState({ operateIsShow: false, toastIsShow: true, toastMessage: 'loading' });
    
        fetch(`${config.basicUrl}/dynamic/update`, {
            mode: 'cors',
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                'id': myId,
                'title': mytitle,
                'content': myContent
        })}).then(
            (response) => ( response.json() ),
            (error) => ( { 'result': 0, 'message': error } )
        ).then( (val) => {
            if (val.result === 1) {
                let myId = _this.id,
                    myDate = _this.state;

                myDate.title = mytitle;
                myDate.content = myContent;
                _this.updateState(myDate, myId);
                _this.setState({
                    'title': mytitle,
                    'content': myContent,
                    'modalIsShow': false,
                    'toastIsShow': false,
                    'toastMessage': ''
                });
            } else {
                _this.setState({ toastIsShow: true, toastMessage: `提交数据发生错误, 原因: ${val.message}` })
            }
        });
    }

    renderModal() {
        const _this = this,
            isShow = this.state.modalIsShow;
    
        if (isShow) {
          return <div className='dynamic-publish-modal'>
            <div className='publish-nav'
              onClick={() => {
                _this.setState({ operateIsShow: false, modalIsShow: false});
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
                  value={this.state.modalTitle}
                  onChange={function (event) {
                    this.setState({'modalTitle': event.target.value})
                  }.bind(this)}
                />
              </div>
              <div className='publish-content'>
                <textarea
                  rows="10"
                  cols="20"
                  type="text"
                  placeholder='请输入内容'
                  value={this.state.modalContent}
                  onChange={function (event) {
                    this.setState({'modalContent': event.target.value})
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

    operateThoughtsCount(type) {
        const _this = this,
            thoughtsIsSelected = this.state.thoughtsIsSelected || false;

        if (this.props.isLogin === false) {
            this.setState({ toastIsShow: true, toastMessage: '(。・＿・。)ﾉI’m sorry~ 你没有登录/限权!' });
            return
        }

        if (thoughtsIsSelected) {
            this.setState({ toastIsShow: true, toastMessage: `${textFaces()} 你的脑袋不能连续记忆了!` });
            return
        }

        if (type !== 'add' && this.state.thoughtsCount === 0) {
            this.setState({ toastIsShow: true, toastMessage: `${textFaces()} 你的脑袋想鄙视这条数据吗?` });
            return
        }

        this.setState({ operateIsShow: false, toastIsShow: true, toastMessage: 'loading' });
        
        updateDynamicThoughtsCount(_this.state._id, ( type === 'add' ? true : false  ) )
        .then(
            (response) => ( response.json() ),
            (error) => ({ 'result': 0, 'message': error })
        ).then((val) => {
            if (val.result === 1) {
                let myId = _this.id,
                    myDate = _this.state;

                if (type === 'add') {
                    myDate.thoughtsCount++
                } else {
                    myDate.thoughtsCount--
                }
                myDate.thoughtsIsSelected = true;
                _this.updateState(myDate, myId);
                _this.setState({
                    toastIsShow: false,
                    toastMessage: ''
                });
            } else {
                _this.setState({ toastIsShow: true, toastMessage: `提交数据发生错误, 原因: ${val.message}` })
            }
        });
    }

    renderDecorate() {
        const _this = this,
            operateIsShow = this.state.operateIsShow;

        if (operateIsShow) {
            return <div>
                <div className='dynamic-item-decorate-background'
                    onClick={() => {
                    _this.setState({operateIsShow: false});
                }}></div>
                <div className='decorate-operate'>
                    <div className='decorate-operate-after'></div>
                    <div className='decorate-operate-item' onClick={() => {
                        _this.itemUpvoted()
                    }}>赞同</div>
                    <div className='decorate-operate-separate'></div>
                    <div className='decorate-operate-item' onClick={() => {
                        _this.operateThoughtsCount('add')
                    }}>需记 +1</div>
                    <div className='decorate-operate-separate'></div>
                    <div className='decorate-operate-item' onClick={() => {
                        _this.operateThoughtsCount('reduce')
                    }}>-1</div>
                    <div className='decorate-operate-separate'></div>
                    <div className='decorate-operate-item' onClick={() => {
                        _this.setState({operateIsShow: false, modalIsShow: true});
                    }}>编辑</div>
                    <div className='decorate-operate-separate'></div>
                    <div className='decorate-operate-item' onClick={() => {
                        _this.setState({operateIsShow: false, isConfirmShow: true})
                    }}>删除</div>
                </div>
            </div>
        }

        return <div></div>
    }

    render() {
        let mysetTimeout;
        const _this = this,
            isDelete = this.state.isDelete || false;

        if (isDelete) {
            return <div></div>
        } 
        return <div className='dynamic-item'>
            <div onTouchMove={()=>{ window.clearInterval(mysetTimeout) }}
                onTouchEnd={()=>{ window.clearInterval(mysetTimeout) }}
                onTouchStart={()=>{
                    mysetTimeout = setTimeout(() => { _this.setState({operateIsShow: true}) }, 500);
                }}
            >
                {this.renderTitle.call(this)}
                {this.renderDecorate.call(this)}
                <div className='dynamic-item-content'>{this.state.content}</div>
                <div className='dynamic-item-operate'>
                    {this.renderUpvote.call(this)}
                    <div className='dynamic-item-separate'>·</div>
                    {this.renderThoughtsCount.call(this)}
                    <div className='dynamic-item-separate'>·</div>
                    <div className='dynamic-item-date'>
                        {time.timestampToyyyyMMddHHmmFormat(this.state.date)}
                    </div>
                </div>
                <Toast
                    isShow={this.state.toastIsShow}
                    message={this.state.toastMessage}
                    hideToast={function () { this.setState({ toastIsShow: false }) }.bind(this)}
                />
                <Confirm
                    isShow={this.state.isConfirmShow}
                    changeState={function (val) { if (val === 'OK') { this.deleteItem() } this.setState({isConfirmShow: false}) }.bind(this)}
                />
                {this.renderModal.call(this)}
            </div>
        </div>
    }
}

let updateDynamicThoughtsCount = (id, isAdd) => {
    return fetch(`${config.basicUrl}/dynamic/update/thoughtsCount`, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body:JSON.stringify({
            id: id,
            isAdd: isAdd
        })
    })
}

const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin
})

export default connect(mapStateToProps)(DynamicItem);
  