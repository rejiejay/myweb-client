import React, { Component } from 'react'


class IndiNav extends Component {
  render() {
    return (
      <div className="IndiNav">
		<a className="IndiNavgap" href="#">个人动态</a>
		<a className="IndiNavgap" href="#">代&nbsp;&nbsp;码</a>
		<a className="IndiNavgap" href="#">平面设计</a>
		<a className="IndiNavgap" href="#">3D建模</a>
		<a className="IndiNavgap" href="#">摄&nbsp;&nbsp;影</a>
		<a className="IndiNavgap" href="#">手&nbsp;&nbsp;绘</a>
		<a href="#">动&nbsp;&nbsp;效</a>
        <div className="TimelinePointer"></div>
      </div>
    )
  }
}


export default IndiNav