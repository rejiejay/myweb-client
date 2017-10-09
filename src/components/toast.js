import React, {Component} from 'react';

class Toast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: this.props.isShow,
      message: this.props.message
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isShow: nextProps.isShow,
      message: nextProps.message
    });
  }

  renderToast() {
    let _this = this,
      isShow = this.state.isShow,
      message = this.state.message;

    if (isShow) {
      if (message && message !== 'loading') {
        return <div className='toast' onClick={() => {
          _this.props.hideToast();
        }}>
          <div className='toast-content'>
            <div className='toast-message'>
              {message}
            </div>
          </div>
        </div>
      }
      return <div className='toast'>
        <div className='toast-content'>
          <div className='toast-loader'>
            <div className='loader--audioWave'/>
          </div>
        </div>
      </div>
    }
    return <div></div>
  }

  render() {
    return (
      <div>
        {this.renderToast.call(this)}
      </div>
    )
  }
}

export default Toast;
