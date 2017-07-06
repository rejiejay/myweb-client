/*!
 * Re:jiejie (http://www.cwwtswua.com)
 * QQ:454766952
 * Establish on 15 June 2016 (https://github.com/cwwjie)
 */

// window.onload = function() {
// 	var btn =document.getElementById("SHIntroduction"),
// 	    btnFront =document.getElementById("SHIntroduction-front"),
// 		btnBack =document.getElementById("SHIntroduction-back");


// 	btnFront.addEventListener( 'click', function( event ) {
// 		var mx = event.clientX - btn.offsetLeft,
// 			my = event.clientY - btn.offsetTop;

// 		var w = btn.offsetWidth,
// 			h = btn.offsetHeight;

// 		var directions = [
// 			{ id: 'top', x: w/2, y: 0 },
// 			{ id: 'right', x: w, y: h/2 },
// 			{ id: 'bottom', x: w/2, y: h },
// 			{ id: 'left', x: 0, y: h/2 }
// 		];

// 		directions.sort( function( a, b ) {
// 			return distance( mx, my, a.x, a.y ) - distance( mx, my, b.x, b.y );
// 		} );


// 		btn.setAttribute( 'data-direction', directions.shift().id );
// 		btn.classList.add( 'is-open' );
// 		setTimeout(function () {
// 		$("#SHIntroduction").css("top","320px");
// 		$("#SHIntroduction-back").css("display","block");
// 		$("#SHIntroduction-front").css("display","none");
// 		},300)
// 	});


// 	btnBack.addEventListener( 'click', function( event ) {
// 		btn.classList.remove( 'is-open' );
// 		setTimeout(function () {
// 		$("#SHIntroduction").css("top","420px");
// 		$("#SHIntroduction-back").css("display","none");
// 		$("#SHIntroduction-front").css("display","block");
// 		},300)
// 	});

// 	function distance( x1, y1, x2, y2 ) {
// 		var dx = x1-x2;
// 		var dy = y1-y2;
// 		return Math.sqrt( dx*dx + dy*dy );
// 	}

// };

// $("#SHTitle a").mouseover(function (event) {
// 	var Left = event.offsetX - 81 ;
// 	var topp = event.offsetY + 5;
// 	$("#SHTitle div").css("top",topp);
// 	$("#SHTitle div").css("left",Left);
// 	$("#SHTitle div").css("display","block");
// 	$("#SHTitle div").css("opacity","1");
// 	console.log(event.offsetX)
// 	console.log(event.offsetY)
// 	setTimeout(function () {
// 		// $("#SHTitle div").css("display","none");
// 		$("#SHTitle div").css("opacity","0");
// 	},1000)
// });
