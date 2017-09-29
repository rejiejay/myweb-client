import React, {Component} from 'react';
// import immutable from 'immutable';

class Swiper extends Component {

  constructor (props) {
    super(props);
    this.state = {
      imgList:null
    };
  }
  componentDidMount() {

  }

  MoveLeft() {
    const SwiperContainDOM = document.getElementById('SwiperContain');
    let DOMoffset = parseInt(SwiperContainDOM.getAttribute('data-offset'));
    if ( DOMoffset <= 0 ) {
      DOMoffset = 0;
    }else {
      DOMoffset -= 400;
    }
    SwiperContainDOM.setAttribute('style','left:-' + DOMoffset + 'px;');
    SwiperContainDOM.setAttribute('data-offset',DOMoffset);
  }

  MoveRight() {
    const visibleWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const MAXoffset = 3580 - visibleWidth;
    const SwiperContainDOM = document.getElementById('SwiperContain');
    let DOMoffset = parseInt(SwiperContainDOM.getAttribute('data-offset'));
    if ( DOMoffset >= (MAXoffset - 400) ) {
      DOMoffset = MAXoffset;
    }else {
      DOMoffset += 400;
    }
    SwiperContainDOM.setAttribute('style','left:-' + DOMoffset + 'px;');
    SwiperContainDOM.setAttribute('data-offset',DOMoffset);
  }
 
  render() {
    return (
      <div className="Swiper">
        <div className="MoveLeft Selected" onClick={this.MoveLeft}><div className='Icon Selected'></div></div>
        <div className="MoveRight Selected" onClick={this.MoveRight}><div className='Icon Selected'></div></div>
        {(function(){
          let myRender  = new RenderBox;
          return myRender.allSwiperBox(this.state.imgList);
        }.bind(this))()}
        {/* <div className="contain" id='SwiperContain' data-offset='0' style={{left:'0px'}}>
          <div className="bigBox">
            {IconBox('Rejiejay','欢迎','left')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}

            {NormalBox('mid','left','')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}

            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
            {IconBox('Rejiejay','欢迎','left')}
          </div>
        </div> */}
      </div>
    );
  }
}

export default Swiper


class RenderBox {

  constructor () {
    this.color = ['#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#00BCD4','#009688','#4CAF50','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722'];
    this.creatIconName = function () {
      const IconName = [
        ['Rejiejay','欢迎'],
        ['DVA','爱你哦'],
        ['Saber','强无敌'],
        ['Go!','西西'],
      ];
      return IconName[Math.floor(Math.random()*(IconName.length))]
    }
  }

  NormalBox(size,floatTurn,imgURL,uniqueKey) {
    const MyColor = this.color[Math.floor(Math.random()*14)];
    let MyclassName = '';
    // 判断是小图
    if (size == 'min') {
      if ( floatTurn  == 'left' ) {
        MyclassName='minBox';
      }else {
        MyclassName='minBox _right';
      }
    // 判断是大图
    }else {
      if ( floatTurn  == 'left' ) {
        MyclassName='midBox';
      }else {
        MyclassName='midBox _right';
      }
    }
    return <div className={MyclassName} style={{background:MyColor}} key={uniqueKey}><img src={imgURL}/></div>
  }

  IconBox(headText,tagText,floatTurn,uniqueKey) {
    const MyColor = this.color[Math.floor(Math.random()*14)];
    let MyClassName = '';
    if ( floatTurn  == 'left' ) {
      MyClassName = 'iconBox';
    }else {
      MyClassName = 'iconBox _right';
    }
    return <div className={MyClassName} style={{background:MyColor}} key={uniqueKey}>
      <div className="iconTop">
        <div className="iconName">{headText}</div>
        <div className="iconTag">{tagText}</div>
      </div>
      <div className="TrueIcon Icon"></div>
      <div className="bottomIcon Icon"></div>
    </div>
  }

  selectIcon(floatTurn,imgURL,uniqueKey) {
    // 10% 的概率生成 IconBox
    if ((Math.random() * 100) < 10) {
      let IconText = this.creatIconName();
      return this.IconBox(IconText[0],IconText[1],floatTurn,uniqueKey);
    }else {
      return this.NormalBox('min',floatTurn,imgURL,uniqueKey);
    }
  }

