import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GuestsMessage from './../../../actions/actions.js'


class GuestsPrintTrace extends Component {
  constructor(props) {
    super(props)
    this.ShowList = this.ShowList.bind(this)

  }

  ShowList(data) {
  	var Show = {};
  	function isEmptyObject(obj) {
	  for (var key in obj) {
	    return true;
	  }
	  return false;
	}
	if (isEmptyObject(data)) {
		return data.map((data, i) =>
			<div key={i} className="GMList">
				<img src={"image/"+data.image} />
				<div>
					<div className="GMListTop">
						<p>
							{data.GuestName}
							<span>{data.Property}</span>
							<a><span>{data.Types}</span>{data.TypesTitle}</a>
						</p>
						<div>{data.Time}</div>
					</div>
					<div className="GMListMid">{data.Content}</div>
					<div className="GMListbot">
						<p><span>#{i+1}</span>赞(0)<a>回复</a></p>
					</div>

					<div className="GMListReply" style={{display:data.Replyjudge}}>
						<img src={"image/"+data.Replyimage} style={{width:"45px",height:"45px"}} />
						<div>
							<div className="GMListReplyTop">
								<p>督心杰杰<span>回复</span>{data.GuestName}<span>:</span>{data.Reply}</p>
							</div>
							<div className="GMListReplyBot">
								<p><span>{data.Replytime}</span>赞(0)<a>回复</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)

		//  渲染json数据，成功	
		// 	var bbb = [
		// 		{ "firstName":"Bill" , "lastName":"Gates" },
		// 		{ "firstName":"George" , "lastName":"Bush" },
		// 		{ "firstName":"Thomas" , "lastName":"Carter" }
		// 	]
		// 	console.log(bbb)
		// return	bbb.map((post, i) => <li key={i}>{post.firstName}</li> )

	}else {
		return <div>loading...</div>
	}
  }

  //初始化渲染后触发
  componentDidMount() {
  	// 这里 this.props 就是除了上方组件传下来的 就是 store了
    const { ContentActions , GuestsMessage } = this.props
    ContentActions()
    // 为什么下方这样测试不出来，可能是因为异步了。 
    // console.log(Testreducer)
    // ContentActions()
    // console.log(Testreducer)
  }
  
  render() {
    const { ContentActions , GuestsMessage } = this.props
    // 测试 state 里面的数据
    // console.log(GuestsMessage)
    return (
    	<div className="GMtrace">
    		{this.ShowList(GuestsMessage)}
		</div>
    )
  }

}

function mapStateToProps(state) {
  /* postsByReddit 表示 store 数据库 的 state树 里面的 postsByReddit */
  //  const { Testreducer } = state;
  return {/*该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。如果你省略了这个参数，你的组件将不会监听 Redux store。*/
    GuestsMessage : state.GuestsMessage
  }
}

//下面需要的 action 创建函数
function editTodo(type, text) {
  return { type: 'ADD_TODO', text:'Read the docs' }
}
//这两个 acton 都是测试用的
function testGuestsMessage(type, data) {
  return { type: 'GET_GuestsMessage', data:'fetchGuestsMessage()' }
}

function mapDispatchToProps(dispatch) {
  return {
    //ContentActions : bindActionCreators(GuestsMessage, dispatch)
    ContentActions: () => dispatch(GuestsMessage())
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(GuestsPrintTrace)
// export default GuestsPrintTrace