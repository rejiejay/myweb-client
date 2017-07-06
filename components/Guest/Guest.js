import React, { Component } from 'react'

import {Router, Route, hashHistory, IndexRoute } from 'react-router'


class BlogApp extends Component {render() {
return (
	<div><link to = "/signIn">登陆</link></div>
)}}
class SignIn extends Component {render() {
	return (
		<h1>登陆成功！<link to = "/signOut">跳转</link></h1>
)}}
class SignOut extends Component {render() {
return (
	<h1>退出登陆！<link to = "/">返回首页</link></h1>
)}}


class Guest extends Component {

  render() {
    return (
      <div className="reconstruction" >
        <img src="image/reconstruction.jpg" />
      </div>
    )
  }
}


export default Guest