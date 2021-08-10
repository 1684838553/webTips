## React 注意事项

### 1、JSX 语法细节补充

1. 在 jsx 中添加注释

2. label 标签 for 属性，在 react 中使用 htmlFor,用 for 会被误以为 for 循环的关键字

3. dangerouslySetInnerHTML={{__html:item}}

   ```react
   render(){
   	return <>
        {/*这是一个文本*/}
         hello,world
   
         <div className="content">
           <label htmlFor="inputArea">输入内容</label>  // 点击输入内容，input会聚焦
           <input type="text" id="inputArea" />
           <div dangerouslySetInnerHTML={{__html:item}}></div>
         </div>
       </>
   }
   ```

### 2、围绕 React 衍生的思考

1. react 是一个声明式开发，什么是声明式开发？

2. 可以与其他框架并存

3. 组件化

4. 单向数据流

5. 视图层框架，什么是视图层框架？

6. 函数式编程

   > 优点：
   >
   > 容易维护
   >
   > 给前端自动化编程带来很大的便利

### 3、虚拟 dom

[虚拟 DOM：虚拟 DOM 和实际 DOM 有何不同](https://blog.poetries.top/browser-working-principle/guide/part5/lesson26.html#dom-%E7%9A%84%E7%BC%BA%E9%99%B7)

![](http://blog.poetries.top/img-repo/2019/11/73.png)

```react
//jsx先编译成js对象，在变成真实dom
1. jsx代码
2. babel编译
3. React.createElement()调用
4. ReactElement()调用
5. 虚拟dom作为参数传入
6. ReactDOM.render()
7. 渲染处理，真实dom


// 虚拟dom解决的事情
1. 将页面改变的内容应用到虚拟 DOM 上，而不是直接应用到 DOM 上。
2. 变化被应用到虚拟 DOM 上时，虚拟 DOM 并不急着去渲染页面，而仅仅是调整虚拟 DOM 的内部状态，这样操作虚拟 DOM 的代价就变得非常轻了。
3. 在虚拟 DOM 收集到足够的改变时，再把这些变化一次性应用到真实的 DOM 上。


// 创建阶段。首先依据 JSX 和基础数据创建出来虚拟 DOM，它反映了真实的 DOM 树的结构。然后由虚拟 DOM 树创建出真实 DOM 树，真实的 DOM 树生成完后，再触发渲染流水线往屏幕输出页面。

// 更新阶段。如果数据发生了改变，那么就需要根据新的数据创建一个新的虚拟 DOM 树；然后 React 比较两个树，找出变化的地方，并把变化的地方一次性更新到真实的 DOM 树上；最后渲染引擎更新渲染流水线，并生成新的页面


//优点：
1. 性能提升了
2. 使得跨端应用得以实现。React Native
```

### 4、diff算法

```react
1. 可把多次setState结合成一次setState，比如点击时，多次改变一个状态，只会有一个setState生效（最后一次setState生效），减少虚拟dom比较次数
2. key值，提高虚拟dom比较的效率（key值，index作为key，不稳定，项目中避免使用index作为key值）

```

### 5、Ref

<font color="red">react是异步函数，在某些时候会出现同步函数的效果</font>

charts软件能实现数据模拟功能，可以抓到浏览器发送的请求

```react
react是数据驱动，建议尽量避免直接操作dom
 // <input type="text" ref={input=>{this.input =input}}/>  这种获取dom的方法已经被淘汰


import React, { Component, InputHTMLAttributes } from 'react'

interface IState {
  list: Array<string>
}

class Demo extends Component<any, IState> {
  inputRef = React.createRef<HTMLInputElement>()
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
  }

  handleBtnClick = () => {
    //setState第二个参数，是等第一个参数中状态变化后，在执行的
    this.setState(
      {
        list: [...this.state.list, 'aaa'],
      },
      () => {
        console.log(this.divRef.current)  //尽量避免直接操作dom，直接在setState之后打印dom，会出现打印的值永远比实际的值少，因为setState是异步操作
      },
    )
    // console.log(this.inputRef?.current?.value)
  }

  render() {
    const { list } = this.state
    return (
      <>
        <input type="text" ref={this.inputRef} />
        <button onClick={this.handleBtnClick}>提交</button>
        {list.map(item => {
          return <div key={item}>{item}</div>
        })}
      </>
    )
  }
}

export default Demo

```

### 6、生命周期函数

```react
生命周期函数 : 组件在某一时刻，组件会自动调用执行的函数
// getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

挂载阶段： constructor() -> getDerivedStateFromProps()(用父组件传的props修改子组件state) -> render() -> componentDidMount()
```





