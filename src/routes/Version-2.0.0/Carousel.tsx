import * as React from 'react';
import CarouselBox from './CarouselBox';

const visibleWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const MAXoffset = 3580 - visibleWidth;

export default class Carousel extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      imgList: null
    };
  }

  MoveLeft() {
    const SwiperContainDOM = document.getElementById('SwiperContain');
    let DOMoffset = parseInt(SwiperContainDOM.getAttribute('data-offset'));

    DOMoffset = DOMoffset <= 0 ? 0 : DOMoffset - 400;
    
    SwiperContainDOM.setAttribute('style', `left:-${DOMoffset}px;`);
    SwiperContainDOM.setAttribute('data-offset', `${DOMoffset}`);
  }

  MoveRight() {
    const visibleWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const MAXoffset = 3580 - visibleWidth;
    const SwiperContainDOM = document.getElementById('SwiperContain');
    let DOMoffset = parseInt(SwiperContainDOM.getAttribute('data-offset'));

    DOMoffset = DOMoffset >= (MAXoffset - 400) ? MAXoffset : DOMoffset + 400;

    SwiperContainDOM.setAttribute('style', `left:-${DOMoffset}px;`);
    SwiperContainDOM.setAttribute('data-offset', `${DOMoffset}`);
  }

  renderCarouselBox() {
    return CarouselBox.renderAll();
  }

  render() {
    return (
      <div className="Swiper">
        <div className="MoveLeft Selected" onClick={this.MoveLeft}><div className='Icon Selected'></div></div>
        <div className="MoveRight Selected" onClick={this.MoveRight}><div className='Icon Selected'></div></div>
        {this.renderCarouselBox.call(this)}
      </div>
    );
  }
}
    