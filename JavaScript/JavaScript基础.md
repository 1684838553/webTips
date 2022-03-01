# JS 基础知识

## 0. 疑难点

```javascript
var tmp = new Date(); 
if( true ){ 
	var tmp = 'hello world'; 
} 
console.log( tmp )  // 'hello world'
```
`总结`：在块级作用域中，let,const声明的变量是局部变量，对var声明的变量不影响


## 1. 声明

### 1.1 声明变量

> var 声明

基本的声明变量的方式是使用`var`来进行声明：

```
var a;
```

上面的语句表示声明了一个名为`a`的变量,由于它只是声明了,还未进行任何的赋值,所以此时使用`console.log()`在控制台打印出来的是`undefined`:

```
var a;
console.log(a);
```

**`console.log()`方法能够在浏览器的控制台打印出你期望看到的元素,显示控制台快捷键为`f12`,或者直接在页面中右键“检查”。**

> 声明提前

会把声明的语句提前到脚本的最前头,但不会把赋值的语句提前;

例:

```
console.log(a);     //已经找到了a,因为var a 会被声明提前,但是却不会提前赋值,也就是不能找到a=10;

var a = 10;

console.log(a);

=>undefined  10 ; //第一个打印出undefined 第二个为10
```

### 1.2 声明并赋值

> 代码 ⌨️

**var 变量名 = 值**

```
var a = 10;
```

> 连续声明

**var 变量名 1,变量名 2,变量名 3;**

```
var a,b,c;

var a = 1, b = 2, c = 3;
```

### 1.3 let 声明变量

js 中除了能够使用`var`操作符声明变量之外,还可以使用`ES6`中新增的操作符`let`进行声明：

```
let a = 10;
```

`let`和`var`在大多数时候的用法都是一样的,本质上都是为了声明一个变量,但是在一些情况上还是有一些区别，比如`let`声明的变量没有**声明提前**:

```
console.log(a);// 报错ReferenceError
let a = 10;
console.log(a)
```

在比如`let`不允许在相同作用域内,重复声明同一个变量。

```
// 报错
function () {
  let a = 10;
  var a = 1;
}
// 报错
function () {
  let a = 10;
  let a = 1;
}
```

**具体的区别请移步**

### 1.4 const 声明常量

JS 中除了有变量之外，也有常量。

常量顾名思义就是指定义了之后不能进行修改。

> const 定义的变量不可以修改,而且必须初始化

```
const a = 1;//正确

const b;//错误,必须要进行初始化
```

::: tip

当然虽然你不能直接使用`const b`来进行声明,但是你可以采用`const b = undefined`的方式来声明一个值为`undefined`的常量,当然实际运用中这种做法也没有什么意义。

:::

使用`const`声明了变量之后,若是你妄图重新赋值,则`js`会告诉你这个是不可以的。

```
const a = 1;
a = 2;//Uncaught TypeError: Assignment to constant variable.
console.log(a);
```

> const 定义引用类型

我们知道在`js`中的引用类型分为:值引用和地址引用。

上面介绍的都是值引用的情况,若是用`const`声明一个数组或者对象然后在进行修改情况会怎么样？

```
const arr = [1, 2, 3];
arr.push(4)
console.log(arr);//[1, 2, 3, 4]

const obj = { 'name': 'LinDaiDai' };
obj['sex'] = 'boy';
console.log(obj);//{ 'name': 'LinDaiDai', 'sex': 'boy' }
```

可以看到用`const`声明的数组和对象都是可以进行修改的，那么用`const`声明的对象和`var`有什么区别呢？

来看下面这个例子：

```
//如果你试图这样
const arr = [1, 2, 3];
arr = [2, 3, 4]; //Assignment to constant variable
console.log(arr);

//或者这样
const arr = [1, 2, 3];
var arr2 = [2, 3, 4];
arr = arr2;//Assignment to constant variable
console.log(arr);
```

使用`const`声明的地址引用常量你可以修改它的值，但不能够修改它的引用地址。

## 2. 内置类型

JS 中分为七种内置类型，而这七种内置类型又会分为两大类型：基本类型和对象(Object)。

**7 种基本类型：**`null`，`undefined`，`boolean`，`number`，`string`，`symbol`，`bigint`。

### 1. typeof

> 作用：返回一个值的数据类型

**用 typeof 测试出来的类型都是小写的**

只能测试出 6 种类型:

- number
- boolean
- string
- undefined
- object
- function

**1.原始类型**

数值、字符串、布尔值分布返回 `number`、`string`、`boolean`

```
typeof 123 // "number"
typeof '123' // "string"
typeof false // "boolean"
```

**2.函数**

函数返回`function`

```
function f() {}
typeof f
// "function"
```

