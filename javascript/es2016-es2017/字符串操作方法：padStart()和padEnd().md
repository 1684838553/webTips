## 综述

在 ECMAScript2017 中添加了两个新的字符串方法：

```javascript
'x'.padStart(5, 'ab')
```

```
"ababx"
```

```javascript
'x'.padEnd(5, 'ab')
```

```
"xabab"
```

两个方法的一些使用场景：

* 用等宽字体显示表格式的数据
* 给一个文件名或者 URL 添加顺序号，比如：file001.txt
* 对 console 进行对齐输出
* 打印拥有固定位数的十六进制数或者二进制数

## String.prototype.padStart(maxLength, fillString=' ')

此方法的功能是使用 fillString 给被处理字符串添加前缀，直到被处理字符串的长度正好等于 maxLength 为止。

```javascript
'x'.padStart(5, 'ab')
```

```
"ababx"
```

如有必要，为了长度能恰好的等于 maxLength，可能也只截取应用 fillString 的一部分字符片段。

```javascript
'x'.padStart(4, 'ab')
```

```
"abax"
```

如果被处理字符串的长度大于等于 maxLength，那么原样返回。

```javascript
'abcd'.padStart(2, '#')
```

```
"abcd"
```

如果 maxLength 和 fillString 的长度是相同的，那么就会截取 fillString 的一部分，然后与被处理字符合成一个长度正好等于 maxLength 的新字符串。

```javascript
'abc'.padStart(10, '0123456789')
```

```
"0123456abc"
```

如果省略了 fillString 参数，则默认为空格。

```javascript
'x'.padStart(3)
```

```
"  x"
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

## String.prototype.padEnd(maxLength, fillString=' ') 

`padStart()`和`padEnd()`的工作方式类似，只不过前者是用来插入前缀字符，后者用来插入后缀字符。

示例1：
```javascript
'x'.padEnd(5, 'ab')
```

```
'xabab'
```

示例2：
```javascript
'x'.padEnd(4, 'ab')
```

```
'xaba'
```

示例3：
```javascript
'abcd'.padEnd(2, '#')
```

```
'abcd'
```

示例4：
```javascript
'abc'.padEnd(10, '0123456789')
```

```
'abc0123456'
```

示例5：
```javascript
'x'.padEnd(3)
```

```
'x  '
```
