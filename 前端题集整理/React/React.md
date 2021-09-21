## 1、为什么使用框架而不是原生

    1. 组件化
    2. 生态系统
    3. 开发效率

## 2、虚拟dom的优劣

    1. 保证性能下限，虚拟DOM可以经过diff找出最小差异,然后批量进行patch,这种操作虽然比不上手动优化,但是比起粗暴的DOM操作性能要好很多,因此虚拟DOM可以保证性能下限
    2. 无需手动操作dom，虚拟DOM的diff和patch都是在一次更新中自动进行的,我们无需手动操作DOM,极大提高开发效率
    3. 跨平台，虚拟dom本质是js对象，而dom与平台相关，相比之下虚拟DOM可以进行更方便地跨平台操作,例如服务器渲染、移动端开发等等

## 3、React声命周期
1. 挂载
constructor -> getDerivedStateFromProps -> render -> componentDidMount

2. 更新（由父组件触发）
getDevivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate

3. 更新（由子组件触发）
shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate

## 4、React的请求应该放在哪个生命周期中?

目前官方推荐的异步请求是在componentDidmount中进行.
如果有特殊需求需要提前请求,也可以在特殊情况下在constructor中请求

## 5、setState是同步还是异步

1. 可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果

2. setState 并不是单纯同步/异步的，它的表现会因调用场景的不同而不同：
在 React 钩子函数及合成事件中，它表现为异步；
setTimeout、setInterval 等函数中，包括在 DOM 原生事件中，它都表现为同步。
这种差异，本质上是由 React 事务机制和批量更新机制的工作方式来决定的。

## 6、redux工作流
1. store
2. state
3. action
4. reducer
5. dispatch

然后我们过下整个工作流程：

- 用户（通过View）发出Action，发出方式就用到了dispatch方法。
- Store自动调用Reducer，并且传入两个参数：当前State和收到的Action，Reducer会返回新的State
- State一旦有变化，Store就会调用监听函数，来更新View。

## 7、redux与mobx的区别?

两者对比:
1. redux的store是单一的；mobx的store可分散
2. redux使用plain object保存数据，需要手动处理变化后的操作；mobxobservable保存数据,数据自动处理
3. redux状态不可变，是只读的，修改时是返回一个新的状态；mobx状态可直接修改
4. mobx相对来说比较简单，在其中有很多的抽象，mobx更多的使用面向对象的编程思维；redux会比较复杂，因为其中的函数式编程思想掌握起来不是那么容易，同时需要借助一系列的中间件来处理异步和副作用
5. mobx中有更多的抽象和封装，调试会比较困难，同时结果也难以预测；而redux提供能够进行时间回溯的开发工具，同时其纯函数以及更少的抽象，让调试变得更加的容易

场景辨析:
redux适用于大型项目，mobx适用于中小型项目


## 8、redux中如何进行异步操作?
使用redux中间件redux-thunk或redux-saga
