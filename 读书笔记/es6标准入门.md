## es6 标准入门

[阮一峰 es6 标准](https://es6.ruanyifeng.com/)

### 0、疑难点

#### 问题一：关于全局变量a的值的问题

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  //每次循环时，a[i]都等于函数function () { console.log(i);} ,循环时函数未调用
  a[i] = function () {
    console.log(i);
  };
}
//调用数组a中的函数，此时，循环结束，全局变量为10，所以a中的函数调用后都为10
a[6](); // 10
上面代码中，变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。也就是说，所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10。

var a = [];
for (var i = 0; i < 10; i++) {
  //循环时，将i直接赋值给数组a，每次循环i都不同
  a[i] = i
}
 a[6];  //6
```

#### 问题二：Iterator(遍历器)的概念

js表示集合的数据结构有数组，对象，Map，Set四种。用户组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。这导致需要统一的接口来处理所有不同的数据结构。

Iterator是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构，只要部署了Iterator，就可以完成遍历操作。

Iterator作用：

1. 为各种数据结构提供一个统一的、简便的访问接口
2. 使数据结构的成员能够按某种次序排列
3. Iterator主要供for...of消费

#### 问题三：Generator函数的解构问题？

```javascript
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5

fibs是一个 Generator 函数，原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。
```

#### 问题四：js中的强引用和弱引用

在新的weakSet和WeakMap中，表示存储的对象值/键名所引用的对象都是被弱引用的，那么什么是弱引用，什么又是强引用呢？

之前看到一个比喻感觉很形象

> 强引用就是一个小孩A牵着一条狗，他们之间通过狗链儿连着
>
> 弱引用就是，旁边有个小孩B指着A牵的狗，说：嘿，那有条狗，B指向那条狗，但他们之间没有是指绑在一起的东西
>
> 当A放开狗链，狗就会跑掉（被垃圾回收），无论B是不是还指着
>
> 但是，当B不再指着那条狗，狗还被A牵着，不会影响它是否跑掉

**强引用**

我们常见的普通对象的引用 例如Object object = new Object();

特点：只要强引用指向一个对象，就表明这个对象是”活的”

**弱引用**

弱引用一旦被垃圾回收器检测到，就会被回收。

如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象是否还在该弱引用的结构中。

注意： 弱引用的对象不可遍历！

### 1、let 和 const 命令

#### let 命令

```
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6]();  //10

上面代码中，变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，里面的i指向的就是全局的i。也就是说，所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10。
```

使用 let，声明的变量仅在块级作用域内有效，最后输出的是 6

```
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6

上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6。你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
```

**let 不存在变量提升**

```javascript
console.log(d)   //undefined
var d = 'dd'

console.log(a)   //报错
let a = 'ss'
```

**暂时性死区**
只要块级作用域内存在 let 命令，它声明的变量就绑定这个区域，不受外部影响

```javascript
var temp = 2
if(true){
  temp = 1;   //报错
  let temp
}
```

`ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。`
在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”

#### 块级作用域

**为什么需要块级作用域**
场景一：内层变量覆盖外层变量

```javascript
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined

上面代码的原意是，if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。但是，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。
```

场景二：循环变量泄露为全局变量

```javascript
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5

上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。
```

**es6 的块级作用域**

```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}

上面的函数有两个代码块，都声明了变量n，运行后输出 5。这表示外层代码块不受内层代码块的影响。如果两次都使用var定义变量n，最后输出的值才是 10。
```

**es6 允许在块级作用域中声明函数**
es5(非法)

```
if (true) {
  function f() {}
}
```

es6(合法)

```javascript
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
```

> 允许在块级作用域内声明函数。
> 函数声明类似于 var，即会提升到全局作用域或函数作用域的头部。
> 同时，函数声明还会提升到所在的块级作用域的头部。

#### const 命令

const 声明一个`只读`的常量，一旦声明，常量的值就不能改变
const 声明的常量不能提升

**本质**
const 保证的不是变量的值不能改动，而是变量指向的内存地址所保存的数据不能改变。对基本类型数据，值保存的是变量指向的内存地址，所以等同于常量。对引用类型，变量指向内存地址，保存的是指向实际数据的指针，const 只能保证指针不变，指向的数据可以改变。

**全局对象**

window对象，global对象

### 2、变量的解构

#### 数组解构

```javascript
let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

如果解构不成功，变量的值就等于undefined。
```

不完全解构

```javascript
let [x,,y]=[1,2,3]
x   //1
y   //3
```

**默认值**

```javascript
let [x=1] = [undefined]

x    //1

let [y=1] = [null]

y    //null
```

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```javascript
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。

let x;
//[1][0] 中[1]是let [x = f()] = [1]右边的数组，[0]是下标
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

数组本质是特殊对象，故可以对数组进行对象属性的解构

```javascript
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

**只有当一个数组成员严格等于（===）undefined,默认值才会生效，null 不严格等于 undefined**

```javascript
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]

undefined就会触发函数参数的默认值。
```

#### 对象解构

数组元素按次序排列，变量取值由位置决定。对象的属性没有次序，变量必须与属性同名，才能取到正确值

```javascript
如果变量名与属性名不一致，写成下面这样

let {foo:baz} = {foo:'aaa',bar:'ddd'}
baz   //aaa
foo   //error

//foo是匹配模式，baz是变量，真正被赋值的是baz
也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。
```

#### 字符串解构

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

类似数组的对象都有一个`length`属性，因此还可以对这个属性解构赋值。

```javascript
let {length : len} = 'hello';
len // 5
```

#### 用途

1. 交换变量值

```javascript
let x = 1
let y = 2
[x,y] = [y,x]
```

2. 函数返回多个值

```javascript
foo(){
  return {
    foo:1,
    baz:2
  }
}
let {foo,baz} = foo()
```

3. 函数参数定义

```javascript
foo([x,y]){
  ...
}
```

4. 获取 JSON 数据

```javascript
let obj = {
  id:1,
  name:'tom'
}

