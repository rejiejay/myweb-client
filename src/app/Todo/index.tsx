import * as React from 'react';
import { config } from './../config';
import { inject, observer } from 'mobx-react';
import notice from './../../component/notice';
import loading from './../../component/loading';
import Collapse from './../../component/Collapse';
import utilitieTime from './../method/utilitieTime';
import request from './request';

interface TodoProps {
  STORE_USER: {
    text: number,
    edit:  (text: string) => void
  };
};

interface TodoState {
  name: string
  list: {
    key: number
    id: number
    isComplete: number
    description: string
    priority: number
    createTime: number
    category: string
  }[]
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
      'name': '',
      'list': [],
      'categoryList': []
    };

    this.setComplete.bind(this);
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
          'name': '未完成项目',
          'list': val.data.map((data) => ({
            'key': Math.random(),
            'id': data.id,
            'isComplete': data.isComplete,
            'description': data.description,
            'priority': data.priority,
            'category': data.category,
            'createTime': data.createTime
          }))
        });
      } else {
        notice.error(val.message);
      }
    })
  }

  setComplete(val, key) {
    let newList = this.state.list.slice();
    newList[key].isComplete = this.state.list[key].isComplete === 1 ? 0 : 1;

    this.setState({ list: newList });
  }

  renderNodeItemList() {
    const self = this;

    return this.state.list.map((val, key) => {
      let checkboxInput = (
        <div>
          <input 
            checked={val.isComplete === 1}
            onChange={() => {self.setComplete(val, key)}}
            key={val.key}
            type="checkbox"
            id={`my-ckbox${val.key}`}
            className="input-checkbox"
          /> 
          <label htmlFor={`my-ckbox${val.key}`}>完成</label>
        </div>
      );

      let mycategory = ({
        '0': '无优先',
        '1': '重 + 急',
        '2': '重 & 缓',
        '3': '要做',
        '4': '不重要'
      })[val.priority];

      let YYYYMMDD = utilitieTime.TimestampToYYYYMMDDFormat(val.createTime);

      return (
        <li className="row" key={val.key}>
          <div className="col-1">{checkboxInput}</div>
          <div className="col-6">{val.description}</div>
          <div className="col-2">
            <div className="litem-category">{val.category}</div>
          </div>
          <div className="col-1">
            <div className="litem-priority">{mycategory}</div>
          </div>
          <div className="col-1">{YYYYMMDD}</div>
          <div className="col-1">
            <div className="btn-primary litem-btn">编辑</div>
          </div>
        </li>
      )
    });
  }

  render() {
    let NodeCategoryList = this.state.categoryList.map((val, key) => (
      <li key={val.key}>{val.content}</li>
    ))

    let NodeItemList = this.renderNodeItemList.call(this);

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
          <h2>{this.state.name}</h2>
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
            <label className="btn-primary">添加</label>
          </div>
          <label className="check-box"></label> 
          <ul className="todo-litem">
            <li className="row litem-title">
              <div className="col-1">完成</div>
              <div className="col-6">内容</div>
              <div className="col-2 litem-category">类别</div>
              <div className="col-1 litem-category">优先程度</div>
              <div className="col-1 litem-time">创建时间</div>
              <div className="col-1 litem-operating">操作</div>
            </li>
            {NodeItemList}
          </ul>
        </div>
      </div>
    );
  }
};
