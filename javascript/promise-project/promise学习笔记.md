### Promise

<font color="red">1、promise产生的原因 2、promise使用场景 3、如何用es5去实现一个promise,实现思路</font>

[Promise/A 提案](https://promisesaplus.com/)
[手写系列-彻底搞懂 Promise](https://jelly.jd.com/article/60c806db73fc6c016cdeff90)

1. promise 是什么
   用途：主要用于异步计算，可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果，可以在对象之间传递和操作 promise,帮助我们处理队列

2. promise 产生的原因
   解决回调地狱

3. promise 状态

   > 3 种状态 pending fulfilled rejected
   > 这些状态不可逆
   > pending->fulfilled
   > pending->rejected

   > promise 接收一个执行器函数作为参数，该函数有两个参数
   > resolve 返回成功状态
   > reject 返回失败状态

   ```javascript
   class MyPromise {
   construtor (executor) {
      // 执行器
      executor(this.resolve, this.reject)
   }
   // 成功返回值
   value = null
   // 失败返回值
   reason = null
   
   // 修改 Promise 状态，并定义成功返回值
   resolve = value => {
     if (this.status === STATUS.PENDING) {
       this.status = STATUS.FULFILLED
       this.value = value
     }
   }
   
   // 修改 Promise 状态，并定义失败返回值
   	reject = () => {
       if (this.status === STATUS.PENDING) {
         this.status = STATUS.REJECTED
         this.reason = value
       }
     }
   }
   
   ```
   
   ```javascript
   //1、最简单的实例，使用定时器模拟Promise状态改变
   console.log('here we go')
   
   new Promise(resolve => {
     setTimeout(() => {
       resolve('hello')
     })
   })
     .then(value => {
     console.log(value+' china')
   })
   
   //2、两步执行范例,解决异步回调嵌套问题
   new Promise((resolve) => {
     setTimeout(() => {
       resolve("hello");
     });
   })
     .then((value) => {
       console.log(value);
       return new Promise((resolve) => {
         setTimeout(() => {
           resolve("china");
         });
       });
     })
     .then((value) => {
       console.log(value + " china");
     });
   
   //3、对已完成的promise执行then
   let p = new Promise((resolve) => {
     setTimeout(() => {
       console.log("the promise fulfilled");
       resolve("hello");
     }, 1000);
   });
   
   setTimeout(() => {
     p.then((value) => {
       console.log(value);
     });
   }, 3000);
   
   //4、then里面不返回promise
   let p = new Promise((resolve) => {
     setTimeout(() => {
       console.log("the promise fulfilled");
       resolve("hello");
     }, 1000);
   })
     .then((value) => {  //这个函数没有返回值，里面的立即执行函数的返回值不算该函数的返回值，下面的then方法的value为undefined，若是该函数能return false ,then中将打印 false china
       console.log(value);
       console.log("everyone");
         (function () {
           return new Promise((resolve) => {
             setTimeout(() => {
               console.log("cat");
               resolve("drunk");
             }, 2000);
           });
         })()  
     })
     .then((value) => {
       console.log(value + " china");
     });
   ```
   
4. .then()

   - 接收两个函数作为参数，分别代表fulfilled和rejected

   - 返回一个promise实例，所以能实现链式调用
   - 当前promise状态改变时，then根据它的最终状态，选择特定的状态响应函数执行

   **then（）里面有then（）的情况**

   ```javascript
   let p = new Promise((resolve) => {
     setTimeout(() => {
       resolve("hello");
     }, 1000);
   })
     .then((value) => { 
       console.log(value);
       console.log("step1");
           return new Promise((resolve) => {
             setTimeout(() => {
               console.log("step 1-1");
               resolve("drunk");
             }, 2000);
           }).then(res=>{
             console.log("step 1-2");
   				})
     })
     .then((value) => {
       console.log("step 2");
     });
   
   
   //可以把then中的then移出来
   let p = new Promise((resolve) => {
     setTimeout(() => {
       resolve("hello");
     }, 1000);
   })
     .then((value) => {
       console.log(value);
       console.log("step1");
       return new Promise((resolve) => {
         setTimeout(() => {
           console.log("step 1-1");
           resolve("drunk");
         }, 2000);
       })
     })
     .then((res) => {
       console.log("step 1-2");
     })
     .then((value) => {
       console.log("step 2");
     });
   
   ```

   #### 测试：下面四种promise的区别是什么？

   ```javascript
   //假设doSomething()和doSomethingElse()返回的都是promise实例，后面跟了一个finalHandler函数
   
   // #1  有返回值，可以继续下一步链式调用
   doSomething().then(function(){
     return doSomethingElse()  
   })
   // #2 没有返回值，下一步调用then时，回调的值是undefined；finalHandler和doSomethingElse同时执行
   doSomething().then(function(){
     doSomethingElse()
   })
   // #3 doSomething和doSomethingElse同时执行，在一个调用栈里面，doSomething执行完成后，执行finalHandler
   doSomething().then(doSomethingElse())
   // #4 doSomethingElse相当于then的第一个参数，执行效果和#1相同
   doSomething().then(doSomethingElse)
   ```

   #### promise的错误处理

   - 使用then()的第二个参数，reject()方法处理异常
   - .catch()方法处理异常，能捕获catch()前面的then方法的异常**（推荐）**

   ```javascript
   let p = new Promise((resolve,reject) => {
     setTimeout(() => {
       //reject("bye");
       throw new Error('error')
     }, 1000);
   })
   .then(value=>{
       console.log(value)
   },value=>{
   	//方法一  
       console.log('Error:',value)  //Error: bye
   }).catch(error=>{
   	 console.log('Error:',error) 
   })
   ```

   **希望捕获错误后，then方法能接着执行**

   <font color="red">catch也返回一个promise实例</font>

   ```javascript
   new Promise((resolve) => {
       resolve('good')
   })
   .then(value=>{
       throw new Error("error");
   })
   .catch(error=>{
       console.log(error)
   })
   .then(()=>{
       console.log('hello china')
   })
   
   // Error: error 'hello china'
   // 实现catch捕获错误之后，then方法还能执行
   ```

#### promise方法

1. Promise.all() 所有子promise的resovle回调都执行完成，返回值是全部值得数组；有一个失败，返回第一个失败promise的结果

   ```javascript
   var p1 = Promise.resolve(3);
   var p2 = 1337;
   var p3 = new Promise((resolve, reject) => {
     	//setTimeout第三个参数可选，一旦定时器到期，它们会作为参数传递给function 
   		//   setTimeout(resolve, 500, 'foo');  
       throw new Error('error')
   })
   
   Promise.all([p1, p2, p3]).then(values => {
     console.log(values); 
   });
   
   //p3执行被注释的代码，打印出 [3,1337,'foo']；执行未被注释的代码，报错
   ```

   **Promise.all()与map()连用**

2. **实现队列??**

   - 方法一

   ```javascript
   function queue(things){
       let p = Promise.resolve()
       things.forEach(thing => {
           p = p.then(()=>{
               return new Promise(reolve=>{
                   doThing(thing,()=>{
                       resolve()
                   })
               })
           })
       });
       return p
   }
   
   console.log(queue([1,2,3,4]))
   ```

   - 方法二

   ```javascript
   function queue(things){
       return things.reduce((p,thing)=>{
   			let step = new Promise(resolve=>{
   				doThing(thing,()=>{
             resolve()
           })
         })
         return p.then(step)
   		},Promise.resolve())
   }
   
   console.log(queue([1,2,3,4]))
   ```

3. Promise.resolve()

   返回一个fulfilled的promise实例，或原始的Promise实例

   参数：为空，promise对象，与promise无关的值

   ```javascript
   Promise.resolve()
   .then(value=>{
       console.log(value,'step1')
       return Promise.resolve('hello')
   })
   .then(value=>{
       console.log(value,'step2')
       return Promise.resolve(new Promise(resolve=>{
           setTimeout(()=>{
               resolve('good')
           },1000)
       }))
   })
   .then(value=>{
       console.log(value,'step3')
   })
   
   //undefined step1
   //hello step2
   //good step3
   ```

4. Promise.reject()

   返回一个带有拒绝原因的`Promise`对象。

   ```javascript
   Promise.reject(new Error('fail')).then(resolved, rejected);
   // expected output: Error: fail
   ```

5. Promise.race()

   使用场景：定时器与Promise.race()一起使用，设定一个时间，超时就提示用户，请求超时

   与Promise.all()类似，但是有一个子promise执行完成，就结束执行

   ```javascript
   var p1 = Promise.resolve(3);
   var p2 = 1337;
   var p3 = new Promise((resolve, reject) => {
   		  setTimeout(resolve, 500, 'foo');  
   })
   
   Promise.race([p1, p2, p3]).then(values => {
     console.log(values); 
   });
   
   //3
   ```

6. 把任何一部操作包装成Promise

   ```javascript
   let confirm = popupManager.confirm('你确定吗')
   confirm.promise
   .then(()=>{
   	//...
   })
   .catch(()=>{
   	//...
   })
   
   class Confirm{
     construct(){
       this.promise = new Promise((resolve,reject)=>{
         this.confirmButton.onClick = resolve
         this.cancelButton.onClick = reject
       })
     }
   }
   
   ```

   

