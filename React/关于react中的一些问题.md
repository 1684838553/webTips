## 关于 react 中的一些问题

[React 题目](http://www.lucklnk.com/godaddy/details/aid/690502212)[react 系列一，react 虚拟 dom 如何转成真实的 dom](https://www.cnblogs.com/zhenfei-jiang/p/9682430.html)
[react+redux 基础用法](https://www.cnblogs.com/zhenfei-jiang/p/7280167.html)

### 1. angularjs 和 react 的区别

react 对比 angular 是思想上的转变，它也并不是一个库，是一种组件化分治的管理，数据与 view 的一体化。它只有一个中心，发出状态，渲染 view，对于虚拟 dom，它并没有提高渲染页面的性能，它提供更多的是利用 jsx 便捷生成 dom 元素，利用组件概念进行分治管理页面每个部分。

[细说 vue react angular 区别，快速搞定技术选型！](https://juejin.cn/post/6844904200556511246)
[React 与 Angular 的区别是什么？](https://www.html.cn/qa/angular-js/11927.html)

1.  数据绑定

    Angular 允许双向数据绑定，而 React 允许单向数据绑定。

    双向数据绑定意味着您对模型所做的任何更改都会影响视图，反之亦然。
    单向数据绑定意味着您对模型所做的任何更改都会影响视图，但不会影响其他方式。这样，数据仅在一个方向上流动。

2.  DOM 用法

    DOM 是 Web 应用程序的数据对象模型。您可以使用常规 DOM 或创建虚拟 DOM。

    Angular 使用浏览器的 DOM，而 React 使用虚拟 DOM。
    虚拟 DOM 是 DOM 的简化版本。通过使用虚拟 DOM，您可以非常快速地更改任何元素，而无需呈现整个 DOM。它将性能从优秀变为优秀。
    想象一下，当只更改一个项目时需要渲染所有 100 个项目的性能差异，然后只渲染单个更改的项目而不渲染其余项目。
    使用虚拟 DOM 现在非常流行，因为速度更快，速度更快！

3.  语言

    Angular 本质上是一个 JS 框架，但它是为使用 TypeScript 而构建的。另一方面，React 也是一个 JavaScript 库，但建议使用 JSX。

    TypeScript 是 JavaScript 的超集，而 JSX 是 JavaScript，但是使用扩展的 XML 语法。

### 2. redux 中间件

Redux 的基本思想是整个应用的 state 保持在一个单一的 store 中。store 就是一个简单的 javascript 对象，而改变应用 state 的唯一方式是在应用中触发 actions，然后为这些 actions 编写 reducers 来修改 state。整个 state 转化是在 reducers 中完成，并且不应该有任何副作用。

1. 在 Redux 中，何为 store
   Store 是一个 javascript 对象，它保存了整个应用的 state。与此同时，Store 也承担以下职责：
   允许通过 getState() 访问 state
   运行通过 dispatch(action) 改变 state
   通过 subscribe(listener) 注册 listeners
   通过 subscribe(listener) 返回的函数处理 listeners 的注销

2. 何为 action
   Actions 是一个纯 javascript 对象，它们必须有一个 type 属性表明正在执行的 action 的类型。实质上，action 是将数据从应用程序发送到 store 的有效载荷。

3. 何为 reducer
   一个 reducer 是一个纯函数，该函数以先前的 state 和一个 action 作为参数，并返回下一个 state。

4. Redux Thunk 的作用是什么
   Redux thunk 是一个允许你编写返回一个函数而不是一个 action 的 actions creators 的中间件。如果满足某个条件，thunk 则可以用来延迟 action 的派发(dispatch)，这可以处理异步 action 的派发(dispatch)。

5. 何为纯函数(pure function)
   一个纯函数是一个不依赖于且不改变其作用域之外的变量状态的函数，这也意味着一个纯函数对于同样的参数总是返回同样的结果。

### 3. redux 有什么缺点

[redux 有什么缺点](https://www.zhihu.com/question/263928256)

1. 默认只支持同步处理，连作者创造的 redux-thunk 都是独立于 redux 之外的一个包
2. 比较麻烦，为了一个功能，即要写 reducer，又要写 action,还有定义一个 actionType,比较麻烦。但他的目的又是为了让代码更清晰明确

### 4. react 组件的划分

[React 组件设计实践总结](https://juejin.cn/post/6844903843189243917)

根据组件的职责通常把组件分为 UI 组件和容器组件。
UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
两者通过 React-Redux 提供 connect ⽅法联系起来

### 5. react 生命周期函数

目前 React 16.8 +的生命周期分为三个阶段,分别是挂载阶段、更新阶段、卸载阶段。

**生命周期函数 : 组件在某一时刻，组件会自动调用执行的函数**

1. getDerivedStateFromProps (static) 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

2. getSnapshotBeforeUpdate(prevProps,prevState), 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()。

挂载阶段： constructor() -> getDerivedStateFromProps()(用父组件传的 props 修改子组件 state) -> render() -> componentDidMount()
组件更新(父组件触发)： getDerivedStateFromProps() -> shouldComponentUpdate() -> render() -> getSnapshotBeforeUpdate() -> componentDidUpdate()
组件更新(子组件触发)：shouldComponentUpdate() -> render() -> getSnapshotBeforeUpdate() -> componentDidUpdate()

#### 挂载阶段

1.  constructor: 构造函数，最先被执行,我们通常在构造函数里初始化 state 对象或者给自定义方法绑定 this
2.  getDerivedStateFromProps: static getDerivedStateFromProps(nextProps, prevState),这是个静态方法,当我们接收到新的属性想去修改我们 state，可以使用 getDerivedStateFromProps
3.  render: render 函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的 DOM、React 组件、Fragment、Portals、字符串和数字、Boolean 和 null 等内容
4.  componentDidMount: 组件装载之后调用，此时我们可以获取到 DOM 节点并操作，比如对 canvas，svg 的操作，服务器请求，订阅都可以写在这个里面，但是记得在 componentWillUnmount 中取消订阅

#### 更新阶段

1.  getDerivedStateFromProps: 此方法在更新个挂载阶段都可能会调用
2.  shouldComponentUpdate: shouldComponentUpdate(nextProps, nextState),有两个参数 nextProps 和 nextState，表示新的属性和变化之后的 state，返回一个布尔值，true 表示会触发重新渲染，false 表示不会触发重新渲染，默认返回 true,我们通常利用此生命周期来优化 React 程序性能
3.  render: 更新阶段也会触发此生命周期
4.  getSnapshotBeforeUpdate(prevProps, prevState),这个方法在 render 之后，componentDidUpdate 之前调用，有两个参数 prevProps 和 prevState，表示之前的属性和之前的 state，这个函数有一个返回值，会作为第三个参数传给 componentDidUpdate，如果你不想要返回值，可以返回 null，此生命周期必须与 componentDidUpdate 搭配使用
5.  componentDidUpdate: componentDidUpdate(prevProps, prevState, snapshot),该方法在 getSnapshotBeforeUpdate 方法之后被调用，有三个参数 prevProps，prevState，snapshot，表示之前的 props，之前的 state，和 snapshot。第三个参数是 getSnapshotBeforeUpdate 返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态。

#### 卸载阶段

componentWillUnmount: 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除定时器，取消网络请求或清除在 componentDidMount() 中创建的订阅，清理无效的 DOM 元素等垃圾清理工作。

#### 异常处理

1.  static getDerivedStateFromError: 此生命周期会在渲染阶段后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state。
2.  componentDidCatch：此生命周期在后代组件抛出错误后被调用。 它接收两个参数：1. error —— 抛出的错误。2. info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。componentDidCatch 会在“提交”阶段被调用，因此允许执行副作用。 它应该用于记录错误之类的情况。

### 6. react 性能优化是哪个生命周期函数

1. **setState()函数在任何情况下都会导致组件重渲染吗？如果 setState()中参数还是原来没有发生任何变化的 state 呢？**

   state 和 props 发生改变，都会导致组件重渲染

   <font color="red">**没有导致 state 的值发生变化的 setState 是否会导致重渲染 ——【会！】**</font>

   ```react
   import React from 'react'
   class Test extends React.Component{
     constructor(props) {
       super(props);
       this.state = {
         Number:1//设state中Number值为1
       }
     }
     //这里调用了setState但是并没有改变setState中的值
     handleClick = () => {
        const preNumber = this.state.Number
        this.setState({
           Number:this.state.Number
        })
     }

     //加上该生命周期函数，该组件避免了不必要的重渲染
     shouldComponentUpdate(nextProps,nextState){
       // nextState.Number是最新的数据，this.state.Number是更新前的数据
         if(nextState.Number == this.state.Number){
           return false
         }
     }

     render(){
       //当render函数被调用时，打印当前的Number
       console.log(this.state.Number)
       return(<h1 onClick = {this.handleClick} style ={{margin:30}}>
                {this.state.Number}
              </h1>)
     }
   }
   export default Test

   //没有shouldComponentUpdate生命周期函数，点击1一共15次，其间demo没有发生任何变化 ,但是控制台打印15个1
   ```

   <font color="red">**这里状态没有发生任何改变，如何阻止重新渲染？  shouldComponentUpdate(nextProps,nextState) **,nextProps 表示的是接收到新 props 内容，现有的 props 通过 this.props 拿到，由此感知到 props 的变化,nextState 同理</font>

2. **组件的 state 没有变化，并且从父组件接受的 props 也没有变化，那它就还可能重渲染吗？——【可能！】**

   ```react
   import React from 'react'
   
   //子组件
   class Son extends React.Component{
     //shouldComponentUpdate(nextProps,nextState){
       //   if(nextProps.number == this.props.number){
       //     return false
       //   }
       //  return true
    	// }
     render(){
       const {index,number,handleClick} = this.props
       //在每次渲染子组件时，打印该子组件的数字内容
       console.log(number);
       return <h1 onClick ={() => handleClick(index)}>{number}</h1>
     }
   }
   
    //父组件
      class Father extends React.Component{
        constructor(props) {
          super(props);
          this.state = {
            numberArray:[0,1,2]
          }
        }
        //点击后使numberArray中数组下标为index的数字值加一，重渲染对应的Son组件
        handleClick = (index) => {
           let preNumberArray = this.state.numberArray
           preNumberArray[index] += 1;  //每次点击，被点击元素状态+1
           this.setState({
              numberArray:preNumberArray
           })
        }
        render(){
          return(<div style ={{margin:30}}>{
                    this.state.numberArray.map(
                      (number,key) => {
                       return <Son
                                 key = {key}
                                 index = {key}
                                 number ={number}
                                 handleClick ={this.handleClick}/>
                      }
                      )
                    }
                 </div>)
        }
      }
      export default Father
     //点击1，控制台打印 1 1 2
   ```

输出的（1，1，2），有我们从 0 变到 1 的数据，也有未发生变化的 1 和 2。这说明 Son 又做了两次多余的重渲染，但是对于 1 和 2 来说，它们本身 state 没有变化（也没有设 state）,同时父组件传达的 props 也没有变化，所以我们又做了无用功

**怎么避免以上问题，关键还是在 shouldComponentUpdate 这个钩子函数上**
这时，只打印了数字发生改变的 numberArray[0]对应的 Son 组件，说明 numberArray[1]，numberArray[2]的重渲染被“过滤”了

<font color="red">**总结：前后不改变 state 值的 setState（理论上）和无数据交换的父组件的重渲染都会导致组件的重渲染，但你可以在 shouldComponentUpdate 这道两者必经的关口阻止这种浪费性能的行为**</font>

<font color="blue">**数据变得复杂时，就会出现意外情况**</font>

````

```react
import React from 'react'
class Son extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
      if(nextProps.numberObject.number == this.props.numberObject.number){
        return false
      }
      return true
  }
  render(){
    const {index,numberObject,handleClick} = this.props
    //在每次渲染子组件时，打印该子组件的数字内容
    console.log(numberObject.number);
    return <h1 onClick ={() => handleClick(index)}>{numberObject.number}</h1>
  }
}
class Father extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      numberArray:[{number:0 /*对象中其他的属性*/},
                   {number:1 /*对象中其他的属性*/},
                   {number:2 /*对象中其他的属性*/}
                   ]
    }
  }
  //点击后使numberArray中数组下标为index的数字值加一，重渲染对应的Son组件
  handleClick = (index) => {
     let preNumberArray = this.state.numberArray
     preNumberArray[index].number += 1;
     this.setState({
        numberArray:preNumberArray
     })
  }
  render(){
    return(<div style ={{margin:30}}>{
              this.state.numberArray.map(
                (numberObject,key) => {
                 return <Son
                           key = {key}
                           index = {key}
                           numberObject ={numberObject}
                           handleClick ={this.handleClick}/>
                }
                )
              }
           </div>)
  }
}
export default Father

//这个时候发现无论如何点击三个标题均无变化（没有数字改变），且控制台无输出


````

我的代码结构明明没有任何变化啊，只是改传递数字为传递对象而已。嗯嗯，问题就出在这里，我们传递的是对象，关键在于 nextProps.numberObject.number == this.props.numberObject.number 这个判断条件，让我们思考，这与前面成功例子中的 nextProps.number == this.props.number 的区别：

1.  numberObject 是一个对象
2.  number 是一个数字变量
3.  数字变量（number 类型）和对象（Object 类型）的内存存储机制不同

<font color="blue">**解决方案：**</font>

[利用 shouldComponentUpdate 函数优化 react 性能](https://www.cnblogs.com/penghuwan/p/6707254.html)

1.  **Object.assign()**
2.  **深拷贝／浅拷贝或利用 JSON.parse(JSON.stringify(data))**
3.  **immutable.js//react 官方推荐使用的第三方库，目前 github 上 20K star,足见其火热**
4.  **继承 react 的 PureComponent 组件**

### 7. 为什么虚拟 dom 会提高性能

虚拟dom(virtual dom) 其实就是一个JavaScript对象，通过这个JavaScript对象来描述真实dom。

**真实dom**：以前没有虚拟dom，如果需要比较两个页面的差异，我们需要通过对真实dom进行比对。真实dom节点是非常复杂的，它里面会绑定的事件，它会有属性，背后会有各种方法，会频繁触发重排与重绘，所以两个真实dom比对，非常耗性能。

总损耗 = 真实DOM完全增删改 + （可能较多的节点）重排与重绘

**虚拟dom**：**相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提髙性能。**

总损耗 = 虚拟DOM增删改 + （与Diff算法效率有关）真实DOM差异增删改 + （较少的节点）重排与重绘

具体实现步骤如下：

1. 用JavaScript对象结构表示DOM树的结构；然后用这个树构建一个真正的DOM树，插到文档当中;
2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异;
3. 把步骤2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了。

### 8. diff 算法

React 对 Virtual DOM 树进行 分层比较、层级控制，只对相同颜色框内的节点进行比较(同一父节点的全部子节点)，当发现某一子节点不在了直接删除该节点以及其所有子节点，不会用于进一步的比较，在算法层面上就是说只需要遍历一次就可以了，而无需在进行不必要的比较，便能完成整个 DOM 树的比较。

1. 同层比较（无 text 无 children）
2. 同层比较（有 text 无 children）
3. 节点比较（无 text 有 children）
4. key 值比较（节点位移保留节点）

#### React 的 diff 策略

1. 策略一：忽略 Web UI 中 DOM 节点跨层级移动；
2. 策略二：拥有相同类型的两个组件产生的 DOM 结构也是相似的，不同类型的两个组件产生的 DOM 结构则不近相同
3. 策略三：对于同一层级的一组子节点，通过分配唯一唯一 id 进行区分（key 值）
   在 Web UI 的场景下，基于以上三个点，React 对 tree diff、component diff、element diff 进行优化，将普适 diff 的复杂度降低到一个数量级，保证了整体 UI 界面的构建性能！

#### 三个优化

1. tree diff
   基于策略一，React 的做法是把 dom tree 分层级，对于两个 dom tree 只比较同一层次的节点，忽略 Dom 中节点跨层级移动操作，只对同一个父节点下的所有的子节点进行比较。如果对比发现该父节点不存在则直接删除该节点下所有子节点，不会做进一步比较，这样只需要对 dom tree 进行一次遍历就完成了两个 tree 的比较。
   ==那么对于跨层级的 dom 操作是怎么进行处理的呢？==下面通过一个图例进行阐述

![image](https://img-blog.csdnimg.cn/img_convert/811296489daf91e4dc30c8c1bb576006.png)

两个 tree 进行对比，右边的新 tree 发现 A 节点已经没有了，则会直接销毁 A 以及下面的子节点 B、C；在 D 节点上面发现多了一个 A 节点，则会重新创建一个新的 A 节点以及相应的子节点。
​ 具体的操作顺序：create A → create B → creact C → delete A。

**优化建议**
​ 保证稳定 dom 结构有利于提升性能，不建议频繁真正的移除或者添加节点

2. component diff
   React 应用是基于组件构建的，对于组件的比较优化侧重于以下几点：

   - 同一类型组件遵从 tree diff 比较 v-dom 树

   - 不通类型组件，先将该组件归类为 dirty component，替换下整个组件下的所有子节点

   - 同一类型组件 Virtual Dom 没有变化，React 允许开发者使用 shouldComponentUpdate（）来判断该组件是否进行 diff，运用得当可以节省 diff 计算时间，提升性能

![image](https://img-blog.csdnimg.cn/img_convert/ee6d366616c3bfc0608095574b284b58.png)

如上图，当组件 D → 组件 G 时，diff 判断为不同类型的组件，虽然它们的结构相似甚至一样，diff 仍然不会比较二者结构，会直接 销毁 D 及其子节点，然后新建一个 G 相关的子 tree，这显然会影响性能，官方虽然认定这种情况极少出现，但是开发中的这种现象 造成的影响是非常大的。

**优化建议**
​ 对于同一类型组件合理使用 shouldComponentUpdate（），应该避免结构相同类型不同的组件

3. element diff
   对于同一层级的 element 节点，diff 提供了以下 3 种节点操作：

   - INSERT_MARKUP 插入节点：对全新节点执行节点插入操作

   - MOVE_EXISING 移动节点：组件新集合中有组件旧集合中的类型，且 element 可更新，即组件调用了 receiveComponent，这时可以复用之前的 dom，执行 dom 移动操作

   - REMOVE_NODE 移除节点：此时有两种情况：组件新集合中有组件旧集合中的类型，但对应的 element 不可更新、旧组建不在新集合里面，这两种情况需要执行节点删除操作

![image](https://img-blog.csdnimg.cn/img_convert/a3cc0a5cff4698d5f1376a07d0d68632.png)

一般 diff 在比较集合[A,B,C,D]和[B，A，D，C]的时候会进行全部对比，即按对应位置逐个比较，发现每个位置对应的元素都有所更 新，则把旧集合全部移除，替换成新的集合，如上图，但是这样的操作在 React 中显然是复杂、低效、影响性能的操作，因为新集合 中所有的元素都可以进行复用，无需删除重新创建，耗费性能和内存，只需要移动元素位置即可。
​ React 对这一现象做出了一个高效的策略：允许开发者对同一层级的同组子节点添加唯一 key 值进行区分。意义就是代码上的一小 步，性能上的一大步，甚至是翻天覆地的变化！

**优化建议**
​ 在开发过程中，同层级的节点添加唯一 key 值可以极大提升性能，尽量减少将最后一个节点移动到列表首部的操作，当节点达到一定 的数量以后或者操作过于频繁，在一定程度上会影响 React 的渲染性能。比如大量节点拖拽排序的问题。

### 9. react 性能优化方案（以下是函数组件性能优化）

[React 性能优化技巧](https://www.infoq.cn/article/kve8xtrs-upphptq5luz)

[react Hook 之 useMemo、useCallback 及 memo](https://juejin.cn/post/6844903954539626510)

#### 一、优化方向：1、减少 render 的次数 2、减少重复计算

#### 1. 减少 render 的次数

<font color="blue">**方法一（使用 React.Memo,父组件传的 props 没有改变，父组件重新渲染，不会导致子组件重新渲染）：**</font>

```react
import React, { memo, useState } from 'react';
import { Button, Card } from 'antd';

type IProps = {
  name: string;
};
function Child(props: IProps) {
  const { name } = props;
  console.log(name);
  return <h1>{name}</h1>;
}

const MyComponent = memo(Child);  //子组件被React.memo()包裹，阻止无用的渲染

const ParentComponent = () => {
  const [title, setTitle] = useState('这是一个title');

  const handleChange = () => {
    setTitle('这是一个title:drunk');
  };

  const handleOnChange = () => {
    setTitle('这是一个title');
  };

  return (
    <Card style={{ width: '100%', height: '90vh' }}>
      <h2>{title}</h2>
      <Button onClick={handleChange}>点击</Button>
      <Button onClick={handleOnChange}>取消</Button>
      <MyComponent name="drunkcat" />
    </Card>
  );
};

export default ParentComponent;

```

<font color="blue">**方法二（涉及到组件通讯时，useCallback 在函数没有改变的时候，重新渲染时能保持两个函数的引用一致）：**</font>

[React Hooks 第一期：聊聊 useCallback](https://zhuanlan.zhihu.com/p/56975681)

```React
//父组件
import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Child from "./child";

function App() {
  const [title, setTitle] = useState("这是一个 title");
  const [subtitle, setSubtitle] = useState("我是一个副标题");

  const callback = () => {
    setTitle("标题改变了");
  };

  // 通过 useCallback 进行记忆 callback，并将记忆的 callback 传递给 Child
  const memoizedCallback = useCallback(callback, [])

  return (
    <div className="App">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <button onClick={() => setSubtitle("副标题改变了")}>改副标题</button>
      <Child onClick={memoizedCallback} name="桃桃" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


//子组件
import React from "react";

function Child(props) {
  console.log(props);
  return (
    <>
      <button onClick={props.onClick}>改标题</button>
      <h1>{props.name}</h1>
    </>
  );
}

export default React.memo(Child);

```

#### 2. 减少重复计算

<font color="blue">**方法三（useMemo 做计算结果缓存）：**</font>

```React
interface ChildProps {
    name: { name: string; color: string };
    onClick: Function;
}
const Child = ({ name, onClick}: ChildProps): JSX.Element => {
    console.log('子组件?')
    return(
        <>
            <div style={{ color: name.color }}>我是一个子组件，父级传过来的数据：{name.name}</div>
            <button onClick={onClick.bind(null, '新的子组件name')}>改变name</button>
        </>
    );
}
const ChildMemo = memo(Child);

const Page = (props) => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Child组件');

    return (
        <>
            <button onClick={(e) => { setCount(count+1) }}>加1</button>
            <p>count:{count}</p>
            <ChildMemo
                //使用useMemo，返回一个和原本一样的对象，第二个参数是依赖性，当name发生改变的时候，才产生一个新的对象
                name={
                    useMemo(()=>({
                        name,
                        color: name.indexOf('name') !== -1 ? 'red' : 'green'
                    }), [name])
                }
                onClick={ useCallback((newName: string) => setName(newName), []) }
                {/* useCallback((newName: string) => setName(newName),[]) */}
                {/* 这里使用了useCallback优化了传递给子组件的函数，只初始化一次这个函数，下次不产生新的函数
            />
        </>
    )
}

```

#### 二、造成一个组件重新渲染的原因是什么？

#### 1. 组件自身状态改变

#### 2. 父组件重新渲染，导致子组件重新渲染，父组件传的 props 没有改变

#### 3. 父组件重新渲染，导致子组件重新渲染，父组件传的 props 改变

### 10. 简述 flux 思想

```react
flux 的最大特点，就是数据的"单向流动"。
用户访问 View
View 发出用户的 Action
Dispatcher 收到 Action，要求 Store 进行相应的更新
Store 更新后，发出一个"change"事件
View 收到"change"事件后，更新页面
```

### 11. react 项目用过什么脚手架？Mern?Yeoman?

**create-react-app** 它的作用都是帮助我们生成一个通用的目录结构，并且已经将我们所需的工程环境配置好

### 14. 了解 shouldComponentUpdate 吗

```react
shouldComponentUpdate 这个方法用来判断是否需要调用 render 方法重新描绘 dom。因为 dom 的描绘非常消耗性能，如果我们能在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。
```

### 15. react 工作原理

```react
React 会创建一个虚拟 DOM(virtual DOM)。当一个组件中的状态改变时，React 首先会通过 "diffing" 算法来标记虚拟 DOM 中的改变，第二步是调节(reconciliation)，会用 diff 的结果来更新 DOM。
```

### 16. 使用 react 有何优点

```react
 1.  只需查看 render 函数就会很容易知道一个组件是如何被渲染的
 2.  JSX 的引入，使得组件的代码更加可读，也更容易看懂组件的布局，或者组件之间是如何互相引用的
 3.  支持服务端渲染，这可以改进 SEO 和性能
 4.  易于测试
 5.  React 只关注 View 层，所以可以和其它任何框架(如 Backbone.js, Angular.js)一起使用
```

### 17. 展示组件和容器组件之间有何不同

```react
1. 展示组件关心组件看起来是什么。展示专门通过 props 接受数据和回调，并且几乎不会有自身的状态，但当展示组件拥有自身的状态时，通常也只关心 UI 状态而不是数据的状态。

2. 容器组件则更关心组件是如何运作的。容器组件会为展示组件或者其它容器组件提供数据和行为(behavior)，它们会调用 Flux actions，并将其作为回调提供给展示组件。容器组件经常是有状态的，因为它们是(其它组件的)数据源。
```

### 18. 类组件与函数组件有什么不同

1. 函数组件不仅允许你使用更多额外的功能，如组件自身的状态和生命周期钩子，也能使组件直接访问 store 并维持状态
2. 当组件仅是接收 props，并将组件自身渲染到页面时，该组件就是一个 '无状态组件(stateless component)'，可以使用一个纯函数来创建这样的组件。这种组件也被称为哑组件(dumb components)或展示组件

### 19. 组件的状态（state）和属性(props)之间有何不同

1. State 是一种数据结构，用于组件挂载时所需数据的默认值。State 可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果。

2. Props(properties 的简写)则是组件的配置。props 由父组件传递给子组件，并且就子组件而言，props 是不可变的(immutable)。组件不能改变自身的 props，但是可以把其子组件的 props 放在一起(统一管理)。Props 也不仅仅是数据--回调函数也可以通过 props 传递。

### 20. 应该在 react 组件的何处发起 ajax 请求

```react
在 React 组件中，应该在 componentDidMount 中发起网络请求。这个方法会在组件第一次“挂载”(被添加到 DOM)时执行，在组件的生命周期中仅会执行一次。更重要的是，你不能保证在组件挂载之前 Ajax 请求已经完成，如果是这样，也就意味着你将尝试在一个未挂载的组件上调用 setState，这将不起作用。在 componentDidMount 中发起网络请求将保证这有一个组件可以更新了。
```

### 21. react 组件中，refs 的作用是什么

```react
Refs 可以用于获取一个 DOM 节点或者 React 组件的引用。何时使用 refs 的好的示例有管理焦点/文本选择，触发命令动画，或者和第三方 DOM 库集成。你应该避免使用 String 类型的 Refs 和内联的 ref 回调。Refs 回调是 React 所推荐的。
```

### 22. 何为高阶组件(higher order component)

```react
高阶组件是一个以组件为参数并返回一个新组件的函数。HOC 运行你重用代码、逻辑和引导抽象。最常见的可能是 Redux 的 connect 函数。除了简单分享工具库和简单的组合，HOC 最好的方式是共享 React 组件之间的行为。如果你发现你在不同的地方写了大量代码来做同一件事时，就应该考虑将代码重构为可重用的 HOC。
```

### 23. 使用箭头函数的优点是什么

```react
1.  作用域安全：在箭头函数之前，每一个新创建的函数都有定义自身的 this 值(在构造函数中是新对象；在严格模式下，函数调用中的 this 是未定义的；如果函数被称为“对象方法”，则为基础对象等)，但箭头函数不会，它会使用封闭执行上下文的 this 值。
2.  简单：箭头函数易于阅读和书写
3.  清晰：当一切都是一个箭头函数，任何常规函数都可以立即用于定义作用域。开发者总是可以查找 next-higher 函数语句，以查看 this 的值
```

### 24. 为什么建议传递给 setState 的参数是一个 callback 而不是对象

因为 this.props 和 this.state 的更新可能是异步的，不能依赖它们的值去计算下一个 state。

### 25. 除了在构造函数中绑定 this，还有什么方法吗

你可以使用属性初始值设定项(property initializers)来正确绑定回调，create-react-app 也是默认支持的。在回调中你可以使用箭头函数，但问题是每次组件渲染时都会创建一个新的回调。

### 26. 怎么阻止组件的渲染

参考 第六点（react 性能优化是哪个生命周期函数）和 第九点（react 性能优化方案）

shouldComponentUpdate 和 React.memo,useMemo,useCallback

### 27. 当渲染一个组件时。何为 key？设置 key 的目的是什么

[深入解析用 key 做索引的负面影响](https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318)

[深入解析 key 为什么是必须的](https://zh-hans.reactjs.org/docs/reconciliation.html#recursing-on-children)

<font color="red">保证 key 值在兄弟节点之间必须唯一,不需要全局唯一</font>

```react
// key(最好是独一无二的字符串) 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

//一个好的经验法则是：在 map() 方法中的元素需要设置 key 属性。

//数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值。即保证 key 值在兄弟节点之间必须唯一

// key值能增加树的转换效率

//索引为key的组件进行重新排序时，组件 state 可能会遇到一些问题。由于组件实例是基于它们的 key 来决定是否更新以及复用，如果 key 是一个下标，那么修改顺序时会修改当前的 key，导致非受控组件的 state（比如输入框）可能相互篡改，会出现无法预期的变动。
```

**什么时候可以用索引作为键？**

1. 列表和项目是静态的——它们不是计算出来的，也不会改变；
2. 列表中的项目没有 ID；
3. 该列表*永远不会*重新排序或过滤。

### 28. 何为 jsx

[什么是 jsx?如何使用 jsx？](https://www.cnblogs.com/Gabriel-Wei/p/6103155.html)

[JSX 语法](https://zhuanlan.zhihu.com/p/21246327)

```react
// jsx 将一段html代码赋值给一个变量

1. JSX 实质上就是为了方便 React 将 View 层组件化，通过将 HTMl 语法加到 Javascript 代码中，以承担构建页面的职责。
2. JSX 是 JavaScript 语法的一种语法扩展，并拥有 JavaScript 的全部功能。JSX 生产 React "元素"，你可以将任何的 JavaScript 表达式封装在花括号里，然后将其嵌入到 JSX 中。在编译完成之后，JSX 表达式就变成了常规的 JavaScript 对象，这意味着你可以在 if 语句和 for 循环内部使用 JSX，将它赋值给变量，接受它作为参数，并从函数中返回它。



//jsx 组件
1. jsx组件分为html组件和react组件
		html组件就是html中的原生标签，react组件就是react自定义的组件

2. 组件属性
 function render() {
   return  <p title="title" >hello, React, world </p>  // title 是属性
 }


function render() {
    return <p> <CustomComponent customProps="data"/> </p>  // customProps 是属性
  }

3.jsx花括号
（1）显示文本
（2）运算
（3）JSX注释


// 限制规则
1. render 方法返回的组件必须是有且只有一个根组件
2. 组件命名空间
		JSX 可以通过命名空间的方式使用组件, 通过命名空间的方式可以解决相同名称不同用途组件冲突的问题。
  function render() {
    return <p>
           <CustomComponent1.SubElement/>
           <CustomComponent2.SubElement/>
           </p>
  }

```

### 29. 何为受控组件(controlled component)

<font color="red">受控 input 一定是通过 onChange 和 setState 的组合方式来进行数值的更新, 而非受控的 input 就遵循 DOM 节点的方式进行数值更新.</font>

[受控组件和非受控组件](https://juejin.cn/post/6858276396968951822)

[论受控组件和非受控组件在 React 中的定义](https://zhuanlan.zhihu.com/p/146540113)

```react
// 在HTML的表单元素中，它们通常自己维护一套state，并随着用户的输入自己进行UI上的更新，这种行为是不被我们程序所管控的。而如果将React里的state属性和表单元素的值建立依赖关系，再通过onChange事件与setState()结合更新state属性，就能达到控制用户输入过程中表单发生的操作。被React以这种方式控制取值的表单输入元素就叫做受控组件。

对于受控与非受控组件的讨论对应只有表单控件, 比如:
- input
- textarea
- select
- checkbox
- radio
之类的元素. 显然, 超出了这类表单元素的范围, 实际上同定义的受控和非受控的含义就不再成立了.

接下来以input元素作为例子进行定义阐释.

// 受控: the value of the input 被 React.Component 通过 setState 的形式进行赋值, 即这个value全程是被React组件所控制, 那就符合受控组件的定义.

// 非受控: the value of the input 只通过DOM节点操作进行赋值和获取. 这种形式表现为React组件没有与之相关联的 state 或数据.


import React, { useState, useRef } from 'react';
import { Input, Card, Button } from 'antd';

const InputWrapper = (): JSX.Element => {
  const inputRef = useRef<any>();
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');

  const handleClick = () => {
    console.log(inputRef);
    setValue1(inputRef.current?.state.value);
  };

  return (
    <>
      <Card title="受控组件">
        <Input
          placeholder="受控组件"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ marginBottom: '24px', width: 500 }}
        />
        <div>{`受控组件的值(通过onChange获取)：${value}`}</div>
      </Card>
      <Card title="非受控组件" style={{ marginTop: '24px' }}>
        <Input
          placeholder="非受控组件"
          style={{ marginBottom: '24px', width: 500 }}
          ref={inputRef}
        />
        <Button onClick={handleClick}>点击</Button>
        <div>{`非受控组件的值(通过ref获取)：${value1}`}</div>
      </Card>
    </>
  );
};

export default InputWrapper;


// 从上面的代码可以看到受控input一定是通过 onChange 和 setState 的组合方式来进行数值的更新, 而非受控的input就遵循DOM节点的方式进行数值更新.

// 有一个小问题就是, 在当前代码的基础上, 无法准确的说出一个事情 - InputWrapper 是一个受控组件还是一个非受控组件, 只能描述成:InputWrapper 有一个受控表单控件和一个非受控表单控件.
```
