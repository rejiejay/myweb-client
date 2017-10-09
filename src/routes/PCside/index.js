import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import Dynamic from './../../components/PCside/Dynamic';
import NavHeader from './../../components/PCside/NavHeader';
import config from './../../config';
import docCookies from './../../utils/cookies.js';


class PCside extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.turnToMobile();

    docCookies.setItem('token', 'awOz7Wv2NWj9vZrWUp1KPBpcgDlPKnxO7uHs5txLemb2vtXCwdNiE1QNXyGgZR');
    this.props.dispatch({ type: 'user/checkLogin' });

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
      <div className='pc-side'>
        <NavHeader/>
        <Dynamic/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFirstVisit: state.user.isFirstVisit
})

export default connect(mapStateToProps)(PCside);
