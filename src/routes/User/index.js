import React, {Component} from 'react';
import { connect } from 'dva';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
        'isLogin': this.props.isLogin
    }
  }

  componentWillMount() {
    this.props.dispatch({ type: 'user/visit' });
    this.props.dispatch({ type: 'user/checkLogin' });
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
          'isLogin': nextProps.isLogin
      });
  }
  
  render() {
    return (
      <div>Hello User!</div>
    )
  }
}

const mapStateToProps = (state) => ({
    isLogin: state.user.isLogin
})
  
export default connect(mapStateToProps)(User);
