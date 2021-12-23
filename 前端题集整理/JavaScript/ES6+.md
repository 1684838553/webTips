# 1、函数参数的尾部逗号

现在声明函数的时候，可以在参数尾部添加一个逗号了：

```javascript
function foo(
    param1,
    param2,
) {}
```

同理，调用函数时也可以这样用：

```javascript
foo(
    'abc',
    'def',
);
```

在对象中使用：

```javascript
let obj = {
    first: 'Jane',
    last: 'Doe',
};

for(o in obj){
    console.log(o)   
}

// 'first' 'last'
```


在数组中使用时，不会影响它的`length`：

```javascript
let arr = [
    'red',
    'green',
    'blue',
];
console.log(arr.length);   // 3
```

### 使用函数尾部参数语法有两个好处：

1. 维护代码时更简单，增删函数的最后一个参数时，不需要再对应增删最后那个逗号。
2. 在版本控制系统中查看代码时，会发现仅仅是添加参数的那一行有改动记录。

如下示例，我们在增删`def`参数时，不需要再增删`abc`后面的逗号。而且版本控制系统记录的也仅仅是`def`这一行发生了变化。

```javascript
foo(
    'abc',
);

// 改成:

foo(
    'abc',
    'def',
);
```

# 2、幂运算

幂运算符是 ES7 中的一个新特性。

```javascript
6 ** 2     // 36
```


它与 `Math.pow(x, y)`的计算结果是一样的。

```javascript
Math.pow(6, 2)   // 36
```


你也可以这样使用：

```javascript
let num = 6;
num **= 2;
console.log(num);   // 36
```

# 3、字符串操作方法padStart()和padEnd()

在 ECMAScript2017 中添加了两个新的字符串方法：

```javascript
'x'.padStart(5, 'ab')  // "ababx"
'x'.padEnd(5, 'ab')   // "xabab"
```


### 两个方法的一些使用场景：

1. 用等宽字体显示表格式的数据
2. 给一个文件名或者 URL 添加顺序号，比如：file001.txt
3. 对 console 进行对齐输出
4. 打印拥有固定位数的十六进制数或者二进制数

### String.prototype.padStart(maxLength, fillString=' ')

1. 此方法的功能是使用 fillString 给被处理字符串添加前缀，直到被处理字符串的长度正好等于 maxLength 为止。

```javascript
'x'.padStart(5, 'ab')   // "ababx"
```

2. 如有必要，为了长度能恰好的等于 maxLength，可能也只截取应用 fillString 的一部分字符片段。

```javascript
'x'.padStart(4, 'ab')  // "abax"
```

3. 如果被处理字符串的长度大于等于 maxLength，那么原样返回。

```javascript
'abcd'.padStart(2, '#')   // "abcd"
```

4. 如果 maxLength 和 fillString 的长度是相同的，那么就会截取 fillString 的一部分，然后与被处理字符合成一个长度正好等于 maxLength 的新字符串。

```javascript
'abc'.padStart(10, '0123456789')   // "0123456abc"
```

5. 如果省略了 fillString 参数，则默认为空格。

```javascript
'x'.padStart(3)  // "  x"
```

### `padStart()`方法的简单实现

```javascript
String.prototype.padStart = function (maxLength, fillString=' ') {
    let str = String(this);
    if (str.length >= maxLength) {
        return str;
    }

    fillString = String(fillString);
    if (fillString.length === 0) {
        fillString = ' ';
    }

    let fillLen = maxLength - str.length;
    let timesToRepeat = Math.ceil(fillLen / fillString.length);
    let truncatedStringFiller = fillString
        .repeat(timesToRepeat)
        .slice(0, fillLen);
    return truncatedStringFiller + str;
};
```

### String.prototype.padEnd(maxLength, fillString=' ') 

`padStart()`和`padEnd()`的工作方式类似，只不过前者是用来插入前缀字符，后者用来插入后缀字符。


```javascript
'x'.padEnd(5, 'ab')     // 'xabab'

'x'.padEnd(4, 'ab')     // 'xaba'

'abcd'.padEnd(2, '#')   // 'abcd'

'abc'.padEnd(10, '0123456789')  // 'abc0123456'

'x'.padEnd(3)  // 'x  '
```


