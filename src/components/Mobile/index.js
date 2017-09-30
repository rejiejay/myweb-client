import React from 'react';
import { connect } from 'dva';

function Mobile({ location }) {
  return (
    <div>
      hi, this is Mobile.
    </div>
  );
}
  
export default connect()(Mobile);