**3. undefined**

```
undefined` 和没有用 `var` 声明的变量，用``typeof`返回的是`undefined
typeof undefined
// "undefined"
var x
typeof x
// "undefined"
```

**4.object**

除了以上三种情况，其他情况都返回`object`。

```
typeof window // "object"
typeof {} // "object"
typeof [] // "object"
typeof null // "object"
```

**注：**

- 空数组`[]`的返回值是`object`，这表示，JavaScript 内部，数组本质上是一种特殊的对象。
- `null`的返回值是`object`，这是由于历史原因造成的，1995 年 JavaScript 语言的第一版，所有值都设计成 32 位，其中最低的 3 位用来表述数据类型，object 对应的值是 000。当时，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），完全没考虑 null，只把它当作 object 的一种特殊值，32 位全部为 0。这是 typeof null 返回 object 的根本原因。 为了兼容以前的代码，后来就没法修改了。这并不是说 null 就属于对象，本质上 null 是一个类似于 undefined 的特殊值。

> 用法

实际编程中, `typeof`通常用在判断语句

```
var a = 10;
if (typeof a === "number") {
    // ...
}
```

### 2. Number

JS 的数字类型是浮点类型的,没有整型,只能是实数,虚数不支持。

**1. 整数**

> 二进制 用 0b 开头

字节:8 个二进制位

> 八进制 用 0 或者 0o(推荐)开头

> 十六进制 用 0x 开头

转换为二进制:每一个 16 进制位,用 4 个二进制位来表示

123 = 0001 0010 0011

**2. 浮点数**

**3. 无穷大 Infinity (正无穷大和负无穷大)**

1/0 无穷大

**4. NaN**

**NaN 的特殊:**

1.NaN 的 typeof 的类型是 number;

2.NaN 转成数字类型是 NaN ;

3.NaN 转成布尔类型是 false;

4.NaN 转成字符串是 NaN ;

5.NaN == NaN =>false ;

6.NaN ===NaN =>false;

7.0/0 = NaN

### 3.Boolean

只有俩个值: true 和 false

### 4.String

字符串:用一对单引号`'' `或者 一对双引号`"" `括起来的字符序列.

```
"LinDaiDai"

'LinDaiDai'
```

### 5.Undefined

> 当声明一个变量但是并没有赋值时,或者没有声明的变量,变量的类型是 Underfined 类型

```
typeof(undefined);

=>undefined;

Number(undefined);//转成数字为NaN

=> NaN
```

**undefined 的特殊之处:**

1.undefined 的 typeof 的类型是 undefiend;

2.undefined 转成数字类型为 NaN;

3.undefined 转为布尔类型是 false;

4.undefined 转为字符串类型是 undefined ;

5.null == undefined => true;

### 6.Null

```
typeof(null);
=>object;

Number(null)
=> 0
```

**null 的特殊之处:**

1.null 的 typeof 的类型是 object;

2.null 转成数字类型为 0;

3.null 转为布尔类型是 false;

4.null 转为字符串类型是 null ;

5.null 和 任何非 null 都不相等;(但和 undefined 相等)

6.null == undefined =>true;

### 7. Symbol

> `Symbol`是 ES6 新增的一种数据类型
>
> 在 ES5 之前我们都没办法创建私有变量,只能想办法去封装.symbol 来创建私有成员

> 用法 ⌨️

```
	//例1:
	let firstName = Symbol();   //创建一个Symbol
    let person = {};

    person[firstName] = "王先生";
    console.log(person[firstName]);     // "王先生"
```

**具体的用法请移步**

### 8.Object

除了上述的六种基本数据类型，其他的数据都是`Object`类型

```
var obj = { 'name': 'LinDaiDai' };
var arr = [1, 2, 3];

console.log(typeof obj);
console.log(typeof arr);
```

---

## 3. 数据类型转换:

### 3.1 自动类型的转换

字符串,数字,boolean 之间的转换

> 字符串->数字:

1.如果字符串例的内容全部是数字,则转换为数字,否则就是 NaN;

其实就是调用的一种叫做转换函数 Number();

2.Number()内要是有一个内容不是数字,就会返回 NaN

```
Number('123');
//123

Number('12a');
//NaN
```

> 数字->字符串:

把数字的字面形式转换为字符串

若是数字+字符串，则会进行隐式类型转换，讲数字转换成字符串，然后进行字符串相加

```
123 + '456'
//'123456'
```

**内部调用的是转换函数 String()**

> 字符串,数字->布尔值:

`0`,`-0`,`""`,`undefined`,`null`,`false`,`NaN` ->这七种是转换为 false,其余的全当做 true 来用(`"0"`,`" "`是 true);

如一下几种加上`!`都会转换为`true`.

```
var num = 0,
	a = null,
	b = NaN,
	c;
