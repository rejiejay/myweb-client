import React, { Component } from 'react'


class TimelineNavigation extends Component {
  render() {
    return (
		<div className="DyNavigation">
			<div className="DyNavigationTitle">
				<div className="hover">Re:命运石之门</div>
				<a className="hover"><i></i></a>
			</div>

			<div className="DyNavSize1 hover1"><i style={{backgroundPosition:"-80px 0px"}}></i>世界线<span>0</span></div>
				<div className="DyNavSize2 hover1"><i style={{backgroundPosition:"-96px -0px"}}></i>2016年<span>0</span></div>
					<div className="DyNavSize3 hover1"><i style={{backgroundPosition:"-112px -0px"}}></i>12月<span>0</span></div>
					<div className="DyNavSize3 MoadMore hover1"><i style={{backgroundPosition:"-112px -0px"}}></i>加载...<span>...</span></div>
				<div className="DyNavSize2 hover1"><i style={{backgroundPosition:"-96px -0px"}}></i>2015年<span>0</span></div>
				<div className="DyNavSize2 MoadMore hover1"><i style={{backgroundPosition:"-96px -0px"}}></i>加载更多<span>...</span></div>
			<div className="DyNavSize1 hover1"><i style={{backgroundPosition:"-128px 0px"}}></i>博客<span>0</span></div>
			<div className="DyNavSize1 hover1"><i style={{backgroundPosition:"-144px 0px"}}></i>菜柜<span>0</span></div>
			<div className="DyNavSize1 hover1"><i style={{backgroundPosition:"-160px 2px"}}></i>留言板<span>0</span></div>
		</div>
    )
  }
}


export default TimelineNavigation