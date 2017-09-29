import React, {Component} from 'react';
import assign from 'lodash.assign';
import TimestampTo20xx_xx_xx from './method/TimestampTo20xx_xx_xx.js';

import Scroll from 'react-scroll';//https://github.com/fisshy/react-scroll/

const Link       = Scroll.Link;
const Element    = Scroll.Element;
const Events     = Scroll.Events;
const scroll     = Scroll.animateScroll;
const scrollSpy  = Scroll.scrollSpy;






class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence:'time',
      Cover:'none',
      position:'absolute',// 这个改为 DOM
      Code:[],
      Design:[],
      Article:[],
      Codelength:[],
      Designlength:[],
      Articlelength:[]
    };
  }
  componentDidMount() {
    const _this = this;
    scrollSpy.update();
    window.onscroll = function (event) {
      if (document.body.scrollTop > 580) {
        if (_this.state.position == 'absolute') {_this.setState({position:'fixed'})}
      }else { 
        if (_this.state.position == 'fixed') {_this.setState({position:'absolute'})}
      }
    }
    // 请求代码
    // 生产环境记得 http://localhost:3193/ 替换 http://119.29.140.46:3193/
    fetch("http://119.29.140.46:3193/Home/getCode",{
        method: 'GET'
    }).then(function(res){
        return res.json()
    }).then(function(data){
      if (data.state == 1 ) {
        // 储存导航部分
        let _state = assign({},_this.state),
          _Array = [];
        for (let i = 0; i < data.result.length; i++) {
          if (data.result[i].data.length > 3) {
            _Array.push(3);
          }else {
            _Array.push(data.result[i].data.length);
          }
        }
        _state.Code = data.result;
        _state.Codelength = _Array;
        _this.setState(_state);
      }else {
        alert("请求代码数据错误")
      }
    })
    // 请求文章
    fetch("http://119.29.140.46:3193/Home/getArticle",{
        method: 'GET'
    }).then(function(res){
        return res.json()
    }).then(function(data){
      if (data.state == 1 ) {
        // 储存导航部分
        let _state = assign({},_this.state),
          _Array = [];
        for (let i = 0; i < data.result.length; i++) {
          if (data.result[i].data.length > 3) {
            _Array.push(3);
          }else {
            _Array.push(data.result[i].data.length);
          }
        }
        _state.Article = data.result;
        _state.Articlelength = _Array;
        _this.setState(_state);
      }else {
        alert("请求代码数据错误")
      }
    })
    // 请求设计
    fetch("http://119.29.140.46:3193/Home/getDesign",{
        method: 'GET'
    }).then(function(res){
        return res.json()
    }).then(function(data){
      if (data.state == 1 ) {
        // 储存导航部分
        let _state = assign({},_this.state),
          _Array = [];
        for (let i = 0; i < data.result.length; i++) {
          if (data.result[i].data.length > 3) {
            _Array.push(3);
          }else {
            _Array.push(data.result[i].data.length);
          }
        }
        _state.Design = data.result;
        _state.Designlength = _Array;
        _this.setState(_state);
      }else {
        alert("请求代码数据错误")
      }
    })
  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  scrollToBottom() {
    scroll.scrollToBottom();
  }
  render() {
    return (
      <div>
        <div style={{position:'relative'}}>
          <div className='Buffer' style={{position:this.state.position}}>
            <div className='row'>
              <div className='col-2'/>
              <div className='col-8 content'>
                <div className='left'>
                  {/*<div className='sculpture Icon'></div>*/}
                  <div className='week Icon Selected'></div>
                  <div className='month Icon Selected'></div>
                  <div className='year Icon Selected'></div>
                  <div className='allOfThem Icon Selected activatOfThem'></div>
                </div>
                <div className='middle'>2011-04-22</div>
                <div className='right'>
                  <select value={this.state.sequence} onChange={function(event){
                    this.setState({sequence:event.target.value})
                   }.bind(this)} className='Selected'>
                    <option value="time">时间</option>
                    <option value="read">阅读</option>
                    <option value="like">赞同</option>
                  </select>
                  <div className='addItem Selected' onClick={function(){
                      this.setState({Cover:'block'})
                  }.bind(this)}>+</div>
                  <div className='sculpture Icon'></div>
                  <div className='Cover' style={{display:this.state.Cover}} onClick={function(){
                      this.setState({Cover:'none'})
                  }.bind(this)}></div>
                  <div className='menu Selected' style={{display:this.state.Cover}}>
                    <div className="item Selected">添加 Code</div>
                    <div className="item Selected">添加 Design</div>
                    <div className="item Selected">添加 Article</div>
                  </div>
                </div>
              </div>
              <div className='col-2'/>
            </div>
          </div>
          <div className='Main' style={{minWidth: '1080px'}}>
            <div className='col-2'/>
              <div className='col-8 content'>
                <div className={'Nav ' + this.state.position}>
                  <div className='nav-header row'>代码</div>
                  {this.state.Code.map((value,key) => (
                    <Link className='nav-ordinary row' key={key} to={value.label} smooth={true} offset={-50} duration={500}>{value.label}</Link>
                  ))}
                  <div className='nav-header row'>设计</div>
                  {this.state.Design.map((value,key) => (
                    <Link className='nav-ordinary row' key={key} to={value.label} smooth={true} offset={-50} duration={500}>{value.label}</Link>
                  ))}
                  <div className='nav-header row'>文章</div>
                  {this.state.Article.map((value,key) => (
                    <Link className='nav-ordinary row' key={key} to={value.label} smooth={true} offset={-50} duration={500}>{value.label}</Link>
                  ))}
                  <div className='nav-header row'>留言</div>
                </div>
                <div className='Content'>




                  {this.state.Code.map(function(value,key){
                    return <Element key={key} name={value.label}>
                      <div className="title"><div>{value.label}</div></div>
                      {RenderCode(value.data,key,this)}
                    </Element>
                  }.bind(this))}




                  {this.state.Design.map((value,key) => (
                    <Element key={key} name={value.label}>
                      <div className="title"><div>{value.label}</div></div>
                      {RenderDesign(value.data,key,this)}
                    </Element>
                  ))}




                  {this.state.Article.map((value,key) => (
                    <Element key={key} name={value.label}>
                      <div className="title"><div>{value.label}</div></div>
                      {RenderArticle(value.data,key,this)}
                    </Element>
                  ))}



                </div>
              </div>
            <div className='col-2'/>
          </div>
        </div>
        <div className='clearFloat'></div>
{/*<div>
  <a onClick={this.scrollToTop}>To the top!</a>
  <a onClick={this.scrollToBottom}>To the bottom!</a>
</div>*/}
      </div>
    );
  }
}
export default Main






