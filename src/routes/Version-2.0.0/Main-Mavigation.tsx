import * as React from 'react';

let MainNavigation = () => (
  <div className="Main-Mavigation">
    <div className='row'>
      <div className='col-2'/>
      <div className='col-8 content'>
        <div className='Mavigation-left'>
          <div className='week Icon'></div>
          <div className='month Icon'></div>
          <div className='year Icon'></div>
          <div className='allOfThem Icon activatOfThem'></div>
        </div>
        <div className='Mavigation-middle'>2011-04-22</div>
        <div className='Mavigation-right'>
          <select>
            <option value="time">时间</option>
            <option value="read">阅读</option>
            <option value="like">赞同</option>
          </select>
          <div className='addItem'>+</div>
          <div className='sculpture Icon'></div>
          <div className='menu'>
            <div className="item">添加 Code</div>
            <div className="item">添加 Design</div>
            <div className="item">添加 Article</div>
          </div>
        </div>
      </div>
      <div className='col-2'/>
    </div>
  </div>
);

export default MainNavigation
    