let {id,name} = obj
```

5. 函数参数默认值
6. 遍历 map 结构

### 3、字符串扩展

#### 字符串的遍历器接口

es6 为字符串添加遍历接口，使字符串可以被 for...of 遍历

```javascript
for(let i of 'hello'){
  console.log(i)
}
//"h"
//"e"
//"l"
//"l"
//"o"
```

#### 模版字符串

```javascript
$('#list').html(
  `
  <ul>
  <li>jj</li>
  </ul>
  `
)

let x = 1
`${x}`

模版字符串中还能调用函数
foo(){
  return 1
}
`${foo()}`

模版字符串可嵌套使用
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`
```

**使用<%= ... %>输出 JavaScript 表达式**

```javascript
let template = `
<ul>
  <% for(let i=0; i < data.supplies.length; i++) { %>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`
```

**标签模板(函数调用的一直特殊形式，标签指函数，模版字符串是参数)**
模版字符串可跟在函数名后，该函数将被调用来处理该模版字符串。这被成为标签模板功能

```javascript
alert`hello`
// 等同于
alert(['hello'])


let a = 5;
let b = 10;
tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```

#### rset 参数和扩展运算符

rest 参数形式为: `...变量名`
扩展运算符: `...`

#### 字符串新增方法

**repeat()**

`repeat`方法返回一个新的字符串，表示将原字符串重复 n 次

```
'x'.repeat(3)   //'xxx'
```

> 参数是小数，会取整
> 参数是负数或 Infinity，报错
> 参数是 NaN,-1 到 0 之间，0,都视为 0

**padStart(),padEnd()**

`padStart(),padEnd()`字符串补全长度，如果字符串长度不够，会在头部或尾部补全

```javascript
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

> padStart(),padEnd()两个参数，第一个为字符串长度，第二个参数用来补全的字符串

**用途**

1. 为数值补全指定位数

```javascript
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
```

2. 提示字符串格式

```javascript
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

**trimStart(),trimEnd()**

`trim()`消除字符串前后的空格

```javascript
const s = '  dd  '
s.trim()  //'dd'
```

**matchAll()**

`matchAll()`方法返回一个正则表达式在当前字符串的所有匹配

**replaceAll()**

`replace()`只能替换第一个匹配

```
'aabbcc'.replace('b','_')
//'aa_bcc'

'aabbcc'.replace(/b/g, '_')
// 'aa__cc'
```

`replaceAll()`一次性能替换所有匹配

> String.prototype.replaceAll(searchValue, replacement)
> searchValue 是搜索模式，可以是一个字符串，也可以是一个全局的正则表达式（带有 g 修饰符）
> replaceAll()的第二个参数 replacement 是一个字符串，表示替换的文本

```
'aabbcc'.replaceAll('b', '_')
// 'aa__cc'
```

### 4、正则扩展

**Regexp 构造函数**

- 在 es5 中，Regexp 构造函数有两种情况

1. 第一个参数是字符串，第二个参数是正则表达式修饰符

```
var reg = new RegExp('xyz','i')
//等价于
var reg = /xyz/i
```

2. 参数是正则表达式，这时会返回一个原有正则表达式拷贝

```
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;
```

- es6 中，如果 RegExp 构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。

```
new RegExp(/abc/ig, 'i').flags
// "i"
上面代码中，原有正则对象的修饰符是ig，它会被第二个参数i覆盖。
```

**字符串有 match(),replace(),search(),split()四种正则方法**

**u 修饰符**
用来处理大于`\uFFFF`的 Unicode 字符，即正确处理四个字节的 UTF-16 编码

### 5、数值的扩展

**二进制和八进制**

二进制和八进制分别用 0b(0B)和 0o(0O)

```
0b111110111 === 503  //true
0o767 === 503   //true
```

要将二进制和八进制字符串转化为十进制，用 Numner()方法

```
Number('0b111')   //7
```

**Number.isFinite(),Number.isNaN()**

`Number.isFinite()`判断一个数值是有限(finite)，即不 Infinity

> 参数不是数值，一律返回 false
> Number.isFinite(Infinity) //false
> Number.isFinite(NaN) //false

`Number.isNaN()`检查一个值是否为 NaN

> Number.isNaN(NaN) //true
> Number.isNaN(12) //false
> Number.isNaN('12') //false
> Number.isNaN(Number('12')) //true

**Number.parseInt(), Number.parseFloat(),Number.isInteger()**

```
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```

`Number.isInteger()`判断一个值是否为整数

```
Number.isInteger(23)  //true

5E-325由于值太小，会被自动转为0，因此返回true
Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true
```

JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
参数不是数值，返回 false。

> 参数 23 变为 23.0，不论有几个 0，返回 true
> Number.isInteger(true), Number.isInteger(null),Number.isInteger('23'),Number.isInteger(),返回 false

**安全整数和 Number.isSafeInteger()**

JavaScript 能够准确表示的整数范围在-2^53 到 2^53 之间（不含两个端点），超过这个范围，无法精确表示这个值。
ES6 引入了 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 这两个常量，用来表示这个范围的上下限。

```
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true
```

`Number.isSafeInteger()`则是用来判断一个整数是否落在这个范围之内

> 参数要是一个数值

**Math.trunc(),Math.sign(),Math.cbrt()**

`Math.trunc`方法用于去除一个数的小数部分，返回整数部分

```
Math.trunc(4.1)    // 4
Math.trunc(-4.1)    // -4
Math.trunc('1.2')   // 1
Math.trunc(true)    // 1
Math.trunc(false)    // 0
Math.trunc('ss')    // NaN

Math.trunc内部使用Number方法将其先转为数值。
对于空值和无法截取整数的值，返回NaN。
```

`Math.sign`方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

它会返回五种值。
参数为正数，返回+1；
参数为负数，返回-1；
参数为 0，返回 0；
参数为-0，返回-0;
其他值，返回 NaN。

```
Math.sign(true)  // +1
Math.sign(false)  // 0
```

`Math.cbrt()`方法用于计算一个数的立方根

```
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt('hello')  // NaN
```

### 6、函数扩展

#### 函数参数默认值

1. ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面

```
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello

第二个参数不传或传入undefined时，使用默认参数
```

2. 函数参数是默认声明的，所以不能用 let 或 const 再次声明

```
foo(x=5){
  let x = 1   //error
  const x=4   //error
}
```

3. 使用参数默认值时，函数不能有同名参数。

```
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
```

4. 参数默认值是惰性求值

```
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
上面代码中，参数p的默认值是x + 1。这时，每次调用函数foo，都会重新计算x + 1，而不是默认p等于 100。
```

5. 与结构赋值默认值结合使用

```
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined

```

6. 参数默认值的位置

   通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的

```
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]
```

7. 作用域

```
var x = 1;
function f(x, y = x) {
  console.log(y);
}
f(2) // 2
上面代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2


var x = 1;
function foo(x = x) {
  // ...
}
foo() // ReferenceError: x is not defined
上面代码中，参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错”x 未定义“
```

例子：

```
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1

上面代码中，函数foo的参数形成一个单独作用域。这个作用域里面，首先声明了变量x，然后声明了变量y，y的默认值是一个匿名函数。这个匿名函数内部的变量x，指向同一个作用域的第一个参数x。函数foo内部又声明了一个内部变量x，该变量与第一个参数x由于不是同一个作用域，所以不是同一个变量，因此执行y后，内部变量x和外部全局变量x的值都没变。
```

#### 严格模式

es5 规定函数内部能设定严格模式
es6 中，规定函数参数使用了默认值，结构赋值，或扩展运算符，函数内部不能显式设定为严格模式，否则会报错。

#### name 属性

函数的 name 属性，返回函数的函数名

```
var f = function(){}
f.name   //"f"
将匿名函数赋值给一个变量，返回变量名

const a = function baz(){}
a.name  //'a'
具名函数赋值给一个变量，返回函数名
```

#### 箭头函数

**箭头函数的 this**

1. 严格模式下的普通函数 this 为 undenfied，非严格模式是 window；箭头函数的 this 是定义时所在的 this
2. 箭头函数体内的 this 对象，如果包裹在函数中就是函数调用时所在的对象，如果放在全局中就是指全局对象 window。并且固定不会更改。换句话说内部的 this 就是外层代码块的 this
   特点：

> 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
> 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。
> 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
> 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

上面四点中，第一点尤其值得注意。`this对象的指向是可变的，但是在箭头函数中，它是固定的。`

```javascript
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);

  // 普通函数,this指向全局对象
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0


上面代码中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。所以，3100 毫秒之后，timer.s1被更新了 3 次，而timer.s2一次都没更新。

```

> 箭头函数没有自己的 this，不能用 call(),apply(),bind()改变 this 指向

**不适合箭头函数的场合**

箭头函数使 this 从“动态”变为“静态”

1. 定义对象，且方法内部包含 this(`对象不构成单独的作用域,箭头函数定义时的作用域就是全局作用域`)

```javascript
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}

上面代码中，cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。
```

2. 需要动态 this 时，不应使用箭头函数

```javascript
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});

上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。
```

#### Function.prototype.toString()

`toString()`方法返回函数代码本身，包括空格和注释

### 7、数组扩展

#### 扩展运算符的运用

**合并数组**

**浅拷贝**

> 复制的是指向数组的指针

```javascript
let a= [1,2]
let b= a
b[1] = 4
a // [1,4]
```

**深拷贝**

> 克隆一个全新数组

```javascript
方法一：
let a = [1,2]
let b = JSON.parse(JSON.stringify(a))

方法二：
let b = a.concat()

方法三(扩展运算符)：
let b = [...a]
或
let [...b] = a
```

**合并数组**

```javascript
arr1.concat(arr2,arr3)
或
[...arr2,...arr3]
```

**Map,Set,generator函数**

扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。

```javascript
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```

Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

```javascript
const go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
```

上面代码中，变量`go`是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。



#### 数组的方法



**Array.from()**

Array.from()将类数组对象转化为真正的数组

```javascript
let a = {
	'0':'a',
	'2':'b'
}
let arr = Array.from(a)
```

`Array.from`还可以接受第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组

```javascript
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

应用场景：

常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的`arguments`对象。`Array.from`都可以将它们转为真正的数组。

```javascript
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```

```javascript
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
```

上面代码中，`Array.from`的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。



**Array.of()**

Array.of()将一组值转化为数组

```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(undefined) // [undefined]
```

`Array.of`总是返回参数值组成的数组。如果没有参数，就返回一个空数组



**find(),findIndex()**

1. 数组实例的`find`方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出`第一个`返回值为`true`的成员，然后返回该成员。如果没有符合条件的成员，则返回`undefined`。

```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5
```

2. 数组实例的`findIndex`方法返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1`

```javascript
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

3. 这两个方法都可以接受`第二个参数`，用来绑定回调函数的`this`对象。

```javascript
function f(v){
  return v > this.age;
}
let person = {name: 'John', age: 20};
[10, 12, 26, 15].find(f, person);    // 26
```

上面的代码中，`find`函数接收了第二个参数`person`对象，回调函数中的`this`对象指向`person`对象。

4. 这两个方法都可以发现`NaN`，弥补了数组的`indexOf`方法的不足。

```javascript
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
```

### 8、对象扩展

### 9、Symbol

对象的属性名都是字符串，容易造成属性名冲突。symbol保证每个属性名独一无二，

> symbol函数前不能使用new命令，因为symbol是基本类型的值，不是对象
>
> symbol可接受字符串做参数，表示对symbol实例的描述，容易区分
>
> symbol的值可转化为字符串，也可转化为布尔类型，不能转化为数值

```javascript
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();
s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');
s1 === s2 // false

上面代码中，s1和s2都是Symbol函数的返回值，而且参数相同，但是它们是不相等的。
```

**Symbol.prototype.description**

创建Symbol时，可以添加一个描述

```javascript
const sym = Symbol('foo');
sym.description // "foo"
```

**symbol作为属性名**

```javascript
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

```javascript
// Symbol 值作为对象属性名时，不能用点运算符。
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```

上面代码中，因为点运算符后面总是字符串，所以不会读取`mySymbol`作为标识名所指代的那个值，导致`a`的属性名实际上是一个字符串，而不是一个 Symbol 值。

**属性名遍历**

1.  symbol作为属性名，遍历对象时，该属性不会出现在for...in、for...of循环中，也不会被Object.key()、Object.getOwnPropertyName()、JSON.stringify()中

2. symbol不是私有属性,Object.getOwnPropertySymbols()方法可获取指定对象的所有symbol属性名

```javascript
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
```

**Symbol.for(),Symbol.keyFor()**

1. Symbol.for() 可以使我们用到同一个Symbol值

   `Symbol.for()`可接收字符串做参数，参数相同的的两个值相等,在全局环境中注册，Symbol()不在全局环境中

   ```javascript
   let s1 = Symbol.for('foo');
   let s2 = Symbol.for('foo');
   
   s1 === s2 // true
   ```

2. Symbol.keyFor()返回一个已经登记的Symbol类型的key值

   ```javascript
   let s1 = Symbol.for("foo");
   Symbol.keyFor(s1) // "foo"
   
   let s2 = Symbol("foo");
   Symbol.keyFor(s2) // undefined
   
   上面代码中，变量s2属于未登记的 Symbol 值，所以返回undefined。
   ```

3. `Symbol.for()`为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。

   ```javascript
   function foo() {
     return Symbol.for('bar');
   }
   
   const x = foo();
   const y = Symbol.for('bar');
   console.log(x === y); // true
   ```

**内置的 Symbol 值**

除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。



### 10、Set和Map数据结构

#### Set

set类似于数组，但成员唯一，没有重复值。Set本身是构造函数，用来生成Set数据结构。

```javascript
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

去重

```javascript
[...new Set(array)]
或
Array.from(new Set(array))
```

向set加入值，不发生类型转换，5和'5'不同，但在set中，加入两个NaN，只会有一个，set内部认为两者相等。

**set属性名和方法**

```javascript
let s = new Set()

//1、add() 添加值
s.add(1).add(2).add(2)

//2、size 成员总数
s.size   //2  

//3、delete()  删除某个值，表示是否删除成功
s.delete(2)

//4、has()  是否有该成员

s.has(2) //false

//5、clear() 清除所有成员，没有返回值
s.clear()
```

**遍历操作**

set只有键值，没有键名，所以keys(),values()方法结果一致，都返回键值

1. keys() 键名遍历,values()键值遍历,entries()键值对遍历,forEach()遍历所有成员

   ```javascript
   let set = new Set(['red', 'green', 'blue']);
   
   for (let item of set.keys()) {
     console.log(item);
   }
   // red
   // green
   // blue
   
   for (let item of set.values()) {
     console.log(item);
   }
   // red
   // green
   // blue
   
   //for...of用于遍历对象，数组可看作特殊的对象
   for (let item of set.entries()) {
     console.log(item);
   }
   // ["red", "red"]
   // ["green", "green"]
   // ["blue", "blue"]
   ```

2. set实现交集、并集、差集

   ```javascript
   let a = new Set([1, 2, 3]);
   let b = new Set([4, 3, 2]);
   
   // 并集
   let union = new Set([...a, ...b]);
   // Set {1, 2, 3, 4}
   
   // 交集
   let intersect = new Set([...a].filter(x => b.has(x)));
   // set {2, 3}
   
   // （a 相对于 b 的）差集
   let difference = new Set([...a].filter(x => !b.has(x)));
   // Set {1}
   ```



#### WeakSet

特点：

1. 不可重复的值的集合
2. 成员只能是对象
3. 对象都是弱引用
4. 没有size，不能遍历（成员都是弱类型，随时都可能消失，遍历机制无法确保成员存在）

**语法**

WeakSet是一个构造函数，可以new创建WeakSet构造函数

作为构造函数，WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）`该数组的所有成员，都会自动成为 WeakSet 实例对象的成员`。

```javascript
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

具有set方法中的三个方法：

```javascript
ws.has(a)
ws.delete(a)
ws.add(a)
```

#### Map

解决了js对象的键名只能是字符串的限制

Object结构提供了`字符串-值`的对应，Map结构提供了`值-值`的对应

```javascript
const m = new Map();
const o = {p: 'Hello World'};

//set(),get()方法，分别设置值和获取值
m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

1. 对同一个键多次赋值，后面的值将覆盖前面的值

   ```javascript
   const map = new Map();
   
   map
   .set(1, 'aaa')
   .set(1, 'bbb');
   
   map.get(1) // "bbb"
   ```

2. 如果读取一个未知的键，则返回`undefined`。

   ```javascript
   new Map().get('asfddfsasadf')
   // undefined
   ```

   注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

   Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。

   ```javascript
   const map = new Map();
   
   map.set(['a'], 555);
   map.get(['a']) // undefined
   
   上面代码的set和get方法，表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，因此get方法无法读取该键，返回undefined。
   ```

3. 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键

   ```javascript
   let map = new Map();
   
   map.set(-0, 123);
   map.get(+0) // 123
   
   map.set(true, 1);
   map.set('true', 2);
   map.get(true) // 1
   
   map.set(undefined, 3);
   map.set(null, 4);
   map.get(undefined) // 3
   
   map.set(NaN, 123);
   map.get(NaN) // 123
   ```

**方法**

```javascript
//与set方法相同的几个方法
size()
has()
delete()
clear()

//与set方法不同的几个方法
set()

const m = new Map();
m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined
set()方法返回当前Map对象，可采用链式写法

get()

const m = new Map();
const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数
m.get(hello)  // Hello ES6!
```

**与其它数据结构互相转换**

**（1）Map 转为数组**

前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（`...`）。

```javascript
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

**（2）数组 转为 Map**

将数组传入 Map 构造函数，就可以转为 Map。

```javascript
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```

**（3）Map 转为对象**

如果所有 Map 的键都是字符串，它可以无损地转为对象。

```javascript
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

**（4）对象转为 Map**

对象转为 Map 可以通过`Object.entries()`。

```javascript
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));
```

此外，也可以自己实现一个转换函数。

```javascript
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```

**（5）Map 转为 JSON**

Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

```javascript
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```

另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

```javascript
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