// 渲染 一个 “block”
  // 渲染 Code
  function RenderCode(value,key,_this) {
    let _data = [];
    for (let i = 0; i < _this.state.Codelength[key]; i++) {
      _data.push(
        <div key={i} className='block'>
          <div className='block-content'>
            <div className='Main-Title'>{value[i].title}</div>
            <div className='Sub-Title'> {TimestampTo20xx_xx_xx(value[i].time)} / {value[i].label} / {value[i].read} Reading amount  </div>
            <div className='row line'></div>
            <div className='row'>{renderValueImage(value[i].image)}</div>
            <div className='Main-content' id={'detail'+value[i].identify} data-read="brief">
              {value[i].content.brief}
            </div>
            <div className='Main-Bottom'>
              <div className='Left'>
                <span className="Selected" id={'codelike'+value[i].identify} onClick={function(){
                  likePlus(value[i].identify,'code',value[i].like);
                  readPlus(value.identify,'code');
                }}>{value[i].like} 赞</span> · <span onClick={function(){
                  readPlus(value[i].identify,'code');
                }}>
                <a className="Selected" href={value[i].example} target='_blank'>查看示例</a>
                </span> · <span onClick={function(){
                  readPlus(value[i].identify,'code');
                }}>
                <a className="Selected" href={value[i].github} target='_blank'>源码</a>
                </span>
                </div>
              <div className='Right Selected' id={'Show'+value[i].identify} onClick={function(){
                RenderDetail(value[i].identify,value[i].content.brief,'code');
              }}>查看所有</div>
            </div>
          </div>
          <div className="triangle"></div>
          <div className="dayTime">{renderValueDay(value[i].time)}</div>
          <div className="monthTime">{renderValueMonth(value[i].time)}</div>
        </div>
      );
    }
    // 加载更多 + 3
    if ( _this.state.Codelength[key] < (value.length - 3) ) {
      _data.push(<div key={ _this.state.Codelength[key] + 1 } className="activatMore" onClick={function(){
        let _state = assign({},_this.state);
        _state.Codelength[key] = _state.Codelength[key] + 3;
        _this.setState(_state);
      }}><div className="FlatButton Selected">加载更多</div></div>)
    }else if ( _this.state.Codelength[key] >= (value.length - 3) && _this.state.Codelength[key] < value.length ) {
    // 加载更多 == 显示所有
      _data.push(<div key={ _this.state.Codelength[key] + 1 } className="activatMore" onClick={function(){
        let _state = assign({},_this.state);
        _state.Codelength[key] = value.length;
        _this.setState(_state);
      }}><div className="FlatButton Selected">加载更多</div></div>)
    }
    return _data;
  }
  // 渲染 Design
  function RenderDesign(value,key,_this) {
    let _data = [];
    for (let i = 0; i < _this.state.Designlength[key]; i++) {
      _data.push(
        <div key={i} className='block'>
          <div className='block-content'>
            <div className='Main-Title'>{value[i].title}</div>
            <div className='Sub-Title'> {TimestampTo20xx_xx_xx(value[i].time)} / {value[i].label} / {value[i].read} Reading amount  </div>
            <div className='row line'></div>
            <div className='row'>{renderValueImage(value[i].image)}</div>
            <div className='Main-content' id={'detail'+value[i].identify} data-read="brief">
              {value[i].content.brief}
            </div>
            <div className='Main-Bottom'>
              <div className='Left'>
                <span id={'designlike'+value[i].identify} className="Selected" onClick={function(){
                  readPlus(value[i].identify,'design');
                  likePlus(value[i].identify,'design',value[i].like);
                }}>{value[i].like} 赞</span> · <span>
                <a className="Selected" href={value[i].example} target='_blank' onClick={function(){
                  readPlus(value[i].identify,'design');
                }}>查看示例</a>
                </span>
                </div>
              <div className='Right Selected' id={'Show'+value[i].identify} onClick={function(){
                RenderDetail(value[i].identify,value[i].content.brief,'design')
              }}>查看所有</div>
            </div>
          </div>
          <div className="triangle"></div>
          <div className="dayTime">{renderValueDay(value[i].time)}</div>
          <div className="monthTime">{renderValueMonth(value[i].time)}</div>
        </div>
      );
    }
    // 加载更多 + 3
    if ( _this.state.Designlength[key] < (value.length - 3) ) {
      _data.push(<div key={ _this.state.Designlength[key] + 1 } className="activatMore" onClick={function(){
        let _state = assign({},_this.state);
        _state.Designlength[key] = _state.Designlength[key] + 3;
        _this.setState(_state);
      }}><div className="FlatButton Selected">加载更多</div></div>)
    }else if ( _this.state.Designlength[key] >= (value.length - 3) && _this.state.Designlength[key] < value.length ) {
    // 加载更多 == 显示所有
      _data.push(<div key={ _this.state.Designlength[key] + 1 } className="activatMore" onClick={function(){
        let _state = assign({},_this.state);
        _state.Designlength[key] = value.length;
        _this.setState(_state);
      }}><div className="FlatButton Selected">加载更多</div></div>)
    }
    return _data;
  }
  // 渲染 Article
  function RenderArticle(value,key,_this) {
    let _data = [];
    for (let i = 0; i < _this.state.Articlelength[key]; i++) {
      _data.push(
        <div key={i} className='block'>
          <div className='block-content'>
            <div className='Main-Title'>{value[i].title}</div>
            <div className='Sub-Title'> {TimestampTo20xx_xx_xx(value[i].time)} / {value[i].label} / {value[i].read} Reading amount  </div>
            <div className='row line'></div>
            <div className='row'>{renderValueImage(value[i].image)}</div>
            <div className='Main-content' id={'detail'+value[i].identify} data-read="brief">
              {value[i].content.brief}
            </div>
            <div className='Main-Bottom'>
              <div className='Left'>
                <span id={'articlelike'+value[i].identify} className="Selected" onClick={function(){
                  readPlus(value[i].identify,'article');
                  likePlus(value[i].identify,'article',value[i].like);
                }}>{value[i].like} 赞</span>
                </div>
              <div className='Right Selected' id={'Show'+value[i].identify} onClick={function(){
                RenderDetail(value[i].identify,value[i].content.brief,'article')
              }}>查看所有</div>
            </div>
          </div>
          <div className="triangle"></div>
          <div className="dayTime">{renderValueDay(value[i].time)}</div>
          <div className="monthTime">{renderValueMonth(value[i].time)}</div>
        </div>
      )
    }
    // 加载更多 + 3
    if ( _this.state.Articlelength[key] < (value.length - 3) ) {
      _data.push(<div key={ _this.state.Articlelength[key] + 1 } className="activatMore" onClick={function(){
        let _state = assign({},_this.state);
        _state.Articlelength[key] = _state.Articlelength[key] + 3;
        _this.setState(_state);
      }}><div className="FlatButton Selected">加载更多</div></div>)
    }else if ( _this.state.Articlelength[key] >= (value.length - 3) && _this.state.Articlelength[key] < value.length ) {
    // 加载更多 == 显示所有
      _data.push(<div key={ _this.state.Articlelength[key] + 1 } className="activatMore" onClick={function(){
        let _state = assign({},_this.state);
        _state.Articlelength[key] = value.length;
        _this.setState(_state);
      }}><div className="FlatButton Selected">加载更多</div></div>)
    }
    return _data;
}



