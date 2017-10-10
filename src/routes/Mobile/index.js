import React, {Component} from 'react';
import { connect } from 'dva';

import NavHeader from './../../components/Mobile/NavHeader';
import Dynamic from './../../components/Mobile/Dynamic';

class Mobile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch({ type: 'user/visit' });
    this.props.dispatch({ type: 'user/checkLogin' });
  }
  
  render() {
    return (
      <div className='mobile'>
        <NavHeader/>
        <Dynamic/>
      </div>
    )
  }
}
  
export default connect()(Mobile);
