import React, {Component} from 'react';
import { connect } from 'dva';


class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOperateShow: false
    }
  }
  componentDidMount() {
    const _this = this;

    window.onscroll = (event) => {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
        scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight,
        windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

      if(scrollTop + windowHeight === scrollHeight){
        console.log('you are in the bottom!');
      }
    }
  }

  renderDynamicNav() {
    return <div className='dynamic-nav'>
    </div>
  }

  renderDynamicPublish() {
    return <div className='dynamic-publish'>
    </div>
  }

  render() {
    return (
      <div className='dynamic'>
        {this.renderDynamicNav.call(this)}
        <div className='dynamic-content'></div>
        {this.renderDynamicPublish.call(this)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.user.isLogin
})

export default connect(mapStateToProps)(Dynamic);
