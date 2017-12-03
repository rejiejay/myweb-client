import * as React from 'react';
import { config } from './../config';
import { inject, observer } from 'mobx-react';
import notice from './../../component/notice';
import loading from './../../component/loading';
import request from './request';

interface TodoProps {
  STORE_USER: {
    text: number,
    edit:  (text: string) => void
  };
};

interface TodoState {
  todoItem: {
    name: string
    list: {
      key: number
      id: number
      description: string
      priority: number
      createTime: number
    }[]
  }
  categoryList: {
    key: number
    content: string
  }[]
};

@inject('STORE_USER', 'STORE_ROUTER')
@observer
export class Todo extends React.Component<TodoProps, TodoState> {

  constructor(props: TodoProps) {
    super(props);

    this.state = {
      'todoItem': {
        'name': '未完成项目',
        'list': []
      },
      'categoryList': []
    };
  }

  componentDidMount() {
    let self = this;

    request.getAllByTime().then((val) => {
      console.log(val)
      if (val.result === 1) {
        self.setState({
          'todoItem': {
            'name': '未完成项目',
            'list': val.data.map((data) => ({
              'key': Math.random(),
              'id': data.id,
              'description': data.description,
              'priority': data.priority,
              'createTime': data.createTime
            }))
          } 
        })
      } else {
        notice.error(val.message);
      }
    })

    request.getAllCategory().then((val) => {
      if (val.result === 1) {
        self.setState({
          'categoryList': val.data.map((data) => ({
            'key': Math.random(),
            'content': data.category
          }))
        })
      } else {
        notice.error(val.message);
      }
    })
  }

  addError() {
    loading.service();
    setTimeout(()=> {
      loading.destroy();
    }, 500);
    notice.info(`提示`);
    notice.success(`成功`);
    notice.error(`错误`);
  }

  render() {
    let NodeCategoryList = this.state.categoryList.map((val, key) => (
      <li key={val.key}>{val.content}</li>
    ))

    let NodeItemList = this.state.todoItem.list.map((val, key) => (
      <li key={val.key}>{val.description}</li>
    ))

    return (
      <div>
        <h1>代办项目</h1>
        <div className="todo-list">
          <h2>项目分类列表</h2>
          <ul>{NodeCategoryList}</ul>
        </div>
        <div className="todo-main">
          <h2>{this.state.todoItem.name}</h2>
          <ul>{NodeItemList}</ul>
        </div>
      </div>
    );
  }
};
