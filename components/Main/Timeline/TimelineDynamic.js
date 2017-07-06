import React, { Component } from 'react'
import { connect } from 'react-redux'
import DynamicAction from './../../../actions/DynamicAction.js'


class TimelineDynamic extends Component {
  constructor(props) {
    super(props)
    this.ShowList = this.ShowList.bind(this)
  }

  // 渲染数据
  ShowList(data) {
  	if (data.length > 0) {
  		return data.map((data, i) => 
			<div key={i}  className="PerDynamic" >
				<div className="PerDynamicICON">
					<a></a>
					<i></i>
				</div>
				<article className="DyNavArticle">
					<div className="DyNavArticleTitle">
						<i></i>
						<h3>{data.Title}</h3>
						<p>{data.Time}</p>
					</div>
					<div className="DyNavArticleContent">
						<img src={data.Image} />
						{data.Content.map((data, i) =>
							<p key={i}>{data}</p>
						)}
					</div>
					<div className="DyNavArticleBottom">
						<a>查看所有<i style={{backgroundPosition:"-192px 1px"}}></i></a>
						<div className="DyNavArtBt">
							<a>赞<span>({data.Up})</span></a>
							<a>阅读<span>({data.Read})</span></a>
							<a>评论<span>({data.Comment})</span></a>
							<i style={{backgroundPosition:"-208px 0px"}}></i>
						</div>
					</div>
				</article>
			</div>
		)	
  	}else {
  		return <div>loading...</div>
  	}
  }

  // React 组件渲染出来后触发
  componentDidMount() {
  	const { DispatchActions } = this.props
  	DispatchActions()
  }

  render() {
  	const { DynamicState } = this.props
    return (
      <div className="DyNavContent">
        <div style={{height:"30px"}}></div>
      	{this.ShowList(DynamicState)}
		<div className="MoreDyNav">
			<i></i>
			<div></div>
			<a>加载更多...</a>
		</div>
      </div>
    )
  }
}

// 获取到 Store 里面的 state ，
// 并且绑定到 React 的 this.props ，
// 并且监听 Store 里面的这个 state 。
function mapStateToProps(state) {
  return {
    DynamicState : state.TimelineDynamicReducer
  }
}

// 绑定事件
function mapDispatchToProps(dispatch) {
  return {
    DispatchActions: () => dispatch(DynamicAction())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(TimelineDynamic)