**（6）JSON 转为 Map**

JSON 转为 Map，正常情况下，所有键名都是字符串。

```javascript
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```

但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

```javascript
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

#### WeakMap

`WeakMap`与`Map`的区别有两点。

1. `WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。

```javascript
const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key
```

上面代码中，如果将数值`1`和`Symbol`值作为 WeakMap 的键名，都会报错。

2. `WeakMap`的键名所指向的对象，不计入垃圾回收机制。

`WeakMap`的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。

```javascript
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
```

上面代码中，`e1`和`e2`是两个对象，我们通过`arr`数组对这两个对象添加一些文字说明。这就形成了`arr`对`e1`和`e2`的引用。

一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放`e1`和`e2`占用的内存。

```javascript
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
```

上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

**方法**

1. 没有遍历操作
2. 不支持clear()
3. 只有get()，set()，has()，delete()四种方法

### 11、Proxy

### 12、Promise对象

#### 含义

1. promise是异步编程的一种解决方案。

2. promise是一个容器，保存某个未来才会结束的事件(一般是异步操作)的结果
3. promise是一个对象，从它可获取异步操作的消息

**特点**

1. 对象状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
2. 一旦状态改变就不会在变，任何时候都可以得到这个结果。Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected

**缺点**

1. 无法取消`Promise`，一旦新建它就会立即执行，无法中途取消
2. 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部
3. 当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

