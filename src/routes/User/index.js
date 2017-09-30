import React from 'react';
import { connect } from 'dva';

function User({ location }) {
  return (
    <div>Hello User!</div>
  );
}
  
export default connect()(User);
