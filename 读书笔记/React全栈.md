### 1、react学习的一些知识点

#### 前端组件化方案

区分两个概念：模块和组件

`模块`：语言层面，一般表现为一个单独的js文件，对外暴露一些属性和方法

`组件`：业务层面，可独立使用的功能实现，一般表现为一个UI部件

**模块化方案**

#### 1.1 react三大颠覆性

react是一个JS库，是用来创建用户界面的js库

1. 组件

   react的一切都是基于组件的

2. jsx

   在render方法中，有一种直接把HTML嵌套在js中的写法，被称为jsx。jsx只是作为编译器，把类似HTML的结构编译成js

3. virtual DOM

   在react中，开发者不太需要操作真正的DOM节点，每个react组件都是用虚拟DOM渲染的。使用diff算法，寻找需变更的节点，再修改该节点，避免了整个渲染DOM带来的巨大成本。



#### 1.2 Jsx与 模板引擎的区别

​	JSX中的`{}`让其拥有了类似模板引擎的功能，但它比模板引擎更强大，因为它是javascript语法的延伸

1. 你可以把它作为一个变量的值，在if和for循环中使用它
2. 也能把它当做参数传递给函数
3. 还能作为函数的返回值返回



#### 1.3 JSX是对真实DOM的<font color="red">描述</font>，本身是一个js对象

但实际上`JSX`代表了什么呢？它代表的就是一个DOM元素吗？

这样的认知是不大稳妥的，实际上它是对 DOM元素 的一种描述，并不是DOM元素本身。

前面所说的`JSX tag`们都会在编译后变成这样

```
//编译前
let jsx = <h1 className="class1">hello</h1>
//编译后
React.createElement(
    'h1' //类型
    ,{className:'class1'} //标签属性键值对
    ,'hello' //children节点  如果有多个子元素 会变成一个数组
)
```

而这个`React.createElement`函数最会生成一个对象，我们称之为`React对象`或则还有一个更高逼格的名称`虚拟DOM`。

```
{
  type: 'h1',
  props: {
    className: 'class1',
    children: 'hello'
  }
}
```

这个react元素是对即将要生成的真实DOM的一种描述，React会根据这个对象的描述渲染出真正的dom元素。

### 2、react知识点



#### 2.1 useSate里面的参数，可以是一个函数

```javascript
 const nameFn = (data)=>{

            return data+',hello!'

        }

       const [name,setName]=useState(()=>{

           const initState = nameFn('jdrunk')

           return initState

       })
```

#### 2.2 在钩子函数中使用定时器

```javascript
const [count,setCount] = useState(5)

       useEffect(() => {
           if(count === 0){
                return
            }else {
               const timeout = setTimeout( ()=> setCount(count - 1), 1000); 
          }
       }, [count])
```

```javascript
var timeHandle = null;
function testTimeout () {    
if (timeHandle) {    	
// 调用之前，先清理，防止一直生成对象    	
// ps. setInterval 定时器也应该按这种模式处理    	
clearTimeout(timeHandle);        
timeHandle = null;    
}
console.log('1111'); 
console.log(timeHandle = setTimeout(testTimeout, 3000)); 
}
```

#### 2.3 动态绑定className

```javascript
className={flag?"active":"no-active"}
```

#### 2.4 路由withRouter的使用

```javascript
import React, { useState, useEffect } from 'react'

import { withRouter } from "react-router-dom";

function WorkOrderInfomation(props) {

//跳转页面
  const toComplaintlist = () => {

    props.history.push({ pathname: "/complaint/complaintlist", state: { addvisible: true } });

  }

}

export default withRouter(WorkOrderInfomation)
```

#### 2.5 react自定义属性

```javascript
export default class Thirty extends React.Component {
  getData = e => {
    console.log(e.target.dataset); //获取所有自定义属性
    console.log(e.target.getAttribute("data-row")); //获取单个自定义属性
  };

  render() {
    return (
      <div>
        <p data-add="888" data-id="2323" onClick={ getData}>dom attr</p>
      </div>
    );
  }
}
```

#### 2.6 React.Fragment

作用:React.Fragment可以让你聚合一个子元素列表，并且不在DOM中增加额外节点

可用<></>

```javascript
render() {
    const { info } = this.state;
    return (
      <div>
        {info.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div>{item.name}</div>
              <div>{item.age}</div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
```

#### 2.7 React.createElement( type, [props], [...children] )

