# HTML题目

## 1、DOCTYPE有什么作用？标准模式与混杂模式如何区分？它们有何意义?

告诉浏览器使用哪个版本的HTML规范来渲染文档。DOCTYPE不存在或形式不正确会导致HTML文档以混杂模式呈现。
标准模式（Standards mode）以浏览器支持的最高标准运行；混杂模式（Quirks mode）中页面是一种比较宽松的向后兼容的方式显示。

## 2、HTML5为什么只需要写 `<!DOCTYPE HTML>`

HTML5不基于SGML（Standard Generalized Markup Language 标准通用标记语言），因此不需要对DTD（DTD 文档类型定义）进行引用，但是需要DOCTYPE来规范浏览器行为。

HTML4.01基于SGML，所以需要引用DTD。才能告知浏览器文档所使用的文档类型，如下：
`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`

## 3、行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

**行内元素：**`a span img input select`

1.  与其他行内元素共享一行空间
5.  默认宽高由内容决定
6. 不能为其指定宽和高
7. 行内元素中不可以嵌套块元素，但块元素中可以嵌套行内元素

**块级元素：**`div ul ol li dl dt dd h1 p`

1.  独占一行空间
2.  默认宽度为100%，默认高度由子元素或者内容决定
3.  可以为其指定宽高 style=“width:;height:;”

**空元素：**`<br> <hr> <link> <meta>`

## 4、无样式内容闪烁

@import 导入css文件会等到文档加载完之后在加载css样式表，所以，在页面加载完到css导入完成之间有一段时间，页面上的内容是没有样式的

解决方案：使用link标签加载css样式表。因为link是顺序加载，这样页面会等到css下载完之后在下载

html文件。先布局，就不会出现闪烁问题。

## 5、对浏览器内核的理解，常见的浏览器内核有哪些

1. Trident( MSHTML )：IE MaxThon TT The World 360 搜狗浏览器
2. Geckos：Netscape6及以上版本 FireFox Mozilla Suite/SeaMonkey
3. Presto：Opera7及以上(Opera内核原为：Presto，现为：Blink)
4. Webkit：Safari Chrome

**主要分成两部分：**渲染引擎(Layout Engine或Rendering Engine)和JS引擎。

**渲染引擎：**负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。
**JS引擎：**解析和执行javascript来实现网页的动态效果。

最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。

## 6、HTML5有哪些新特性，移除了哪些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分HTML和HTML5?

新加了图像、位置、存储、多任务等功能

**新增元素：**

1. canvas
2. 用于媒体回放的video和audio元素
3. 本地离线存储。localStorage和sessionStorge
4. 语义化标签，如artical,footer,header
5. 位置API：geolocation
6. 表单控件
7. 新的技术：web worker(web worker是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行) web socket
8. 拖放API：drag、drop

 **移除的元素：**

1. 纯表现的元素：basefont big center font s strike tt u
2. 性能较差元素：frame frameset noframes

**区别：**

1. DOCTYPE声明的方式是区分重要因素
2. 根据新增加的结构、功能来区分

## 7、cookies，sessionStorage和localStorage的区别？

共同点：都是保存在浏览器端，且是同源的。

区别：

1. cookies是为了标识用户身份而存储在用户本地终端上的数据，始终在同源http请求中携带，即cookies在浏览器和服务器间来回传递，而sessionstorage和localstorage不会自动把数据发给服务器，仅在本地保存。
2. 存储大小的限制不同。cookie保存的数据很小，不能超过4k，而sessionstorage和localstorage保存的数据大，可达到5M。
3. 数据的有效期不同。cookie在设置的cookie过期时间之前一直有效，即使窗口或者浏览器关闭。sessionstorage仅在浏览器窗口关闭之前有效。localstorage始终有效，窗口和浏览器关闭也一直保存，用作长久数据保存。
4. 作用域不同。cookie在所有的同源窗口都是共享；sessionstorage不在不同的浏览器共享，即使同一页面；localstorage在所有同源窗口都是共享

## 8、对HTML语义化的理解

