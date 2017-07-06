import React, { Component } from 'react'
import { Link } from 'react-router'

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.SHIntroductionF = this.SHIntroductionF.bind(this)
    this.SHIntroductionB = this.SHIntroductionB.bind(this)
    this.SHTitle = this.SHTitle.bind(this)

  }
/*
 * 鼠标移入-进入个人中心
 */
  SHTitle(event) {
    var Left = 105 - 81 ,
		topp = 212 + 5,
		SHTD = this.refs.SHTitleDiv

	SHTD.style.top = topp + "px"
	SHTD.style.left = Left + "px"
	SHTD.style.display = "block"
	SHTD.style.opacity = "1"

	setTimeout(function () {
		SHTD.style.opacity = "0"
	},1000)
  }


/*
 * 前方-点击旋转
 */
  SHIntroductionF(event){
  	//下面会用到的方法
  	function distance( x1, y1, x2, y2 ) {
		var dx = x1-x2;
		var dy = y1-y2;
		return Math.sqrt( dx*dx + dy*dy );
	}

  	var btn = this.refs.SHIntroduction,
  		SHB = this.refs.SHIntroductionBack,
  		SHF = this.refs.SHIntroductionFront,
  		mx = event.clientX - btn.offsetLeft,
		my = event.clientY - btn.offsetTop,
		w = btn.offsetWidth,
		h = btn.offsetHeight,
		directions = [
			{ id: 'top', x: w/2, y: 0 },
			{ id: 'right', x: w, y: h/2 },
			{ id: 'bottom', x: w/2, y: h },
			{ id: 'left', x: 0, y: h/2 }
		];

	directions.sort( function( a, b ) {
		return distance( mx, my, a.x, a.y ) - distance( mx, my, b.x, b.y );
	} );
	
	btn.setAttribute( 'data-direction', directions.shift().id );
	btn.classList.add( 'is-open' );

	setTimeout(function () {
		btn.style.top = "320px";
		SHB.style.display = "block";
		SHF.style.display = "none";
	},300)
  }
/*
 * 后方-点击旋转
 */
  SHIntroductionB(event){
  	var btn = this.refs.SHIntroduction,
  		SHB = this.refs.SHIntroductionBack,
  		SHF = this.refs.SHIntroductionFront;

  	btn.classList.remove( 'is-open' );

	setTimeout(function () {
		btn.style.top = "420px";
		SHB.style.display = "none";
		SHF.style.display = "block";
	},300)
  }

/*
 * 轮播图自适应浏览器 + img图片跟随鼠标移动
 * 	  1.获取外部样式IE用 currentStyle 其他的用 getComputedStyle ，所以要重写个方法。
 *    2.修改外部样式是不可能的，所以用 react 里面的 Style 就好。
 * 
 * 因为是只执行一次，而且组件也渲染出来了，所以 componentDidMount 用document.getElementById 是可以的。
 */
  componentDidMount() {
	//兼容获取非行间样式
	function getClass(obj,name){
		if(obj.currentStyle){
			return obj.currentStyle[name];//IE下获取非行间样式
		} else {
			return getComputedStyle(obj,false)[name];//FF、Chorme下获取费行间样式
		}
	}
	var viewWidth = window.innerWidth,
		viewHeight = window.innerHeight,
		viewsize = this.refs.Slider,
		imagesize = this.refs.SHBackground,
		img = this.refs.backgroutimg,
		Tem = 0,
		realheight = Math.floor(viewWidth * 1080 / 1920),
		divheight = realheight - 720;
	//viewsize.style.height="10px"
	if (viewWidth <= 1366 ) {
		viewsize.style.height = "720px"
		imagesize.style.width = "1366px"
		imagesize.style.height = "768px"
		img.style.top = "0px"
	}else if (viewWidth > 1366) {
		viewsize.style.height = "720px"
		imagesize.style.width = viewWidth + "px"
		imagesize.style.height = realheight + "px"
		Tem = -(divheight/2)
		img.style.top=Tem + "px"
	}	
	//下方这个是测试
	//console.log(getClass(this.refs.Slider,"height"))//成功获取

  }

  render() {
    return (
    <section className="Slider" id="Slider" ref="Slider">
		<div className="Slider_container">
			<section className="Slider-Home">
				<div className="SHBackground" ref="SHBackground">
					<div>
						<svg width="270px" height="270px" viewBox="0 0 66 66" >
						   <circle fill="none" strokeWidth="0.5" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
						</svg>
					</div>
					<article className="backgroutimg" id="backgroutimg" ref="backgroutimg"></article>
				</div>
				<div className="SHTitle" id="SHTitle" onMouseEnter={this.SHTitle}>
					<Link to="/IndividualCenter" ><img src="./image/Title240.png"/></Link>
					<div ref = "SHTitleDiv" >点击进入个人中心</div>
				</div>
				<div className="SHIntroduction" id="SHIntroduction" ref="SHIntroduction">
					<div className="SHIntroduction-front" id="SHIntroduction-front" ref="SHIntroductionFront" onClick={this.SHIntroductionF}>
						<h3>欢迎来到 "Re杰杰" 的个人网站</h3>
						<p>To stay with you always.You're the world to me, and dreaming on.</p>
						<p>So you can take my sword for you.</p>
					</div>
					<div className="SHIntroduction-back" id="SHIntroduction-back" ref="SHIntroductionBack" onClick={this.SHIntroductionB}>
						<h2>曾杰</h2>
						<article>这是一位喜欢游戏，动漫，摄影，会编程的设计师 =￣ω￣=</article>
						<p><i className="icos"></i>工业设计·广东石油化工学院</p>
						<p><i className="icos" style={{backgroundPosition:"-32px 0px"}} ></i>男&nbsp;&nbsp;22岁&nbsp;&nbsp;本科&nbsp;&nbsp;前端开发&nbsp;&nbsp;深圳</p>
						<p><i className="icos" style={{backgroundPosition:"-16px 0px"}} ></i>15976713287&nbsp;&nbsp;<i className="icos" style={{backgroundPosition:"-48px 0px"}}></i>454766952@qq.com</p>
						<div className="WebIco">
							<a className="icos" style={{backgroundPosition:"0px -16px"}} href="https://www.quora.com/profile/Karen-KuJou" target="view_window"></a>
							<a className="icos" style={{backgroundPosition:"-32px -16px"}} href="https://github.com/cwwjie" target="view_window"></a>
							<a className="icos" style={{backgroundPosition:"-64px -16px"}} href="https://www.zhihu.com/people/ceng-jie-3-87" target="view_window"></a>
							<a className="icos" style={{backgroundPosition:"-96px -16px"}}  href="http://454766952.lofter.com/" target="view_window"></a>
							<a className="icos" style={{backgroundPosition:"-128px -16px"}} href="http://user.qzone.qq.com/454766952/" target="view_window"></a>
							<a className="icos" style={{backgroundPosition:"-160px -16px"}}  href="https://segmentfault.com/u/cwwtswua" target="view_window"></a>
						</div>
					</div>
				</div>
			</section>
			<section className="Slider-Individual">
			</section>
			<section className="Slider-Sky">
			</section>
		</div>
		<div className="Slider-button">
				<a className="leftNav" href="#"><i className="icos" style={{backgroundPosition:"0px -48px"}} ></i></a>
				<a className="RightNav" href="#"><i className="icos" style={{backgroundPosition:"-32px -48px"}} ></i></a>
				<div className="NavBtn">
					<a href="#"></a>
					<a href="#"></a>
					<a href="#"></a>
				</div>
		</div>
		</section>
    )
  }

}


export default Slider