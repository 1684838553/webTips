### 1、typeof 和 instanceof

1. typeof 检测任意基本数据类型（少了 null,多了 function）

   返回对应的数据类型

> 计算机 typeof 返回的数据类型 机器码 01011:000 =>最后 3 个 0 表示该值是对象
> 检测引用类型时，判断 Object 上是否有 call 方法，有就返回 function，否则返回 object

```
var str = 'MOOC'
typeof str  // string

var str1 = new String('MOOC')  //[string:'MOOC']
typeof str1   //Object
```

2. instanceof 只能检测引用类型 返回 true or false

   在原型链上检测

```
let arr = []
arr instanceof Array   // true
arr instanceof Object   //true
```

3. Object.property.toString.call 返回"[object 对应的数据类型]"

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

栈 堆
地址 -》 对象

### 3、深浅拷贝的方法

1. 浅拷贝
   **方法一：**

```javascript
function simpleClone(objNew) {
  let obj = {};
  for (let i in objNew) {
    obj[i] = objNew[i];
  }
  return obj;
}
```

**方法二：Object.create()**

> Object.create()方法将对象赋值到原型链上

```javascript
var copyObj = Object.create(obj);
// copyObj.__proto__ === obj
```

**方法三：**
`Object.assign()`

2. 深拷贝
   **方法一：**

```javascript
function deepClone(startObj,endObj)){
    let obj = endObj || {}
    for(let i in startObj){
        if(typeof startObj[i] === 'object'){
            obj[i] =startObj[i].constructor === 'Array' ? []:{}
            deepClone(startObj[i],obj[i])
        }else{
            obj[i] = startObj[i]
        }
    }
    return obj
}
```

**方法一：**

```javascript
JSON.parse(JSON.stringify(obj));
```

### 4、开发中常见的数据类型转换有哪些

1. undefined，NaN,0,null，'' 转为布尔值都为 false
2. 逻辑运算符 && 和 ||
   > console.log(true && true) // true
   > 0 || 5 //5
   > 5 || 0 //5
   > 0 && 5 //0 返回 number 类型
3. == 和 ===
   > undefined == null //true 做隐式转换，都转为 0
   > undefined === null // false 全等不做隐式转换

### 5、运算符多的情况下，需要注意哪些

1.  优先级
2.  js 舍入错误
    > console.log(0.1+0.2) // 0.300....04
    > 原因：计算机将 0.1 和 0.2 转换为二进制数字，在相加，然后转换为十进制`会有精度流失`
    > 解决方法：
    >
    > - parseFloat(0.1+0.2).toFixed(2) //保留两位数
    > - function add(num1,num2){
        m = Math.pow(10,2)
        return (num1*m+num2*m)/m
    }

### 6、for 循环优化

```javascript
for(let i = 0,len = arr.length;i<len;i++)
//将len写在前面，不用每次循环都计算一次
```

### 7、js 常见的内置对象

三种包装对象 ： string number boolean

```javascript
var str = new String("hello"); // {0:'h',1:'e',...}
var a = new Number(2);
```

其他内置对象：Array Date Function Object (`在浏览器控制台打印，查看属性和方法`)

### 8、面试中常见的装箱和拆箱的理解

1. 装箱：把基本数据类型转为对应的引用类型的操作

   ```javascript
   var a = 123; // number

   var objNum = new Number(123); //object
   ```

2. 拆箱：将引用对象转为对应的值类型

   ```javascript
   var objNum = new Number(123); //object

   objNum.valueOf(); // 123 number
   ```

   > 实现原理：
   > js 有 toPrimitive(input,type) // input 传入的值 type 值类型
   > 第一步：input 判断是否为原始类型，是原始类型，直接返回
   > 不是原始类型，调用 input.valueOf() 在做判断，是原始类型，返回该值
   > 不是原始类型，调用 input.toString() 在做判断，是原始类型，返回该值
   > 不是原始类型，报错

   ```javascript
   objNum.valueOf(); // 123 number

   objNum.toString(); // '123'

   var a = 1;
   a.valueOf(); // 1

   a.toString(); // '1'
   ```

   **面试题：(`要执行拆箱操作，调用toPrimitive方法`)**

   > - 1、两个空数组相加 console.log([] + []) // ''
   > - 2、[] + {}
   > - 3、console.log([])
   >   解：假设 a = [],b = {}
   >   a`(拆箱，调用toPrimitive)` ===> a.valueOf()`得到[]` ===> a.toString() `判断不是基本类型，调用toString` ===> '' `[]转为字符串为''` ，所以第一题，第三题都为''
   >   b ===> b.valueOf()`得到{}` ===> b.toString() `得到"[object object]"` ，所以第二题是'' + "[object object]" == "[object object]"
   >   答案 ： '' ,"[object object]",''

### 9、深入理解栈和队列

栈：先进后出的数据结构
队列：先进先出

栈和堆：数据存储

数组的 4 种方法：pop push unshift shift

```javascript
var arr = [1, 2, 3];
//结尾出入栈，不影响数组原有位置索引
arr.push(4); // 入栈 [1,2,3,4]
arr.pop(); //出栈 [1,2,3]

//开头出入栈，影响位置索引，效率不高
arr.unshift(0)[(0, 1, 2, 3)];
arr.shift()[(1, 2, 3)];
```

模拟队列：push，shift
