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

  componentDidMount() {
    let isFirstVisit = this.props.isFirstVisit;

    if (isFirstVisit) {
      let myClientWidth = document.body.clientWidth;

      if (myClientWidth <= 768) {
        this.props.dispatch(routerRedux.push('/mobile'));
        return
      }
    }
    
    this.props.dispatch({ type: 'user/visit' });
    this.props.dispatch({ type: 'user/checkLogin' });
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
