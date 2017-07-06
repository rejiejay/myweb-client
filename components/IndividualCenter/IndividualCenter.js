import React, { Component } from 'react'

/* ref DOM用法
 * onClick 绑定事件
 * 
 */

class IndividualCenter extends Component {
  constructor(props,) {
    super(props,)
    this.state = { 
    	opacity: 1.0,
    	divv:<div></div>
    }
    this.incrementAsync = this.incrementAsync.bind(this)
    this.playVid = this.playVid.bind(this)
    this.pauseVid = this.pauseVid.bind(this)

  }

  incrementAsync() {
  	console.log('1')
  	this.state.divv.play()
  }

  playVid(){
  	this.refs.musicaudio.play()
  }
  pauseVid(){
  	this.refs.musicaudio.pause()
  }

  componentDidMount() {

    //alert("OK");
    this.setState({divv:<audio src="/music/The_former_handwriting_Jay.mp3" controls></audio>});
  }
  render() {
    return (
      <div className="reconstruction" >
        <img src="image/reconstruction.jpg" />
      </div>
    )
  }
}


export default IndividualCenter