## 综述

现在以下几种`async`函数的用法都是可行的。

Async函数声明：

```javascript
async function foo(){}
```

Async函数表达式：

```javascript
const foo = async function(){}
```

Async方法定义：

```javascript
let obj = {async foo(){}}
```

Async箭头函数：

```javascript
const foo = async () => {}
```

Async函数通常返回的是 Promise：

```javascript
async function asyncFunc() {
    return 123;
}

asyncFunc()
.then(x => console.log(x));
```

```
123
```

```javascript
async function asyncFunc() {
    throw new Error('Problem!');
}

asyncFunc()
.catch(err => console.log(err));
```

```
Error: Problem!
```

只有操作符`await`可以放在 Async 函数里用来处理返回的 Promise 对象结果。所以`await`的处理结果会随着 Promise 的状态不同而不同。

一个简单的异步处理：

```javascript
async function asyncFunc() {
    const result = await otherAsyncFunc();
    console.log(result);
}

// 等价于：

function asyncFunc() {
    return otherAsyncFunc()
    .then(result => {
        console.log(result);
    });
}
```

顺序处理多个异步结果：

```javascript
async function asyncFunc() {
    const result1 = await otherAsyncFunc1();
    console.log(result1);
    const result2 = await otherAsyncFunc2();
    console.log(result2);
}

// 等价于：

function asyncFunc() {
    return otherAsyncFunc1()
    .then(result1 => {
        console.log(result1);
        return otherAsyncFunc2();
    })
    .then(result2 => {
        console.log(result2);
    });
}
```

平行处理多个异步结果：

```javascript
async function asyncFunc() {
    const [result1, result2] = await Promise.all([
        otherAsyncFunc1(),
        otherAsyncFunc2(),
    ]);
    console.log(result1, result2);
}

// 等价于：

function asyncFunc() {
    return Promise.all([
        otherAsyncFunc1(),
        otherAsyncFunc2(),
    ])
    .then([result1, result2] => {
        console.log(result1, result2);
    });
}
```

处理错误异常：

```javascript
async function asyncFunc() {
    try {
        await otherAsyncFunc();
    } catch (err) {
        console.error(err);
    }
}

// 等价于：

function asyncFunc() {
    return otherAsyncFunc()
    .catch(err => {
        console.error(err);
    });
}

```

## 理解`async`函数

在解释`async`函数之前，我想通过把`Promises`和`generator`结合起来，用看起来像同步代码的方式去模拟一下异步。

对于处理获取一次性结果的异步函数，`Promises`是目前最流行的方式。下面是一个使用`fetch`方法获取文件的示例：

```javascript
function fetchJson(url) {
    return fetch(url)
    .then(request => request.text())
    .then(text => {
        return JSON.parse(text);
    })
    .catch(error => {
        console.log(`ERROR: ${error.stack}`);
    });
}
fetchJson('http://example.com/some_file.json')
.then(obj => console.log(obj));
```

`co`是一个基于`Promises`和`generator`的实现，也能够让你以书写同步代码的方式来实现上面的示例。

```javascript
const fetchJson = co.wrap(function* (url) {
    try {
        let request = yield fetch(url);
        let text = yield request.text();
        return JSON.parse(text);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
});

```

`co`在`generator`回调函数中每次检测到一个带有`yield`操作符的方法，就会产生一个`Promise`对象，`co`会先暂停回调代码的执行，直到`Promise`对象的状态发生变化再继续执行。无论`Promise`的状态为`resolved`或者`rejected`，`yield`都会将相应的结果值返回。

详细说明一下`async`函数的执行过程：

1. `async`函数在开始执行的时候，通常都是返回一个`Promise`对象
2. 函数体被执行之后，你可以使用`return`或者`throw`直接完成执行过程。也可以使用`await`暂时完成执行过程，然后根据情况再继续执行
3. 最终返回一个`Promise`对象
4. `then`和`catch`中的callback只有在当前所有代码执行完毕之后，才会被执行。从下面的输出结果可以看出函数`asyncFunc`的返回值等到所有代码包括循环逻辑都执行完毕之后，才最终得以被输出

