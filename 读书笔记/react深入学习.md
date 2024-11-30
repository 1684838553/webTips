### 1.react之refs的使用

[react之refs的使用](https://juejin.cn/post/6844903479786340366 )

>  ref作用：每个组件实例都有this.refs属性，会自动引用所有包含ref属性组件的dom

#### 重点一：ref是回调函数的方式去使用。

```javascript
class Input extends Component {
    constructor(props){
        super(props);
    }
    
    focus = () => {
        this.textInput.focus();
    }
    
    render(){
        return (
            <div>
                <input ref={(input) => { this.textInput = input }} />
            </div>
        )
    }
}
```

> 疑点1：input参数是哪里来的？
>
> 文档解释，当我们在DOM Element中使用`ref`时，回调函数将接收当前的DOM元素作为参数，然后存储一个指向这个DOM元素的引用。那么在示例代码中，我们已经把`input`元素存储在了`this.textInput`中，在`focus`函数中直接使用原生DOM API实现focus聚焦。
>
> 疑点2：回调函数什么时候被调用？
>
> 当组件挂载后和卸载后，以及ref属性本身发生变化时，回调函数就会被调用。
>
> <font color="red">卸载后回调函数为什么会被调用</font>

#### 重点二：可以在组件实例中使用ref

```javascript
//<Input>来源于上面的示例代码
class AutoFocusTextInput extends Component {
    componentDidMount(){
        this.textInput.focus();
    }
    
    render(){
        return (
            <Input ref={(input) => { this.textInput = input }}>
        )
		}
}

```

> 上面代码在组件挂载时，实现自动聚焦功能
>
> 文档指出，`<Input>`组件必须是使用`class`声明的组件，不然无法使用。这意味着React逐渐与ES6全面接轨了。

#### 重点三：无状态组件（函数组件）不能使用ref

> 函数组件有hooks，可以使用useRef获取组件组件的dom，不能直接使用ref

#### 重点四：父组件的ref回调函数可以使用子组件的DOM

这是Facebook非常不推荐的做法，因为这样会打破组件的封装性，这种方法只是某些特殊场景下的权宜之计。

```javascript
function CustomTextInput(props) {
    return (
        <div>
            <input ref={props.inputRef} />
        </div>
    );
}

class Parent extends React.Component {
    render() {
        return (
            <CustomTextInput
                inputRef={el => this.inputElement = el}
            />
        );
    }
}

```

> 原理就是父组件把`ref`的回调函数当做`inputRef`props传递给子组件，然后子组件`<CustomTextInput>`把这个函数和当前的DOM绑定，最终的结果是父组件`<Parent>`的`this.inputElement`存储的DOM是子组件`<CustomTextInput>`中的`input`。

### 2.react之useRef的使用

useRef的作用：

1. 用`useRef`获取React JSX中的DOM元素，获取后你就可以控制DOM的任何东西了。但是一般不建议这样来作，React界面的变化可以通过状态来控制。
2. 用`useRef`来保存变量，这个在工作中也很少能用到，我们有了`useContext`这样的保存其实意义不大

```javascript
import React, { useRef} from 'react';
function Example8(){
    const inputEl = useRef(null)
    const onButtonClick=()=>{
        inputEl.current.value="Hello ,JSPang"
        console.log(inputEl) //输出获取到的DOM节点
    }
    return (
        <>
            {/*保存input的ref到inputEl */}
            <input ref={inputEl} type="text"/>
            <button onClick = {onButtonClick}>在input上展示文字</button>
        </>
    )
}
export default Example8
```

> 可以使用useRef获取DOM元素，并且可以通过useRefu控制DOM的属性和值。

### 3.react之组件的实现与挂载

当我们能够熟练运用React进行前端开发时，不免会对React内部机制产生浓厚的兴趣。组件是什么？是真的DOM吗？生命周期函数的执行依据又是什么呢？

#### 1、组件是什么

写一个组件`<Example8 />`，在控制台打印出来，得到的是一个js对象,而不是真实dom

#### 2、组件初始化

#### 3、组件的挂载

### 4.react之hooks构建过程

[源码解析 React Hook 构建过程](https://juejin.cn/post/6844903903612387335)

React Hook 新特性随 React v16.8.0 版本正式发布

#### 1、hooks要解决的痛点

1. 在组件之间复用状态逻辑很难

   > 之前的解决方案是：render props和高阶组件
   >
   > 缺点是难理解，存在过多的嵌套形成“嵌套地狱”

2. 复杂组件变的难以理解

   > 生命周期函数中充斥着各种状态逻辑和副作用，这一副作用难以复用，且很零散
   >
   > <font color="red">**函数副作用** 指当调用函数时，除了返回函数值之外，还对主调用函数产生附加的影响。例如修改全局变量（函数外的变量）或修改参数。</font>

3. 难以理解的 Class

   > - this指针问题
   > - 组件预编译(组件折叠)会在class中遇到优化失效的case
   > - class不能很好的压缩
   > - class在热重载时会出现不稳定的情况

#### 2、hooks的优点

	1. 无class的复杂性
 	2. 无生命周期困扰
 	3. 优雅的复用
 	4. 具有类组件相同的能力