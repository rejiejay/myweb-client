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
    isShow: boolean
  }

  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    }
  }
  
  componentWillMount() {
    this.state.isShow = this.props.isShow
  }

  render() {
    return (
    <div>
      <div>{this.props.title}</div>
    </div>
    );
  }
}
