import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';

interface CollapseProp {
  isShow: boolean
  title: string
  children: React.ReactNode
};

export default class Collapse extends React.Component<CollapseProp> {
  state: {
    displayShow: boolean
    isShow: boolean
  }
  delayTime: any;

  constructor(props) {
    super(props);
    this.state = {
      displayShow: true,
      isShow: false
    }
  }
  
  componentWillMount() {
    this.state.isShow = this.props.isShow
  }

  switchShow() {
    if (this.delayTime) {return} 

    if (this.state.isShow) {
      this.setState({isShow: false});
      this.delayTime = setTimeout(() => {
        this.setState({displayShow: false});
        this.delayTime = null;
      }, 200);
    } else {
      this.setState({
        isShow: true,
        displayShow: true,
      });
    }
  }

  render() {
    const classIcon = classNames(
      { 'Collapse-Icon': true },
      { 'Icon-top': this.state.isShow },
      { 'Icon-bottom': !this.state.isShow }
    );
    const classContent = classNames(
      { 'Collapse-content': true },
      { 'content-show': this.state.isShow },
      { 'content-hidden': !this.state.isShow }
    );

    const Content = this.state.displayShow ? (
      <div className={classContent}>
        {this.props.children}
      </div>
    ): null;

    return (
      <div className='Collapse'>
        <div 
          className='Collapse-title'
          onClick={() => this.switchShow.call(this)}
        >
          <span>{this.props.title}</span>
          <i className={classIcon}/>
        </div>
        {Content}
      </div>
    );
  }
}
