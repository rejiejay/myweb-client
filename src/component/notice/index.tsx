import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

type ConfigContent = React.ReactNode | string;
type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

let instance;

async function notice(content: ConfigContent, type?: NoticeType) {
  // 单例模式, 保证 instance 仅有一个
  if (!instance) {
    await newNotice()
      .then((notification) => {
        instance = notification;
      });
  }


  instance.notice((
    <Notice key={`${Math.random()}-key`} isShow={true}>
      <div className=''>
        <span>{content}</span>
      </div>
    </Notice>
  ));
  
}

// 创建 控制添加删除
function newNotice() {
  let div;
  div = document.createElement('div');
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
      console.log(notices)
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
      <div>{this.state.notices.map(notice => notice)}</div>
    );
  }
}

interface NoticeProp {
  isShow: boolean
};

class Notice extends React.Component<NoticeProp> {
  closeTimer: any;
  state: {
    isShow: boolean
  }
  delayClose: any;

  constructor(props) {
    super(props);
    this.state = {
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
    return this.state.isShow ? (
      <div onMouseEnter={this.clearCloseTimer} onMouseLeave={this.startCloseTimer}>
        <div>{this.props.children}</div>
          {<a onClick={this.close}><span>X</span></a>}
      </div>
    ): null;
  }
}

export default {
  info(content: ConfigContent) { notice(content, 'info') },
  success(content: ConfigContent) { notice(content, 'success') },
  warning(content: ConfigContent) { notice(content, 'warning') },
  error(content: ConfigContent) { notice(content, 'error') },
  loading(content: ConfigContent) { notice(content, 'loading') }
}