1. 去掉或丢失样式的时候能够让页面呈现出清晰的结构。
2. 有利于SEO和搜索引擎建立良好沟通，有助于爬虫抓取更多的信息，爬虫依赖于标签来确定上下文和各个关键字的权重。
3. 方便其它设备解析。
4. 便于团队开发和维护，语义化增强可读性。

## 9、HTML5的文件离线储存怎么使用，工作原理是什么

在线情况下，浏览器发现HTML头部有manifest属性，它会请求manifest文件，如果是第一次访问，那么浏览器就会根据manifest文件的内容下载相应的资源，并进行离线存储。如果已经访问过并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面。然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不会做任何操作，如果文件改变了，那么就会重新下载文件中的资源，并且进行离线存储。例如，

在页面头部加入manifest属性

```html
<html manifest='cache.manifest'>
```

在cache.manifest文件中编写离线存储的资源

```xml
CACHE MANIFEST
#v0.11
CACHE:
js/app.js
css/style.css
NETWORK:
Resourse/logo.png
FALLBACK:
 //offline.html
```

## 10、iframe框架有那些优缺点

**优点：**

1. iframe能够原封不动的把嵌入的网页展现出来。
2. 如果有多个网页引用iframe，那么你只需要修改iframe的内容，就可以实现调用的每一个页面内容的更改，方便快捷。
3. 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，可以增加代码的可重用。
4. 如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由iframe来解决。

**缺点：**

1. 搜索引擎的爬虫程序无法解读这种页面
2. 框架结构中出现各种滚动条
3. 使用框架结构时，保证设置正确的导航链接。
4. iframe页面会增加服务器的http请求

## 11、label的作用是什么? 是怎么用的?

label 定义表单控件间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

**功能：**

- 聚焦  (点击关联的标签来聚焦或者激活这个输入元素)
- 扩大点击面积

**属性：**

- for
- accesskey  提供了为当前元素生成快捷键的方式。

**for属性功能：**

表示label标签要绑定的HTML元素，你点击这个标签的时候，所绑定的元素将获取焦点。例如，

```html
<label for="InputBox">姓名</label><input id="InputBox" type="text"> 
```

**accesskey属性功能：**

表示访问label标签所绑定的元素的热键，当您按下热键，所绑定的元素将获取焦点。例如，

```html
<label for="InputBox" accesskey＝"N">姓名</label><input id="InputBox" type="text">
```

## 12、在form表单中，如何关闭HTML5的自动完成功能

HTML的输入框可以拥有自动完成的功能，当你往输入框输入内容的时候，浏览器会从你以前的同名输入框的历史记录中查找出类似的内容并列在输入框下面，这样就不用全部输入进去了，直接选择列表中的项目就可以了。但有时候我们希望关闭输入框的自动完成功能，例如当用户输入内容的时候，我们希望使用AJAX技术从数据库搜索并列举而不是在用户的历史记录中搜索。

方法：

1. 在IE的internet选项菜单中里的自动完成里面设置
2. Input输入框的autocomplete为on或者off来来开启输入框的自动完成功能

## 13、如何实现浏览器内多个标签页之间的通信?

1. WebSocket SharedWorker
2. 也可以调用 localstorge、cookies 等本地存储方式。 localstorge 在另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，我们通过监听事件，控制它的值来进行页面信息通信。

注意：Safari 在无痕模式下设置 localstorge 值时会抛出QuotaExceededError 的异常

## 14、网页验证码是干嘛的，是为了解决什么安全问题？

1. 区分用户是计算机还是人的程序;
2. 可以防止恶意破解密码、刷票、论坛灌水；

## 15、 title与h1的区别、b与strong的区别、i与em的区别？

**title属性：**没有明确意义，只表示标题；

**h1：**表示层次明确的标题，对页面信息的抓取也有很大的影响
**strong：**标明重点内容，语气加强含义；

**b：**无意义的视觉表

**em：**表示强调文本；

**i：**斜体，是无意义的视觉表示
视觉样式标签：`b i u s`
语义样式标签：`strong em ins del code`

## 16、img的alt和title有什么异同

在alt和title同时设置的时候，alt作为图片的替代文字出现，title是图片的解释文字。
