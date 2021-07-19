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

JSON.stringify(obj)的优缺点？缺点：无法拷贝函数

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

   > 实现原理：[数据类型转换](./数据类型转换.md)
   >
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

### 10、sort 的排序方式

```javascript
var arr = [1, 2, 3];
arr.sort(); //未指明compareFunction(比较器函数)，即传一个回调函数
```

sort：

1. 默认升序
2. 排序元素会转为字符串，['1','2','3'],找到对应字符串的 unicode 码表

```javascript
var arr = [1, 2, 3];

arr.sort((a, b) => {
  return a - b; //升序
});

arr.sort((a, b) => {
  return b - a; //降序
});
```

### 11、Date 对象中的 getMonth()注意点

```javascript
var now = new Date();
now.getTime(); //时间戳
now.getDay(); //星期
now.getDate(); //本月几号
now.getMonth() + 1; // 第几月
```

### 12、开发中编码和解码使用场景有哪些

```javascript
var url = "https://www.baidu.com?key=hello&name=张三";

var es = escape(url); //转码
var unes = unescape(es); //解码
```

1. encodeURL() 对拼接在 url 上的中文参数进行转码 decodeURL() 解码
2. escape() 对字符串进行编码 unescape() `已废弃`
3. encodeURLComponent() 不转义的字符：A-Z a-z 0-9 - \_ . ! ~ \* ' ( ) ,剩下的字符都会转义 deCodeURLComponent()

`encodeURIComponent() 和 encodeURI 有以下几个不同点：`

```javascript
var set1 = ";,/?:@&=+$"; // 保留字符
var set2 = "-_.!~*'()"; // 不转义字符
var set3 = "#"; // 数字标志
var set4 = "ABC abc 123"; // 字母数字字符和空格

console.log(encodeURI(set1)); // ;,/?:@&=+$
console.log(encodeURI(set2)); // -_.!~*'()
console.log(encodeURI(set3)); // #
console.log(encodeURI(set4)); // ABC%20abc%20123 (the space gets encoded as %20)

console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
console.log(encodeURIComponent(set2)); // -_.!~*'()
console.log(encodeURIComponent(set3)); // %23
console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (the space gets encoded as %20)
```

### 13、dom 树的加载过程

1. 浏览器输入 url --》 DNS 域名解析（获取 ip） --》向服务器发送请求
2. 服务器返回数据，浏览器接受文件(html,css,js,img...),二进制文件

- 构建 dom 树
  解析:1、遇到 link 的外部 css,遇到 css 的代码，会进行 css 的加载，并行
  2、遇到 script 标签，先执行 js 内容，至脚本执行完成，然后继续 dom 渲染
- 构建 css 树
  每个 css 文件解析为样式表对象 cssstylesheet,生成(cssom),css 对象模型
- 构建 render 树
  渲染树 = dom 树+ cssom

3. 回流(reflow)：元素属性改变且影响布局，产生回流，相当于刷新页面
   重绘(repaint):元素属性改变且不影响布局，产生重绘
   `重绘不一定引起回流，回流一定会重绘`

### 14、三种事件绑定的异同

**html 事件 demo0 级事件（事件绑定）demo2 级事件（事件监听）**

1. HTML 事件:在 HTML 上直接绑定一个事件，目前不常见

```javascript
<input type="button" value="html事件" onClick="fun()">
<script>
    function fun(){
        alert('hello')
    }
</script>
```

2. demo0 级事件（事件绑定）：js 获取 dom 绑定事件

```javascript
<input type="button" value="html事件" id="btn">
<script>
    document.getElementById('btn').onclick=function(){
        alert('hello')
    }
    document.getElementById('btn').onclick=function(){
        alert('China')
    }
</script>
//同一个dom多次绑定事件，执行最后一次绑定事件，前面的被覆盖掉了
```

3. demo2 级事件（事件监听）

```javascript
<input type="button" value="html事件" id="btn">
<script>
    document.getElementById('btn').addEventListener("click",function(){
        alert('china')
    })
</script>
```

> ele.addEventListener(event,function,useCapture)
> event:事件名 function：回调函数 useCapture：指定事件是在捕获还是冒泡阶段执行 true 捕获 false 冒泡 ，默认 false
> ele.attachEvent(event,function)

**事件监听的优点：可绑定多个事件，常规的事件绑定只执行最后一个绑定事件**
原因：js 不支持事件重载，事件绑定相当于一个变量存储在函数的地址，如果在绑定一个事件，相当于变量指向另一个函数地址，事件监听相当于订阅发布，改变了数据，触发了事件，订阅这个事件的函数被执行

### 16、阻止默认事件

（让链接不跳转或按钮不提交）

1. e.preventDefault() 低版本浏览器 e.retrunValue
2. return false

### 17、history 和 location 问题

```javascript
window.history  指向history对象，表示当前窗口浏览器历史
History.back()  返回，相当于history.go(-1)
History.forward()  在浏览器记录中前往下一页，相当于history.go(1)
History.go()
history.pushState()  按指定的名称和url，将数据push进会话历史栈（更新历史栈上最新的入口）
history.replaceState()

location   window.location和document.location可拿到这个对象


location={
    href  //整个url
    protocal  //当前url的协议，包括:
    host //主机
    hostname //主机名
    port // 端口
    pathname  // 路径部分，从根路径/开始
    search  //查询字符串，从？开始
    hash  // 从#开始
    username  //域名前的用户名
    password  //域名前密码
    origin //url协议，主机名，端口
}
```

### 17、Object.is()

Object.is()判断两个值是否为同一个值。返回布尔值

1. 满足一下条件，返回 true

   > - 都是 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
   > - 都是 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)
   > - 都是 `true` 或 `false`
   > - 都是相同长度的字符串且相同字符按相同顺序排列
   > - 都是相同对象（意味着每个对象有同一个引用）
   > - 都是数字且
   >   - 都是 `+0`
   >   - 都是 `-0`
   >   - 都是 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
   >   - 或都是非零而且非 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 且为同一个值

2. 与 == 之间的不同

   > `==` 运算符在判断相等前对两边的变量(如果它们不是同一类型) 进行强制转换 (这种行为的结果会将 `"" == false` 判断为 `true`), 而 `Object.is`不会强制转换两边的值

3. 与 === 之间的不同

   > `===` 运算符 (也包括 `==` 运算符) 将数字 `-0` 和 `+0` 视为相等 ，而将[`Number.NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN) 与[`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)视为不相等.

**注意点：**

<font color="red"> 1.Object.is(NaN,NaN) === true      2.Object.is(+0,-0) === false</font>
