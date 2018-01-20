import * as React from 'react';

import PcContent from './../PcContent/index';
const logo = require('./../../assets/bili.png');

const Header = () => (
  <header className='header'>
    <PcContent name='header-center'>

      <div className='center-caption'><img src={logo} />曾杰杰 · 个人网站</div>

      <div className='center-navigation'>
        <div className='FlatButton'>菜单</div>
      </div>

      <div className='center-backstage'>
        <button className='FlatButton'>后台</button>
      </div>

    </PcContent>
  </header>
);

export default Header
