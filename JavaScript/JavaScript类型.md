## 为什么有的编程规范要求用 void 0 代替 undefined？

> undefined 表示未定义
>
> null 表示定义了，但它的值就是 null,null 表示空值

null 是关键字，可通过 null 关键字来获取 null

undefined 不是关键字，而是一个变量，为了避免无意中被篡改，建议使用 void 0 来获取 undefined 值。

void 0 == undefined

## 字符串有最大长度吗？

字符串用于表示文本数据，有最大长度 2^53-1(该长度不是以字符串的字符数来计算的，而是 utf16 编码来计算的)

## 0.1 + 0.2 不是等于 0.3 么？为什么 JavaScript 里不是这样的？

> Number 类型基本符合 IEEE 754-2008 规定的双精度浮点数规则，除了几种额外场景
>
> **额外场景：**
>
> 1. NaN,NaN 不等于 NaN
> 2. Infinity 无穷大
> 3. -Infinity 负无穷大
> 4. +0，+0 和-0 直接判断，是相等的；用 Object.is()判断，不相等
> 5. -0
>
> **区别是+0 还是-0？**
>
> 1/x 为正无穷大，为+0；1/x 为负无穷大，为-0
>
> **Object.is()的使用**
>
> Object.is(+0,-0) // false
>
> Object.is(NaN,NaN) // true

console.log( 0.1 + 0.2 == 0.3); // false

浮点数运算的精度问题导致等式左右的结果并不是严格相等，而是相差了个微小的值。

这里错误的不是结论，而是比较的方法，正确的比较方法是使用 JavaScript 提供的最小精度值：

```javascript
// Number.EPSILON 属性表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值
console.log(Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);
// 检查等式左右两边差的绝对值是否小于最小精度，才是正确的比较浮点数的方法。
```

## ES6 新加入的 Symbol 是个什么东西？

 **Symbol，构成了语言的一类接口形式**

> `for ... of`可迭代对象（包括[`Array`](https://link.segmentfault.com/?url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FArray)，[`Map`](https://link.segmentfault.com/?url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FMap)，[`Set`](https://link.segmentfault.com/?url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FSet)，[`String`](https://link.segmentfault.com/?url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FString)，[`TypedArray`](https://link.segmentfault.com/?url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FTypedArray)，[arguments](https://link.segmentfault.com/?url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FFunctions_and_function_scope%2Farguments) 对象等等）**普通对象不能遍历，即不能用for...of遍历**
>
> `for...in` 循环只遍历可枚举属性（包括它的原型链上的可枚举属性）**hasOwnProperty判断是否是自身属性**

```javascript
var o = new Object
 
    o[Symbol.iterator] = function() {
        var v = 0
        return {
            next: function() {
                return { value: v++, done: v > 10 }
            }
        }        
    };
 
for(var v of o) 
console.log(v); // 0 1 2 3 ... 9
```



## 为什么给对象添加的方法能用在基本类型上？

```javascript
Symbol.prototype.hello = () => console.log("hello");
 
    var a = Symbol("a");
    console.log(typeof a); //symbol，a 并非对象
    a.hello(); //hello，有效
```

`.` 运算符提供了装箱操作，它会根据基础类型构造一个临时对象，使得我们能在基础类型上调用对应对象的方法。

