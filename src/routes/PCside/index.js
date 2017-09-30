import React, {Component} from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Publishdynamic from './../../components/PCside/Publishdynamic';

class PCside extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.turnToMobile();
  }

  turnToMobile() {
    let isFirstVisit = this.props.isFirstVisit;

    if (isFirstVisit) {
      let myClientWidth = document.body.clientWidth;

      if (myClientWidth <= 768) {
        this.props.dispatch(routerRedux.push('/mobile'));
      }
      this.props.dispatch({ type: 'user/visit' });
    }
  }

  render() {
    return (
      <div>
        <Publishdynamic />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFirstVisit: state.user.isFirstVisit
})

export default connect(mapStateToProps)(PCside);
