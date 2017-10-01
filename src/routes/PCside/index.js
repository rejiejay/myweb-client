import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Dynamic from './../../components/PCside/Dynamic';

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
        <Dynamic />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFirstVisit: state.user.isFirstVisit
})

export default connect(mapStateToProps)(PCside);
