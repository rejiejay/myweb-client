import React, { Component } from 'react'
import TimelineTable from './TimelineTable'
import TimelineDynamic from './TimelineDynamic'
import TimelineNavigation from './TimelineNavigation'


class Timeline extends Component {
  render() {
    return (
      <div className="TimelineContent">
        <TimelineTable></TimelineTable>
        <div className="ClearFloat">
	        <TimelineNavigation></TimelineNavigation>
	        <TimelineDynamic></TimelineDynamic>
        </div>
      </div>
    )
  }

}


export default Timeline