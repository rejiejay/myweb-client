import React, {Component} from 'react';
import { connect } from 'dva';

import time from './../../../utils/time.js';
import config from './../../../config';
import Toast from './../../toast';

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

            this.state.modalIsShow = false;
            this.state.modalTitle = props.data.title;
            this.state.modalContent = props.data.content;
    }

    componentWillReceiveProps(nextProps) {
        let myNextState = nextProps.data;

        myNextState.toastIsShow = false;
        myNextState.toastMessage = '';

        myNextState.modalIsShow = false;
        myNextState.modalTitle = nextProps.data.title;
        myNextState.modalContent = nextProps.data.content;
        
        this.id = nextProps.id;
        this.updateState = nextProps.updateState;

        this.setState(myNextState);
    }

    renderUpvote() {
        let upvoteIsSelected = this.state.upvoteIsSelected || false,
            _this = this;

        if (upvoteIsSelected) {
            return <div className='dynamic-item-upvoted cursor-selected'>
                赞( {this.state.upvote} )
            </div>
        }

        return <div
            className='dynamic-item-upvote cursor-selected'
            onClick={() => {
                _this.setState({
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
            }}
        >赞( {this.state.upvote} )</div>
    }

    renderThoughtsCount() {
        let _this = this,
            thoughtsIsSelected = this.state.thoughtsIsSelected || false,
            thoughtsCount = this.state.thoughtsCount;

        if (thoughtsIsSelected) {
            return <div className='dynamic-item-thoughtsCounted'>
                需记( {this.state.thoughtsCount} )
            </div>
        }

        if (thoughtsCount === 0) {
            return <div className='dynamic-item-thoughtsCount'>
                <span className='dynamic-item-thoughtsCount-content'>
                    需记( {this.state.thoughtsCount} )
                </span>
                <button
                    className='cursor-selected'
                    onClick={() => {
                        if (_this.props.isLogin === false) {
                            _this.setState({ toastIsShow: true, toastMessage: '(。・＿・。)ﾉI’m sorry~ 你没有登录/限权!' });
                            return
                        }
                        _this.setState({ toastIsShow: true, toastMessage: 'loading' });

                        updateDynamicThoughtsCount(_this.state._id, true)
                        .then(
                            (response) => ( response.json() ),
                            (error) => ({ 'result': 0, 'message': error })
                        ).then((val) => {
                            if (val.result === 1) {
                                let myId = _this.id,
                                    myDate = _this.state;

                                myDate.thoughtsCount++
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
                    }}
                >+</button>
            </div>
        }

        return <div className='dynamic-item-thoughtsCount'>
            <span className='dynamic-item-thoughtsCount-content'>
                需记( {this.state.thoughtsCount} )
            </span>
            <button
                className='cursor-selected'
                onClick={() => {
                    if (_this.props.isLogin === false) {
                        _this.setState({ toastIsShow: true, toastMessage: '(。・＿・。)ﾉI’m sorry~ 你没有登录/限权!', });
                        return
                    }
                    _this.setState({ toastIsShow: true, toastMessage: 'loading' });

                    updateDynamicThoughtsCount(_this.state._id, false)
                    .then(
                        (response) => (response.json()),
                        (error) => ({ 'result': 0, 'message': error })
                    ).then((val) => {
                        if (val.result === 1) {
                            let myId = _this.id,
                                myDate = _this.state;

                            myDate.thoughtsCount--
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
                }}
            >-</button>
            <button
                className='cursor-selected'
                onClick={() => {
                    if (_this.props.isLogin === false) {
                        _this.setState({ toastIsShow: true, toastMessage: '(。・＿・。)ﾉI’m sorry~ 你没有登录/限权!' });
                        return
                    }
                    _this.setState({ toastIsShow: true, toastMessage: 'loading' });
                    
                    updateDynamicThoughtsCount(_this.state._id, true)
                    .then(
                        (response) => (response.json()),
                        (error) => ({ 'result': 0, 'message': error })
                    ).then((val) => {
                        if (val.result === 1) {
                            let myId = _this.id,
                                myDate = _this.state;

                            myDate.thoughtsCount++
                            myDate.thoughtsIsSelected = true;
                            _this.updateState(myDate, myId);
                            _this.setState({ toastIsShow: false, toastMessage: '' });
                        } else {
                            _this.setState({ toastIsShow: true, toastMessage: `提交数据发生错误, 原因: ${val.message}` })
                        }
                    })
                }}
            >+</button>
        </div>
    }

    deleteItem() {
        const _this = this;

        if (_this.props.isLogin === false) {
            _this.setState({ toastIsShow: true, toastMessage: '(。・＿・。)ﾉI’m sorry~ 你没有登录/限权!' });
            return
        }

        if(confirm('你确认要删除吗?')) {
            _this.setState({ toastIsShow: true, toastMessage: 'loading' });

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
                (response) => (response.json()),
                (error) => ( { 'result': 0, 'message': error })
            ).then((val) => {
                if (val.result === 1) {
                    let myId = _this.id,
                        myDate = _this.state;

                    myDate.isDelete = true;
                    _this.updateState(myDate, myId);
                    _this.setState({ toastIsShow: false, toastMessage: '' });
                } else {
                    _this.setState({ toastIsShow: true, toastMessage: `提交数据发生错误, 原因: ${val.message}` })
                }
            })

        }
    }

    submitData() {
        let _this = this,

            title = this.state.title,
            content = this.state.content,

            myId = this.state._id,
            mytitle = this.state.modalTitle,
            myContent = this.state.modalContent;

        if (_this.props.isLogin === false) {
            _this.setState({ toastIsShow: true, toastMessage: '(。・＿・。)ﾉI’m sorry~ 你没有登录/限权!' });
            return
        }
        if (myContent === content && mytitle === title) {
            _this.setState({ toastIsShow: true, toastMessage: '你没有修改任何内容!' });
            return
        }
        if (!myContent) {
            _this.setState({ toastIsShow: true, toastMessage: '内容不能为空!' });
            return
        }
        
        this.setState({ toastIsShow: true, toastMessage: 'loading' });
    
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
                    title: mytitle,
                    content: myContent,
                    modalIsShow: false,
                    toastIsShow: false,
                    toastMessage: ''
                });
            } else {
                _this.setState({ toastIsShow: true, toastMessage: `提交数据发生错误, 原因: ${val.message}` })
            }
        });
    
    }

    renderModal() {
        let _this = this,
            isShow = this.state.modalIsShow;

        if (isShow) {
            return  <div className='dynamic-modal'>
                <div className='dynamic-modal-main'>
                    <h3>编辑动态</h3>
                    <div className='edit-close cursor-selected'
                        onClick={() => {
                            _this.setState({ modalIsShow: false })
                        }}
                    >X</div>
                    <div className='edit-content'>
                        <div className='edit-title'>
                            <input
                            type="text"
                            placeholder='请输入标题'
                            value={_this.state.modalTitle}
                            onChange={(event) => {
                                _this.setState({modalTitle: event.target.value})
                            }}
                            />
                        </div>
                        <div className='edit-textarea'>
                            <textarea
                            rows="7"
                            cols="20"
                            placeholder='请输入内容'
                            value={_this.state.modalContent}
                            onChange={(event) => {
                                _this.setState({modalContent: event.target.value})
                            }}
                            />
                        </div>
                        <div className='edit-submit cursor-selected'
                            onClick={_this.submitData.bind(_this)}
                        >保存</div>
                    </div>
                </div>
            </div>
        } else {
            return <div></div>
        }

    }
    
    render() {
        let isDelete = this.state.isDelete || false;

        if (isDelete) {
            return <div></div>
        } else {
            return <div className='dynamic-item'>
                <Toast
                    isShow={this.state.toastIsShow}
                    message={this.state.toastMessage}
                    hideToast={function () { this.setState({ toastIsShow: false }) }.bind(this)}
                />
                <h4>{this.state.title}</h4>
                <div className='dynamic-item-content' dangerouslySetInnerHTML={{__html: this.state.content}} />
                <div className='dynamic-item-operate'>
                    {this.renderUpvote.call(this)}
                    {this.renderThoughtsCount.call(this)}
                    <div className='dynamic-item-date'>
                        {time.timestampToyyyyMMddHHmmFormat(this.state.date)}
                    </div>
                    <div className='dynamic-item-update cursor-selected'
                        onClick={function () {
                            this.setState({modalIsShow: true})
                        }.bind(this)}
                    >编辑</div>
                    <div className='dynamic-item-delete cursor-selected'
                        onClick={this.deleteItem.bind(this)}
                    >X</div>
                </div>
                {this.renderModal.call(this)}
            </div>
        }
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
  