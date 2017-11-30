import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

type ConfigContent = React.ReactNode | string;
type ConfigDuration = number;
type ConfigOnClose = () => void;
type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

let instance;
let getContainer;

// 要写异步的方法了..
export default {
  error(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose) {
    if (!instance) {
      newNotice((notice) => {
        console.log(1)
      });
      console.log(2)
    }
  }
} 

// 创建 控制添加删除
function newNotice(callback) {
  type notification = React.Component;

  let div;
  div = document.createElement('div');
  document.body.appendChild(div);

  let called = false;
  function ref(notification) {
    if (called) {
      return;
    }
    called = true;
    callback({
      notice(noticeProps) {
        notification.add(noticeProps);
      }
    });
  }
  ReactDOM.render(<Notification ref={ref}/>, div)
  // return {
  //   notice(noticeProps) {
  //     notification.add(noticeProps);
  //   }
  // };
}

class Notification extends React.Component {
  state: {
    notices: Array<any>
  }

  constructor(props) {
    super(props);
    this.state = {
      notices: []
    };
  }
  
  add = (notice) => {
  }

  render() {
    const props = this.props;
    const noticeNodes = this.state.notices.map((notice) => {
      return <Notice>{notice.content}</Notice>
    });

    return (
      <div>{noticeNodes}</div>
    );
  }
}

class Notice extends React.Component {
  closeTimer: any
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.startCloseTimer();
  }

  close = () => {
    this.clearCloseTimer();
  }

  startCloseTimer = () => {
    this.closeTimer = setTimeout(() => {
      this.close();
    }, 5000);
  }
  
  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  render() {
    return (
      <div onMouseEnter={this.clearCloseTimer} onMouseLeave={this.startCloseTimer}>
        <div>{this.props.children}</div>
          {<a onClick={this.close}>
            <span></span>
          </a>}
      </div>
    );
  }
}