!num //true
!a //true
!b //true
!c //true
```

> 布尔值 -> 字符串:

true -> "true"

false-> "false"

true -> 1;

flase -> 0;

### 3.2 强制类型转换

#### 1.使用转换函数

- Boolean()
- String()
- Number()

```
Number(false); // 0

Number(true);  //1

Number(undefined); // NaN

Number(null); //0

Number( "5.5 "); //5.5

Number( "56 "); //56

Number( "5.6.7 "); // NaN

Number(new Object()) NaN
```

#### 2.转换为数字类型

##### 1. 转整形: parseInt()

字符串转数字(显式类型转换)

例 1:

```
  var a = '12';
  parseInt(a);
  =>  12;
```

例 2:

```
 var a = '12aa12';
 parseInt(a)
 =>  12

var b = '12.3';
parseInt(b)
=>  12
```

**从左到右,遇到非数字则跳出去;**

例 3:

```
var a = 'abc';
parseInt(a);
=> NaN
```

**任何数 + NaN = NaN **

**NaN == NaN =false NaN 和 NaN 不相等**

##### 2. 转浮点型: parseFloat()

和`parseInt()`用法相似,能够转换小数

```
var a = '3.5aa3';
parseFloat(a);
=> 3.5
```

#### 3. 转字符串型: toString()

> 作用：强制将类型转换为字符串类型

如:

```
var i =10;
console.log(typeof(i.toString()));
=>  string
```

**注:**

- 数字+字符串=字符串
- 数字+数字+字符串=(数字相加)+字符串=字符串

如:

```
var i = 1 + 2 + '4';
i=34;
```

> 对象类型使用 toString()

```
var obj = { 'name': 'LinDaiDai' }
var obj2 = obj.toString() // "[object Object]"
```

若是想将一个引用类型的变量正在转换成字符串可以采用`JSON.stringify()`方法：

```
var obj = { 'name': 'LinDaiDai' }
var obj2 = JSON.stringify(obj) // "{"name":"LinDaiDai"}"
```

---

## 4. 转义字符

HTML 中<，>，&等有特殊含义（<，>，用于链接签，&用于转义），**不能直接使用**。这些符号是不显示在我们最终看到的网页里的，那如果我们希望**在网页中**显示这些符号，就该用到**转义字符**。

**转义字符**（Escape Sequence）也称字符实体(Character Entity)。在 HTML 中，定义转义字符串的原因有两个：

第一个原因是像“<”和“>”这类符号已经用来表示 HTML 标签，因此就不能直接当作文本中的符号来使用。为了在 HTML 文档中使用这些符号，就需要定义它的转义字符串。当解释程序遇到这类字符串时就把它解释为真实的字符。在输入转义字符串时，要**严格遵守字母大小写**的规则。

第二个原因是，有些字符在 ASCII 字符集中没有定义，因此需要**使用转义字符串来表示**。

### 4.1 在页面中显示空格

我们先来看一段`HTML`代码：

```
<div>我中间    希望有空格</div>
```

虽然在编程时，我们在文字中间加了很多的空格，但是打开页面发现文字还是完整的在一行上，若是想要在页面中显示空格，你可以使用` `来表示一个空格：

```
<div>我中间&nbsp;希望有空格</div>
```

**通常情况下，HTML 会自动截去多余的空格。不管你加多少空格，都被看做一个空格。**

### 4.2 常用的字符实体

| 显示 | 说明           | 实体名称 | 实体编号 |
| ---- | -------------- | -------- | -------- |
|      | 半方大的空白   | ` `      | ` `      |
|      | 全方大的空白   | ` `      | ` `      |
|      | 不断行的空白格 | ` `      | ` `      |
| <    | 小于           | `<`      | `<`      |
| >    | 大于           | `>`      | `>`      |
| &    | &符号          | `&`      | `&`      |
| "    | 双引号         | `"`      | `"`      |
| ©    | 版权           | `©`      | `©`      |
| ®    | 已注册商标     | `®`      | `®`      |
| ?    | 商标（美国）   | ?        | `™`      |
| ×    | 乘号           | `×`      | `×`      |
| ÷    | 除号           | `÷`      | `÷`      |

### 4.3 常用的转义符

| 转义序列 | 字符              |
| -------- | ----------------- |
| \b       | 退格              |
| \f       | 走纸换页          |
| \n       | 换行              |
| \r       | 回车              |
| \t       | 横向跳格 (Ctrl-I) |
| '        | 单引号            |
| "        | 双引号            |
| \        | 反斜杠            |

编程的时候要注意特殊字符的问题，很多运行时出现的问题都是因为特殊字符的出现而引起的。

::: tip

注意，由于反斜杠本身用作转义符，因此不能直接在脚本中键入一个反斜杠。如果要产生一个反斜杠，必须一起键入两个反斜杠 (\)。

:::

## 5. 运算符

### 5.1 算术运算符

#### 1. "+" 运算符:

> 加号

1.如果俩个都是 Number 类型,则按照普通的数学加法运算;

```
1 + 1
// 2
```

2.如果有一个是字符串,则按照字符串链接

```
1 + '2'
//'12'

