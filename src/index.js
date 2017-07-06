import React from 'react';
import ReactDOM from 'react-dom';
import NavHeard from './NavHeard.js';
import Swiper from './Swiper.js';
import Main from './Main.js';
import Bottom from './Bottom.js';

// let _data = {identify:'1XZZcZeleFD2pplD'};
// fetch("http://localhost:3193/Home/getDetail",{
// 	method: 'POST',
// 	headers:{
// 		'Accept': 'application/json',
// 		"Content-Type":"application/json"
// 	},
// 	body:JSON.stringify(_data)
// }).then(function(res){
//     return res.json()
// }).then(function(value){
// 	console.log(value)
// })

const App = () => (
  <div>
    <NavHeard/>
    <Swiper/>
    <Main/>
    <Bottom/>
  </div>
);
 
ReactDOM.render(
  <App />,
  document.getElementById('root')
);