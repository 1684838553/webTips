## JS 对象的特征

### 对象的特点

1. 对象具有唯一的标识性
2. 对象有状态
3. 对象有行为

```javascript
var o = {
  d: 1,
  f() {
    console.log(this.d);
  },
};
```

js 对象的引用是该对象的唯一标识；

js 对象的行为和状态都被抽象属性；

**JavaScript 中对象独有的特色是：对象具有高度的动态性，这是因为 JavaScript 赋予了使用者在运行时为对象添改状态和行为的能力。**

### JS 对象的两类属性

1. 数据属性

   四个特征：

   - value：就是属性的值。
   - writable：决定属性能否被赋值。
   - enumerable：决定 for in 能否枚举该属性。
   - configurable：决定该属性能否被删除或者改变特征值。

2. 访问器属性

   访问器属性使得属性在读和写时执行代码，它允许使用者在写和读属性时，得到完全不同的值，它可以视为一种函数的语法糖。

   四个特征：

   - getter：函数或 undefined，在取属性值时被调用。
   - setter：函数或 undefined，在设置属性值时被调用。
   - enumerable：决定 for in 能否枚举该属性。
   - configurable：决定该属性能否被删除或者改变特征值。
