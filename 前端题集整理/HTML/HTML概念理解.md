# HTML 题目

## 1、DOCTYPE 有什么作用？标准模式与混杂模式如何区分？它们有何意义?

告诉浏览器使用哪个版本的 HTML 规范来渲染文档。DOCTYPE 不存在或形式不正确会导致 HTML 文档以混杂模式呈现。
标准模式（Standards mode）以浏览器支持的最高标准运行；混杂模式（Quirks mode）中页面是一种比较宽松的向后兼容的方式显示。

## 2、HTML5 为什么只需要写 `<!DOCTYPE HTML>`

HTML5 不基于 SGML（Standard Generalized Markup Language 标准通用标记语言），因此不需要对 DTD（DTD 文档类型定义）进行引用，但是需要 DOCTYPE 来规范浏览器行为。

HTML4.01 基于 SGML，所以需要引用 DTD。才能告知浏览器文档所使用的文档类型，如下：
`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`

## 3、行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

**行内元素：**`a span img input select`

1.  与其他行内元素共享一行空间
2.  默认宽高由内容决定
3.  不能为其指定宽和高
4.  行内元素中不可以嵌套块元素，但块元素中可以嵌套行内元素

**块级元素：**`div ul ol li dl dt dd h1 p`

1.  独占一行空间
2.  默认宽度为 100%，默认高度由子元素或者内容决定
3.  可以为其指定宽高 style=“width:;height:;”

**空元素：**`<br> <hr> <link> <meta>`

## 4、无样式内容闪烁

@import 导入 css 文件会等到文档加载完之后在加载 css 样式表，所以，在页面加载完到 css 导入完成之间有一段时间，页面上的内容是没有样式的

解决方案：使用 link 标签加载 css 样式表。因为 link 是顺序加载，这样页面会等到 css 下载完之后在下载

html 文件。先布局，就不会出现闪烁问题。

## 5、对浏览器内核的理解，常见的浏览器内核有哪些

1. Trident( MSHTML )：IE MaxThon TT The World 360 搜狗浏览器
2. Geckos：Netscape6 及以上版本 FireFox Mozilla Suite/SeaMonkey
3. Presto：Opera7 及以上(Opera 内核原为：Presto，现为：Blink)
4. Webkit：Safari Chrome

**主要分成两部分：**渲染引擎(Layout Engine 或 Rendering Engine)和 JS 引擎。

**渲染引擎：**负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。
**JS 引擎：**解析和执行 javascript 来实现网页的动态效果。

最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。

## 6、HTML5 有哪些新特性，移除了哪些元素？如何处理 HTML5 新标签的浏览器兼容问题？如何区分 HTML 和 HTML5?

新加了图像、位置、存储、多任务等功能

**新增元素：**

1. canvas
2. 用于媒体回放的 video 和 audio 元素
3. 本地离线存储。localStorage 和 sessionStorge
4. 语义化标签，如 artical,footer,header
5. 位置 API：geolocation
6. 表单控件
7. 新的技术：web worker(web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行) web socket
8. 拖放 API：drag、drop

**移除的元素：**

1. 纯表现的元素：basefont big center font s strike tt u
2. 性能较差元素：frame frameset noframes

**区别：**

1. DOCTYPE 声明的方式是区分重要因素
2. 根据新增加的结构、功能来区分

## 7、cookies，sessionStorage 和 localStorage 的区别？

共同点：都是保存在浏览器端，且是同源的。

区别：

1. cookies 是为了标识用户身份而存储在用户本地终端上的数据，始终在同源 http 请求中携带，即 cookies 在浏览器和服务器间来回传递，而 sessionstorage 和 localstorage 不会自动把数据发给服务器，仅在本地保存。
2. 存储大小的限制不同。cookie 保存的数据很小，不能超过 4k，而 sessionstorage 和 localstorage 保存的数据大，可达到 5M。
3. 数据的有效期不同。cookie 在设置的 cookie 过期时间之前一直有效，即使窗口或者浏览器关闭。sessionstorage 仅在浏览器窗口关闭之前有效。localstorage 始终有效，窗口和浏览器关闭也一直保存，用作长久数据保存。
4. 作用域不同。cookie 在所有的同源窗口都是共享；sessionstorage 不在不同的浏览器共享，即使同一页面；localstorage 在所有同源窗口都是共享

## 8、对 HTML 语义化的理解

1. 去掉或丢失样式的时候能够让页面呈现出清晰的结构。
2. 有利于 SEO 和搜索引擎建立良好沟通，有助于爬虫抓取更多的信息，爬虫依赖于标签来确定上下文和各个关键字的权重。
3. 方便其它设备解析。
4. 便于团队开发和维护，语义化增强可读性。

## 9、HTML5 的文件离线储存怎么使用，工作原理是什么

