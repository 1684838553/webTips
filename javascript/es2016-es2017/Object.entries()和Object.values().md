## Object.entries()

```javascript
let obj = { one: 1, two: 2 };
for (let [k,v] of Object.entries(obj)) {
    console.log(`${JSON.stringify(k)}: ${JSON.stringify(v)}`);
}
```

```
"one": 1
"two": 2
```

如果传给它的数据是`key-value`形式的键值对，那么返回的是每一个都包含两个元素的数组列表。`Object.entries(x)`的参数必须是一个对象，然后返回的是一个可权举的、把`key`转换为字符串的数组列表。

```javascript
Object.entries({ one: 1, two: 2 })
```

```
[ [ 'one', 1 ], [ 'two', 2 ] ]
```

如果某些`key`为`Symbol`类型，则会被直接忽略。

```javascript
Object.entries({ [Symbol()]: 123, foo: 'abc' });
```

```
[ [ 'foo', 'abc' ] ]
```

`Object.entries()`带给我们的是一种遍历对象属性的方式（[为什么对象默认不支持遍历](http://exploringjs.com/es6/ch_iteration.html#sec_plain-objects-not-iterable)）。它也可以与`Maps`相配合，这比上面的使用方式更直白。

```javascript
let map = new Map(Object.entries({
    one: 1,
    two: 2,
}));
console.log(JSON.stringify([...map]));
```

```
[["one",1],["two",2]]
```

## Object.values()

它用来返回键值可枚举、可转换成字符串类型的属性值数组。

```javascript
Object.values({ one: 1, two: 2 })
```

```
[1, 2]
```
