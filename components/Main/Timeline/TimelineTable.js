import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'


class TimelineTable extends Component {
  constructor(props,) {
    super(props,)
    this.state = { 
    }
    this.ShowYWZ = this.ShowYWZ.bind(this)
    this.PostData = this.PostData.bind(this)
    this.ImageChange = this.ImageChange.bind(this)
  }
  /* 显示加载图片 */
  ImageChange(){
    this.refs.showimage.style.background="url(./../image/ImageSuccess.png)"
  }
  /* 显示颜文字 */
  ShowYWZ() {
  	var check = this.refs.biaoqing_box.style.display;
  	if (check=="block") {
  		this.refs.biaoqing_box.style.display="none";
  	}else {
  		this.refs.biaoqing_box.style.display="block";
  	}
  }
  /* 向服务器发起 Post 请求 */
  PostData(){
    if (this.refs.title.value.length == 0 ) {
      alert("标题不能为空噢(°∀°)ﾉ");
      return
    }else if (this.refs.content.value.length == 0) {
      alert("内容不能为空呢(〜￣△￣)〜");
      return
    }
    var data = {},
        dateObj=new Date(),
        year=dateObj.getFullYear(),
        Month=dateObj.getMonth(),
        date=dateObj.getDate();
    if (this.refs.time.value.length !== 0) {
      if (this.refs.time.value.length !== 11) {
        alert("╮(￣▽￣)╭请输入正确的日期格式(20XX年XX月XX日)这很重要哒");
        return
      }
    }else {
      if (Month < 10) {
        Month = "0" + Month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      data.Time = year+"年"+Month+"月"+date+"日";
    }
    if (this.refs.image.files[0] == undefined ) {
      data.Image = ""
    }else {
      data.Image ="TimelineFilesImg/"+this.refs.image.files[0].name;
      this.refs.SaveImage.click()
    }
    data.Title = this.refs.title.value
    data.Content = [];
    data.Content[0] = this.refs.content.value;
    data.Up = "0";
    data.Read = "0";
    data.Comment = "0";
    fetch('/Dynamic', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(json) {
      alert("恭喜你成功发布动态(●￣(ｴ)￣●)")
      location.reload();
    }).catch(function(ex) {
      console.log('上传失败', ex)
    })
  }

  render() {
    return (
		<div className="DyNamicform" >
			<input ref="title" className="DYtitle" type="text" placeholder="点击这里添加今天的标题" name="dynamic" />
			<input ref="time" className="DYtime" type="text" name="dynamic" placeholder="20XX年XX月XX日" />
			<textarea ref="content" name="dynamic" placeholder="记录我的生活,无论过去还是未来..."></textarea>
      <form action="/uploadimage" method="post" className="addimageform" encType="multipart/form-data">
        <input onChange={this.ImageChange} ref="image" style={{display:"none"}} name="fulAvatar" id="image" type="file" accept="image/*" />
        <label htmlFor="image" ref="showimage" className="addimage"></label>
        <input ref="SaveImage" style={{display:"none"}} type="submit" value="上传"/>
			</form>
      <div ref="biaoqing_box" className="biaoqing_box">
			<a>(⌒▽⌒)</a><a>（￣▽￣）</a><a>(=・ω・=)</a><a>(｀・ω・´)</a><a>(〜￣△￣)〜</a><a>(･∀･)</a><a>(°∀°)ﾉ</a><a>(￣3￣)</a><a>╮(￣▽￣)╭</a><a>( ´_ゝ｀)</a><a>←_←</a><a>→_→</a><a>(&lt;_&lt;)</a><a>(&gt;_&gt;)</a><a>(;¬_¬)</a><a>("▔□▔)/</a><a>(ﾟДﾟ≡ﾟдﾟ)!?</a><a>Σ(ﾟдﾟ;)</a><a>Σ( ￣□￣||)</a><a>(´；ω；`)</a><a>（/TДT)/</a><a>(^・ω・^ )</a><a>(｡･ω･｡)</a><a>(●￣(ｴ)￣●)</a><a>ε=ε=(ノ≧∇≦)ノ</a><a>(´･_･`)</a><a>(-_-#)</a><a>（￣へ￣）</a><a>(￣ε(#￣) Σ</a><a>ヽ(`Д´)ﾉ</a><a>(╯°口°)╯(┴—┴</a><a>（#-_-)┯━┯</a><a>_(:3」∠)_</a><a>(笑)</a><a>(汗)</a><a>(泣)</a><a>(苦笑)</a>
			</div>
			<a onClick={this.ShowYWZ} className="ywz">(・ω・) 颜文字</a>
			<input onClick={this.PostData}  className="DYsubmit" type="button" value="发布动态"  />
			<input className="DYlocation" type="text" placeholder="请输入地点" name="dynamic"/>
		</div>
    )
  }

}


export default TimelineTable