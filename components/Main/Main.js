import React, { Component } from 'react'
import Slider from './Slider'
import IndiNav from './IndiNav'
import Timeline from './Timeline/Timeline'
import GuestsPrint from './GuestsPrint/GuestsPrint'


class Main extends Component {
  render() {
    return (
      <div>
        <Slider></Slider>
        <IndiNav></IndiNav>
        <Timeline></Timeline>
        <GuestsPrint></GuestsPrint>
        <div style={{height:"500px"}}></div>
      </div>
    )
  }

}


export default Main