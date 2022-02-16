### 新版本特性解读

1. render支持返回数组和字符串

2. 错误边界

3. 提升SSR渲染速度，支持流失渲染

4. 减少文件体积

5. 生命周期函数更新

    + 由于异步渲染的改动，componentWillMount,componentWillReceiveProps,componentWillUpdate三个生命周期删除

6. createContext

    + 不必层层传递，可使用此方法指定生效范围

7. createRef
8. hooks

### hooks应用场景

1. 取代生命周期函数
2. 让函数组件加上状态
3. 组件辅助函数
4. 处理发送请求
5. 存取数据
6. 做好性能优化


## API

### 1. useState

### 2. useEffect

- 先执行返回函数，在执行参数函数
- render后执行

```javascript
useEffect(()=>{
    console.log(1)
    return ()=>{
        console.log(2)
    }
},[])  // 2 1
```

### 3. useLayoutEffect

- dom更新完成后执行某个操作
- 执行时机在useEffect之前

```javascript
useLayoutEffect(()=>{
    console.log(1)
    return ()=>{
        console.log(2)
    }
},[])  // 2 1
```

### 4. useMemo

- 让组件中的函数跟随状态更新


```javascript
const [num,setNum] = useState(1)
const [age,setAge] = useState(18)

const getDoubleNum = useMemo(()=>{
    console.log('获取双倍的num')
    return 2 * num
},[num])

return <div onClick={()=>{setNum(num => num +1)}}>{getDoubleNum}</div>
```

### 5. useCallback

- 跟随状态更新执行
- useMemo缓存的是一个值，useCallback缓存的是一个函数

```javascript
const [num,setNum] = useState(1)
const [age,setAge] = useState(18)

const getDoubleNum = useCallback(()=>{
    console.log('获取双倍的num')
    return 2 * num
},[num])  // num不更新，useCallback返回的是缓存的函数，更新，返回的是新函数

return <div onClick={()=>{setNum(num => num +1)}}>{getDoubleNum()}</div>
```


### 6. useRef

- 长久保存数据，返回子元素索引，此索引在整个声明周期中保持不变
- 对象发生改变，不通知。属性变更不重新渲染


```javascript
const [num,setNum] = useState(1)
const [age,setAge] = useState(18)

const ref = useRef()
// 1. 保存一个值，在整个生命周期中维持不变
// 2. 重新赋值ref.current,不会触发重新渲染

useEffect(()=>{
    ref.current = setInetrval(()=>{
        setNum(num => num +1)
    })
},[])

useEffect(()=>{
    if(num>10){
        console.log('超过10了',ref.current)
        clearInterval(ref.current)
    }
},[num])

```


### 7. useContext

- 带着子组件去流浪
- 上层数据发生变化，肯定会触发重新渲染


```javascript
// 1. 引入 useContext,createContext 
// 2. 通过createContext创建一个context
// 3. Context.Provider确定个共享范围
// 4. 通过value来分发内容
// 5. 在子组件中，通过useContext(Context)来获取数据

import React , { useState, useContext, createContext } from 'react'

const Context = createContext(null)

function StateFunction(){
    const [num,setNum] = useState(1)

    return <div>
        // 父组件与子组件共享num值
        <Context.Provider value={num}>
            <Item1 />
        </Context.Provider>
    </div>
}


function Item1(){
    const num = useContext(Context)
    return <div>
        子组件{num}
    </div>
}

```


### 8. useReducer

- 函数组件的redux操作

```javascript

// 1. 创建数据仓库store和管理者 reducer
// 2. 通过useReducer(reducer,store)来获取state和dispatch
import React , {useState, useReducer} from 'react'

const store = {
    num:1
}

const reducer = (state,action) =>{
    switch(action.type){
        case 'changeNum':
            return {
                ...state,
                num:action.num
            }
        default:
            return {
                ...state
            }
    }
}

function StateFunction(){
    const [state,dispatch] = useReducer(reducer,store)

    return <div onClick={()=>{
        dispath({
            type:'changeNum',
            num:100
        })
    }}>
        这是一个函数组件 - {state.num}
    </div>
}

```


### 9. 自定义Hooks

**1、useLoadData**

```javascript

function useLoadData(){
    const [num,setNum] = useState(1)

    useEffect(()=>{
        setTimeout(()=>{
            setNum(2)
        },1000)
    },[])

    return [num,setNum]
}

export default useLoadData
```
**2、useLocalReducer**

```javascript

// 数据仓库
const store = {
    num:1
}


// 管理者
const reducer = (state,action) =>{
    switch(action.type){
        case 'changeNum':
            return {
                ...state,
                num:action.num
            }
        default:
            return {
                ...state
            }
    }
}

function useLocalReducer(){
    const [state,dispatch] = useReducer(reducer,store)

    return [state,dispatch]
}

export default useLocalReducer
```
