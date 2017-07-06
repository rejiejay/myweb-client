import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import store from './../store/store'
import Navbar from './../components/Navbar.js'
import Main from './../components/Main/Main'
import IndividualCenter from './../components/IndividualCenter/IndividualCenter'
import Blog from './../components/Blog/Blog'
import Menu from './../components/Menu/Menu'
import Guest from './../components/Guest/Guest'


render(
	<Provider store={store}>
		<Router history = {hashHistory}>
			<Route path='/' component={Navbar} >
				<IndexRoute component={Main}/>
				<Route path="/IndividualCenter" component={IndividualCenter}/>
				<Route path="/Blog" component={Blog}/>
				<Route path="/Menu" component={Menu}/>
				<Route path="/Guest" component={Guest}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);