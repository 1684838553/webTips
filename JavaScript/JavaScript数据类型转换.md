# JS 数据类型转换

[JavaScript 隐式类型转换](https://chinese.freecodecamp.org/news/javascript-implicit-type-conversion/)

### 案例

```javascript
--[,]  // 0
+!!NaN //0
'b' + 'a' + + 'a' + 'a' // 'baNaNa'
+0 === -0 // true
Object.is(0, -0); //  false
Number(undefined) // NaN
!5  // 0
"true" - 0  //NaN
null - 0  // 0
true++ // SyntaxError true为常量
0/0  // NaN
true == "true" // false true == 1 "true" == NaN
+!![] //1  !![] 为true
```

### `toString`和`String`的区别  
- `toString`
1. `toString()`可以将数据都转为字符串，但是`null`和`undefined`不可以转换。

    ```javascript
    console.log(null.toString())
    //报错 TypeError: Cannot read property 'toString' of null
    
    console.log(undefined.toString())
    //报错 TypeError: Cannot read property 'toString' of undefined
    ```
2. `toString()`括号中可以写数字，代表进制

    二进制：.toString(2); 
    
    八进制：.toString(8);
    
    十进制：.toString(10);
    
    十六进制：.toString(16);
    
- `String`

1.  `String()`可以将`null`和`undefined`转换为字符串，但是没法转进制字符串

    ```javascript
    console.log(String(null));
    // null
    console.log(String(undefined));
    // undefined
    ```

### 对象转换为基本数据类型

```javascript
[]+[] // ''+ '' = ''
{}+{}  //"[object Object][object Object]"
[]+{}  //"" + "[object Object]"  =  "[object Object]"
{}+[]  // 0 => 注意：{} + [] 被解析成{};+[],前面一个是空代码块，被略过，执行+[],最后的结果是Number类型，+"" === 0
{}被当做一个块级作用域，而不是对象，是合法语句，js默认可以不带分号，所以被解析成{};+[]

++[[ ]][+[ ]]+[+[ ]]
1. 先拆分成A：++[[ ]][+[ ]]和B：[+[ ]]
2. B式比较简单：[0]
3. A式转换成++[[ ]][0]也就是++[ ],++运算符，++0 === 1
4. A式结果为1
5. 1 + [0]
6. 结果是”10”
```

1. 所有的对象在布尔上下文（context）中均为 true。所以对于对象，不存在 to-boolean 转换，只有字符串和数值转换。
2. 数值转换发生在对象相减或应用数学函数时。例如，Date 对象（将在 日期和时间 一章中介绍）可以相减，date1 - date2 的结果是两个日期之间的差值。
3. 至于字符串转换 —— 通常发生在我们像 alert(obj) 这样输出一个对象和类似的上下文中。

**ToPrimitive()**

```javascript
toPrimitive(input [, PreferredType])  //第一个是转换的参数 第二个是要转换成哪种类型
```

| inputTpye |        result        |
| :-------- | :------------------: |
| Null      |   不转换，直接返回   |
| Undefined |   不转换，直接返回   |
| Number    |   不转换，直接返回   |
| Boolean   |   不转换，直接返回   |
| String    |   不转换，直接返回   |
| Symbol    |   不转换，直接返回   |
| Object    | 按照下列步骤进行转换 |

```javascript
ToPrimitive(input [, PreferredType])

1.如果没有传入PreferredType参数，则让hint的值为'default'（表现为传了Number）
2.否则，如果PreferredType值为String，则让hint的值为'string'
3.否则，如果PreferredType值为Number，则让hint的值为'number'
4.如果input对象有@@toPrimitive方法，则让exoticToPrim的值为这个方法，否则让exoticToPrim的值为undefined
5.如果exoticToPrim的值不为undefined，则
	a.让result的值为调用exoticToPrim后得到的值
	b.如果result是原值，则返回
	c.抛出TypeError错误
6.否则，如果hint的值为'default'，则把hint的值重新赋为'number'
7.返回 OrdinaryToPrimitive(input,hint)

OrdinaryToPrimitive(input,hint)

1.如果hint的值为'string',则
	a.调用input对象的toString()方法，如果值是原值则返回
	b.否则，调用input对象的valueOf()方法，如果值是原值则返回
	c.否则，抛出TypeError错误
2.如果hint的值为'number',则
	a.调用input对象的valueOf()方法，如果值是原值则返回
	b.否则，调用input对象的toString()方法，如果值是原值则返回
	c.否则，抛出TypeError错误
```

<font color="red">**总结**:在没有改写或自定义@@toPrimitive 方法的条件下，如果是 Date 求原值，则 PreferredType 是 String，其他均为 Number。PreferredType 是 String，则先调用 toString()，结果不是原始值的话再调用 valueOf()，还不是原始值的话则抛出错误；PreferredType 是 Number，则先调用 valueOf()再调用 toString()。</font>

**valueOf()**

返回值为该对象的原始值。

| **对象** | **返回值**                                               |
| :------- | :------------------------------------------------------- |
| Array    | 返回数组对象本身。                                       |
| Boolean  | 布尔值。                                                 |
| Date     | 存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。 |
| Function | 函数本身。                                               |
| Number   | 数字值。                                                 |
| Object   | 对象本身。这是默认情况。                                 |
| String   | 字符串值。                                               |
|          | Math 和 Error 对象没有 valueOf 方法。                    |

```javascript
// Array：返回数组对象本身
var array = ["ABC", true, 12, -5];
console.log(array.valueOf() === array); // true
```

**toString()**

可以通过 `toString()` 来获取每个对象的类型

如果此方法在自定义对象中未被覆盖，`toString()` 返回 "[object *type*]"，其中 `type` 是对象的类型

```javascript
let a = 1;
Obiect.prototype.toString.call(a); //"[object Number]"
Obiect.prototype.toString(a); //"[object Object]"
```

### undefined

- 转字符串

  使用 `String(undefined)` 转换 结果 => "undefined"

- 转数字

  使用`Number(undefined)` 转换 结果 => NaN

- 转布尔值

  使用`Boolean(undefined)`转换 结果 => false

- 转对象 => 报错

  因为`undefined`没有构造函数 ？？？

### null

- 转字符串

  使用 `String(null)` 转换 结果=> "null"

- 转数字

  使用`Number(null)` 转换 结果 => 0

- 转布尔值

  使用`Boolean(null)`转换 结果 => false

- 转对象 => 报错

  因为`null`没有构造函数 ？？？

### 布尔值 true

- 转字符串

  使用 `String(true)` 转换 结果 => "true"

- 转数字

  使用`Number(true)` 转换 结果 => `1`

- 转对象

  使用`new Boolean(true)`转换

### 布尔值 false

- 转字符串

  使用 `String(false)` 转换 结果 => "false"

- 转数字

  使用`Number(false)` 转换 结果 => `0`

- 转对象

  使用`new Boolean(false)`

### 字符串

- 转数字

  使用`Number(str)` 转换,空字符串为 0， 非数字字符串转为 `NaN`

- 转布尔值

  空字符串为`false` ，其他都是`true`

- 转对象

  使用`new String(string)`转换

### 数字

- 转字符串

  使用`String(number)` 转换

- 转布尔值

  `0`,`-0`,`NaN` 为`false`, 其他都为`true`

- 转对象

  使用`new Number(number)` 转换

### 对象

- 转数字

先使用`valueOf(object)`方法，如果返回原始值，将这个原始值转换成数字（`Date`对象不进行转换），否则调用`toString(Object)`方法,将返回值进行转换并返回(`Date`对象不进行转换)。否则抛出错误。

- 转字符串

先使用`toString`方法，如果返回原始值就转换成字符串返回，如果没有`toString` 方法或返回的不是一个原始值，就调用`valueOf` 方法，如果是原始值就转换成字符串并返回。如果最终无法获得一个原始值，就会抛出类型错误。

- 转布尔值

所用的对象都是`true`

### 类型转换案例

| 值           | 字符串            | 数字 | 布尔值 | 对象                  |
| ------------ | ----------------- | ---- | ------ | --------------------- |
| undefined    | "undefined"       | NaN  | false  | throws TypeError      |
| null         | "null"            | 0    | false  | throws TypeError      |
| true         | "true"            | 1    |        | new Boolean(true)     |
| false        | "false"           | 0    |        | new Boolean(false)    |
| ""           |                   | 0    | false  | new String("")        |
| "1.2"        |                   | 1.2  | true   | new String("1.2")     |
| "one"        |                   | NaN  | true   | new String("one")     |
| 0            | "0"               |      | false  | new Number(0)         |
| -0           | "0"               |      | false  | new Number()          |
| NaN          | "NaN"             |      | false  | new Number(NaN)       |
| Infinity     | "Infinity"        |      | true   | new Number(Infinity)  |
| -Infinity    | "-Infinity"       |      | true   | new Number(-Infinity) |
| 1            | "1"               |      | true   | new Number(1)         |
| {}           | "[object Object]" | NaN  | true   |                       |
| []           | ""                | 0    | true   |                       |
| [1]          | "1"               | 1    | true   |                       |
| ['a']        | "a"               | NaN  | true   |                       |
| function(){} | "function (){}"   | NaN  | true   |                       |
