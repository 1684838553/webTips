## 1、简要描述下JS有哪些内置的对象
1. String Number Boolean
2. Math
3. Date
4. Array
5. Object
6. Function
7. Error
8. Regex


## 2、说说你对javascript的作用域的理解
1. 全局作用域
在顶层环境中申明的变量和函数都是全局作用域，他们的属性都在window对象下面
2. 函数作用域 
在函数作用域定义的变量都是函数作用域，只能在函数中访问到，或者通过闭包能访问到。其他地方都访问不到。
3. 块级作用域
let 关键字可以将变量绑定到所在的任意作用域中（通常是 { .. } 内部）
4. 作用域链
当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。



## 3、什么是闭包？优缺点分别是什么？

1. 闭包

  在局部作用域引用上层作用域（非全局）的变量

  (函数嵌套函数，在函数内部访问函数外部的变量)

2. 优点

  防止变量污染作用域

  (由于闭包里可以访问外部变量，但是外部不能访问闭包里的变量，所以可以保护一些重要的不能被修改的变量。)

3. 缺点
  不释放会导致内存泄漏


## 4、返回到页面顶部的方法有哪些？

```javascript
window.scrollTo(0,0)

window.location.href += '#'

document.documentElement.scrollTop = 0

<!--  要做成隐藏的锚点，可以把内部的内容去掉，name 是必须的 -->
<a href="" name="top"></a>
<a href="#top">点击</a>
```
 
## 5、typeof('abc')和typeof 'abc'都是string, 那么typeof是操作符还是函数？

typeof 是操作符，不是函数。括号的改变运算优先级而不是函数调用。

**参考<JavaScript高级程序设计> 3.4.1**

## 6、你理解的"use strict";是什么?使用它有什么优缺点？

use strict是指js运行在严格模式下

**说明：**

1. `使调试更容易`。一些被忽略或默默失败了的代码错误，会产生错误或抛出异常。
2. `变量在赋值之前必须声明，防止意外的全局变量`。在非严格模式下，将值分配给一个未声明的变量，会直接创建该名称的全局变量
3. `取消this值的强制转换`。严格模式下，this使undefined,而不是window
4. `不允许重复的属性名和参数值`
```javascript
 var obj = {
       foo:'1',
        foo:'1'
}
function foo(a,a){ }
```

5. `使eval()更安全`。严格模式下，变量和声明在eval()语句内部的函数不会在包含范围内创建（非严格模式下，会被创建）
6. `在delete使用无效时抛出错误`。在严格模式下，删除对象不可配置的属性时，抛出异常
7. `严格模式下去除with`
8. `不能修改arguments ，不能在函数内定义arguments变量 ，不能使用arugment.caller和argument.callee`

**优点：**

1. 消除JavaScript语法的一些不合理，不严谨支出，减少一些怪异行为
2. 消除代码运行的不安全之处，保证代码运行的安全
3. 提高编译器效果，增加运行速度
4. 为未来新版本的JavaScript做铺垫

**缺点：**

1. 某些代码在严格模式下会报错，尤其引入公用与第三方模块的时候需要注意
2. 有些严格模式的特征在不同浏览器的支持情况不同，需要注意兼容问题

## 7、"attribute"和"property"有什么不同？

**property**

1. 是DOM中的属性，是JavaScript里的对象
2. 可以读取标签自带属性，包括没有写出来的
3. 不能读取attribute设置的属性
4. 获取方式：读：element.property;            如：p.className;
5. 设置方式：element.property = 'xxx';        如：p.className = 'xiao';
6. 是元素（对象）的属性

**attribute**

1. 是HTML标签的属性,即直接在html标签添加的都是attribute属性
2. 不能读取property设置的属性
3. 读取方式：element.getAttribute('属性名','属性值');  如：a.getAttribute('href');
4. 设置方式：element.setAttribute('属性名','属性值');  如：a.getAttribute('href','xiaowan.jpg');
5. 直接在html标签上添加的和使用setAttribute添加的情况一致

## 8、说说你对arguments的理解，它是数组吗？


## 9、造成内存泄露的操作有哪些？
1. 意外的全局变量
2. 闭包
3. 监听事件没有移除
4. 死循环
5. setInterval没有被清除
6. 过度递归

## 10、说说对this的理解
- `this` 指的是当前运行环境的上下文。
- `一般情况：`函数中的this永远指向函数的调用者，谁最终调用这个函数，this就指向谁
1. 全局对象中this指向window
2. 构造函数的this指向new 出来的对象
3. call , apply , bind 的this指向第一个参数
4. 箭头函数this指向创建时的上下文
5. 函数是通过对象调用的，那么this就指向这个对象
6. 在事件上，this指向触发这个事件的对象。`在IE下，attachEvent中，this指向window`

## 11、请你解释一个为什么10.toFixed(10)会报错？

> 在这里，.发生歧义，可以理解为小数点，也可以理解为方法调用
> 
**修改方法**
1. (10).toFixed(10)
2. 10..toFixed(10)
3. 10 .toFixed(10)
4. 10.0.toFixed(10)

## 12、说说对eval()的理解？

1. `不安全`。容易出错，因为不知道传入的参数未知
2. 不利于代码可维护性，可扩展性
3. 不推荐使用
4. eval()相当于一个小型的js解析器，接受一个字符串，可以解析字符串并执行


## 13、原生的字符串操作方法有哪些？请列举并描述其功能

1. charAt  返回指定的字符
2. charCodeAt  
4. concat
5. includes
6. endsWith 是否是以这个字符串结尾 返回布尔值
7. indexOf
8. lastIndexOf  
10. match  返回能匹配的字符，返回一个数组
12. padEnd   在字符串末尾拼接
13. padStart  在字符串开头拼接
14. repeat  重复
15. replace
16. search  返回正则表达式在字符串中首次匹配项的索引,没匹配上返回-1
17. slice  截取字符串  第二个参数是indexEnd `[a,b)`
18. split
19. startsWith  是否是以这个字符串开头 返回布尔值
20. substr  截取字符串  第二个参数是length  
21. substring  截取字符串  第二个参数是indexEnd  `[a,b)`
24. toLowerCase  将大写字母转为小写字母
25. toUpperCase  将小写字母转为大写字母
26. trim  去除前后空格

```javascript
// match
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var regexp = /[A-E]/gi;
var matches_array = str.match(regexp);

console.log(matches_array);
// ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']


// charCodeAt
"ABC".charCodeAt(0)   // 65

// search
var str = "hey JudE";
var re = /[A-Z]/g;
var re2 = /[.]/g;
console.log(str.search(re));     // 4
console.log(str.search(re2));   // -1
```

## 14、原生Math的方法有哪些？请列举并描述其功能

1. Math.abs()     绝对值
2. Math.ceil()    向上取整
3. Math.floor()   向下取整
4. Math.max(num1, num2 ...)
5. Math.min(num1, num2 ...) 
6. Math.pow(num1, num2)   num1的num2次幂
7. Math.random()      0-1间伪随机数
8. Math.sqrt()     num的平方根
9. Math.round()   四舍五入