#### 基本用法

`Promise`对象是一个构造函数，用来生成`Promise`实例。

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`

> resolve是异步操作成功时的回调函数，此时Promise状态由‘未完成’到‘成功’
>
> reject是异步操作失败时的回调函数，此时Promise状态由‘未完成’到‘失败’



`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

```javascript
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

`then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`resolved`时调用，第二个回调函数是`Promise`对象的状态变为`rejected`时调用。这两个函数都是可选的，不一定要提供。它们都接受`Promise`对象传出的值作为参数。

promise 新建后就会立即执行。

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

上面代码中，Promise 新建后立即执行，所以首先输出的是`Promise`。然后，`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以`resolved`最后输出。

下面是异步加载图片的例子。

```javascript
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
```

上面代码中，使用`Promise`包装了一个图片加载的异步操作。如果加载成功，就调用`resolve`方法，否则就调用`reject`方法。

#### 方法

1. Promise.then()方法

它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数，它们都是可选的。

`then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。

```javascript
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```

2. Promise.catch()方法

它的作用是用于指定发生错误时的回调函数

```javascript
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

上面代码中，`getJSON()`方法返回一个 Promise 对象，如果该对象状态变为`resolved`，则会调用`then()`方法指定的回调函数；如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch()`方法指定的回调函数，处理这个错误。另外，`then()`方法指定的回调函数，如果运行中抛出错误，也会被`catch()`方法捕获。

