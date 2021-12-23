### 用 es5 实现 promise

1. 搭好骨架，promise 函数有一个回调函数作为参数，改回调函数有 resolve 和 reject 两个函数作为参数，并且可以调用.then 方法

2. 实现 then 方法，写在 promise 原型上
   then 方法有两个函数作为参数，成功的回调函数和失败的回调函数

   - 1、判断两个参数是不是函数，不是函数，就忽视
   - 2、then 方法必须返回一个 promise 对象
     promise2 = promise1.then(onFulfilled, onRejected);
   - 3、分别写出三种状态（resolve，reject，pendding）下 promise 怎么执行
