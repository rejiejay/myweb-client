import React, {Component} from 'react';

import time from './../../../utils/time.js';
import config from './../../../config';

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
            this.state.modalIsShow = false;
            this.state.modalTitle = props.data.title;
            this.state.modalContent = props.data.content;
            this.state.isSubmiting = false;
    }

    componentWillReceiveProps(nextProps) {
        let myNextState = nextProps.data;

        myNextState.modalIsShow = false;
        myNextState.modalTitle = nextProps.data.title;
        myNextState.modalContent = nextProps.data.content;
        myNextState.isSubmiting = false;
        
        this.id = nextProps.id;
        this.updateState = nextProps.updateState;

        this.setState(myNextState);
    }

    renderUpvote() {
        let upvoteIsSelected = this.state.upvoteIsSelected || false,
            isSubmiting = false,
            _this = this;

        if (upvoteIsSelected) {
            return <div className='dynamic-item-upvoted'>
                赞( {this.state.upvote} )
            </div>
        }

        return <div
            className='dynamic-item-upvote'
            onClick={() => {
                if (isSubmiting) { return }
                isSubmiting = true;

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
                    alert(`提交数据发生错误, 原因: ${error}`);
                    return { 'result': 0, 'message': '' }
                }).then((val) => {
                    if (val.result === 1) {
                        let myId = _this.id,
                            myDate = _this.state;

                        myDate.upvote++
                        myDate.upvoteIsSelected = true;
                        _this.updateState(myDate, myId);
                    } else {
                        if (val.message) { alert(`提交数据发生错误, 原因: ${val.message}`) }
                    }
                    isSubmiting = false;
                })
            }}
        >赞( {this.state.upvote} )</div>
    }

    renderThoughtsCount() {
        let _this = this,
            thoughtsIsSelected = this.state.thoughtsIsSelected || false,
            isSubmiting = false,
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
                <button onClick={() => {
                    if (isSubmiting) { return }
                    isSubmiting = true;

                    updateDynamicThoughtsCount(_this.state._id, true)
                        .then((val) => {
                            if (val.result === 1) {
                                let myId = _this.id,
                                    myDate = _this.state;

                                myDate.thoughtsCount++
                                myDate.thoughtsIsSelected = true;
                                _this.updateState(myDate, myId);
                            } else {
                                if (val.message) { alert(`提交数据发生错误, 原因: ${val.message}`) }
                            }
                            isSubmiting = false;
                        })
                }}>+</button>
            </div>
        }

        return <div className='dynamic-item-thoughtsCount'>
            <span className='dynamic-item-thoughtsCount-content'>
                需记( {this.state.thoughtsCount} )
            </span>
            <button onClick={() => {
                if (isSubmiting) { return }
                isSubmiting = true;

                updateDynamicThoughtsCount(_this.state._id, false)
                    .then((val) => {
                        if (val.result === 1) {
                            let myId = _this.id,
                                myDate = _this.state;

                            myDate.thoughtsCount--
                            myDate.thoughtsIsSelected = true;
                            _this.updateState(myDate, myId);
                        } else {
                            if (val.message) { alert(`提交数据发生错误, 原因: ${val.message}`) }
                        }
                        isSubmiting = false;
                    })
            }}>-</button>
            <button onClick={() => {
                if (isSubmiting) { return }
                isSubmiting = true;

                updateDynamicThoughtsCount(_this.state._id, true)
                    .then((val) => {
                        if (val.result === 1) {
                            let myId = _this.id,
                                myDate = _this.state;

                            myDate.thoughtsCount++
                            myDate.thoughtsIsSelected = true;
                            _this.updateState(myDate, myId);
                        } else {
                            if (val.message) { alert(`提交数据发生错误, 原因: ${val.message}`) }
                        }
                        isSubmiting = false;
                    })
            }}>+</button>
        </div>
    }

    deleteItem() {
        let _this = this,
            isSubmiting = false;
        
        if (isSubmiting) { return }
        isSubmiting = true;

        if(confirm('你确认要删除吗?')) {
            fetch(`${config.basicUrl}/dynamic/delete`, {
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
                alert(`提交数据发生错误, 原因: ${error}`);
                return { 'result': 0, 'message': '' }
            }).then((val) => {
                if (val.result === 1) {
                    let myId = _this.id,
                        myDate = _this.state;

                    myDate.isDelete = true;
                    _this.updateState(myDate, myId);
                } else {
                    if (val.message) { alert(`提交数据发生错误, 原因: ${val.message}`) }
                }
                isSubmiting = false;
            })

        } else {
            isSubmiting = false;
        }
    }

    submitData() {
        let _this = this,

            title = this.state.title,
            content = this.state.content,

            myId = this.state._id,
            mytitle = this.state.modalTitle,
            myContent = this.state.modalContent;
        
        if (this.state.isSubmiting) { return } 
        if (myContent === content && mytitle === title) {
            alert('你没有修改任何内容!');
            return
        }
        if (!myContent) {
            alert('内容不能为空!');
            return
        }
        
        this.setState({isSubmiting: true});
    
        fetch(`${config.basicUrl}/dynamic/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body:JSON.stringify({
                id: myId,
                title: mytitle,
                content: myContent
            })
        }).then(
            function (response) {
                return response.json()
            }, function (error) {
                _this.setState({isSubmiting: false});
                alert(`提交数据发生错误, 原因: ${error}`);

                return { 'result': 0, 'message': '' }
            }
        ).then(function (val) {
            if (val.result === 1) {
                let myId = _this.id,
                    myDate = _this.state;

                myDate.title = mytitle;
                myDate.content = myContent;
                _this.updateState(myDate, myId);
                _this.setState({
                    title: mytitle,
                    content: myContent,
                    isSubmiting: false,
                    modalIsShow: false
                });
            } else {
              if (val.message) { alert(`提交数据发生错误, 原因: ${val.message}`) }
              _this.setState({isSubmiting: false});
            }
        });
    
    }

      renderSubmitBtn() {
        let _this = this,
        isSubmiting = this.state.isSubmiting;
    
        if (isSubmiting) {
          return <div
            className='edit-submiting'
          >正在保存...</div>;
        } else {
          return <div
            onClick={_this.submitData.bind(_this)}
            className='edit-submit'
          >保存</div>;
        } 
    }

    renderModal() {
        let _this = this,
            isShow = this.state.modalIsShow;

        if (isShow) {
            return  <div className='dynamic-modal'>
                <div className='dynamic-modal-main'>
                    <h3>编辑动态</h3>
                    <div className='edit-close'
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
                        rows="3"
                        cols="20"
                        placeholder='请输入内容'
                        value={_this.state.modalContent}
                        onChange={(event) => {
                            _this.setState({modalContent: event.target.value})
                        }}
                        />
                    </div>

                    {this.renderSubmitBtn.call(this)}
                    </div>
                </div>
            </div>
        } else {
            return <div></div>
        }

    }

    renderItemIsDelete() {
        let isDelete = this.state.isDelete || false;

        if (isDelete) {
            return <div></div>
        } else {
            return <div className='dynamic-item'>
                <h4>{this.state.title}</h4>
                <div className='dynamic-item-content'>{this.state.content}</div>
                <div className='dynamic-item-operate'>
                    {this.renderUpvote.call(this)}
                    {this.renderThoughtsCount.call(this)}
                    <div className='dynamic-item-date'>
                        {time.timestampToyyyyMMddHHmmFormat(this.state.date)}
                    </div>
                    <div className='dynamic-item-update'
                        onClick={function () {
                            this.setState({modalIsShow: true})
                        }.bind(this)}
                    >编辑</div>
                    <div className='dynamic-item-delete'
                        onClick={this.deleteItem.bind(this)}
                    >X</div>
                </div>
                {this.renderModal.call(this)}
            </div>
        }
    }
    
    render() {
        return <div>{this.renderItemIsDelete.call(this)}</div>
    }
}

let updateDynamicThoughtsCount = (id, isAdd) => {
    return fetch(`${config.basicUrl}/dynamic/update/thoughtsCount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body:JSON.stringify({
            id: id,
            isAdd: isAdd
        })
    }).then((response) => (
        response.json()
    ), (error) => {
        alert(`提交数据发生错误, 原因: ${error}`);
        return { 'result': 0, 'message': '' }
    })

}

export default DynamicItem;
