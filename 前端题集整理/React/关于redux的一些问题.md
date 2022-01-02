## 与redux有关的一些问题

### 1、redux 和 react-redux的区别

### 2、redux中间件的理解，以及用过哪些中间件

### 3、redux 原理？

**为什么需要Redux**: React作为一个组件化开发框架，组件之间存在大量通信，有时这些通信跨越多个组件，或者多个组件之间共享一套数据，简单的父子组件间传值不能满足我们的需求，自然而然地，我们需要有一个地方存取和操作这些公共状态。而redux就为我们提供了一种管理公共状态的方案。我们希望公共状态既能够被全局访问到，又是私有的不能被直接修改。

redux的三个API：

- getState: 返回当前状态
- dispatch： **有条件地、具名地**修改store的数据(修改的规则从dispatch中抽离出来，就成为了Reducer)
- subscribe： 订阅store更新（观察者模式）

redux三大原则：

- 单一数据源
- state是只读的
- 使用纯函数来修改

[参考](https://link.segmentfault.com/?url=https%3A%2F%2Fjuejin.im%2Fpost%2F5def4831e51d45584b585000)
[Vuex、Flux、Redux、Redux-saga、Dva、MobX](https://link.segmentfault.com/?url=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F53599723)
[redux 官网](https://link.segmentfault.com/?url=https%3A%2F%2Fcn.redux.js.org%2Fdocs%2Fadvanced%2FMiddleware.html)

### 4、Redux 为什么要求不变性？

不变性可以为您的应用带来更高的性能，并导致更简单的编程和调试，因为永远不会改变的数据比在您的应用中随意更改的数据更容易推理。

- Redux 和 React-Redux 都采用浅层平等检查。尤其是：
  - Redux的`combineReducers`实用程序浅显地检查由它调用的reducer引起的引用更改。
  - React-Redux的`connect`方法生成的组件会浅显地检查对根状态的引用更改，并从`mapStateToProps`函数返回值以查看被包装的组件是否实际需要重新呈现。这种浅层检查需要不变性才能正常工作。
- 不变的数据管理最终使数据处理更安全。
- 时间旅行调试要求减速器是纯粹的函数，无副作用，以便您可以在不同状态之间正确跳转。

[参考:Redux FAQ：不可变数据（Immutable Data）](https://link.segmentfault.com/?url=https%3A%2F%2Fcloud.tencent.com%2Fdeveloper%2Fsection%2F1374219)

### 5、react-redux

为什么需要react-redux: 一个组件如果想从store存取公用状态，需要进行四步操作：import引入store、getState获取状态、dispatch修改状态、subscribe订阅更新，代码相对冗余,我们想要合并一些重复的操作，而react-redux就提供了一种合并操作的方案

react-redux提供`Provider`和`connect`两个API，**Provider将store放进this.context**里，省去了import这一步，**connect将getState、dispatch合并进了this.props，并自动订阅更新**

- Provider: 使用React Contex 将store放入 this.context中
- connect: 使用装饰器模式实现，所谓装饰器模式，简单地说就是对类的一个包装，动态地拓展类的功能。**connect以及React中的高阶组件（HoC）都是这一模式的实现。**