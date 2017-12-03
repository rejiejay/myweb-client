import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

type ConfigContent = React.ReactNode | string;
type NoticeType = 'info' | 'success' | 'error';

let instance;

async function notice(content: ConfigContent, type: NoticeType) {
  // 单例模式, 保证 instance 仅有一个
  if (!instance) {
    await newNotice()
      .then((notification) => {
        instance = notification;
      });
  }

  let iconType = ({
    info: 'item-img img-info',
    success: 'item-img img-success',
    error: 'item-img img-error'
  })[type];

  instance.notice((
    <Notice key={`${Math.random()}-key`} isShow={true}>
      <div className='item-content'>
        <i className={iconType}></i>
        <span className={`content-${type}`}>{content}</span>
      </div>
    </Notice>
  ));
}

// 创建 控制添加删除
function newNotice() {
  let div;
  div = document.createElement('div');
  div.className = 'notice';
  document.body.appendChild(div);
  
  return new Promise((resolve, reject) => {
    let ref = notification => {
      resolve({
        notice(noticeProps) {
          notification.add(noticeProps);
        }
      });
    }
    ReactDOM.render(<Notification ref={ref}/>, div)
  })
}

class Notification extends React.Component {
  state: {
    notices: React.Component[]
  }

  constructor(props) {
    super(props);
    this.state = {
      notices: []
    };
  }
  
  add = (notice: React.Component) => {
    this.setState((previousState: { notices: React.Component[] }) => {
      const notices = previousState.notices;
      // 如果大于5个，删除第一个
      if (notices.length >= 5) {
        notices.shift()
      }
      return {
        notices: notices.concat(notice),
      };
    });
  }

  render() {
    return (
      <div className='notice-list'>{this.state.notices.map(notice => notice)}</div>
    );
  }
}

interface NoticeProp {
  isShow: boolean
};

class Notice extends React.Component<NoticeProp> {
  closeTimer: any;
  state: {
    isbuilding: boolean
    isShow: boolean
  }
  delayClose: any;

  constructor(props) {
    super(props);
    this.state = {
      isbuilding: true,
      isShow: props.isShow
    }
    this.delayClose = false;
  }

  componentDidMount() {
    this.startCloseTimer();
  }
  
  componentWillUnmount() {
    clearTimeout(this.delayClose);
    clearTimeout(this.closeTimer);
    this.delayClose = null;
    this.closeTimer = null;
    this.setState({isShow: false})
  }

  close = () => {
    this.clearCloseTimer();
    if (this.delayClose) { return }
    this.setState({isbuilding: false})
    this.delayClose = setTimeout(() => {
      this.setState({isShow: false})
    }, 500);
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
    const classNotice = classNames(
      { 'notice-item': true },
      { 'item-build': this.state.isbuilding },
      { 'item-destroy': !this.state.isbuilding }
    );

    return this.state.isShow ? (
      <div 
        className={classNotice}
        onMouseEnter={this.clearCloseTimer} 
        onMouseLeave={this.startCloseTimer}
      >
        <div>{this.props.children}</div>
        <a className="item-close" onClick={this.close}>X</a>
      </div>
    ): null;
  }
}

export default {
  info(content: ConfigContent) { notice(content, 'info') },
  success(content: ConfigContent) { notice(content, 'success') },
  error(content: ConfigContent) { notice(content, 'error') }
}
