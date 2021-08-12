## redux学习笔记

 redux是一个数据层的框架，把所有数据放在store中管理

#### 1、redux设计理念：

把所有数据放在store中管理，一个组件改变了store中数据的变化，其他组件监听到数据的变化，来获取新的数据

#### 2、redux工作流程

```react
// store的创建（store 数据管理的仓库）
const store = createStore()

//action  action可以放在一个文件中统一管理，方便维护
const action = {
  type:'delete_item',  // type 可以放在一个文件中统一管理，以便维护
  value:value
}
//dispatch 派发action
store.dispatch(action)

//getState 获取store中的状态
store.getState()

//subscribe 监听store中的变化，store发生变化，subscribe的回调函数就会被执行
const getChangeData = () => {
    setList(store.getState().list);
  };
  store.subscribe(getChangeData);
```

### 3、redux设计原则

1. store必须是唯一的
2. 只有store能改变自己的数据，reducer将新的状态返回给store，store自己更新状态
3. reducer必须是纯函数。**纯函数：给定固定的输入，就会有固定的输出，不依赖函数外部的任何状态或数据，没有副作用**

### 4、store例子

```react
//1. 创建store，index.ts文件
import { createStore } from 'redux';
import reducer from './reducer';

// 创建一个store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // 使浏览器中redux-devtool插件生效
);

export default store;

// 2. 创建reducer,reducer.ts文件
import { DELETE_ITEM, SUBMIT_INPUT_VALUE } from './actionType';
// 创建reducer,reducer返回的必须是一个函数，reducer负责管理整个store中的数据
// 默认值
const defaultState = {
  list: ['1', '2', 'fff'],
};

//reducer ,可以接受state，但绝不可以修改state
export default (state = defaultState, action) => {
  let newState;
  try {
    //不能直接修改state
    newState = JSON.parse(JSON.stringify(state));
  } catch (e) {
    console.log(e, 'throw Error');
  }
  switch (action.type) {
    case SUBMIT_INPUT_VALUE:
      newState.list = [...state.list, action.value];
      return newState;
    case DELETE_ITEM:
      newState.list.splice(action.value, 1);
      return newState;
  }
  return state;
};

// 3. 创建actionTypes,actionTypes.ts文件
//actionTypes 拆分
export const DELETE_ITEM = 'delete_item';
export const SUBMIT_INPUT_VALUE = 'submit_input_value';

// 4. 创建actionCreators,actionCreators.ts文件
//将action放在actionCreators文件里面统一管理
import { DELETE_ITEM, SUBMIT_INPUT_VALUE } from './actionType';

export const getInputChangeValue = (value) => ({
  type: SUBMIT_INPUT_VALUE,
  value,
});
export const getDeleteItem = (value) => ({
  type: DELETE_ITEM,
  value,
});


//5. todoList组件
import React, { useState, useRef } from 'react';
import { Input, Button, Space, List } from 'antd';
import store from './store';
import { DELETE_ITEM, SUBMIT_INPUT_VALUE } from './store/actionType';
import { getDeleteItem, getInputChangeValue } from './store/actionCreators';
export default function TodoList(): React.ReactNode {

  const inputRef = useRef<any>();
  const [list, setList] = useState<any>(store.getState().list);

  const getChangeData = () => {
    setList(store.getState().list);
  };
  //监听store的变化，改变状态
  store.subscribe(getChangeData);

  //提交功能
  const submit = () => {
    const value = inputRef.current?.state.value;
    const action = getInputChangeValue(value);
    store.dispatch(action);
  };

  //删除功能
  const handleItemDelete = (index) => {
    const action = getDeleteItem(index);
    store.dispatch(action);
  };

  return (
    <div className="page">
      <Space style={{ marginBottom: '24px' }}>
        <Input placeholder="todo info" width={400} ref={inputRef} />
        <Button type="primary" onClick={submit}>
          {' '}
          提交
        </Button>
      </Space>

      <List
        bordered
        dataSource={list}
        renderItem={(item: any, index) => (
          <List.Item onClick={() => handleItemDelete(index)}>{item}</List.Item>
        )}
      />
    </div>
  );
}

```

