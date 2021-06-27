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


### 2、React组件的声明周期

[react组件更新脑图](https://naotu.baidu.com/file/852133c6a8787c66b58809e4528f92eb)

- 渲染工作流：指的是组件数据改变到组件实际更新发生的过程（该过程离不开render）

#### React15的声明周期流程
[react15 生命周期](./react15 组件生命周期.png)


1. 组件初始化渲染（挂载）