'3' + '4'
//'34'
```

3.如果有一个是 NaN,则结果为 NaN;

```
NaN + 3
//NaN

Number(2.3.4) + 3
//NaN
```

4.如果同时是 infinity 或者-infinity,则结果就是 infintity 或者-infitity;

```
Infinity + 1
//Infinity

infinity + (-infinity)
//NaN
```

5.两个数组相加，则会触发类型转换: 将值转换为原始值，转换为数字，转换为字符串。

```
[1, 2] + [2, 1]
// [1, 2].toString() -> '1,2'
// [2, 1].toString() -> '2,1'
// '1,2' + '2,1' = '1,22,1'
```

#### 2. "-" 运算符:

> 减法

1.数字相减

```
3 - 2
//1

'3' - 2
// 1
```

#### 3. "\*" 运算符:

> 乘法

```
3 * 2
//6

2 * '2'
//4
```

#### 4. "/" 运算符:

> 除法(不会取整)

```
10/3
//3.333333333
```

#### 5. "%" 运算符:

> 取余,取模

```
10%3 => 1 ;(符号和前面的数一致);

-10%3 =>-1;
```

#### 6. "++"自增运算符:

> 自增

```
var a = 10;
a++;
//11
```

例 1:

```
var a =10;
var b = a++;
=> a=11; b=10;
a++   变量a的值11;
表达式的值:永远是自增之前的值10;
```

**例 1 中 `++`在后面，则先进行赋值，然后再进行自增，所以`b`还是为`10`**

例 2:

```
var a =10;
var b = ++a;
=> a=10; b=11
```

**例 2 是先进行自增，然后再进行赋值**

#### 7. "--"自减运算符:

> 自减

同自增`++`

### 5.2 赋值运算符

> 赋值运算符也称复合赋值运算符

如：

```
=   +=    -=   *=   /=   %=
```

**3.比较运算符:**

**== 比较俩个数是否相等**

如果比较的俩个数据的类型不同,他们都要想办法转成数字;

如果一边是对象,一边是基本类型:

1.首先调用这个对象的 valueOf(),看这个方法的返回值是否是基本类型

如果是基本类型,则用这个返回值和另一边相比;

2.如果返回的不是基本类型,调用 toString(),使用这个方法的返回字符串和另一边比较

字符串 : 字符串里有数字的转换为数字;只要有一个非数字,就是 NaN;

**对象与对象比较,\*\***不管是==还是===,\***\*比较的是俩个对象的地址值是否相等,**

**如:var a = [];**

**var b = [];**

**alert(a==b) =>false;**

undefined=>转成数字=>NaN;

null=> 转成数字 => 0;

特殊:

\1. null 虽然转成数字是 0,但他和其他的任何非 null 都不相等

2.NaN !=NaN ;

3.null 和 undefined 是相等的;

**=== 全等**

先看类型,如果类型不同,直接 false ,

如果类型相同,再比较内容;

**2.逻辑运算符**

! 逻辑非 true 变 false false 变 true ;(结果必是布尔类型)

&& 逻辑与 有一个是 false ,结果就是 false;

短路:第一个操作数的结果是 false ,所以最终结果就是 false,就不会去执行之后的代码;

例:

var a = 2;

var b = 3;

var c = a > b && a++ > b++;

console.log(c , a , b);

=> false 2 3

|| 逻辑或 有一个是 true ,结果就是 true ;

短路:第一个操作数的结果是 true,所以最终结果就是 true,就不会去执行之后的代码;

**逻辑与和逻辑或的特点:**

参与运算的可以是任何的类型,结果也可以是任何类型;

如果第一个能决定结果,则结果就是第一个数据,否则就是第二个数据;

console.log("0" || undefined );

=> "0"

console.log("0" && undefined );

=> undefined ;

console.log("" && undefined );

=>""

**3.三元(目)运算符:**

表达式 1 ? 表达式 2 : 表达式 3;

表达式 1 运算结果为 ture 或相当与 true 执行表达式 2;

表达式 1 运算结果为 false 或者相当与 false 执行表达式 3

**4.逗号运算符:** 对它的每个操作数求值（从左到右），并返回最后一个操作数的值。

var a =(1,2,3);

alert(a);

=>3
