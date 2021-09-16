## vue 和 react 的异同点

1. 都使用虚拟 dom
2. 组件化开发
3. 单向数据流
4. 都支持服务端渲染

都是要虚拟 DOM，都是单项数据流，都是组件化开发，都可以服务端渲染

5. 生态圈 react 是 redux,vue 是 vuex
6. vue 是双向绑定 react 单向绑定
7. react 使用 jsx vue 使用 template
8. react 手动 setState,vue 自动（初始化已响应式处理）

vue vuex 自动处理状态 双向绑定 template
react redux 手动处理状态 单向绑定 jsx

## vue 的优缺点

响应式，渐进式，轻量级，虚拟 DOM，单页面路由，数据与视图分开
不利于 seo,不支持 ie8 以下，首屏加载时间长

## 实现一个水平垂直居中

## margin 塌陷？有没有遇到过其他 css 问题？

1. margin 塌陷不是 css 的 bug，而是设计如此，为了页面更加美观，不然，中间的元素之间的 margin 是首尾两个的两倍

2. 与 margin 塌陷有关的是 bfc
   bfc 是页面的一块渲染区域，不是 css 样式
3. 什么是 bfc
   有浮动元素，绝对定位元素，非块级盒子的块级容器以及 overflow 不为 visible 的块级盒子，会为他们的内容创建新的 bfc
4. 怎么形成 bfc
   - 根元素
   - float 值不为 none
   - position 的值为 absolute 或 fixed
   - overflow 不为 visible
   - display 的值为 flex,inline-block,inline-cell,inline-flex
5. bfc 特性

   - bfc 是页面上的一个独立容器，不受外界干扰或干扰外界
   - 计算 bfc 高度时，浮动元素也参与计算
   - bfc 区域不会与 float 的元素区域重叠
   - bfc 元素会在垂直方向上放置
   - 两个相邻元素的 margin 会发生重叠

6. 解决 margin 塌陷 margin 重叠 兄弟元素 margin 塌陷 父子元素（使用 bfc 解决 margin 塌陷问题）
   - 给父盒子添加 border
   - 给父盒子添加 padding-top
   - 给父盒子添加 overflow:hidden
   - 父盒子:position:fixed
   - 父盒子:display:table
   - 给子元素的前面添加一个兄弟元素

## vue 响应式原理

原理：数据劫持+响应式原理
对象通过 Object.defineProperty 将属性进行劫持（已有属性），数组进行方法重写

## 为什么只对对象劫持，而要对数组进行方法重写？

因为对象最多也就几十个属性，拦截起来数量不多，但是数组可能会有几百几千项，拦截起来非常耗性能，所以直接重写数组原型上的方法，是比较节省性能的方案

## 组件 data 为什么是一个函数？

data 之所以是一个函数，是因为一个组件可能会被多次调用，每次吊椅，执行 data()函数返回一个新的对象，可以避免多次调用之间的数据污染

## vue Object.defineProperty 缺陷？数组 7 个方法怎么重写的？

1.  无法监听数组变化
2.  只能劫持对象的属性而不是劫持整个对象，我们需要对对象进行遍历

## 子组件修改 props 的数据

1. 修改基本数据类型，报错
2. 修改引用类型 重新赋值，会报错；修改某个属性值，不报错，并且父组件数据也会修改

## 虚拟 dom

1. 本质：虚拟 dom 是 js 对象，里面包含 props,tag,children 等属性
2. 存在的意义

   - 相当于在 js 和真实 dom 之间加了一个缓存，利用 diff 算法，避免了无用的 dom 操作
   - 实现了跨平台，而不只是浏览器中的 DOM

3. 特点
   - 将 html 转化为虚拟 DOM
   - 虚拟 dom 不一定更快

## diff 算法

1. 原理
   - 对比新老节点，将变化的部分更新到视图上。对应到代码上，就是一个 diff 函数，返回一个补丁
   - 先序深度优先
