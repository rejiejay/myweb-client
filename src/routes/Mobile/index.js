import React from 'react';
import { connect } from 'dva';

function Mobile({ location }) {
  return (
    <div>Hello Mobile!</div>
  );
}
  
export default connect()(Mobile);
