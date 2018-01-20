import * as React from 'react';

interface PcContentProps {
  name: string;
};

export default class PcContent extends React.Component<PcContentProps> {
  constructor(props: PcContentProps) {
    super(props);
  }

  render() {
    return (
      <div className={`row pc-content ${this.props.name ? this.props.name : '' }`}>
        <div className='col-2'></div>
        <div className='col-8'>
          {this.props.children}
        </div>
        <div className='col-2'></div>
      </div>
    );
  }
};
