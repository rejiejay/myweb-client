import React, {Component} from 'react';




// 14种颜色
const Color = ['#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#00BCD4','#009688','#4CAF50','#CDDC39','#FFEB3B','#FFC107','#FF9800','#FF5722'];
/**
 * @param    {string}    size     大小   min && mid
 * @param    {string}    float    浮动   left && right
 * @param    {string}    img      图片的URL地址  
 */
function NormalBox(size,float,img) {
  const _Color = Color[Math.floor(Math.random()*14)];
  let _class = '';
  // 判断是小图
  if (size == 'min') {
    if ( float  == 'left' ) {
      _class='minBox';
    }else {
      _class='minBox _right';
    }
  // 判断是大图
  }else {
    if ( float  == 'left' ) {
      _class='midBox';
    }else {
      _class='midBox _right';
    }
  }
  return <div className={_class} style={{background:_Color}}><img src={img}/></div>
}
function IconBox(head,Tag,float) {
  const _Color = Color[Math.floor(Math.random()*14)];
  let _class = '';
  if ( float  == 'left' ) {
    _class='iconBox';
  }else {
    _class='iconBox _right';
  }
  return <div className={_class} style={{background:_Color}}>
    <div className="iconTop">
      <div className="iconName">{head}</div>
      <div className="iconTag">{Tag}</div>
    </div>
    <div className="TrueIcon Icon"></div>
    <div className="bottomIcon Icon"></div>
  </div>
}



const visibleWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const MAXoffset = 3580 - visibleWidth;


class Swiper extends Component {
  MoveLeft() {
    const _DOM = document.getElementById('SwiperContain');
    let _Offset = parseInt(_DOM.getAttribute('data-offset'));
    if (_Offset <= 0) {
      _Offset = 0;
    }else {
      _Offset -= 400;
    }
    _DOM.setAttribute('style','left:-'+_Offset+'px;')
    _DOM.setAttribute('data-offset',_Offset)
  }
  MoveRight() {
    const _DOM = document.getElementById('SwiperContain');
    let _Offset = parseInt(_DOM.getAttribute('data-offset'));
    if (_Offset >= (MAXoffset-400)) {
      _Offset = MAXoffset;
    }else {
      _Offset += 400;
    }
    _DOM.setAttribute('style','left:-'+_Offset+'px;')
    _DOM.setAttribute('data-offset',_Offset)
  }
  render() {
    return (
      <div className="Swiper">
        <div className="MoveLeft Selected" onClick={this.MoveLeft}><div className='Icon Selected'></div></div>
        <div className="MoveRight Selected" onClick={this.MoveRight}><div className='Icon Selected'></div></div>
        <div className="contain" id='SwiperContain' data-offset='0' style={{left:'0px'}}>
          {/*第一行 左中*/}
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

          {/*第二行 右中*/}
          <div className="bigBox">
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
            {IconBox('Rejiejay','欢迎','left')}

            {NormalBox('mid','right','')}
            {NormalBox('min','right','')}
            {NormalBox('min','right','')}

            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
          </div>

          {/*第三行 左上*/}
          <div className="bigBox">
            {NormalBox('mid','left','')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}

            {NormalBox('min','right','')}
            {NormalBox('min','right','')}
            {NormalBox('min','right','')}

            {IconBox('Rejiejay','欢迎','left')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
          </div>

          {/*第四行 右中*/}
          <div className="bigBox">
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}

            {NormalBox('mid','right','')}
            {NormalBox('min','right','')}
            {NormalBox('min','right','')}

            {IconBox('Rejiejay','欢迎','left')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
          </div>

          {/*第五行 左中*/}
          <div className="bigBox">
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}

            {NormalBox('mid','left','')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}

            {IconBox('Rejiejay','欢迎','left')}
            {NormalBox('min','left','')}
            {IconBox('Rejiejay','欢迎','left')}
          </div>

          {/*第六行 右下*/}
          <div className="bigBox">
            {IconBox('Rejiejay','欢迎','left')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}


            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}

            {NormalBox('mid','right','')}
            {NormalBox('min','right','')}
            {NormalBox('min','right','')}
          </div>

          {/*第七行 右上*/}
          <div className="bigBox">
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}

            {NormalBox('mid','left','')}
            {NormalBox('min','left','')}
            {IconBox('Rejiejay','欢迎','left')}

            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
          </div>

          {/*第八行 左上*/}
          <div className="bigBox">
            {NormalBox('mid','right','')}
            {NormalBox('min','right','')}
            {IconBox('Rejiejay','欢迎','right')}

            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}

            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
          </div>

          {/*第九行 左下*/}
          <div className="bigBox">
            {NormalBox('mid','left','')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}

            {IconBox('Rejiejay','欢迎','left')}
            {NormalBox('min','left','')}
            {NormalBox('min','left','')}

            {NormalBox('min','left','')}
            {NormalBox('min','left','')}
            {IconBox('Rejiejay','欢迎','left')}
          </div>

        </div>
      </div>
    );
  }
}
export default Swiper