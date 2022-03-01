### 移动端中css你是使用什么单位

**比较常用的**：

- `em`：定义字体大小时以父级的字体大小为基准；定义长度单位时以当前字体大小为基准。例父级`font-size: 14px`，则子级`font-size: 1em;`为`font-size: 14px;`；若定义长度时，子级的字体大小如果为`14px`，则子级`width: 2em;`为`width: 24px`。
- `rem`：以根元素的字体大小为基准。例如`html`的`font-size: 14px`，则子级`1rem = 14px`。
- `%`：以父级的宽度为基准。例父级`width: 200px`，则子级`width: 50%;height:50%;`为`width: 100px;height: 100px;`
- `vw和vh`：基于视口的宽度和高度(视口不包括浏览器的地址栏工具栏和状态栏)。例如视口宽度为`1000px`，则`60vw = 600px;`
- `vmin和vmax`：`vmin`为当前`vw` 和`vh`中较小的一个值；`vmax`为较大的一个值。例如视口宽度`375px`，视口高度`812px`，则`100vmin = 375px;`，`100vmax = 812px;`



**移动端布局总结**：

1. 移动端布局的方式主要使用rem和flex，可以结合各自的优点，比如flex布局很灵活，但是字体的大小不好控制，我们可以使用rem和媒体查询控制字体的大小，媒体查询视口的大小，然后不同的上视口大小下设置设置html的font-size。
2. 可单独制作移动端页面也可响应式pc端移动端共用一个页面。没有好坏，视情况而定，因势利导

（总结来源：玲珑）

### rem和em的区别

**em:**

定义字体大小时以父级的字体大小为基准；定义长度单位时以当前字体大小为基准。例父级`font-size: 14px`，则子级`font-size: 1em;`为`font-size: 14px;`；若定义长度时，子级的字体大小如果为`14px`，则子级`width: 2em;`为`width: 24px`。

**rem:**

以根元素的字体大小为基准。例如`html`的`font-size: 14px`，则子级`1rem = 14px`。

### 在移动端中怎样初始化根元素的字体大小

一个简易版的初始化根元素字体大小。

页面开头处引入下面这段代码，用于动态计算`font-size`：

(假设你需要的`1rem = 20px`)

```javascript
(function () {
  var html = document.documentElement; // 获取整个的html文档
  function onWindowResize() {
    // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置
    html.style.fontSize = html.getBoundingClientRect().width / 20 + 'px';
  }
  //监听resize事件
  window.addEventListener('resize', onWindowResize);
  onWindowResize();
})();
```

- `document.documentElement`：获取`document`的根元素
- `html.getBoundingClientRect().width`：获取`html`的宽度(窗口的宽度)
- 监听`window`的`resize`事件

一般还需要配合一个`meta`头：

```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-sacle=1.0, maximum-scale=1.0, user-scalable=no" />
```

### 移动端中不同手机html默认的字体大小都是一样的吗

如果没有人为取改变根元素字体大小的话，默认是`1rem = 16px`；根元素默认的字体大小是`16px`。