  bigBox(imgList,keyID) {
    if (!imgList) {
      myArray = new Array(9);
      myArray.fill('');
    }
    const randomNum = Math.floor(Math.random()*6);
    let BoxList = [];
    if (randomNum == 0) {// ↖
      BoxList.push(this.NormalBox('mid','right',imgList[0],( (keyID + 1) * 10 + 0 )));
      BoxList.push(this.selectIcon('right',imgList[1],( (keyID + 1) * 10 + 1 )));
      BoxList.push(this.selectIcon('right',imgList[2],( (keyID + 1) * 10 + 2 )));
 
      BoxList.push(this.selectIcon('left',imgList[3],( (keyID + 1) * 10 + 3 )));
      BoxList.push(this.selectIcon('left',imgList[4],( (keyID + 1) * 10 + 4 )));
      BoxList.push(this.selectIcon('left',imgList[5],( (keyID + 1) * 10 + 5 )));

      BoxList.push(this.selectIcon('left',imgList[6],( (keyID + 1) * 10 + 6 )));
      BoxList.push(this.selectIcon('left',imgList[7],( (keyID + 1) * 10 + 7 )));
      BoxList.push(this.selectIcon('left',imgList[8],( (keyID + 1) * 10 + 8 )));
     }else if (randomNum == 1) {// ←
      BoxList.push(this.selectIcon('left',imgList[0],( (keyID + 1) * 10 + 0 )));
      BoxList.push(this.selectIcon('left',imgList[1],( (keyID + 1) * 10 + 1 )));
      BoxList.push(this.selectIcon('left',imgList[2],( (keyID + 1) * 10 + 2 )));

      BoxList.push(this.NormalBox('mid','left',imgList[3],( (keyID + 1) * 10 + 3 )));
      BoxList.push(this.selectIcon('left',imgList[4],( (keyID + 1) * 10 + 4 )));
      BoxList.push(this.selectIcon('left',imgList[5],( (keyID + 1) * 10 + 5 )));
      
      BoxList.push(this.selectIcon('left',imgList[6],( (keyID + 1) * 10 + 6 )));
      BoxList.push(this.selectIcon('left',imgList[7],( (keyID + 1) * 10 + 7 )));
      BoxList.push(this.selectIcon('left',imgList[8],( (keyID + 1) * 10 + 8 )));
     }else if (randomNum == 2) {// ↙
      BoxList.push(this.selectIcon('left',imgList[0],( (keyID + 1) * 10 + 0 )));
      BoxList.push(this.selectIcon('left',imgList[1],( (keyID + 1) * 10 + 1 )));
      BoxList.push(this.selectIcon('left',imgList[2],( (keyID + 1) * 10 + 2 )));

      BoxList.push(this.selectIcon('left',imgList[3],( (keyID + 1) * 10 + 3 )));
      BoxList.push(this.selectIcon('left',imgList[4],( (keyID + 1) * 10 + 4 )));
      BoxList.push(this.selectIcon('left',imgList[5],( (keyID + 1) * 10 + 5 )));

      BoxList.push(this.NormalBox('mid','left',imgList[6],( (keyID + 1) * 10 + 6 )));
      BoxList.push(this.selectIcon('left',imgList[7],( (keyID + 1) * 10 + 7 )));
      BoxList.push(this.selectIcon('left',imgList[8],( (keyID + 1) * 10 + 8 )));
     }else if (randomNum == 3) {// ↗
      BoxList.push(this.NormalBox('mid','right',imgList[0],( (keyID + 1) * 10 + 0 )));
      BoxList.push(this.selectIcon('right',imgList[1],( (keyID + 1) * 10 + 1 )));
      BoxList.push(this.selectIcon('right',imgList[2],( (keyID + 1) * 10 + 2 )));

      BoxList.push(this.selectIcon('left',imgList[3],( (keyID + 1) * 10 + 3 )));
      BoxList.push(this.selectIcon('left',imgList[4],( (keyID + 1) * 10 + 4 )));
      BoxList.push(this.selectIcon('left',imgList[5],( (keyID + 1) * 10 + 5 )));

      BoxList.push(this.selectIcon('left',imgList[6],( (keyID + 1) * 10 + 6 )));
      BoxList.push(this.selectIcon('left',imgList[7],( (keyID + 1) * 10 + 7 )));
      BoxList.push(this.selectIcon('left',imgList[8],( (keyID + 1) * 10 + 8 )));
     }else if (randomNum == 4) {// →
      BoxList.push(this.selectIcon('left',imgList[0],( (keyID + 1) * 10 + 0 )));
      BoxList.push(this.selectIcon('left',imgList[1],( (keyID + 1) * 10 + 1 )));
      BoxList.push(this.selectIcon('left',imgList[2],( (keyID + 1) * 10 + 2 )));

      BoxList.push(this.NormalBox('mid','right',imgList[3],( (keyID + 1) * 10 + 3 )));
      BoxList.push(this.selectIcon('right',imgList[4],( (keyID + 1) * 10 + 4 )));
      BoxList.push(this.selectIcon('right',imgList[5],( (keyID + 1) * 10 + 5 )));
      
      BoxList.push(this.selectIcon('left',imgList[6],( (keyID + 1) * 10 + 6 )));
      BoxList.push(this.selectIcon('left',imgList[7],( (keyID + 1) * 10 + 7 )));
      BoxList.push(this.selectIcon('left',imgList[8],( (keyID + 1) * 10 + 8 )));
     }else{// ↘
      BoxList.push(this.selectIcon('left',imgList[0],( (keyID + 1) * 10 + 0 )));
      BoxList.push(this.selectIcon('left',imgList[1],( (keyID + 1) * 10 + 1 )));
      BoxList.push(this.selectIcon('left',imgList[2],( (keyID + 1) * 10 + 2 )));

      BoxList.push(this.selectIcon('left',imgList[3],( (keyID + 1) * 10 + 3 )));
      BoxList.push(this.selectIcon('left',imgList[4],( (keyID + 1) * 10 + 4 )));
      BoxList.push(this.selectIcon('left',imgList[5],( (keyID + 1) * 10 + 5 )));

      BoxList.push(this.NormalBox('mid','right',imgList[6],( (keyID + 1) * 10 + 6 )));
      BoxList.push(this.selectIcon('right',imgList[7],( (keyID + 1) * 10 + 7 )));
      BoxList.push(this.selectIcon('right',imgList[8],( (keyID + 1) * 10 + 8 )));
    }
    return <div className="bigBox" key={1000+keyID}>{BoxList}</div>
  }

  allSwiperBox(imgList) {
    let _this = this,
      SwiperList = [];

    // 如果图片数据不存在,则初始化(imgList)
    if (!imgList) {
      imgList = new Array(9);
      imgList.fill(creatBoxImg());

      function creatBoxImg() {
        let boxImgList = new Array(9);
        boxImgList.fill('');
        return boxImgList;
      }
    }

    let MySwiperBox = imgList.map((imgList,keyID) => {
      return _this.bigBox(imgList,keyID);
    });

    return <div className="contain" id='SwiperContain' data-offset='0' style={{left:'0px'}}>{MySwiperBox}</div>;
  }
}


