import MusicBox from './MusicBox'

import React, { Component } from 'react'
import { Link } from 'react-router'


class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="nav_container">
            <div className="navbar-left">
              <Link to="/" className="Home_Logo" activeClassName="active">
                <svg>
                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                <img src="image/LOGO.png"/>
              </Link>
              <Link to="/IndividualCenter" className="IndividualCenter FlashShine" activeClassName="active"><span>个人中心</span></Link>
              <Link to="/Blog" className="Blog FlashShine" activeClassName="active"><span>博&nbsp;&nbsp;客</span></Link>
              <Link to="/Menu" className="Menu FlashShine" activeClassName="active"><span>点菜中心</span></Link>
              <Link to="/Guest" className="Guest FlashShine" activeClassName="active"><span>留言版</span></Link>
            </div>
            <div className="navbar-right">

              <MusicBox  className="Music-Box" />

              <div className="LogIn FlashShine"><a href="#">登&nbsp;&nbsp;陆</a></div>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}


export default Navbar