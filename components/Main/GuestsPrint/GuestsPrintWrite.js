import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'


class GuestsPrintWrite extends Component {
  constructor(props){
    super(props)
    this.GuestsWrite = this.GuestsWrite.bind(this)
  }
  
  //获取 input 数据，向服务器 Post 数据，并且完成后，请求更新DOM。
  GuestsWrite () {
    if ( this.refs.GueMsg.value.length == 0 ) {
      alert("留言的内容不能为空噢(°∀°)ﾉ");
      return
    }
    var data = {},
        name=prompt("可以留下你的名字吗(｡･ω･｡)",""),
        Random = Math.floor(Math.random() * 9) + 1,
        dateObj=new Date(),
        year=dateObj.getFullYear(),
        Month=dateObj.getMonth(),
        date=dateObj.getDate(),
        Hours=dateObj.getHours(),
        Minutes=dateObj.getMinutes();
    if (name!=null && name!=""){
      data.GuestName = name;
    }else {
      data.GuestName = "匿名用户";
    }
    data.image = "GuestImage/HeadPortrait ("+Random+").jpg";
    data.Property = "留言";
    data.Types = "";
    data.TypesTitle = "";
    data.Time= year+"-"+Month+"-"+date+" "+Hours+":"+Minutes;
    data.Content = this.refs.GueMsg.value;
    data.Replyjudge = "none";

    // 测试上传的json数据
    // console.log(data)

    // var json = {key:"value"};
    // var data = JSON.stringify(json);
    // var xmlhttp=new XMLHttpRequest();
    // xmlhttp.open("POST","http://localhost:3200/",true);
    // xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    // xmlhttp.send(data);

  // fetch 跨域
    // fetch('http://localhost:3200/', {
    //   method: 'POST',
    //   mode: "no-cors",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: "name=Hubot&login=hubot"
    // })

  //成功
  fetch('/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function(json) {
    alert("恭喜你成功留言(●￣(ｴ)￣●)")
    location.reload();
  }).catch(function(ex) {
    console.log('上传失败', ex)
  })


  }

  render() {
    return (
      <div className="GMwrite">
		<div>
			<input ref="GueMsg" type="text" placeholder="来说两句吧" />
			<i></i>
		</div>
		<a onClick={this.GuestsWrite}>留&nbsp;&nbsp;言</a>
      </div>
    )
  }

}




export default GuestsPrintWrite