```javascript
async function asyncFunc() {
    console.log('asyncFunc()'); // (A)
    return 'abc';
}
asyncFunc().
then(x => console.log(`Resolved: ${x}`)); // (B)
console.log('main');

for(let i=0; i<5; i++){
    console.log(i)
}
```

```
asyncFunc()
main
0
1
2
3
4
Resolved: abc
```

使用`return`去`Resolve`一个`async`函数状态，是一种很标准的操作方式。这意味着你可以：
1. 直接返回一个非`Promise`对象类型的值，作为`Resolve`状态的参数值
2. 返回的`Promise`对象代表了当前`async`的函数状态

## 使用`await`的若干贴示

使用`async`函数最常犯的一个错误就是忘记添加`await`关键字，例如下面的示例中`value`指向了一个`Promise`对象，但是忘了添加`await`关键字，所以输出的可能并不是你想要的结果：

```javascript
async function asyncFunc() {
    const value = otherAsyncFunc(); // missing `await`!
    ···
}
```

`await`可以感知到后面跟的 Promise 异步函数是否有结果值，例如在下面的示例中，`await`可以确保`step1()`执行完之前，不会执行`foo()`的剩余逻辑代码：

```javascript
async function foo() {
    await step1(); // (A)
    ···
}
```

有时候你仅仅是想触发一个异步函数计算，并不想知道它会何时完成。例如在下面示例中，我们并不关心写文件的操作何时完成，只要它们是按正确的顺序执行就可以了。最后一行的`await`只是为了确保关闭写文件的操作能被成功执行即可。

```javascript
async function asyncFunc() {
    const writer = openFile('someFile.txt');
    writer.write('hello'); // don’t wait
    writer.write('world'); // don’t wait
    await writer.close(); // wait for file to close
}
```

多个`await`异步函数是顺序执行的关系，想要它们同时执行就得使用`Promise.all()`了：

```javascript
async function foo() {
    const result1 = await asyncFunc1();
    const result2 = await asyncFunc2();
}
```

```javascript
async function foo() {
    const [result1, result2] = await Promise.all([
        asyncFunc1(),
        asyncFunc2(),
    ]);
}
```

## `async`在回调函数中的应用

有一个需要知道的限制是，`await`操作符只会影响`async`函数的直接作用域环境。因此，你不能在一个`async`方法的回调函数中直接使用`await`。

### `Array.prototype.map()`

下面的示例是根据 url 下载一些资源：

```javascript
async function downloadContent(urls) {
    return urls.map(url => {
        // Wrong syntax!
        const content = await httpGet(url);
        return content;
    });
}
```

像上面这种在普通的箭头函数中使用`await`是无法运行的，会抛出语法错误。那我们应该怎么用，像下面这样吗？

```javascript
async function downloadContent(urls) {
    return urls.map(async (url) => {
        const content = await httpGet(url);
        return content;
    });
}

function httpGet(url){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            if(url.indexOf('a') > -1){
                resolve('a.com');    
            }else{
                resolve('b.com');
            }
        }, 2000)  
    });
}

const contents = downloadContent(['http://a.com', 'http://b.com']);
console.log(contents);
contents.then((url) => {
    console.log(url);
});
```
输出结果：