注意，上面的写法与下面两种写法是等价的。

```javascript
// 写法一
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法二
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```

比较上面两种写法，可以发现`reject()`方法的作用，等同于抛出错误。

如果 Promise 状态已经变成`resolved`，再抛出错误是无效的。

```javascript
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

上面代码中，Promise 在`resolve`语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获。

```javascript
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```

上面代码中，一共有三个 Promise 对象：一个由`getJSON()`产生，两个由`then()`产生。它们之中任何一个抛出的错误，都会被最后一个`catch()`捕获。

3. Promise.finally()方法

   `finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

   下面是一个例子，服务器使用 Promise 处理请求，然后使用`finally`方法关掉服务器。

   ```javascript
   server.listen(port)
     .then(function () {
       // ...
     })
     .finally(server.stop);
   ```

   `finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

4. Promise.all()方法

   `Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

   ```javascript
   const p = Promise.all([p1, p2, p3]);
   ```

   上面代码中，`Promise.all()`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例，如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。另外，`Promise.all()`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

   `p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

   （1）只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

   （2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

5. Promise.race()方法

   `Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

   ```javascript
   const p = Promise.race([p1, p2, p3]);
   ```

   上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

6. Promise.allSettled()方法

7. Promise.any()方法

8. Promise.resolve()方法

   有时需要将现有对象转为 Promise 对象，`Promise.resolve()`方法就起到这个作用。

   `Promise.resolve()`方法的参数分成四种情况。

   **（1）参数是一个 Promise 实例**

   如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

   **（2）参数是一个`thenable`对象**

   `thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

   ```javascript
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   ```

   `Promise.resolve()`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then()`方法。

   ```javascript
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   let p1 = Promise.resolve(thenable);
   p1.then(function (value) {
     console.log(value);  // 42
   });
   ```

   上面代码中，`thenable`对象的`then()`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then()`方法指定的回调函数，输出42。

   **（3）参数不是具有`then()`方法的对象，或根本就不是对象**

   如果参数是一个原始值，或者是一个不具有`then()`方法的对象，则`Promise.resolve()`方法返回一个新的 Promise 对象，状态为`resolved`。

   ```javascript
   const p = Promise.resolve('Hello');
   
   p.then(function (s) {
     console.log(s)
   });
   // Hello
   ```

   上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve()`方法的参数，会同时传给回调函数。

   **（4）不带有任何参数**

   `Promise.resolve()`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

   所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve()`方法。

   ```javascript
   const p = Promise.resolve();
   
   p.then(function () {
     // ...
   });
   ```

   上面代码的变量`p`就是一个 Promise 对象。

   需要注意的是，立即`resolve()`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。

   ```javascript
   setTimeout(function () {
     console.log('three');
   }, 0);
   
   Promise.resolve().then(function () {
     console.log('two');
   });
   
   console.log('one');
   
   // one
   // two
   // three
   ```

   上面代码中，`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。

