import React, {Component} from 'react'



class NavHeard extends Component {
  render() {
    return (
      <div className='topNav'>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-8 center'>
            <div className='caption'><img src="./bili.png" />曾杰杰 · 个人网站</div>
            <div className='navigation'><div className='FlatButton Selected'>菜单</div></div>
            <div className='Backstage' onClick={function(){
              location = "./manage/index.html";
            }}><button className='FlatButton Selected'>后台</button></div>
          </div>
          <div className='col-2'></div>
        </div>
      </div>
    );
  }
}
export default NavHeard