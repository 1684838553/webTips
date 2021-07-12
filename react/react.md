## 1、jsx 代码如何摇身一变成为 dom

### 1. jsx 的本质是什么，和 js 之间有什么关系

本质：JavaScript 的语法扩展
官网：jsx 是 javascript 的一种语法扩展，它和模板语言很接近，但是它充分具备 JavaScript 的能力

#### 1.1 jsx 语法如何在 JavaScript 中生效?什么是 babel?

认识 babel babel 如何编译 jsx?bable 具备将 jsx 语法转换成 JavaScript 代码的能力
jsx 会被编译为 React.createElement(),React.createElement()将返回一个叫作 ReactElement 的 js 对象

#### 1.2 ReactElement 对象和 React.createElement()之间的区别

开发者->调用 React.createElement()->调用 ReactElement

> 1.  React.createElement 对 jsx 进行数据处理、清洗
> 2.  ReactElement 是符合虚拟 dom 规范的 js 对象
> 3.  React.render 将虚拟节点变成真实节点挂载在 html 上
>     babel 把 jsx 转化为 createElemment，这个转化过程发生在编译阶段，代码还没有运行，执行是在 render 里做的

### 2. 为什么要用 jsx?不用有什么后果

jsx 语法糖允许我们使用熟悉的类 HTML 标签语法来创建虚拟 dom，提升研发效率与研发体验，降低学习成本

### 3. jsx 背后的功能模块是什么，这个功能模块都做了那些事情

## 2、React15 组件的声明周期

[react 组件更新脑图](https://naotu.baidu.com/file/852133c6a8787c66b58809e4528f92eb)

- 渲染工作流：指的是组件数据改变到组件实际更新发生的过程（该过程离不开 render）

### React 15 的声明周期流程

[react15 生命周期](./react15 组件生命周期.png)

1. 组件初始化渲染（挂载）

## 3、React 16 组件生命周期

[getDerivedStateFromPeops](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)

### fiber

1.  同步渲染和异步渲染？？？

2.  fiber 架构的重要特征是可以被打断的异步渲染模式，根据“能否被打断”这一标准，React 16 的生命周期分为 render 和 commit 两个阶段

## 4、 数据是如何在 React 组件之间流动的

**React 是数据驱动视图，即 UI=render(data)或 UI=f(data),React 的视图随数据变化而变化**

1. 单向数据流
   当前组件的 state 以 props 的形式流动时，只能六项组件树中比自己层级更低的组件

   - 1. 父子通信

     父组件直接将 this.props 传入子组件，实现父子通信

   - 2. 子父通信

     React 是单向数据流，子组件不能直接给父组件传递信息。
     父组件传递给子组件的是一个绑定了自身上下文的函数，那么，子组件在调用该函数时，就可以将想要的父组件的数据以函数入参的形式给出

   - 3. 兄弟之间通信

     将信息传给父组件，在由父组件传递信息给兄弟组件

2. 层层传递 props 要不得，那么怎么解决这个问题呢

   1）发布-订阅模式 ？？？
   socket.io 模块是典型的跨端发布-订阅模式的实现

   target.addEventListner(type,lister,useCaptrue) // 通过 addEventListner 创建事件监听器，这个动作是订阅

   el.addEventListner('click',func,false) //事件被触发时，事件被 func 发布出去

   事件监听（订阅）和事件触发（发布）
   **对应两个方法：**
   1、on() 负责注册事件的监听器指定事件触发时的回调函数
   2、emit() 负责触发事件，可通过传参使其在触发时携带数据
   3、off() 负责监听器的删除

   优点：监听事件的位置和触发事件的位置不受限制（在同一个上下文）

3. Context API三要素: React.createContext() 、 Provide 、 Consumer

   ```react
   const AppContext = React.createContext(defaultValue)  //创建 createContext对象
   const {Provide,Consumer} = AppContext
   //Provide 数据的提供者,包裹根节点，传入的数据供消费者使用
   //Provide 中传的 value 是在组件树中流动的值，可被Consumer使用
   <Provide value={title:title,content:content}>
        <Title />
     	 <Content />
   </Provide> 
     
   // Consumer接收一个函数为子元素,当Provide没有传value时，Consumer中取默认的defaultValue值
   <Consumer>
     {
       value => <div>{value.title}</div>
     }
   </Consumer>
   ```

   **新的Context API解决了什么问题？**

   1. 代码不够优雅

   2. 无法保证数据在生产者和消费者之间及时同步

      <font color="red">旧的Context：</font>如果组件提供的一个Context发生了变化，而中间父组件的shouldComponentUpdate返回fasle,那么使用到该值的后代组件不会进行更新。使用了Context的组件完全失控，所以基本上没办法能够可靠的更新Context.     ——React官方

      <font color="red">新的Context：</font>即使组件的shouldComponentUpdate返回fasle，它仍然可以**穿透**组件继续向后代组件进行传播，进而保证数据在生产者和消费者之间的一致性

4. 初探Redux<font color="red">存放公共数据的一个容器</font>

   Redux是JavaScript状态容器，它提供可预测的状态管理（**不只是在React中能使用，可在vue或原生js等中使用**）

   <font color="red">在redux整个工作过程中，数据流严格单向的</font>`如图redux数据流向.jpg`

   - store是一个单一的数据源，而且是只读的
   - action是对变化的描述
   - reducer负责对变化进行分发和处理，将新的数据返回store

   ```react
   //引入redux
   import {createStore} from 'redux'
   
   //创建store
   const store = createStore(
   	reducer,
     initial_state,
     applyMiddleware(Middleware1,Middleware2,...)
   )
     
     
    //reducer 
   const reducer = (state,action)=>{
     //...逻辑
   	return new_state
   }
   
   // action 通知reducer状态的改变
   const action = {
     type:'ADD_ITEM',  //type 是必传的
     payload:'<li>text</li>'
   }
   
   //使用dispatch派发action，action会进入到reducer里触发对应的更新
   store.dispatch(action)
   ```

   

## 5、理解虚拟 dom 及 key 属性的作用

> jsx 的运行基础：virtual DOM 复杂度 O(n)

<font color="red">diff 算法</font>

**广度优先，分层比较**

<img src="/Users/apple/Desktop/IMG_20210703_202745.jpg" alt="IMG_20210703_202745" style="zoom:33%;" />

从根节点比较，如果没有变化，不做任何修改，到下一层，A 节点和 B 节点顺序发生变化（<font color="red">如何知道两者之间发生变化，依靠每个节点的唯一标识</font>），在这一层，A 和 B 交换位置，在第三层，F 节点变为 C 节点，会把整个 F 节点删掉，创建一个 C 节点

<font color="red">key 值</font>

作为组件的唯一标识，对性能的提升有很大用处，方便组件的新增，修改，删除等操作

## 6、react-hooks设计动机与工作模式

1. 类组件和函数组件

   - 函数组件

     <font color="red">函数组件会捕获render内部的状态UI=render(data)</font>

     > 早期，函数组件中无法维护state,即无状态组件
     >
     > 函数组件把数据和渲染绑定到了一起

   - 类组件与函数组件之间的不同

     1、类组件需要继承class,函数组件不需要

     2、类组件可以访问生命周期方法，函数组件不能

     3、类组件可以获取实例化后的this,并基于这个this做各种各样的事情，函数组件不能

     4、类组件可以定义并维护state，函数组件不能

   - 类组件

     面向对象编程思想的一种表征

     封装：将一类属性和方法，聚拢到一个Class中

     继承：新的class可以通过继承现有class实现对某一类属性和方法的复用