```javascript
export default class TwentySix extends React.Component {
  render() {
    return (
      <div>
        {React.createElement(
          "div",
          { id: "one", className: "two" },
          React.createElement("span", { id: "spanOne" }, "这是第一个 span 标签"),
          React.createElement("br"),
          React.createElement("span", { id: "spanTwo" }, "这是第二个 span 标签")
        )}
      </div>
    );
  }
}
```

原理:实质上 JSX 的 dom 最后转化为 js 都是React.createElement

```javascript
// jsx 语法

<div id='one' class='two'>
    <span id="spanOne">this is spanOne</span>
    <span id="spanTwo">this is spanTwo</span>
</div>

// 转化为 js
React.createElement(
  "div",
 { id: "one", class: "two" },
 React.createElement( "span", { id: "spanOne" }, "this is spanOne"), 
 React.createElement("span", { id: "spanTwo" }, "this is spanTwo")
);
```

#### 2.8 innerHTML

有些后台返回是 html 格式字段,就需要用到 innerHTML 属性

```javascript
<div dangerouslySetInnerHTML={{ __html: "<span>这是渲染的 HTML 内容</span>" }}></div>
```

#### 2.9 在jsx打印假值

定义:
 1.falsy 值 (虚值) 是在 Boolean 上下文中认定为 false 的值;
 2.值有 0,"",'',``,null,undefined,NaN

```javascript
export default class TwentyThree extends React.Component{
    state={myVariable:null}
    render(){
        return (
            <div>{String(this.state.myVariable)}</div>
        )
    }
}
复制代码
```

虚值如果直接展示,会发生隐式转换,为 false,所以页面不显示

#### 2.10 setState是同步还是异步

> 在react中，修改状态如果直接使用this.state，不会引起组件的重新渲染，需要通过 this.setState来对组件的属性进行修改。

**1、this.setState的两种定义方式**

定义初始状态

```
state = { count: 0 },
```

如果此时有一个按钮，点击按钮让计数加1，我们可以有两种写法

```
(1)传递对象 
this.setState({ count: this.state.count + 1})

(2)传递函数 
this.setState((state, props) => ({ count: count + 1}))
```

**2、setState的两种方式有什么不同?**

如果变更的state的值需要依赖于上一次的state的值，这种情况就需要用到函数的形式，比如以下这种情况

```
addCount(){
    this.setState({ count: this.state.count + 1})
    this.setState({ count: this.state.count + 1})
    this.setState({ count: this.state.count + 1})
}
```

此时只会执行一次+1的操作，因为在React内部，会将多次setState合并操作，新的state由 Object.assgin({}， {count: 0}, { count: 1}) 合并所得，以上赋值会执行三次，但因为count的值没有更新，所以最终执行的结果只+1，如果setState的赋值是函数，那情况就不一样了

```
addCount(){
    this.setState((state, props) => ({ count: count + 1}))
    this.setState((state, props) => ({ count: count + 1}))
    this.setState((state, props) => ({ count: count + 1}))
}
```

这样的操作会得到+3的效果，因为React会进行判断，如果传入的是函数，那么将执行此函数，此时count的值就已经被修改了

**3、setState是同步还是异步的?**

☆☆☆☆☆ 是异步的

(1) 即我们通过this.setState修改了状态之后，在它的下一行输出state的值并不会得到新的值

(2) 为什么是异步?
有两个原因，一是提高效率，每次修改state的值都会造成render的重新渲染，将多次修改state的值合并统一更新可以提高性能；二是render的更新会晚一些，如果render中有子组件，子组件的props依赖于父组件的state，props和state就不能保持一致

(3) 如何获取异步时的state值?
① 在setState的回调函数中

```
this.setState({ 
    count: this.state.count + 1}}, 
    ()=>{ console.log(this.state.count)})
```

② 在componentDidUpdate中获取

```
componentDidUpdate(){
    console.log(this.state.count)
}
```

☆☆☆☆☆ 是同步的

(1) 即我们通过this.setState修改状态之后，在它的下一行输出state是新的值

(2) 什么场景下是同步的?
① 原生js获取dom元素，并绑定事件

```
<button id="addBtn">点我+1</button>
componentDidMount(){
     const addBtn = document.getElementById('addBtn')
     changeBtn.addEventListener('click',()=>{
             this.setState({ count:  this.state.count + 1})
             console.log(this.state.message)
     })
}
```

② 计时器 setTimeout

```
<button onClick={ e => this.addOne() }>点我+1</button>
addOne(){
setTimeout(()=>{ this.setState({ count:  this.state.count + 1 })
  console.log(this.state.count ) },0)
}
```

