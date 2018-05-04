import React, {Component} from 'react';
import { connect } from 'dva';

// import convertTime from './../../../utils/convertTime.js';

import './index.less';

class DynamicEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="dynamic-edit">
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(DynamicEdit);