9. Promise.reject()方法

   `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

   ```javascript
   const p = Promise.reject('出错了');
   // 等同于
   const p = new Promise((resolve, reject) => reject('出错了'))
   
   p.then(null, function (s) {
     console.log(s)
   });
   // 出错了
   ```

   上面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。

   `Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。

   ```javascript
   Promise.reject('出错了')
   .catch(e => {
     console.log(e === '出错了')
   })
   // true
   ```

   上面代码中，`Promise.reject()`方法的参数是一个字符串，后面`catch()`方法的参数`e`就是这个字符串。

10. Promise.try()方法

    经常遇到一种情况：不知道或者不想区分，函数`f`是同步函数还是异步操作，但是想用 Promise 来处理它。

    第一种写法是用`async`函数来写。

    ```javascript
    const f = () => console.log('now');
    (async () => f())();
    console.log('next');
    // now
    // next
    ```

    上面代码中，第二行是一个立即执行的匿名函数，会立即执行里面的`async`函数，因此如果`f`是同步的，就会得到同步的结果；如果`f`是异步的，就可以用`then`指定下一步，就像下面的写法。

    ```javascript
    (async () => f())()
    .then(...)
    ```

    需要注意的是，`async () => f()`会吃掉`f()`抛出的错误。所以，如果想捕获错误，要使用`promise.catch`方法。

    ```javascript
    (async () => f())()
    .then(...)
    .catch(...)
    ```

    第二种写法是使用`new Promise()`。

    ```javascript
    const f = () => console.log('now');
    (
      () => new Promise(
        resolve => resolve(f())
      )
    )();
    console.log('next');
    // now
    // next
    ```

    上面代码也是使用立即执行的匿名函数，执行`new Promise()`。这种情况下，同步函数也是同步执行的。

    `Promise.try`方法替代上面的写法。

### 13、遍历器

#### 概念

js表示集合的数据结构有数组，对象，Map，Set四种。用户组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。这导致需要统一的接口来处理所有不同的数据结构。

#### Iterator接口

Iterator是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构，只要部署了Iterator，就可以完成遍历操作。

Iterator作用：

1. 为各种数据结构提供一个统一的、简便的访问接口
2. 使数据结构的成员能够按某种次序排列
3. Iterator主要供for...of消费

ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”。`Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。

至于属性名`Symbol.iterator`，它是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内。

```javascript
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
```

上面代码中，对象`obj`是可遍历的（iterable），因为具有`Symbol.iterator`属性。执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有`next`方法。每次调用`next`方法，都会返回一个代表当前成员的信息对象，具有`value`和`done`两个属性。

#### 原生具备iterator接口的数据结构

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

下面的例子是数组的`Symbol.iterator`属性。

```javascript
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

上面代码中，变量`arr`是一个数组，原生就具有遍历器接口，部署在`arr`的`Symbol.iterator`属性上面。所以，调用这个属性，就得到遍历器对象。

#### 使用iterator场景

**（1）解构赋值**

对数组和 Set 结构进行解构赋值时，会默认调用`Symbol.iterator`方法。

```javascript
let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];
```

**（2）扩展运算符**

扩展运算符（...）也会调用默认的 Iterator 接口。

```javascript
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

上面代码的扩展运算符内部就调用 Iterator 接口。

实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。

```javascript
let arr = [...iterable];
```

**（3）yield\***

`yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

```javascript
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

**（4）其他场合**

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

- for...of
- Array.from()
- Map(), Set(), WeakMap(), WeakSet()（比如`new Map([['a',1],['b',2]])`）
- Promise.all()
- Promise.race()

#### Iterator 接口与 Generator 函数

`Symbol.iterator()`方法的最简单实现，还是使用 Generator 函数。

```javascript
let myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
};
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
// "hello"
// "world"
```

上面代码中，`Symbol.iterator()`方法几乎不用部署任何代码，只要用 yield 命令给出每一步的返回值即可。

#### 遍历器对象的 return()，throw()

遍历器对象除了具有`next()`方法，还可以具有`return()`方法和`throw()`方法。如果你自己写遍历器对象生成函数，那么`next()`方法是必须部署的，`return()`方法和`throw()`方法是否部署是可选的。

`return()`方法的使用场合是，如果`for...of`循环提前退出（通常是因为出错，或者有`break`语句），就会调用`return()`方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署`return()`方法。

```javascript
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}
```

上面代码中，函数`readLinesSync`接受一个文件对象作为参数，返回一个遍历器对象，其中除了`next()`方法，还部署了`return()`方法。下面的两种情况，都会触发执行`return()`方法。

```javascript
// 情况一
for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}

// 情况二
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
}
```

上面代码中，情况一输出文件的第一行以后，就会执行`return()`方法，关闭这个文件；情况二会在执行`return()`方法关闭文件之后，再抛出错误。

注意，`return()`方法必须返回一个对象，这是 Generator 语法决定的。

`throw()`方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。

### 14、generator函数

#### 语法

Generator 函数有多种理解角度

1. Generator 函数是一个状态机，封装了多个内部状态
2. 遍历器对象生成函数，Generator 函数返回一个遍历器对象
3. 形式上，Generator 函数是普通函数，function与函数名之间有*，函数体内部使用yield表达式，定义不同的内部状态

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

上面代码定义了一个 Generator 函数`helloWorldGenerator`，它内部有两个`yield`表达式（`hello`和`world`），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

然后，Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象

```javascript
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