在线情况下，浏览器发现 HTML 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问，那么浏览器就会根据 manifest 文件的内容下载相应的资源，并进行离线存储。如果已经访问过并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面。然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不会做任何操作，如果文件改变了，那么就会重新下载文件中的资源，并且进行离线存储。例如，

在页面头部加入 manifest 属性

```html
<html manifest="cache.manifest"></html>
```

在 cache.manifest 文件中编写离线存储的资源

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

## 10、iframe 框架有那些优缺点

**优点：**

1. iframe 能够原封不动的把嵌入的网页展现出来。
2. 如果有多个网页引用 iframe，那么你只需要修改 iframe 的内容，就可以实现调用的每一个页面内容的更改，方便快捷。
3. 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用 iframe 来嵌套，可以增加代码的可重用。
4. 如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由 iframe 来解决。

**缺点：**

1. 搜索引擎的爬虫程序无法解读这种页面
2. 框架结构中出现各种滚动条
3. 使用框架结构时，保证设置正确的导航链接。
4. iframe 页面会增加服务器的 http 请求

## 11、label 的作用是什么? 是怎么用的?

label 定义表单控件间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

**功能：**

- 聚焦 (点击关联的标签来聚焦或者激活这个输入元素)
- 扩大点击面积

**属性：**

- for
- accesskey 提供了为当前元素生成快捷键的方式。

**for 属性功能：**

表示 label 标签要绑定的 HTML 元素，你点击这个标签的时候，所绑定的元素将获取焦点。例如，

```html
<label for="InputBox">姓名</label><input id="InputBox" type="text" />
```

**accesskey 属性功能：**

表示访问 label 标签所绑定的元素的热键，当您按下热键，所绑定的元素将获取焦点。例如，

```html
<label for="InputBox" accesskey＝"N">姓名</label><input id="InputBox" type="text">
```

## 12、在 form 表单中，如何关闭 HTML5 的自动完成功能

HTML 的输入框可以拥有自动完成的功能，当你往输入框输入内容的时候，浏览器会从你以前的同名输入框的历史记录中查找出类似的内容并列在输入框下面，这样就不用全部输入进去了，直接选择列表中的项目就可以了。但有时候我们希望关闭输入框的自动完成功能，例如当用户输入内容的时候，我们希望使用 AJAX 技术从数据库搜索并列举而不是在用户的历史记录中搜索。

方法：

1. 在 IE 的 internet 选项菜单中里的自动完成里面设置
2. Input 输入框的 autocomplete 为 on 或者 off 来来开启输入框的自动完成功能

## 13、如何实现浏览器内多个标签页之间的通信?

1. WebSocket SharedWorker
2. 也可以调用 localstorge、cookies 等本地存储方式。 localstorge 在另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，我们通过监听事件，控制它的值来进行页面信息通信。

注意：Safari 在无痕模式下设置 localstorge 值时会抛出 QuotaExceededError 的异常

## 14、网页验证码是干嘛的，是为了解决什么安全问题？

1. 区分用户是计算机还是人的程序;
2. 可以防止恶意破解密码、刷票、论坛灌水；

## 15、 title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别？

`title`属性没有明确意义，只表示标题；`h1`表示层次明确的标题，对页面信息的抓取也有很大的影响
`strong`标明重点内容，语气加强含义；`b`无意义的视觉表
视觉样式标签：`b i u s`
语义样式标签：`strong em ins del code`

## 16、img 的 alt 和 title 有什么异同

在 alt 和 title 同时设置的时候，alt 作为图片的替代文字出现，title 是图片的解释文字。

## 16、常见元素
1. meta
    - meta可定义页面的字符集
    <meta charset="utf-8">
    - meta可设置设备屏幕
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    - width：控制 viewport 的大小，可以指定的一个值，如果 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
    - height：和 width 相对应，指定高度。
    - initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
    - maximum-scale：允许用户缩放到的最大比例。
    - minimum-scale：允许用户缩放到的最小比例。
    - user-scalable：用户是否可以手动缩放

    - **解决问题：**无视设备的真实分辨率，直接通过dpi，在物理尺寸和浏览器之间重设分辨率，这个分辨率和设备的分辨率无关

2. doctype
    - 让浏览器以标准模式渲染
    - 让浏览器知道元素的合法性

## 17、html嵌套关系
    - 块级元素可包含行内元素
    - 行内元素不可包含块级元素，a标签除外，a可包含块级元素
    - 块级元素不一定可以包含块级元素，p不能包含块级元素

## 18、那些元素可闭合
    - 表单元素 input 
    - img
    - br
    - hr
    - meta
    -link

## HTML与DOM的关系
    HTML是一个字符串，解析之后生成DOM
    JS维护的是DOM
