import * as React from 'react';
import { config } from './../config';
import { inject, observer } from 'mobx-react';
import notice from './../../component/notice';
import loading from './../../component/loading';
import Collapse from './../../component/Collapse';
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
        'name': '',
        'list': []
      },
      'categoryList': []
    };
  }

  componentDidMount() {
    let self = this;

    this.getDatabyTime.call(this)

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

  getDatabyTime() {
    let self = this;

    loading.service();
    request.getAllByTime().then((val) => {
      if (val.result === 1) {
        loading.destroy();
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
        });
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
    notice.success(`成功`);
    notice.info(`提示`);
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
      <div className='Todo'>
        <div className="todo-list">
          <div className="list-title">
            <h1 onClick={this.getDatabyTime.bind(this)}>代办项目</h1>
          </div>
          <Collapse
            title='项目分类列表'
            isShow={true}
          >
            <ul>{NodeCategoryList}</ul>
          </Collapse>
        </div>
        <div className="todo-main">
          <h2>{this.state.todoItem.name}</h2>
          <div className="todo-input">
            <select
              defaultValue="0"
            >
              <option 
                value ="0" 
                disabled={true} 
              >请选择优先级</option>
              <option value ="1">重要紧急</option>
              <option value ="2">重要不紧急</option>
              <option value="3">不重要紧急</option>
              <option value="4">不重要不紧急</option>
              <option value="0">暂无优先级</option>
            </select>
            <input/>
            <label>添加</label>
          </div>
          <ul>{NodeItemList}</ul>
        </div>
      </div>
    );
  }
};
