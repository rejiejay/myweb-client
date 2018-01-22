import * as React from 'react';

let MainItem = ({Title, Time, Label, ReadCount, image, brief, likeCount}) => (
  <div className='detailed-Item'>
    <div className='Item-content'>
      <div className='Main-Title'>{Title}</div>
      <div className='Main-SubTitle'> {Time} / {Label} / {ReadCount} Reading amount  </div>
      <div className='row Main-line'/>
      <div className='Main-img'><img src={image} /></div>
      <div className='Main-brief'>{brief}</div>
      <div className='Main-Bottom'>
        <div className='Bottom-Left'>
          <span>{likeCount} 赞</span> · <span>
          <a href='javascript:;' target='_blank'>查看示例</a>
          </span> · <span>
          <a href='javascript:;' target='_blank'>源码</a>
          </span>
        </div>
        <div className='Bottom-Right'>查看所有</div>
      </div>
    </div>
  </div>
);

export default MainItem
    