import React, { Component } from 'react'
import GuestsPrintWrite from './GuestsPrintWrite'
import GuestsPrintTrace from './GuestsPrintTrace'


class GuestsPrint extends Component {
  render() {
    return (
      <div className="GueMsg">
        <div className="GMnavigate">
          <i></i>
          <div className="GMnavL">
            <a>最新回复</a>
            <a>点击赞同</a>
            <a>回复数量</a>
          </div>
          <div className="GMnavR">
            <p>共<span>2</span>页
            <a>1</a>
            <a>2</a>
            <a>下一页</a>
            </p>
          </div>
        </div>

        <GuestsPrintWrite></GuestsPrintWrite>
        <GuestsPrintTrace></GuestsPrintTrace>
        
        <div className="GMNavigateFoot">
          <div className="GMNFleft">
            <a>1</a>
            <a>2</a>
            <a style={{width:"65px"}}>下一页</a>
          </div>
          <div className="GMNFright">
            <p>共<span>2</span>页，跳至<input type="text" />页</p>
          </div>
        </div>
      </div>
    )
  }

}


export default GuestsPrint