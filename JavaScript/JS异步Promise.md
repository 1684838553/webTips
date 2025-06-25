> [7 个技巧助你写出优雅高效的 JavaScript 异步代码](https://juejin.cn/post/7516573541757567013#heading-0)
>

### reject 一个 Error 对象

在处理 Promise 时，当我们需要拒绝一个 Promise 时，强制使用 Error 对象是个非常好的习惯。这么做的原因在于，浏览器底层在分配堆栈和查找堆栈时，Error 对象能让其工作更轻松，方便我们快速定位错误

```javascript
// bad
Promise.reject('error reason');

// good
Promise.reject(new Error('error reason'));
```

### 不要在 Promise 上使用 async

将 async 函数传递给 Promise 构造函数不仅多此一举，还存在潜在问题。如果 async 函数内部出现异常，外部的 Promise 并不会按照预期 reject

```javascript
// bad 这种写法会导致异常处理出现问题
new Promise(async (resolve, reject) => {

})

// good
new Promise((resolve, reject) => {
  async function() {
  // 具体的代码逻辑
  }()
})
```

**导致的问题:**

1. `性能开销：`每次调用async函数都会创建一个新的Promise，这在高性能要求的场景下可能会影响性能。

2. `错误处理复杂性：`虽然外部的.catch()可以捕获错误，但在某些情况下，错误处理逻辑可能会变得复杂，尤其是在嵌套的Promise链中。

3. `代码可读性：`使用async可能会使代码更难阅读，尤其是在执行器函数中没有使用await的情况下

### 不要使用 await 在循环中

在循环中使用 await 会使异步任务依次执行，大大降低了代码的执行效率。我们可以将这些异步任务改为并发执行，利用 Promise.all 方法大幅提升效率

```javascript
// bad 每次循环都要等待上一个异步请求完成，导致整体执行时间变长
const paths = ['path1', 'path2', 'path3'];
for(const apiPath of paths) {
    const { data } = await request(apiPath)
}

// good 通过 Promise.all 并发执行，显著提高了效率
const paths = ['path1', 'path2', 'path3'];
const results = [];
for(const apiPath of paths) {
    const res = request(apiPath);
    results.push(res);
}
await Promise.all(results);
```

### 不要再 Promise 中使用 return 语句

在 Promise 构造函数中使用 return 语句，不符合 Promise 的使用规范，也不利于代码的可读性和维护性。正确的做法是使用 resolve 和 reject 来处理结果和错误

```javascript
// bad 让代码逻辑变得混乱
new Promise((resolve, reject) => {
    if(isOK) return 'ok'
    return 'not ok'
})

// good 清晰地处理成功和失败的情况
new Promise((resolve, reject) => {
    if(isOK) resolve('ok')
    reject(new Error('not ok'))
})
```

### 防止回调地狱

回调地狱是异步编程中常见的问题，多层嵌套的回调函数不仅难以阅读，而且维护起来十分困难。利用 async/await 可以让代码变得更加简洁直观

```javascript
// bad 回调地狱
p1((err, res1) => {
    p2(res1, (err, res2) => {
        p3(res2, (err, res3) => {
            p4(res3, (err, res4) => {
                console.log(res4)
            })
        })
    })
})

// good 逻辑更加清晰
const res1 = await p1()
const res2 = await p1(res1)
const res3 = await p1(res2)
const res4 = await p1(res3)
console.log(res4)
```

### 别忘了异常处理

无论是使用 Promise 的 then/catch 还是 async/await ，都不能忽略异常处理，否则一旦出现错误，程序可能会崩溃

```javascript
// bad示例中没有处理异常，程序的稳定性无法保证
asyncPromise().then(() => {

})
const result = await asyncPromise()

// good 捕获异常，增强了程序的健壮性
asyncPromise().then(() => {

}).catch(() => {

})

try {
    const result = await asyncPrmise()
} catch() {
    // 进行错误处理
}
```

### 不要 await 一个非 Promise 函数

await 只能用于等待 Promise 对象，如果用于非 Promise 函数，会导致代码出现错误。我们需要将函数改造为返回 Promise 的形式

```javascript
function getUserInfo() {
    return userInfo
}

// bad 对非 Promise 函数使用 await ，会引发错误
await getUserInfo()

// good
async function getUserInfo() {
    return userInfo
}
await getUserInfo()
```