### 原型链继承

```javascript
function Parent(name) {
  this.name = name;
  this.sex = "boy";
  this.colors = ["white", "black"];
}
function Child() {
  this.feature = ["cute"];
}
var parent = new Parent("parent");
Child.prototype = parent;
```

**优点：**

- 继承了父类的模板，又继承了父类的原型对象

**缺点：**

- 如果要给子类的原型上新增属性和方法，就必须放在`Child.prototype = new Parent()`这样的语句后面
- 无法实现多继承(因为已经指定了原型对象了)
- 来自原型对象的所有属性都被共享了，这样如果不小心修改了原型对象中的引用类型属性，那么所有子类创建的实例对象都会受到影响(这点从修改`child1.colors`可以看出来)
- 创建子类时，无法向父类构造函数传参数(这点从`child1.name`可以看出来)

### 构造函数继承

**在子类构造函数内部使用`call或apply`来调用父类构造函数**

```javascript
function Parent(name) {
  this.name = name;
}
function Child() {
  this.sex = "boy";
  this.name = "tom"; // 1.打印name
  Parent.call(this, "child");
  //   this.name = "terry"; // 2.打印name
}
var child1 = new Child();
console.log(child1);
console.log(child1.name);  //重复定义了两个相同名称的属性，后面的覆盖前面的，注释2，打印child，不注释2，打印terry
```

**优点：**

- 解决了原型链继承中子类实例共享父类引用对象的问题，实现多继承
- 创建子类实例时，可以向父类传递参数

**缺点：**

- 构造继承**只能**继承父类的实例属性和方法，**不能**继承父类原型的属性和方法
- 实例并不是父类的实例，只是子类的实例
- **无法实现函数复用**，每个子类都有父类实例函数的副本，影响性能


### 组合继承
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
