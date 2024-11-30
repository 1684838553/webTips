### 类的数据类型是函数，类本身指向构造函数

- 类的定义

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(`hello,${this.name}`);
  }
}
Animal.prototype.constructor === Animal; // true
let dog = new Animal("dog");
dog.sayHi(); // hello, dog
```

> constructor 方法用来创建和初始化对象，而且一个类中有且只能有一个 consctuctor 方法，默认为 constructor(){}。dog 就是 Animal 实例化的对象。

- 类的继承
  class 使用 extends 关键字来创建子类

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(`hello, ${this.name}`);
  }
}

class Dog extends Animal {
  bark() {
    console.log(`喵喵喵`);
  }
}

let wangcai = new Dog("旺财");
wangcai.bark(); // 喵喵喵
wangcai.sayHi(); // hello, 旺财
```

> 但如果在子类中定义了 constructor 方法，必须先调用 super()才能使用 this，因为子类并没有 this 对象，而是继承父类的 this 对象，所以 super 必须在使用 this 关键字之前使用

class Animal {
constructor(name) {
this.name = name;
}
sayHi() {
console.log(`hello, ${this.name}`);
}
}

class Dog extends Animal {
constructor(name, sound) {
this.name = name;
this.sound = sound;
};
bark() {
console.log(this.sound);
}
}

let wangcai = new Dog('旺财', '喵喵喵');
wangcai.bark(); // referenceError

class Dog extends Animal {
constructor(name, sound) {
super(name);
this.sound = sound;
};
bark() {
console.log(this.sound);
}
}
let wangcai = new Dog('旺财', '喵喵喵');
wangcai.bark(); // 喵喵喵
super 不仅可以调用父类的 constructor 函数，还可以调用父类上的方法：

class Animal {
constructor(name) {
this.name = name;
}
sayHi() {
console.log(`hello, ${this.name}`);
}
}

class Dog extends Animal {
bark() {
super.sayHi();
}
}

let wangcai = new Dog('旺财');
wangcai.bark(); // hello, 旺财
静态方法
所有在类中定义的方法会被实例继承，但是有时候我们并不想所有实例都能继承某个方法，这时候，static 关键字就能达到你的目的，在声明方法前加上 static 关键字，这个方法就不会被实例继承，而是直接通过类来调用，它被叫做静态方法，如下：

class Animal {
constructor(name) {
this.name = name;
}
sayHi() {
console.log(`hello, ${this.name}`);
}
static bark() {
console.log('喵喵喵');
}
}
let dog = new Animal('dog');

dog.bark(); // TypeError
Animal.bark(); // 喵喵喵
静态方法虽然不能被实例继承，但是可以被子类继承，但是子类的实例依旧没有继承它：

class Animal {
static bark() {
console.log('喵喵喵');
}
}
class Dog extends Animal{

}
Dog.bark(); // 喵喵喵
let dog = new Dog();
dog.bark(); // TypeError
实例属性
实例属性必须定义在类方法中：

class Animal {
constructor(name) {
this.name = name; // 实例属性
}
}
静态属性和原型属性避必须在类的外面定义：

Animal.age = 18; // “静态属性”
Animal.prototype.sex = 'male'; // 原型属性
实例属性顾名思义，就是对象独有的方法/属性，静态属性就是位于 Class 本身的属性，但是 ES6 中明确说明 Class 只有静态方法，没有静态属性，原型属性也很容易理解也很容易看出，就是位于原型链上的属性/方法。



