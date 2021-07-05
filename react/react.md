### 1、jsx代码如何摇身一变成为dom

#### 1. jsx的本质是什么，和js之间有什么关系

 > 本质：JavaScript的语法扩展
 > 官网：jsx是javascript的一种语法扩展，它和模板语言很接近，但是它充分具备JavaScript的能力

 ##### 1.1 jsx语法如何在JavaScript中生效?什么是babel?

 > 认识babel babel如何编译jsx?bable具备将jsx语法转换成JavaScript代码的能力
 > jsx会被编译为React.createElement(),React.createElement()将返回一个叫作ReactElement的js对象

 ##### 1.2 ReactElement对象和React.createElement()之间的区别

  > 开发者->调用React.createElement()->调用ReactElement
  > 1. React.createElement对jsx进行数据处理、清洗 
  > 2. ReactElement是符合虚拟dom规范的js对象
  > 3. React.render将虚拟节点变成真实节点挂载在html上
  > babel把jsx转化为createElemment，这个转化过程发生在编译阶段，代码还没有运行，执行是在render里做的

#### 2. 为什么要用jsx?不用有什么后果

 > jsx语法糖允许我们使用熟悉的类HTML标签语法来创建虚拟dom，提升研发效率与研发体验，降低学习成本

#### 3. jsx背后的功能模块是什么，这个功能模块都做了那些事情


### 2、React15组件的声明周期

[react组件更新脑图](https://naotu.baidu.com/file/852133c6a8787c66b58809e4528f92eb)

- 渲染工作流：指的是组件数据改变到组件实际更新发生的过程（该过程离不开render）

#### React 15 的声明周期流程
[react15 生命周期](./react15 组件生命周期.png)


1. 组件初始化渲染（挂载）

### 3、React 16 组件生命周期
[getDerivedStateFromPeops](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)
### fiber

 1. 同步渲染和异步渲染？？？

 2. fiber架构的重要特征是可以被打断的异步渲染模式，根据“能否被打断”这一标准，React 16的生命周期分为render和commit两个阶段

 ### 4、 数据是如何在React组件之间流动的

 **React是数据驱动视图，即UI=render(data)或UI=f(data),React的视图随数据变化而变化**

1. 单向数据流
 > 当前组件的state以props的形式流动时，只能六项组件树中比自己层级更低的组件

 - 1. 父子通信

    > 父组件直接将this.props传入子组件，实现父子通信

 - 2. 子父通信

    > React是单向数据流，子组件不能直接给父组件传递信息。
    > 父组件传递给子组件的是一个绑定了自身上下文的函数，那么，子组件在调用该函数时，就可以将想要的父组件的数据以函数入参的形式给出

 - 3. 兄弟之间通信

    > 将信息传给父组件，在由父组件传递信息给兄弟组件

2. 层层传递props要不得，那么怎么解决这个问题呢

    - 1. 发布-订阅模式 ？？？ 
    > socket.io模块是典型的跨端发布-订阅模式的实现

    target.addEventListner(type,lister,useCaptrue)  // 通过addEventListner创建事件监听器，这个动作是订阅

    el.addEventListner('click',func,false)  //事件被触发时，事件被func发布出去

    事件监听（订阅）和事件触发（发布）
    对应两个方法：1、on()  负责注册事件的监听器指定事件触发时的回调函数
    2、emit()  负责触发事件，可通过传参使其在触发时携带数据
    3、off()  负责监听器的删除

    优点：监听事件的位置和触发事件的位置不受限制（在同一个上下文）

### 理解虚拟dom及key属性的作用

> jsx的运行基础：virtual DOM  复杂度O(n)

<font color="red">diff算法</font>

**广度优先，分层比较**

<img src="/Users/apple/Desktop/IMG_20210703_202745.jpg" alt="IMG_20210703_202745" style="zoom:33%;" />

从根节点比较，如果没有变化，不做任何修改，到下一层，A节点和B节点顺序发生变化（<font color="red">如何知道两者之间发生变化，依靠每个节点的唯一标识</font>），在这一层，A和B交换位置，在第三层，F节点变为C节点，会把整个F节点删掉，创建一个C节点

<font color="red">key值</font>

作为组件的唯一标识，对性能的提升有很大用处，方便组件的新增，修改，删除等操作