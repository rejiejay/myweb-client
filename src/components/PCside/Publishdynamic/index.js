import React from 'react';
import { connect } from 'dva';

function Publishdynamic() {
  return (
    <div>
      <textarea rows="3" cols="20" />
      <div>提交</div>
      <div>
        <div>排序</div>
        <div>随机 ∞</div>
        <div>时间 ↑</div>
        <div>赞 ↑</div>
      </div>
      <div>
        列表
      </div>
    </div>
  );
}
  
export default connect()(Publishdynamic);
