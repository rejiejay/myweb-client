import * as React from 'react';
import { config } from './../config';
import { inject, observer } from 'mobx-react';
import notice from './../../component/notice';

interface TodoProps {
  STORE_USER: {
    text: number,
    edit:  (text: string) => void
  };
};

interface TodoState {
  aaaaa: number
};

@inject('STORE_USER', 'STORE_ROUTER')
@observer
export class Todo extends React.Component<TodoProps, TodoState> {

  constructor(props: TodoProps) {
    super(props);

    this.state = {
      aaaaa: props.STORE_USER.text
    };

    
    notice.error('错误');
  }

  componentDidMount() {
    let self: any;

    self = this;

    fetch(`${config.basicUrl}/todo/getAllByTime`, {
      method: 'GET'
    }).then(
      response => response.json(),
      error => ({
        'result': 0, 
        'message': `Fetch is error, The reason is ${error}`
      }) 
    )
    .then((val) => {
      if (val.result === 1) {

      }
    })
  }

  render() {
    return (
      <div>
        <h1>代办项目</h1>
        <div className="todo-list"></div>
        <div className="todo-main"></div>
      </div>
    );
  }
};
