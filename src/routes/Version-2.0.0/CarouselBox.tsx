import * as React from 'react';

let CarouselBox = {
  // 共有14种颜色
  'colorList': ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688', '#4CAF50', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'],
  'iconNameList': [
    ['Rejiejay', '欢迎'],
    ['DVA', '碾碎它'],
    ['Saber', '强无敌'],
    ['Go!', '你好'],
  ],
  'BlockImgList': [
    // [
    //   'https://wwww.image.com/1.jpg',
    //   'https://wwww.image.com/2.jpg',
    //   'https://wwww.image.com/3.jpg',
    //   'https://wwww.image.com/4.jpg',
    //   'https://wwww.image.com/5.jpg',
    //   'https://wwww.image.com/6.jpg',
    //   'https://wwww.image.com/7.jpg',
    //   'https://wwww.image.com/8.jpg',
    //   'https://wwww.image.com/9.jpg'
    // ]
  ],

  renderAll(BlockImgList?) {
    let _this = this;
    let CarouselList = [];

    // 如果图片数据不存在,则初始化(BlockImgList)
    if (!BlockImgList) {
      this.BlockImgList = this.creatEmptyBlockBoxList(9);
    }

    let CarouselBox = this.BlockImgList.map((imgList, key) => _this.initBlockBox(imgList, key));

    return <div 
      className="contain" 
      id='CarouselContain' 
      data-offset='0' 
      style={{'left':'0px'}}
    >{CarouselBox}</div>;
  },

  creatEmptyBlockBoxList(BlockBoxlistNum) {
    let myArray = new Array(BlockBoxlistNum);
    return myArray.fill(this.creatEmptyBoxlist());
  },

  creatEmptyBoxlist() {
    let myArray = new Array(9);
    return myArray.fill(null);
  },

  initNormalBox(boxSize: string, boxFloatTurn: string, imgUrl: string, uniqueKey: string | number) {
    const BoxColor = this.colorList[Math.floor( Math.random() * this.colorList.length ) ];
    let BoxClassName = '';

    if (boxSize === 'min') { // 如果尺寸是小图
      BoxClassName = boxFloatTurn  === 'left' ? 'minBox' : 'minBox Boxfloatright';
    } else { // 如果尺寸是大图
      BoxClassName = boxFloatTurn  === 'left' ? 'midBox' : 'midBox Boxfloatright';
    }

    return <div 
      className={BoxClassName} 
      style={{'background': BoxColor}} 
      key={uniqueKey}
    >
      <img src={imgUrl}/>
    </div>
  },

  initIconBox(headText: string, tagText: string, boxFloatTurn: string, uniqueKey: string | number) {
    const BoxColor = this.colorList[Math.floor( Math.random() * this.colorList.length ) ];
    let BoxClassName = '';

    BoxClassName = boxFloatTurn  === 'left' ? 'iconBox' : 'iconBox Boxfloatright';

    return <div className={BoxClassName} style={{'background': BoxColor}} key={uniqueKey}>
      <div className="iconTop">
        <div className="iconName">{headText}</div>
        <div className="iconTag">{tagText}</div>
      </div>
      <div className="TrueIcon Icon"></div>
      <div className="bottomIcon Icon"></div>
    </div>
  },

  creatIconName() {
    return this.iconNameList[Math.floor( Math.random() * this.iconNameList.length )];
  },

  initSelectIcon(boxFloatTurn: string, imgURL: string, uniqueKey: string | number) {
    if ((Math.random() * 100) < 10) { // 10% 的概率生成 IconBox
      let IconText = this.creatIconName();

      return this.initIconBox(IconText[0], IconText[1],boxFloatTurn, uniqueKey);
    } else {
      return this.initNormalBox('min', boxFloatTurn, imgURL, uniqueKey);
    }
  },

  initBlockBox(imgList, keyID) {
    const randomNum = Math.floor(Math.random() * 6);
    let BoxList = [];

    if (randomNum == 0) {// ↖
      BoxList.push(this.initNormalBox('mid','right',imgList[0],( (keyID + 1) * 10 + 0 )));
      BoxList.push(this.initSelectIcon('right',imgList[1],( (keyID + 1) * 10 + 1 )));
      BoxList.push(this.initSelectIcon('right',imgList[2],( (keyID + 1) * 10 + 2 )));
  
      BoxList.push(this.initSelectIcon('left',imgList[3],( (keyID + 1) * 10 + 3 )));
      BoxList.push(this.initSelectIcon('left',imgList[4],( (keyID + 1) * 10 + 4 )));
      BoxList.push(this.initSelectIcon('left',imgList[5],( (keyID + 1) * 10 + 5 )));

      BoxList.push(this.initSelectIcon('left',imgList[6],( (keyID + 1) * 10 + 6 )));
      BoxList.push(this.initSelectIcon('left',imgList[7],( (keyID + 1) * 10 + 7 )));
      BoxList.push(this.initSelectIcon('left',imgList[8],( (keyID + 1) * 10 + 8 )));
      } else if (randomNum == 1) {// ←
      BoxList.push(this.initSelectIcon('left',imgList[0],( (keyID + 1) * 10 + 0 )));
      BoxList.push(this.initSelectIcon('left',imgList[1],( (keyID + 1) * 10 + 1 )));
      BoxList.push(this.initSelectIcon('left',imgList[2],( (keyID + 1) * 10 + 2 )));

      BoxList.push(this.initNormalBox('mid','left',imgList[3],( (keyID + 1) * 10 + 3 )));
      BoxList.push(this.initSelectIcon('left',imgList[4],( (keyID + 1) * 10 + 4 )));
      BoxList.push(this.initSelectIcon('left',imgList[5],( (keyID + 1) * 10 + 5 )));
      
      BoxList.push(this.initSelectIcon('left',imgList[6],( (keyID + 1) * 10 + 6 )));
      BoxList.push(this.initSelectIcon('left',imgList[7],( (keyID + 1) * 10 + 7 )));
      BoxList.push(this.initSelectIcon('left',imgList[8],( (keyID + 1) * 10 + 8 )));
      } else if (randomNum == 2) {// ↙
      BoxList.push(this.initSelectIcon('left',imgList[0],( (keyID + 1) * 10 + 0 )));
      BoxList.push(this.initSelectIcon('left',imgList[1],( (keyID + 1) * 10 + 1 )));
      BoxList.push(this.initSelectIcon('left',imgList[2],( (keyID + 1) * 10 + 2 )));

      BoxList.push(this.initSelectIcon('left',imgList[3],( (keyID + 1) * 10 + 3 )));
      BoxList.push(this.initSelectIcon('left',imgList[4],( (keyID + 1) * 10 + 4 )));
      BoxList.push(this.initSelectIcon('left',imgList[5],( (keyID + 1) * 10 + 5 )));

      BoxList.push(this.initNormalBox('mid','left',imgList[6],( (keyID + 1) * 10 + 6 )));
      BoxList.push(this.initSelectIcon('left',imgList[7],( (keyID + 1) * 10 + 7 )));
      BoxList.push(this.initSelectIcon('left',imgList[8],( (keyID + 1) * 10 + 8 )));
      } else if (randomNum == 3) {// ↗
      BoxList.push(this.initNormalBox('mid','right',imgList[0],( (keyID + 1) * 10 + 0 )));
      BoxList.push(this.initSelectIcon('right',imgList[1],( (keyID + 1) * 10 + 1 )));
      BoxList.push(this.initSelectIcon('right',imgList[2],( (keyID + 1) * 10 + 2 )));

      BoxList.push(this.initSelectIcon('left',imgList[3],( (keyID + 1) * 10 + 3 )));
      BoxList.push(this.initSelectIcon('left',imgList[4],( (keyID + 1) * 10 + 4 )));
      BoxList.push(this.initSelectIcon('left',imgList[5],( (keyID + 1) * 10 + 5 )));

      BoxList.push(this.initSelectIcon('left',imgList[6],( (keyID + 1) * 10 + 6 )));
      BoxList.push(this.initSelectIcon('left',imgList[7],( (keyID + 1) * 10 + 7 )));
      BoxList.push(this.initSelectIcon('left',imgList[8],( (keyID + 1) * 10 + 8 )));
      } else if (randomNum == 4) {// →
      BoxList.push(this.initSelectIcon('left',imgList[0],( (keyID + 1) * 10 + 0 )));
      BoxList.push(this.initSelectIcon('left',imgList[1],( (keyID + 1) * 10 + 1 )));
      BoxList.push(this.initSelectIcon('left',imgList[2],( (keyID + 1) * 10 + 2 )));

      BoxList.push(this.initNormalBox('mid','right',imgList[3],( (keyID + 1) * 10 + 3 )));
      BoxList.push(this.initSelectIcon('right',imgList[4],( (keyID + 1) * 10 + 4 )));
      BoxList.push(this.initSelectIcon('right',imgList[5],( (keyID + 1) * 10 + 5 )));
      
      BoxList.push(this.initSelectIcon('left',imgList[6],( (keyID + 1) * 10 + 6 )));
      BoxList.push(this.initSelectIcon('left',imgList[7],( (keyID + 1) * 10 + 7 )));
      BoxList.push(this.initSelectIcon('left',imgList[8],( (keyID + 1) * 10 + 8 )));
      } else {// ↘
      BoxList.push(this.initSelectIcon('left',imgList[0],( (keyID + 1) * 10 + 0 )));
      BoxList.push(this.initSelectIcon('left',imgList[1],( (keyID + 1) * 10 + 1 )));
      BoxList.push(this.initSelectIcon('left',imgList[2],( (keyID + 1) * 10 + 2 )));

      BoxList.push(this.initSelectIcon('left',imgList[3],( (keyID + 1) * 10 + 3 )));
      BoxList.push(this.initSelectIcon('left',imgList[4],( (keyID + 1) * 10 + 4 )));
      BoxList.push(this.initSelectIcon('left',imgList[5],( (keyID + 1) * 10 + 5 )));

      BoxList.push(this.initNormalBox('mid','right',imgList[6],( (keyID + 1) * 10 + 6 )));
      BoxList.push(this.initSelectIcon('right',imgList[7],( (keyID + 1) * 10 + 7 )));
      BoxList.push(this.initSelectIcon('right',imgList[8],( (keyID + 1) * 10 + 8 )));
    }

    return <div className="BlockBox" key={1000+keyID}>{BoxList}</div>
  }
}

export default CarouselBox