// 请求
  // 点赞
  function likePlus(identify,collection,like) {
    const _DOM = document.getElementById(collection+'like'+identify),
      _data = {identify:identify,collection:collection},
      _like = like + 1;
    if (_DOM.getAttribute('data-already') == 'false') {
      return
    }
    _DOM.setAttribute('data-already','false');
    fetch("http://119.29.140.46:3193/Home/likePlus",{
     method: 'POST',
     headers:{
       'Accept': 'application/json',
       "Content-Type":"application/json"
     },
     body:JSON.stringify(_data)
    }).then(function(res){
        return res.json()
    }).then(function(value){
      if (value.status == 1 ) {
        _DOM.setAttribute('style','color: #3bb4f2;');
        _DOM.innerHTML = _like+' 赞';
        return
      }else {
        _DOM.setAttribute('style','color: red;');
        _DOM.setAttribute('data-already','true');
        return
      }
    })
  }
  // 阅读
  function readPlus(identify,collection) {
    const _data = {identify:identify,collection:collection};
    fetch("http://119.29.140.46:3193/Home/readPlus",{
     method: 'POST',
     headers:{
       'Accept': 'application/json',
       "Content-Type":"application/json"
     },
     body:JSON.stringify(_data)
    }).then(function(res){
        return res.json()
    }).then(function(value){
      if (value.status == 1 ) {
        console.log("read + 1")
        return
      }else {
        return
      }
    })
  }
  // 渲染细节
  function RenderDetail(identify,brief,type) {
    const RenderDOM = document.getElementById('detail' + identify),
      ShowDOM = document.getElementById('Show'+identify),
      _data = {identify:identify};
      console.log(RenderDOM.getAttribute('data-read'))
    if (RenderDOM.getAttribute('data-read') == 'brief') {
      readPlus(identify,type);
      RenderDOM.setAttribute('data-read','detail');
      ShowDOM.innerHTML = '收起';
      RenderDOM.innerHTML = '正在加载...';
      fetch("http://119.29.140.46:3193/Home/getDetail",{
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          "Content-Type":"application/json"
        },
        body:JSON.stringify(_data)
      }).then(function(res){
          return res.json()
      }).then(function(value){
        if (value.status == 1) {
          RenderDOM.innerHTML = value.result;
        }else {
          alert("加载失败，原因"+value.status);
          RenderDOM.innerHTML = brief;
        }
      })
      return
    }else {
      RenderDOM.setAttribute('data-read','brief');
      ShowDOM.innerHTML = '查看所有';
      RenderDOM.innerHTML = brief;
      return
    }
}




// 组件渲染的方法
  // 渲染图片
  function renderValueImage(image){
    if ( image == false ) {
      return ''
    }else {
      return <img src={image}/>
    }
  }
  // 渲染天
  function renderValueDay(time){
    const myDate = new Date(time),
      dayTime = myDate.getDate();
    let _string = '';
    if (dayTime < 10) {
      _string = '0' + dayTime
      return _string
    }else {
      _string = dayTime
      return _string
    }
  }
  // 渲染月份
  function renderValueMonth(time){
    const myDate = new Date(time),
      MonthTime = myDate.getMonth();
    let _string = '';
    if (MonthTime < 9) {
      _string = '0' + (MonthTime+1)
      return _string
    }else {
      _string = (MonthTime+1)
      return _string
    }
}

