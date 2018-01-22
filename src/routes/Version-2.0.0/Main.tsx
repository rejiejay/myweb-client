import * as React from 'react';

import MainNavigation from './Main-Mavigation';
import MainItem from './Main-Item';

const MainImg = require('./../../assets/Main-Home-version2.0.0.jpg');

export default class Carousel extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="Main">
        <MainNavigation/>
        <div className="row"><div className='col-2'/><div className='Main-Content col-8'>
          <div className='Main-Content-Mavigation'>
            <div className='nav-header row'>代码</div>
              <a className='nav-ordinary row'>JavaScript</a>
              <a className='nav-ordinary row'>Node</a>
            <div className='nav-header row'>设计</div>
              <a className='nav-ordinary row'>平面相关</a>
              <a className='nav-ordinary row'>前端相关</a>
            <div className='nav-header row'>文章</div>
              <a className='nav-ordinary row'>技术文章</a>
              <a className='nav-ordinary row'>思考</a>
            <div className='nav-header row'>留言</div>
          </div>

          <div className='Main-Content-detailed'>
            <div className="detailed-title"><div>JavaScript</div></div>
            <MainItem
              Title='为什么 Go 语言的性能还不如 Java？'
              Time='2018年1月23日 00:29:20'
              Label='Go Java'
              ReadCount='12'
              image={MainImg}
              brief='前一阵子我们公司弄了个编程比赛，一道多模式替换算法题，1000行字典，1000W行输入。语言不限，两天时间随便优化，比最终执行总时间，可以说很有引战的意思了。大家算法上最后都差不多，都是AC+DAT。语言本身的差异，从结果上可以感受一下。'
              likeCount='5'
            />

            <div className="detailed-More"><div className="FlatButton Selected">加载更多</div></div>
          </div>
        </div><div className='col-2'/></div>
      </div>
    );
  }
}
