### 1、typeof 和instanceof
 
1. typeof 检测任意基本数据类型（少了null,多了function）

    返回对应的数据类型

> 计算机typeof返回的数据类型 机器码 01011:000  =>最后3个0表示该值是对象
> 检测引用类型时，判断Object上是否有call方法，有就返回function，否则返回object

```
var str = 'MOOC'
typeof str  // string

var str1 = new String('MOOC')  //[string:'MOOC']
typeof str1   //Object
```

2. instanceof 只能检测引用类型 返回true or false

    在原型链上检测

```
let arr = []
arr instanceof Array   // true
arr instanceof Object   //true
```

3. Object.property.toString.call  返回"[object 对应的数据类型]"

```
Object.property.toString.call(99)   //"[object Number]"
```

### 2、深入理解数据的堆栈

 - 栈：计算机为原始类型开辟的一块内存空间
 - 堆：为引用类型开辟的内存空间

> 基本数据类型是按值访问，即可操作保存变量中的实际值

> 1. 基本变量赋值，会在变量对象上创建一个新值，之后把该值复制到新变量分配的位置上
> 2. 引用对象的指针存放在栈中，数据本身放在堆中

```
var c = {key :1}  // c是对象{key:1}的引用
var d = c
d.key = 2
console.log(d,c)  // {key :1} {key :2}
```
   栈        堆
   地址 -》  对象