![2017-09-03 9 59 57](https://user-images.githubusercontent.com/1744713/29999993-ba6b1dc8-908e-11e7-851e-cd73c0d9bd3d.png)

你会发现代码中有两个问题：
1. 返回值是一个包含两个`Promise`对象的数组，并不是我们期望的包含`resolve`返回值的数组
2. `await`只能暂停箭头回调函数里的`httpGet()`，`map`本身的回调函数执行完成之后，并不能影响外层的`downloadContent ()`也执行完成

我们用`Promise.all()`来修复这两个问题，把返回的 **包含两个`Promise`对象的数组** 转换成 **包含两个数组元素的`Promise`对象**，看如下示例：

```javascript
async function downloadContent(urls) {
    const promiseArray = urls.map(url => httpGet(url));
    return await Promise.all(promiseArray);
}

function httpGet(url){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            if(url.indexOf('a') > -1){
                resolve('a.com');    
            }else{
                resolve('b.com');
            }
        }, 2000)  
    });
}

const contents = downloadContent(['http://a.com', 'http://b.com']);
console.log(contents);
contents.then((url) => {
    console.log(url);
});
```

输出结果：

![2017-09-03 10 14 42](https://user-images.githubusercontent.com/1744713/30000047-c1973706-9090-11e7-919a-dacf0a0b3b99.png)

OK，现在输出结果是正确的了。但是这段代码还是有一点点低效的地方需要改进，`downloadContent ()`函数里首先用`await`展开了`Promise.all()`的返回结果，后面又用`return`包装了一次，其实我们用`return`直接返回`Promise.all()`即可：

```javascript
async function downloadContent(urls) {
    const promiseArray = urls.map(url => httpGet(url));
    return Promise.all(promiseArray);
}
```

### `Array.prototype.forEach()`

我们这次换成`forEach()`方法来模拟输出若干文件内容。很显然，下面的示例会抛出语法错误，因为你不能在普通的箭头函数中直接使用`await`：

```javascript
async function logContent(urls) {
    urls.forEach(url => {
        // Wrong syntax
        const content = await httpGet(url);
        console.log(content);
    });
}
```

那我把代码修改成如下：

```javascript
async function logContent(urls) {
    urls.forEach(async url => {
        const content = await httpGet(url);
        console.log(content);
    });
    // Not finished here
}
```

这次代码倒是运行了，但是`httpGet()`方法返回`resolve`状态的操作是异步的，也就是说当`forEach()`方法已经返回之后，它的`callback`还并没有执行完成。修复此问题，只需要将代码做一下更改：

```javascript
async function logContent(urls) {
    for (const url of urls) {
        const content = await httpGet(url);
        console.log(content);
    }
}
```

这段示例中的`httpGet()`执行顺序是线性的，每一次的调用必须要等待上一次执行完毕。如果想要改成并行的执行顺序，就得用`Promise.all()`了：

```javascript
async function logContent(urls) {
    await Promise.all(urls.map(
        async url => {
            const content = await httpGet(url);
            console.log(content);            
        }));
}
```

`map()`方法创建了一个`Promise`对象数组。我们并不关心这几个`Promise`对象的履行结果，只要它们履行了即可。也就是`loginContent()`方法执行完成就可以了。在这个示例中除非把`Promise.all()`直接返回，否则此函数的结果只会包含若干`undefined。

![2017-09-03 4 32 51](https://user-images.githubusercontent.com/1744713/30001623-9399ebd4-90c5-11e7-83bc-d2a034a14765.png)

## 使用`async`函数的若干贴示

`async`函数的基础就是`Promise`，所以充分理解下面的示例非常重要。尤其是在那些没有使用`Promise`机制的老代码中使用`async`函数时，你可能除了直接使用`Promise`之外没有别的选择。

下面是一个在`XMLHttpRequest`中使用`Promise`的示例：

```javascript
function httpGet(url, responseType="") {
    return new Promise(
        function (resolve, reject) {
            const request = new XMLHttpRequest();
            request.onload = function () {
                if (this.status === 200) {
                    // Success
                    resolve(this.response);
                } else {
                    // Something went wrong (404 etc.)
                    reject(new Error(this.statusText));
                }
            };
            request.onerror = function () {
                reject(new Error(
                    'XMLHttpRequest Error: '+this.statusText));
            };
            request.open('GET', url);
            xhr.responseType = responseType;
            request.send();
        });
}
```

`XMLHttpRequest`的 API 设计都是基于 callback 的。使用`async`函数就意味着你要在内层回调函数里使用`return`和`throw`返回`Promise`对象的状态，但这肯定是不可能的。因此，在这情况中使用`async`的风格就是：

* 使用`Promise`直接构建一个异步的基元
* 通过`async`函数来使用这些基元

在一个模块或者 script 的顶级作用域中使用`await`，可以像下面这样：

```javascript
async function main() {
    console.log(await asyncFunction());
}
main();
```
或者
```javascript
(async function () {
    console.log(await asyncFunction());
})();
```
或者
```javascript
(async () => {
    console.log(await asyncFunction());
})();
```

不用太担心那些未处理`rejections`，以前这种情况可能都是静默失败，不过现在大多数的现代浏览器都会抛出一个未处理的异常：

```javascript
async function foo() {
    throw new Error('Problem!');
}
foo();
```
