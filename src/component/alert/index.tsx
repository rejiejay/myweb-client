import * as React from 'react';
import Animate from 'rc-animate';
import * as ReactDOM from 'react-dom';

export interface AlertProps {
  /**
   * 指定警告提示的样式，有四种选择 success、info、warning、error
   */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** 警告提示的辅助性文字介绍 */
  message: React.ReactNode;
  /** 警告提示内容 */
  description?: React.ReactNode;
}

export default class Alert extends React.Component<AlertProps, any> {
  constructor(props: AlertProps) {
    super(props);
    this.state = {
      closing: true,
      closed: false,
    };
  }

  handleClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    let dom = ReactDOM.findDOMNode(this) as HTMLElement;
    this.setState({
      closing: false,
    });
  }

  render() {
    let { description, type, message } = this.props;

    type = type === undefined ? 'warning' : type || 'info';

    let iconType = '';
    switch (type) {
      case 'success':
        iconType = 'check-circle';
        break;
      case 'info':
        iconType = 'info-circle';
        break;
      case 'error':
        iconType = 'cross-circle';
        break;
      case 'warning':
        iconType = 'exclamation-circle';
        break;
      default:
        iconType = 'default';
    }

    return this.state.closed ? null : (
      <div data-show={this.state.closing}>
        <span className='alert-message'>{message}</span>
        <span className='alert-description'>{description}</span>
        <a onClick={this.handleClose} className={'alert-close-icon'}>X</a>
      </div>
    );
  }
}  
