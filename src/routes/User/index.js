import React, {Component} from 'react';
import { connect } from 'dva';
import Login from './../../components/User/Login';

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
      <div>
        <Login/>
      </div>
    )
  }
}

export default connect()(User);
