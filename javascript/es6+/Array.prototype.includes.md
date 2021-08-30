此方法用来判断一个元素是否存在于一个数组中，如果存在返回`true`，否则返回`false`。

```javascript
['a', 'b', 'c'].includes('a')
```

```
true
```

```javascript
['a', 'b', 'c'].includes('d')
```

```
false
```

与`includes`非常类似的一个方法是`indexOf`，比如下面两种用法实现的作用是一样的。

```javascript
arr.includes(x)
arr.indexOf(x) >= 0
```

`includes`方法可以用于查找`NaN`。

```javascript
[NaN].includes(NaN)
```

```
true
```

`indexOf`方法却不行。

```javascript
[NaN].indexOf(NaN)
```

```
-1
```

`includes`方法不能区分`+0`和`-0`。

```javascript
[-0].includes(+0)
```

```
true
```

类型化数组中也同样存在一个`includes`方法。

```javascript
let tarr = Uint8Array.of(12, 5, 3);
console.log(tarr.includes(5));
```

```
true
```

### FAQ

* 为什么此方法会被命名为`includes`，而不是`contains`？

`contains`确实是最初的选择，但是后来网上某些代码库（MooTools）有了同名的实现，就被放弃了。

* 接上一问题，为什么它也没有被命名为`has`呢？

因为`has`方法一般用于判断键值对（Map.prototype.has），而`includes`通常用于判断元素（String.prototype.includes）。一个集合（Set）的元素是可以通过`key`和`value`分别查看的，这也解释了为什么`Set`对象中同样没有`includes`方法。

* `String.prototype.includes`方法的工作机制是基于字符串，而不是基于字符的。那么，这是不是就和`Array.prototype.includes`方法的工作机制不一致了？如果数组的`includes`方法和`String`上的保持一致，那么数组的`includes`方法参数接受的应该是一个数组，而不能是一个单一元素。但是，这两个对象上的`includes`方法又是模仿的`indexOf`方法。而且字符是一种特定情况，字符串一般情况下都是拥有一定的长度。
