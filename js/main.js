/*!
 * Re:jiejie (http://www.cwwtswua.com)
 * QQ:454766952
 * Establish on 15 June 2016 (https://github.com/cwwjie)
 */	
var ImagesNumber = 0,
	Pictures = 2;
window.onload = function() {
	SetSliSiz();
	MusicBox();
	SHIntroduction();
	var changeimg = setInterval("changeimg()",6000);

}


/*
 * 轮播图自适应浏览器 + img图片跟随鼠标移动
 */
function SetSliSiz() {
	var viewWidth = window.innerWidth,
		viewHeight = window.innerHeight,
		viewsize = $("#Slider"),
		imagesize = $("#SHBackground"),
		img = $("#backgroutimg"),
		realheight = Math.floor(viewWidth * 1080 / 1920);
		divheight = realheight - 720;

	if (viewWidth <= 1366 ) {
		viewsize.css("height","720px");
		imagesize.css("width","1366px");
		imagesize.css("height","768px");
		img.css("top","0px");
	}else if (viewWidth > 1366) {
		viewsize.css("height","720px");
		imagesize.css("width",viewWidth);
		imagesize.css("height",realheight);
		img.css("top",-(divheight/2));
	}
	// 这个会很烧内存，性能，没必要就屏蔽了
	// imagesize.mousemove(function (event) {
	// 	if (viewWidth > 1366) {
	// 		var imgtop =event.offsetY * divheight / 720;
	// 		console.log(event.offsetX +"+"+ event.offsetY)
	// 		img.css("top",-imgtop);
	// 	}
	// })
	
	img.css("background-image","url(./image/BG1980_1024_1.jpg)");
}


/*
 * 自动更新图片
 */
function changeimg() {
	var Picture = Pictures - 1 ;
	if (ImagesNumber < Picture) {
		ImagesNumber++;
		$("#backgroutimg").css("background-image","url(./image/BG1980_1024_"+ImagesNumber+".jpg)");
	} else {
		ImagesNumber=0;
		$("#backgroutimg").css("background-image","url(./image/BG1980_1024_"+ImagesNumber+".jpg)");
	}
 } 

/*
 * 个人介绍旋转
 */
function SHIntroduction () {
	var btn =document.getElementById("SHIntroduction"),
	    btnFront =document.getElementById("SHIntroduction-front"),
		btnBack =document.getElementById("SHIntroduction-back");


	btnFront.addEventListener( 'click', function( event ) {
		var mx = event.clientX - btn.offsetLeft,
			my = event.clientY - btn.offsetTop;

		var w = btn.offsetWidth,
			h = btn.offsetHeight;

		var directions = [
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
			$("#SHIntroduction").css("top","320px");
			$("#SHIntroduction-back").css("display","block");
			$("#SHIntroduction-front").css("display","none");
		},300)
	});


	btnBack.addEventListener( 'click', function( event ) {
		btn.classList.remove( 'is-open' );
		setTimeout(function () {
		$("#SHIntroduction").css("top","420px");
		$("#SHIntroduction-back").css("display","none");
		$("#SHIntroduction-front").css("display","block");
		},300)
	});

	function distance( x1, y1, x2, y2 ) {
		var dx = x1-x2;
		var dy = y1-y2;
		return Math.sqrt( dx*dx + dy*dy );
	}

	$("#SHTitle a").mouseover(function (event) {
		var Left = event.offsetX - 81 ;
		var topp = event.offsetY + 5;
		//下面四个 $("#SHTitle div") 其实很烧性能最好就是 var
		$("#SHTitle div").css("top",topp);
		$("#SHTitle div").css("left",Left);
		$("#SHTitle div").css("display","block");
		$("#SHTitle div").css("opacity","1");
		console.log(event.offsetX)
		console.log(event.offsetY)
		setTimeout(function () {
			// $("#SHTitle div").css("display","none");
			$("#SHTitle div").css("opacity","0");
		},1000)
	});
}

/*
 * 个音乐的按键
 */
function MusicBox() {
	var MusicPlay = $("#MusicPlay");
	var playnoly = $("#play-noly");
	var playnoly2 = $("#play-noly2");

	//这个是鼠标移入移出播放的
	MusicPlay.mouseover(function(){
		playnoly.attr({src:"image/CirclesSelect.svg", class:"play-noly"});
		console.log("mouseover");
	})
	MusicPlay.mouseout(function(){
		var PP = playnoly2.attr("title");
		if (PP == "Playing") {
			playnoly.attr({src:"image/FullCircles.svg", class:"Stop_Circles"});
		}
		console.log("mouseout");
	})

	//这个是点击播放的
	MusicPlay.click(function(){
		var PP = playnoly2.attr("title");
		if (PP == "Playing") {
			playnoly2.attr("src","image/StopNoly.svg");
			playnoly2.attr("title","HerePause");
		}else {
			playnoly2.attr("src","image/PlayNoly.svg");
			playnoly2.attr("title","Playing");
		}
		console.log(PP+"MusicPlay bi click")
	})

	//点击出现下滑菜单
	$("#MusicBoxBackground").click(function(event){
		event.stopPropagation();
		event.preventDefault();
		var MusicClick = $("#MusicList");
		var testthis = MusicClick.css("display");
		console.log(testthis);
		if (testthis == "none") {
			MusicClick.css("display","block");
		}else {
			MusicClick.css("display","none");
		}
	})
}