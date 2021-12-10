## 经典题目1

### 这个代码输出什么?

```javascript
console.log(['1','2','3'].map(parseInt));
```

**答案：** [1, NaN, NaN]

**解析**

`parseInt()` 函数可解析一个字符串，并返回一个整数。

当参数 radix 的值为 0，或没有设置该参数时，`parseInt()`会根据该字符串来判断数字的基数。

当忽略参数 radix , 默认的基数如下:

如果 字符串 以 “0x” 开头，`parseInt()` 会把 其余部分解析为十六进制的整数。
如果字符串以 0 开头，把其余部分解析为八进制或十六进制的数字。
如果字符串以 1 ~ 9 的数字开头，`parseInt()`将把它解析为十进制的整数

`注意：`基数**可不是**默认十进制噢！

当我们把数组传入parseInt时，由于接收2个参数，会将数组的索引作为基数传个parseInt，所以实质上进行的是以下几步

```javascript
parseInt('1', 0)
parseInt('2', 1)
parseInt('3', 2)
```
`注意：`如果字符串的第一个字符不能被转换为数字，那么parseInt()会返回 NaN。

**小tips：**

`parseInt()`还有很多值得注意的问题，可以使用搜索引擎再了解以下


## 经典题目2

### 利用reduce实现数组去重

```javascript
let arr = [1,1,2,3,4,2,5,4];
let unique = arr.reduce(function (prev, item) {
    prev.indexOf(item) === -1 && prev.push(item);
    return prev;
}, []);
console.log(unique); // [1, 2, 3, 4, 5]
```

## 经典题目3

### 如何让 (a == 1 && a == 2 && a == 3) 的值为true？

```javascript
var i = 1
Number.prototype.valueOf = function() {
    return i++
}
var a = new Number(1)
if (a == 1 && a == 2 && a == 3) {
    console.log('here')
}
```

## 经典题目4

### 数组乱序


```javascript
function randomSort(a,b){
    return 0.5-Math.random()
}
let arr = [1,3,5,4,5,6,3]
// console.log(arr.sort(randomSort))

function shuffle(arr){

    function getRandomNumber(min,max){
        return Math.floor(Math.random() * (max-min +1))
    }

    const arr1 = arr.slice()  
    for(let i = 0 ; i < arr1.length ; i++){
        let j = getRandomNumber(0,i)
        console.log(j,'j',i)
        let t = arr1[i]
        arr1[i] = arr1[j]
        arr1[j] = t
    }
    return arr1
}
console.log(shuffle(arr))
```

## 经典题目5

### 手写实现一个bind的方法


```javascript
Function.prototype.mybind = function(context){
    const _this = this
    if(typeof _this !== 'function'){
        throw new Error('Error')
    }
    var args = [...arguments].slice(1)
    return function F(){
        if(_this instanceof F){
            return _this(...args,...arguments)
        }
        return _this.apply(context,args.concat(...arguments))
    }
}
const person = {
    name:'tom'
}
function foo(age){
    console.log(this.name,age)
}
console.log(foo.mybind(person,13)())
```

## 经典题目6

### 请解释下面题目输出的结果

```javascript
var val = "test";
console.log("output is " + (val === "Test") ? "123" : "456");  // "123"

('b' + 'a' + +'a' + 'a').toLowerCase()  // 'banana'
```
**本质是运算符优先级问题。**
**优先级是：() > + > ?:**

> 所以，表达式运算过程：
> 
> "output is " + false ? "123" : "456" ==>
> 
> "output is false" ? "123" : "456" ==>
> 
> "123"

> 'ba' + (+'a') + 'a' => 'ba' + (Number('a')) + 'a' => 'baNaNa'

## 经典题目7

### 请用js编写一个红绿灯程序（循环显示红绿灯）

```javascript
/**
 * 请用js编写一个红绿灯程序
 * setInterval 间歇调用
 */

// setInterval
var n = 0
function setColor(){
    if( n % 3 === 0){
        console.log('red')
    } else if( n % 3 ===1){
        console.log('yellow')
    } else if( n % 3 ===2){
        console.log('blue')
    }
    n++
}
setInterval(()=>{setColor()},3000)

// Promise
function sleep(t){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res()
        },t)
    })
}


async function light(green = 3000 , yellow = 3000,red = 3000){
    let state = 'green'
    // while 循环 使得灯的颜色一直改变 没有该条件，只会执行一次
    while(true){ 
        await sleep(green).then(()=>{
            state = 'yellow'
            console.log(state)
        })
        await sleep(yellow).then(()=>{
            state = 'red'
            console.log(state)
        })
        await sleep(red).then(()=>{
            state = 'green'
            console.log(state)
        })
    }
}
light(1000,1000,1000)
```
