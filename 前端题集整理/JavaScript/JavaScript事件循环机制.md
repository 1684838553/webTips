## 事件循环机制

> JS是单线程，在这个线程中，事件循环是唯一的，但是任务队列可以拥有多个，宏任务队列和微任务队列

### 宏任务：每次执行栈执行的代码

1. script(整体代码)
2. setTimeout
3. setInterval 
4. setImmediate 
5. I/O
6. UI rendering

### 微任务：在当前 task 执行结束后立即执行的任务

1. process.nextTick
2. Promise
3. Object.observe(已废弃) 
4. MutationObserver(html5新特性)

**`nextTick`队列会比`Promie`先执行**

### demo1

1. 从宏任务开始，script(整体代码) 全局上下文入栈 ==》 setTimeout 进入宏任务队列  ==》 .then 进入微任务队列
2. 第一个宏任务script执行完后，执行所有可执行的微任务，第一轮循环结束，开始第二轮循环，
3. 从宏任务开始

```javascript
setTimeout(function() {
    console.log('timeout1');
})

new Promise(function(resolve) {
    console.log('promise1');
    for(var i = 0; i < 1000; i++) {
        i == 99 && resolve();
    }
    console.log('promise2');
}).then(function() {
    console.log('then1');
})

console.log('global1');
```
> promise1  promise2  global1  then1  timeout1

### demo2
```javascript
console.log('golb1');

 setTimeout(function() {
     console.log('timeout1');
     process.nextTick(function() {
         console.log('timeout1_nextTick');
     })
     new Promise(function(resolve) {
         console.log('timeout1_promise');
         resolve();
     }).then(function() {
         console.log('timeout1_then')
     })
 })
 
 setImmediate(function() {
     console.log('immediate1');
     process.nextTick(function() {
         console.log('immediate1_nextTick');
     })
     new Promise(function(resolve) {
         console.log('immediate1_promise');
         resolve();
     }).then(function() {
         console.log('immediate1_then')
     })
 })
 
 process.nextTick(function() {
     console.log('glob1_nextTick');
 })
 new Promise(function(resolve) {
     console.log('glob1_promise');
     resolve();
 }).then(function() {
     console.log('glob1_then')
 })
 
 setTimeout(function() {
     console.log('timeout2');
     process.nextTick(function() {
         console.log('timeout2_nextTick');
     })
     new Promise(function(resolve) {
         console.log('timeout2_promise');
         resolve();
     }).then(function() {
         console.log('timeout2_then')
     })
 })
 
 process.nextTick(function() {
     console.log('glob2_nextTick');
 })
 new Promise(function(resolve) {
     console.log('glob2_promise');
     resolve();
 }).then(function() {
     console.log('glob2_then')
 })
 
 setImmediate(function() {
     console.log('immediate2');
     process.nextTick(function() {
         console.log('immediate2_nextTick');
     })
     new Promise(function(resolve) {
         console.log('immediate2_promise');
         resolve();
     }).then(function() {
         console.log('immediate2_then')
     })
 })
```

> 第一步 script(整体代码) nextTick与Promise任务分别进入各自的队列
> 
> golb1 glob1_promise glob2_promise glob1_nextTick glob2_nextTick glob1_then glob2_then
> 
> 第二轮循环 setTimeout队列
> 
> timeout1 timeout1_promise timeout1_nextTick timeout1_then timeout2  timeout2_promise  timeout2_nextTick  timeout2_then
> 
> 第三轮循环 setImmediate队列
> 
> immediate1  immediate1_promise  immediate1_nextTick  immediate1_then  immediate2  immediate2_promise  immediate2_nextTick  immediate2_then

### 单独说说定时器

调用 `setTimeout` 后，是如何等待特定时间后才添加到事件队列中的？

它不是由 JS 引擎检测的，而是由<strong>定时器线程</strong>控制。

为什么要单独的定时器线程？因为 JavaScript 引擎是单线程的，如果处于阻塞状态就会影响记时器的准确，因此很有必要单独开一个线程用来计时。

什么时候会用到定时器线程？当使用 `setTimeout` 或 `setInterval` 时，它需要定时器线程计时，计时完成后就会将特定的事件推入事件队列中。

```js
setTimeout(function() {
  console.log('Jecyu');
}, 1000);
console.log("Hi");
```
这段代码的作用是当 `1000` 毫秒计时完毕后（由定时器线程计时），将回调函数推入事件队列中，等待主线程执行

```js
setTimeout(function() {
  console.log('Jecyu');
}, 0);
console.log("Hi");
```
这段代码的效果是最快的时间内将回调函数推入事件队列中，等待主线程执行。

注意：
- 执行结果：先`Hi` 后，`Jecyu`。
- 虽然代码的本意是0毫秒后就推入事件队列，但是 W3C 在 HTML 标准中规定，**规定要求 `setTimeout` 中低于4ms的时间间隔算为4ms**。（不过也有一说是不同浏览器有不同的最小时间设定)
- 就算不等待 4ms，就算假设0毫秒就推入事件队列，也会先执行`Hi`（因为只有可执行栈内空了后才会主动读取事件队列）。

### setTimeout 而不是 setInterval

用 `setTimeout` 模拟定期计时和直接使用 `setInterval` 是有区别的。

```js
function run() {
  console.log('Hi') // 执行代码需要时间，会导致误差
  setTimeout(function() {
    run();
  }, 1000)
}  
run();  
```

因为每次 setTimeout 计时到后就会去执行，然后执行一段时间后才会继续 setTimeout，中间就多了误差（误差多少与代码执行时间有关）

而 setInterval 则是每次都精确的隔一段时间推入一个事件（但是，事件的实际执行时间不一定就准确，还有可能是这个事件还没执行完毕，下一个事件就来了。
```js
setInterval(function() {
 // 如果这里花费时间很长的话（超过1s），将会导致一个问题，当前的事件还没执行完，后续的事件继续添加进来。
 // 那么后续的回调执行事件频率会小于 1s 的间隔进行触发，解决：可以使用 setTimeout 来模拟 setInterval 执行。
 setTimeout(function() { // 模拟执行时间
   console.log('Hi') 
 }, 2000);
}, 1000); 
```
执行分析如图：

而且 `setInterval` 有一些比较致命的问题就是：

- 累计效应（上面提到的），如果 `setInterval` 代码再（`setInerval`）再次添加到队列之前还没有完成执行，就会导致定时器代码连续运行好几次，而之间没有间隔。就算正常间隔执行，多个 setInterval 的代码执行时间可能会比预期小（因为代码执行需要一定时间）。
- 而且把浏览器最小化显示等操作时，`setInterval` 并不是不执行程序，它会把 `setInterval` 的回调函数放到队列中，等浏览器窗口再次打开时，一瞬间全部执行完。

所以，鉴于这么多问题，目前一般认为的最佳方案是：用 `setTimeout` 模拟 `setInterval`，或者特殊场合（做动画）直接用 `requestAnimationFrame`。
