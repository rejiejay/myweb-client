import React from 'react';
import { connect } from 'dva';

function Admin({ location }) {
  return (
    <div>Hello Admin!</div>
  );
}
  
export default connect()(Admin);