# 4、 Array.includes()

1. 此方法用来判断一个元素是否存在于一个数组中，如果存在返回`true`，否则返回`false`。

```javascript
['a', 'b', 'c'].includes('a')   // true

['a', 'b', 'c'].includes('d')   // false
```

2. 与`includes`非常类似的一个方法是`indexOf`，比如下面两种用法实现的作用是一样的。

```javascript
arr.includes(x)
arr.indexOf(x) >= 0
```

3. `includes`方法可以用于查找`NaN`,`indexOf`方法却不行。

```javascript
[NaN].includes(NaN)   // true
[NaN].indexOf(NaN)   // -1
```


4. `includes`方法不能区分`+0`和`-0`。

```javascript
[-0].includes(+0)   // true
```

5. 类型化数组中也同样存在一个`includes`方法。

```javascript
let tarr = Uint8Array.of(12, 5, 3);
console.log(tarr.includes(5));   // true
```


# 5、 Object.entries()和Object.values()

### Object.entries()

```javascript
let obj = { one: 1, two: 2 };
for (let [k,v] of Object.entries(obj)) {
    console.log(`${JSON.stringify(k)}: ${JSON.stringify(v)}`);
}

// "one": 1 
// "two": 2
```

1. 如果传给它的数据是`key-value`形式的键值对，那么返回的是每一个都包含两个元素的数组列表。`Object.entries(x)`的参数必须是一个对象，然后返回的是一个可权举的、把`key`转换为字符串的数组列表。

```javascript
Object.entries({ one: 1, two: 2 })    // [ [ 'one', 1 ], [ 'two', 2 ] ]
```

2. 如果某些`key`为`Symbol`类型，则会被直接忽略。

```javascript
Object.entries({ [Symbol()]: 123, foo: 'abc' });   // [ [ 'foo', 'abc' ] ]
```

3. `Object.entries()`带给我们的是一种遍历对象属性的方式（[为什么对象默认不支持遍历](http://exploringjs.com/es6/ch_iteration.html#sec_plain-objects-not-iterable)）。它也可以与`Maps`相配合，这比上面的使用方式更直白。

```javascript
let map = new Map(Object.entries({
    one: 1,
    two: 2,
}));
console.log(JSON.stringify([...map]));   // [["one",1],["two",2]]
```

### Object.values()

它用来返回键值可枚举、可转换成字符串类型的属性值数组。

```javascript
Object.values({ one: 1, two: 2 })   // [1, 2]
```

# 6、Object.getOwnPropertyDescriptors()

### `Object.getOwnPropertyDescriptors(obj)`的功能返回一个包含 obj 自身所有属性的属性描述符数组。

```javascript
const obj = {
    [Symbol('foo')]: 123,
    get bar() { return 'abc' },
};
console.log(Object.getOwnPropertyDescriptors(obj));
```

输出：

![image](https://user-images.githubusercontent.com/1744713/30357361-d37abe7e-9870-11e7-9a25-e6a779155fd5.png)

### 应用场景

1. 复制若干属性给一个对象

`Object.assign()`。这个方法只能简单的使用 get 和 set 操作去复制那些本身就是关键字的属性,并不能正确地复制那些非默认属性。

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

2. 对象复制

对象的浅复制也可以使用`Object.getOwnPropertyDescriptors()`。但是，这次我们用`Object.create()`来尝试一下，这个方法有两个参数：

* 第一个参数指定用来返回的对象原型
* 第二个参数是一个类似于`Object.getOwnPropertyDescriptors()`方法返回的描述符属性集合

```javascript
const clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

3. 使用对象字面量跨对象访问

使用对象字面量的最好方式就是创建一个对象，比如下面的示例中把内置属性`__proto__`指向了另一个任意的对象`prot`。

```javascript
var prot = {
    value: 1
}

const obj = {
    __proto__: prot,
    foo: 123,
};

console.log(obj.value)   // 1
```

可惜的是，这种用法只是在浏览器环境中才支持。更通用的做法是使用`Object.create()`和赋值操作。

```javascript
var prot = {
    value: 1
}

const obj = Object.create(prot);
obj.foo = 123;

console.log(obj.value)   // 1
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

console.log(obj.value)  // 1
```


