# JSON必知必会

## 1、基本问题

1. 它是什么

2. 我可以用它做什么

3. 哪些别有用心的人会用它做什么

## 2、JSON的特点

1. JSON是一种数据交换格式`(数据交换格式:用于在不同的平台或系统间交换数据的文本。)`。**数据交换格式的核心是数据**

2. JSON`(JavaScript Object Notation,JavaScript对象表示法)`，是JS的子集，但它是独立于编程语言的

## 3、JSON语法

### 1. JSON基于JS对象字面量

+ `字面量`: 指字面意思与其想要表达的意思是完全一致的值。

    > 如你的朋友对你说：“她不知从哪儿突然冒了出来，吓得我三明治都掉了。”他所说的“三明治掉了”就是字面意思，而不是隐喻。

### 2. 名称-值对

### 3. 正确的JSON语法

+ 为了获得最大`可移植性(以一种对双方系统都兼容的方式在平台间传递信息)`，应尽可能避免使用空格或特殊字符。

+ JSON 是 JavaScript 对象表示法，所以我们要了解构建一个对象的语法。。我们将花括号加在名称 - 值对的两边来使之成为一个对象。

+ JSON的键和值都需要用双引号引起来

### 4. JSON可以作为独立的文件存在于文件系统中。文件扩展名`.json`

## 4、JSON数据类型

+ 对象 ：JSON本身就是对象，在JSON中创建对象，需要用到嵌套

+ 字符串 

    ```json
    {
        "promo": "Say \"Bob's the best!\" at checkout for free 8oz bag of kibble."
    }
    ```
    >  解析器在读取第一个双引号之后，会把“Bob”前面的双引号当成字符串结尾的双引号。然后解析器发现后面还有许多不属于任何一个名称 - 值对的文字，就会报错。为了处理这个问题，我们需要在字符串中的双引号前面加上一个反斜线字符来对其转义

    + 需要转义的字符
        + \/（正斜线）
        + \b（退格符）
        + \f（换页符）
        + \t（制表符）
        + \n（换行符）
        + \r（回车符）
        + \u 后面跟十六进制字符（如笑脸表情 \u263A）

    ```json
    {
        "story": "\\t Once upon a time, in a far away land \\n there lived a princess."
    }
    ```   
    > 对制表符和换行符转义后的 JSON
    

+ 数字 : 整数、小数、负数或者指数

+ 布尔 ：true 或 false

+ null : 表示一无所有

+ 数组 ：在数组中，可以看到一个列表，列表里只有值。这些值可以是任何合法的 JSON 数据类型（字符串、数字、对象、布尔值、数组以及 null）

> **注意：**
>
> JSON中的数据类型中`没有undefined`
>
> 原始数据类型：`定义和操作都是不能修改的`

## 5、JSON Schema`(模式)`

[JSON Schema Demo](https://www.cnblogs.com/makelu/p/11828274.html)

+ 值的数据类型是否正确

+ 是否包含所需要的数据

+ 值的形式是不是我需要的? `范围、最小值和最大值,数据类型`

## 6、JSON中的安全问题

**JSON只是一种数据交换格式，不会有什么安全问题。真正会产生安全问题的是JSON的使用。**

### 1. 跨站请求伪造`(CSRF cross-site request forgery)`

- 利用站点对用户浏览器信任而发起的攻击方式。

### 2.跨站脚本攻击

## 7、JS中的 XMLHttpRequest 与 Web API

`Web API` : 通过 HTTP 与服务进行交互的一系列指令与标准。

[跨域资源共享](https://github.com/1684838553/webTips/blob/master/%E5%89%8D%E7%AB%AF%E9%A2%98%E9%9B%86%E6%95%B4%E7%90%86/JavaScript/%E8%A7%A3%E5%86%B3%E8%B7%A8%E5%9F%9F%E7%9A%84%E6%96%B9%E6%B3%95.md)

```javascript
var myXmlHttpRequest = new XMLHttpRequest();

myXMLHttpRequest.onreadystatechange = function() {
    if (myXMLHttpRequest.readyState === 4 && myXMLHttpRequest.status === 200) {
        var myObject = JSON.parse(myXMLHttpRequest.responseText);
        var myJSON = JSON.stringify(myObject);
    }
}
myXMLHttpRequest.open("GET", url, true);
myXMLHttpRequest.send();
```

+ onreadystatechange  可以在代码中给它赋值为一个函数
+ readyState  返回一个 0~4 的值，用来表示状态码
+ response
+ responseText  当请求成功时，该属性会包含作为文本的响应体
+ responseType
+ responseXML
+ status  返回 HTTP 状态码（如 200 表示请求成功）
+ statusText
+ timeout
+ ontimeout
+ upload
+ withCredentials



