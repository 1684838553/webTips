`Object.getOwnPropertyDescriptors(obj)`的功能返回一个包含 obj 自身所有属性的属性描述符数组。

```javascript
const obj = {
    [Symbol('foo')]: 123,
    get bar() { return 'abc' },
};
console.log(Object.getOwnPropertyDescriptors(obj));
```

输出：

![image](https://user-images.githubusercontent.com/1744713/30357361-d37abe7e-9870-11e7-9a25-e6a779155fd5.png)

## 应用场景

### 复制若干属性给一个对象

从 ES6 开始，才有了一个用来复制属性的工具方法：`Object.assign()`。但是，这个方法只能简单的使用 get 和 set 操作去复制那些本身就是关键字的属性。这也意味着它并不能正确地复制那些非默认属性。

```javascript
const source = {
    set foo(value) {
        console.log(value);
    }
};
console.log(Object.getOwnPropertyDescriptor(source, 'foo'));
```

![image](https://user-images.githubusercontent.com/1744713/30364874-8e0c3a7a-9898-11e7-9692-5d43438f6211.png)

使用`Object.assign()`复制 foo 到 target 对象：

```javascript
const target1 = {};
Object.assign(target1, source);
console.log(Object.getOwnPropertyDescriptor(target1, 'foo'));
```

![image](https://user-images.githubusercontent.com/1744713/30364977-e6eb9afa-9898-11e7-88d2-dbbe70a4b0b0.png)

然后我们把`Object.getOwnPropertyDescriptors()`和`Object.defineProperties()`组合起来却能得到我们想要的结果。

```javascript
const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
console.log(Object.getOwnPropertyDescriptor(target2, 'foo'));
```

![image](https://user-images.githubusercontent.com/1744713/30365102-4aa83346-9899-11e7-88ab-1dc51876db48.png)

### 对象复制

对象的浅复制也可以使用`Object.getOwnPropertyDescriptors()`。但是，这次我们用`Object.create()`来尝试一下，这个方法有两个参数：

* 第一个参数指定用来返回的对象原型
* 第二个参数是一个类似于`Object.getOwnPropertyDescriptors()`方法返回的描述符属性集合

```javascript
const clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

### 使用对象字面量跨对象访问

使用对象字面量的最好方式就是创建一个对象，比如下面的示例中把内置属性`__proto__`指向了另一个任意的对象`prot`。

```javascript
var prot = {
    value: 1
}

const obj = {
    __proto__: prot,
    foo: 123,
};

console.log(obj.value)
```

```javascript
//正确的输出了我们所期望的值

1
```

可惜的是，这种用法只是在浏览器环境中才支持。更通用的做法是使用`Object.create()`和赋值操作。

```javascript
var prot = {
    value: 1
}

const obj = Object.create(prot);
obj.foo = 123;

console.log(obj.value)
```

```javascript
//依然可以输出正确的值

1
```

还有一种实现方式就是使用`Object.getOwnPropertyDescriptors()`

```javascript
var prot = {
    value: 1
}

const obj = Object.create(
    prot,
    Object.getOwnPropertyDescriptors({
        foo: 123,
    })
);

console.log(obj.value)
```

```javascript
//输出了正确的结果 

1
```
