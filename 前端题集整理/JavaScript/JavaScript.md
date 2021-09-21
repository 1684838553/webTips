# JavaScript 题目

## JS数据类型
1. string
2. number
3. boolean
4. null
5. undefined
6. symbol
7. Object
8. Function

## Map和Set

1. Map的key相比较普通对象来说更为灵活，普通对象的key只能以基础数据类型作为key值，并且所有传入的key值都会被转化成string类型，而Map的key可以是各种数据类型格式。
2. Set可以讲讲它去重的特性。

## WeakMap和Map之间的区别

WeakMap只能以复杂数据类型作为key，并且key值是弱引用，对于垃圾回收更加友好

## 原型链

1.原型链继承
```javascript
function Parent () {
    this.name = 'kevin';
}
Parent.prototype.getName = function () {
    console.log(this.name);
}
function Child () {
}
Child.prototype = new Parent();
var child1 = new Child();
console.log(child1.getName()) // kevin
```
问题：
- 引用类型的属性被所有实例共享
- 在创建 Child 的实例时，不能向Parent传参

2. 借用构造函数(经典继承)
```javascript
function Parent () {
    this.names = ['kevin', 'daisy'];
}
function Child () {
    Parent.call(this);
}
var child1 = new Child();
child1.names.push('yayu');
console.log(child1.names); // ["kevin", "daisy", "yayu"]
var child2 = new Child();
console.log(child2.names); // ["kevin", "daisy"]
```

优点：
1.避免了引用类型的属性被所有实例共享
2.可以在 Child 中向 Parent 传参
缺点：
方法都在构造函数中定义，每次创建实例都会创建一遍方法。

3. 组合继承
```javascript
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);  
    this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');
child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]

```
优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

## this

1. 在全局上下文中，this指向全局对象
2. 在函数上下文中，this指向函数调用的对象
3. 使用call,bind,apply调用函数，this指向绑定的对象
4. 对于构造函数new 出来的实例，this指向该实例
5. 对于dom事件，this指向该dom,但在IE中，attachEvent绑定的事件，this指向window
6. 对于箭头函数，this指向箭头函数外层

## 深拷贝和浅拷贝的区别
[深拷贝和浅拷贝的区别](https://segmentfault.com/a/1190000018495759)
浅拷贝：对于对象来说，浅拷贝是对对象地址的复制，即拷贝的结果是两个对象指向同一个地址
深拷贝：开辟一个新的栈，两个对象对应的不同地址，修改一个对象的属性，不会改变另一个对象的属性



浅拷贝：一般指的是把对象的第一层拷贝到一个新对象上去，比如

```javascript
var a = { count: 1, deep: { count: 2 } }
var b = Object.assign({}, a)
// 或者
var b = {...a}
```

深拷贝：一般需要借助递归实现，如果对象的值还是个对象，要进一步的深入拷贝，完全替换掉每一个复杂类型的引用。
```javascript
var deepCopy = (obj) => {
    var ret = {}
    for (var key in obj) {
        var value = obj[key]
        ret[key] = typeof value === 'object' ? deepCopy(value) : value
    }
    return ret
}
```
对于同一个用例来说
```javascript
// 浅拷贝
var a = { count: 1, deep: { count: 2 } }
var b = {...a}

a.deep.count = 5
b.deep.count // 5
```
```javascript
var a = { count: 1, deep: { count: 2 } }
var b = deepCopy(a)
a.deep.count = 5
b.deep.count // 2
```

## 事件冒泡和事件捕获
[你真的理解 事件冒泡 和 事件捕获 吗？](https://juejin.cn/post/6844903834075021326)
 event.target==event.currentTarget，让触发事件的元素等于绑定事件的元素，也可以阻止事件冒泡；

## 垃圾回收
