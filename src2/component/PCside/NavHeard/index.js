import React, {Component} from 'react'



class NavHeard extends Component {
  constructor (props, context) {
      super(props, context);
  }
  render() {
    return (
      <div className='topNav'>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-8 center'>
            <div className='caption'><img src="./bili.png" />曾杰杰 · 个人网站</div>
            <div className='navigation'>
              <div className='FlatButton Selected' onClick={function(){
                window.location.href = 'https://github.com/cwwjie/myWeb-Client';
              }.bind(this)}>Star</div>
              <div className='FlatButton Selected' onClick={function(){
                this.context.router.push('/mobile');
              }.bind(this)}>手机端</div>
            </div>
            <div className='Backstage' onClick={function(){
              this.context.router.push('/admin');
          }.bind(this)}><button className='FlatButton Selected'>后台</button></div>
          </div>
          <div className='col-2'></div>
        </div>
      </div>
    );
  }
}
NavHeard.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default NavHeard