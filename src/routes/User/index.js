import React, {Component} from 'react';
import { connect } from 'dva';

class User extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch({ type: 'user/visit' });
    this.props.dispatch({ type: 'user/checkLogin' });
  }
  
  render() {
    return (
      <div>Hello User!</div>
    )
  }
}
  
export default connect()(User);
