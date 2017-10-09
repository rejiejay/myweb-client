import React, {Component} from 'react';
import { connect } from 'dva';

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
      <div>Hello Mobile!</div>
    )
  }
}
  
export default connect()(Mobile);
