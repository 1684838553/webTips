### Promise

[Promise/A 提案](https://promisesaplus.com/)
[手写系列-彻底搞懂 Promise](https://jelly.jd.com/article/60c806db73fc6c016cdeff90)

1. promise 是什么
   用途：主要用于异步计算，可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果，可以在对象之间传递和操作 promise,帮助我们处理队列

2. promise 产生的原因
   javascript 包含大量的异步操作，为检查表单而生

3. promise 状态

   > 3 种状态 pending fulfilled rejected
   > 这些状态不可逆
   > pending->fulfilled
   > pending->rejected

   > promise 接收一个执行器函数作为参数，该函数有两个参数
   > resolve 返回成功状态
   > reject 返回失败状态
