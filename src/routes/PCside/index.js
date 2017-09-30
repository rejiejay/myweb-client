import React from 'react';
import { connect } from 'dva';

function PCside({ location }) {
  return (
    <div>Hello PCside!</div>
  );
}
  
export default connect()(PCside);
