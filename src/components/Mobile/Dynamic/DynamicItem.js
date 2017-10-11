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
            this.state.isSubmiting = false;
    }

    componentWillReceiveProps(nextProps) {
        let myNextState = nextProps.data;

        myNextState.toastIsShow = false;
        myNextState.toastMessage = '';

        myNextState.modalIsShow = false;
        myNextState.modalTitle = nextProps.data.title;
        myNextState.modalContent = nextProps.data.content;
        myNextState.isSubmiting = false;
        
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

    renderUpvote() {
        let _this = this,
            isSubmiting = false,
            upvoteIsSelected = this.state.upvoteIsSelected || false;

        if (upvoteIsSelected) {
            return <div className='dynamic-item-upvoted'>
                {this.state.upvote} 赞同
            </div>
        }

        return <div
            className='dynamic-item-upvote'
            onClick={() => {
                if (isSubmiting) { return }
                isSubmiting = true;

                this.setState({
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
                    isSubmiting = false;
                })
            }}
        >
            {this.state.upvote} 赞同
        </div>
    }

    renderThoughtsCount() {
        let _this = this,
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

    render() {
        return <div className='dynamic-item'>
            <div>
                {this.renderTitle.call(this)}
                <div className='dynamic-item-decorate'>· · ·</div>
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
            </div>
        </div>
    }
}


const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin
})

export default connect(mapStateToProps)(DynamicItem);
  