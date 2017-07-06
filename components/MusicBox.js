import React, { Component } from 'react'

/* style 的样式 
 *
 * 正式上线时候，歌曲的src要换
 * 切换歌用的是 preload 属性
 * 
 */



class MusicBox extends Component {
  constructor(props,) {
    super(props,)
    this.state = { 
      display:"none",
      cursor:"help",
      length:0
    }
    this.PlayMusic = this.PlayMusic.bind(this)
    this.StopMusic = this.StopMusic.bind(this)
    this.ClickMusic = this.ClickMusic.bind(this)
    this.MusicList = this.MusicList.bind(this)
    this.ShowAudio = this.ShowAudio.bind(this)
  }
  ShowAudio(){
    this.refs.AudioPlay.style.src = '/music/Stay Alive.mp3'
    this.refs.AudioPlay.style.src
  }
  /*鼠标移入播放动画*/
  PlayMusic() {
    console.log(this.refs.playnolyO.src)
    this.refs.playnolyO.src = "image/CirclesSelect.svg"
    this.refs.playnolyO.className = "play-noly"
  }
  /*鼠标移出暂停动画*/
  StopMusic() {
    var Tem = this.refs.playnolyT.title
    if (Tem == "Playing") {
      this.refs.playnolyO.src = "image/FullCircles.svg"
      this.refs.playnolyO.className = "Stop_Circles"
    }
  }
  /*这个是点击播放的*/
  ClickMusic() {
    var Tem = this.refs.playnolyT.title
    if (Tem == "Playing") {
      this.refs.AudioPlay.play()
      this.refs.playnolyT.src="image/StopNoly.svg"
      this.refs.playnolyT.title="HerePause"
    }else {
      this.refs.playnolyT.src="image/PlayNoly.svg"
      this.refs.playnolyT.title="Playing"
      this.refs.AudioPlay.pause()
    }
  }
  /*这个是显示播放的*/
  MusicList(){
    console.log(this.state.display)
    if (this.state.display == "none") {
      this.setState({
        display:"block",
        cursor:"default"
      })
    }else {
      this.setState({
        display:"none",
        cursor:"help"
      })
    }
    
  }
  componentDidMount() {
    this.ShowAudio()
  }
  render() {
    return (
        <div className="Music-Box" id="Music-Box">
        {this.ShowAudio}  
        <audio src="" ref="AudioPlay" autoPlay controls></audio>

    	  <div className="MusicBoxBackground" style={{cursor:this.state.cursor}} onClick={this.MusicList}  id="MusicBoxBackground"></div>
          <a className="Fore-Music" >
            <img src="image/playlast-noly.png"/>
          </a>


          <a className="Play-Music" id="MusicPlay" onMouseEnter={this.PlayMusic} onClick={this.ClickMusic} onMouseLeave={this.StopMusic}>


            <img className="Stop_Circles" id="play-noly" ref="playnolyO"src="image/FullCircles.svg"/>
            <img className="play-noly2" id="play-noly2" ref="playnolyT"src="image/PlayNoly.svg" title="Playing"/>
          </a>
          <a className="Next-Music">
            <img src="image/playnext-noly.png"/>
          </a>


          <div style={{display:this.state.display}}  className="MusicList" id="MusicList">


            <ul>
              <li><a  href="#"><span className="MusicListFirstSpan">手写的从前-周杰伦<img src="image/Music.png"/></span></a></li>
              <li><a  href="#"><span>一路向北-周杰伦<img src="image/Music.png"/></span></a></li>
              <li><a  href="#"><span>彩虹-周杰伦<img src="image/Music.png"/></span></a></li>
              <li><a  href="#"><span>不能说的秘密-周杰伦<img src="image/Music.png"/></span></a></li>
              <li><a  href="#" className="MusicListselectSpan">查看更多</a></li>
            </ul>
          </div>
        </div>
  )}
}





export default MusicBox