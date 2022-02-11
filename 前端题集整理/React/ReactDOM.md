### ReactDOM

1. ReactDOM.render
2. ReactDOM.unmountComponentAtNode
3. findDOMNode()
4. createPortal() 

```tsx
// render

// render函数是异步的，可以有三个参数 组件，根节点，回调函数
let app:any
ReactDOM.render(<App ref={node=>app=node}/>>,document.getElementById('root'),()=>{
    // 组件挂载到页面后需要执行的任务

    // 如 三秒后卸载
    setTimeout(()=>{
       console.log(ReactDOM.findDOMNode(app)) 

        ReactDOM.unmountComponentAtNode(document.getElementById('root') as HTMLElement)
        // ((document.getElementById('root') as HTMLElement).firstChild as HTMLElement).remove()
    },3000)
})

// unmountComponentAtNode() 卸载组件，执行生命周期函数
// remove 直接删除dom


// findDOMNode()

// createPortal()  在子组件中，将元素挂在到父元素上 （弹窗 Modal）
ReactDOM.render(<button>Click</button>,document.getElementById('root'))   // 层级在父元素上展示，点击方法无效
ReactDOM.createPortal(<button>Click</button>,document.getElementById('root'))  // 层级在父元素上展示，点击方法有效，还是看做子组件元素
```