**yield表达式** 

由于 Generator 函数返回的遍历器对象，只有调用`next`方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield`表达式就是暂停标志。

遍历器对象的`next`方法的运行逻辑如下。

（1）遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值（有多个yield表达式，就返回多个值）。

（2）下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。

（3）如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。

（4）如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

需要注意的是，`yield`表达式后面的表达式，只有当调用`next`方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

```javascript
function* gen() {
  yield  123 + 456;
}
```

上面代码中，`yield`后面的表达式`123 + 456`，不会立即求值，只会在`next`方法将指针移到这一句时，才会求值。

`yield`表达式与`return`语句区别。

- 都能返回紧跟在语句后面的那个表达式的值。
- 每次遇到`yield`，函数暂停执行，下一次再从该位置继续向后执行，而`return`语句不具备位置记忆的功能。
- 一个函数里面，只能执行一次（或者说一个）`return`语句，但是可以执行多次（或者说多个）`yield`表达式。正常函数只能返回一个值，因为只能执行一次`return`；
- Generator 函数可以返回一系列的值，因为可以有任意多个`yield`。从另一个角度看，也可以说 Generator 生成了一系列的值
- `yield`表达式只能用在 Generator 函数里面，用在其他地方都会报错。

Generator 函数可以不用`yield`表达式，这时就变成了一个单纯的暂缓执行函数。

```javascript
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);
```

上面代码中，函数`f`如果是普通函数，在为变量`generator`赋值时就会执行。但是，函数`f`是一个 Generator 函数，就变成只有调用`next`方法时，函数`f`才会执行。

```javascript
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  a.forEach(function (item) {
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  });
};

for (var f of flat(arr)){
  console.log(f);
}
```

上面代码也会产生句法错误，因为`forEach`方法的参数是一个普通函数，但是在里面使用了`yield`表达式（这个函数里面还使用了`yield*`表达式）。

1. 一种修改方法是改用`for`循环。

```javascript
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) {
  console.log(f);
}
// 1, 2, 3, 4, 5, 6
```

2. `yield`表达式如果用在另一个表达式之中，必须放在圆括号里面。

```javascript
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
```

3. `yield`表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

```javascript
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
```

**与Iterator接口的关系**

任意一个对象的`Symbol.iterator`方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的`Symbol.iterator`属性，从而使得该对象具有 Iterator 接口。

```javascript
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

上面代码中，Generator 函数赋值给`Symbol.iterator`属性，从而使得`myIterable`对象具有了 Iterator 接口，可以被`...`运算符遍历了。

Generator 函数执行后，返回一个遍历器对象。该对象本身也具有`Symbol.iterator`属性，执行后返回自身。

```javascript
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true
```

上面代码中，`gen`是一个 Generator 函数，调用它会生成一个遍历器对象`g`。它的`Symbol.iterator`属性，也是一个遍历器对象生成函数，执行后返回它自己。

**next()方法的参数**

`yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

```javascript
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```

上面代码先定义了一个可以无限运行的 Generator 函数`f`，如果`next`方法没有参数，每次运行到`yield`表达式，变量`reset`的值总是`undefined`。当`next`方法带一个参数`true`时，变量`reset`就被重置为这个参数（即`true`），因此`i`会等于`-1`，下一轮循环就会从`-1`开始递增。

**Generator.throw()**

Generator 函数返回的遍历器对象，都有一个`throw`方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。

```javascript
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```

上面代码中，遍历器对象`i`连续抛出两个错误。第一个错误被 Generator 函数体内的`catch`语句捕获。`i`第二次抛出错误，由于 Generator 函数内部的`catch`语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的`catch`语句捕获。

`throw`方法可以接受一个参数，该参数会被`catch`语句接收，建议抛出`Error`对象的实例。

```javascript
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log(e);
  }
};

var i = g();
i.next();
i.throw(new Error('出错了！'));
// Error: 出错了！(…)
```

注意，不要混淆遍历器对象的`throw`方法和全局的`throw`命令。上面代码的错误，是用遍历器对象的`throw`方法抛出的，而不是用`throw`命令抛出的。后者只能被函数体外的`catch`语句捕获。

```javascript
var g = function* () {
  while (true) {
    try {
      yield;
    } catch (e) {
      if (e != 'a') throw e;
      console.log('内部捕获', e);
    }
  }
};

var i = g();
i.next();

