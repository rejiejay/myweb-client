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
    const CarouselContainDOM = document.getElementById('CarouselContain');
    let DOMoffset = parseInt(CarouselContainDOM.getAttribute('data-offset'));

    DOMoffset = DOMoffset <= 0 ? 0 : DOMoffset - 400;
    
    CarouselContainDOM.setAttribute('style', `left:-${DOMoffset}px;`);
    CarouselContainDOM.setAttribute('data-offset', `${DOMoffset}`);
  }

  MoveRight() {
    const visibleWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const MAXoffset = 3580 - visibleWidth;
    const CarouselContainDOM = document.getElementById('CarouselContain');
    let DOMoffset = parseInt(CarouselContainDOM.getAttribute('data-offset'));

    DOMoffset = DOMoffset >= (MAXoffset - 400) ? MAXoffset : DOMoffset + 400;

    CarouselContainDOM.setAttribute('style', `left:-${DOMoffset}px;`);
    CarouselContainDOM.setAttribute('data-offset', `${DOMoffset}`);
  }

  render() {
    const CarouselBoxNode = CarouselBox.renderAll();

    return (
      <div className="Carousel">
        <div className="MoveLeft" onClick={this.MoveLeft}><div className='Icon'></div></div>
        <div className="MoveRight" onClick={this.MoveRight}><div className='Icon'></div></div>
        {CarouselBoxNode}
      </div>
    );
  }
}
    