try {
  throw new Error('a');
  throw new Error('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 [Error: a]
```

上面代码之所以只捕获了`a`，是因为函数体外的`catch`语句块，捕获了抛出的`a`错误以后，就不会再继续`try`代码块里面剩余的语句了。

#### 异步应用

### 15、Class的语法

JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

// Point {x: 1, y: 2}
```

在es6中，通过class关键字，定义类。calss可以看做一个语法糖

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

//this关键字则代表实例对象

var p = new Point(1, 2);

// Point {x: 1, y: 2}
```

类的数据类型就是函数，类本身就指向构造函数。

### constructor 方法

`constructor()`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor()`方法，如果没有显式定义，一个空的`constructor()`方法会被默认添加。

```javascript
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

上面代码中，定义了一个空的类`Point`，JavaScript 引擎会自动为它添加一个空的`constructor()`方法。

`constructor()`方法默认返回实例对象（即`this`），完全可以指定返回另外一个对象。

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

上面代码中，`constructor()`函数返回一个全新的对象，结果导致实例对象不是`Foo`类的实例。

类必须使用`new`调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用`new`也可以执行。

### 取值函数（getter）和存值函数（setter）

与 ES5 一样，在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

上面代码中，`prop`属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

存值函数和取值函数是设置在属性的 Descriptor 对象上的。

```javascript
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
```

上面代码中，存值函数和取值函数是定义在`html`属性的描述对象上面，这与 ES5 完全一致。

### 属性表达式

类的属性名，可以采用表达式。

```javascript
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```

上面代码中，`Square`类的方法名`getArea`，是从表达式得到的。

### Class 表达式

与函数一样，类也可以使用表达式的形式定义。

```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是`Me`，但是`Me`只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用`MyClass`引用。

```javascript
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```

上面代码表示，`Me`只在 Class 内部有定义。

如果类的内部没用到的话，可以省略`Me`，也就是可以写成下面的形式。

```javascript
const MyClass = class { /* ... */ };
```

采用 Class 表达式，可以写出立即执行的 Class。

```javascript
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

上面代码中，`person`是一个立即执行的类的实例。

**注意点：**

1. 严格模式

   类和模块的内部，默认就是严格模式。

2. 不存在变量提升

   类不存在变量提升

   ```javascript
   new Foo(); // ReferenceError
   class Foo {}
   ```

   上面代码中，`Foo`类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。

   ```javascript
   {
     let Foo = class {};
     class Bar extends Foo {
     }
   }
   ```

   上面的代码不会报错，因为`Bar`继承`Foo`的时候，`Foo`已经有定义了。但是，如果存在`class`的提升，上面代码就会报错，因为`class`会被提升到代码头部，而`let`命令是不提升的，所以导致`Bar`继承`Foo`的时候，`Foo`还没有定义。

3. name 属性

   由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被`Class`继承，包括`name`属性。

   ```javascript
   class Point {}
   Point.name // "Point"
   ```

   `name`属性总是返回紧跟在`class`关键字后面的类名。

4. this 的指向

   类的方法内部如果含有`this`，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

   ```javascript
   class Logger {
     printName(name = 'there') {
       this.print(`Hello ${name}`);
     }
   
     print(text) {
       console.log(text);
     }
   }
   
   const logger = new Logger();
   const { printName } = logger;
   printName(); // TypeError: Cannot read property 'print' of undefined
   ```

   上面代码中，`printName`方法中的`this`，默认指向`Logger`类的实例。但是，如果将这个方法提取出来单独使用，`this`会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是`undefined`），从而导致找不到`print`方法而报错。

   解决方法：

   一、在构造函数中绑定this

   ```javascript
   class Logger {
     constructor() {
       this.printName = this.printName.bind(this);
     }
   
     // ...
   }
   ```

   二、使用箭头函数

   ```javascript
   class Obj {
     constructor() {
       this.getThis = () => this;
     }
   }
   
   const myObj = new Obj();
   myObj.getThis() === myObj // true
   ```

   箭头函数内部的`this`总是指向定义时所在的对象。

### 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

**静态方法不会被实例继承**

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

上面代码中，`Foo`类的`classMethod`方法前有`static`关键字，表明该方法是一个静态方法，可以直接在`Foo`类上调用（`Foo.classMethod()`），而不是在`Foo`类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

注意，如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例。

**静态方法包含this,this指向这个类**

```javascript
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar() // hello
```

**父类的静态方法，可被子类继承**

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
```

上面代码中，父类`Foo`有一个静态方法，子类`Bar`可以调用这个方法。

**静态方法也是可以从`super`对象上调用的。**

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```

**静态属性**

静态属性指的是 Class 本身的属性，即`Class.propName`，而不是定义在实例对象（`this`）上的属性。

```javascript
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

上面的写法为`Foo`类定义了一个静态属性`prop`。

**私有方法和私有属性**

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别。

```javascript
class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}
```

上面代码中，`_bar()`方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

另一种方法就是索性将私有方法移出类，因为类内部的所有方法都是对外可见的。

```javascript
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}
```

上面代码中，`foo`是公开方法，内部调用了`bar.call(this, baz)`。这使得`bar()`实际上成为了当前类的私有方法。

还有一种方法是利用`Symbol`值的唯一性，将私有方法的名字命名为一个`Symbol`值。

```javascript
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```

上面代码中，`bar`和`snaf`都是`Symbol`值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，`Reflect.ownKeys()`依然可以拿到它们。

```javascript
const inst = new myClass();

Reflect.ownKeys(myClass.prototype)
// [ 'constructor', 'foo', Symbol(bar) ]
```

上面代码中，Symbol 值的属性名依然可以从类的外部拿到。

### calss的继承

Class 可以通过`extends`关键字实现继承

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    //在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```

**super关键字**

1. super作为函数调用时，代表父类的构造函数

   子类的构造函数必须执行一次`super`函数。

   作为函数时，`super()`只能用在子类的构造函数之中，用在其他地方就会报错

   ```javascript
   class A {
     constructor() {
       console.log(new.target.name);
     }
   }
   class B extends A {
     constructor() {
       super();
     }
   }
   new A() // A
   new B() // B
   ```

2. super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类

   ```javascript
   class A {
     //普通方法
     p() {
       return 2;
     }
   }
   
   class B extends A {
     constructor() {
       super();
       console.log(super.p()); // 2
     }
   }
   
   let b = new B();
   ```

   上面代码中，子类`B`当中的`super.p()`，就是将`super`当作一个对象使用。这时，`super`在普通方法之中，指向`A.prototype`，所以`super.p()`就相当于`A.prototype.p()`。

   ```javascript
   class Parent {
     static myMethod(msg) {
       console.log('static', msg);
     }
   
     myMethod(msg) {
       console.log('instance', msg);
     }
   }
   
   class Child extends Parent {
     static myMethod(msg) {
       super.myMethod(msg);
     }
   
     myMethod(msg) {
       super.myMethod(msg);
     }
   }
   
   Child.myMethod(1); // static 1
   
   var child = new Child();
   child.myMethod(2); // instance 2
   ```

   上面代码中，`super`在静态方法之中指向父类，在普通方法之中指向父类的原型对象。



