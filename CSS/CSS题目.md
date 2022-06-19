# CSS 题目

## 1、CSS 选择器有哪些？哪些属性可以继承？

**CSS 选择符：**id 选择器(#myid)、类选择器(.myclassname)、标签选择器(div, h1, p)、相邻选择器(h1 + p)、子选择器（ul > li）、后代选择器（li a）、通配符选择器（\*）、属性选择器（a[rel="external"]）、伪类选择器（a:hover, li:nth-child）

**可继承属性：**

文本 font-
颜色（背景色不可以）
列表（list-style-type）
元素可见性 visibility

**优先级（就近原则）：**!important > [ id > class > tag ]

## 2、display 有哪些值？说明他们的作用?

1. none 元素不显示，并从文档流中移除

2. block 块元素。`独占一行，可设置宽高，宽度默认父元素100%`

3. inline 行内元素。`不会独占一行，不能设置宽高，可设置行高，行内元素中不能放块元素`

4. inline-block 行内块元素

5. flex 弹性布局

6. grid 网格布局

7. table 作为块级表格显示

## 3、position 的值？

1. Static(默认) 按照正常文档流进行排列

2. relative(相对定位) 不脱离文本流，参考自身静态位置进行定位

3. absolute（绝对定位）脱离文本流，参考最近的一个定位元素或视口

4. fixed（固定定位）参考对象是视口

## 4、CSS3 有哪些新特性？

1. RGBA 和透明度
2. background-image background-origin(content-box/padding-box/border-box) background-size background-repeat
3. word-wrap（对长的不可分割单词换行）word-wrap：break-word
4. 文字阴影：text-shadow： 5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）
5. font-face 属性：定义自己的字体
6. 圆角（边框半径）：border-radius 属性用于创建圆角
7. 边框图片：border-image: url(border.png) 30 30 round
8. 盒阴影：box-shadow: 10px 10px 5px #888888
9. 媒体查询：定义两套 css，当浏览器的尺寸变化时会采用不同的属性

## 5、flexbox（弹性盒布局模型）,以及适用场景？

**适用场景：**弹性布局适合于移动前端开发，在 Android 和 ios 上也完美支持。

**flexbox 布局模型：**目的是提供一种更加高效的方式来对容器中的条目进行布局、对齐和分配空间。

[flex 小游戏](https://flexboxfroggy.com/)

### 容器属性（6 个）

1. **flex-direction 规定主轴方** column | column-reverse | row | row-reverse
2. **flex-wrap 是否换行** nowrap | wrap | wrap-reverse（换行，第一行在下方）
3. **flex-flow** 是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap
4. **justify-content 主轴对其方式** flex-start | flex-end | center | space-between(两端对齐，项目之间的间隔都相等。) | space-around(每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍)
5. **align-items 侧轴对其方式** flex-start | flex-end | center | baseline(项目的第一行文字的基线对齐) | stretch(如果项目未设置高度或设为 auto，将占满整个容器的高度)
6. **align-content 定义了多根轴线的对齐方式** flex-start | flex-end | center | space-between | space-around | stretch

### 元素属性(项目的属性)（6 个）

1. order 顺序越小，排位越靠前，默认为 0
2. flex-grow 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大
3. flex-shrink 定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小
4. flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间
5. flex flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto
6. align-slef 允许单个项目有与其他项目不一样的对齐方式 auto | flex-start | flex-end | center | baseline | stretch > 除了 auto，其他都与 align-items 属性完全一致

**容器属性：**justify-content(主轴对齐方式),align-items（侧轴对齐方式）,align-content（交叉轴对齐方式）,flex-direction（主轴方向）,flex-wrap（是否换行）,flex-flow（flex-wrap | flex-direction ）

**元素属性：**order(排序),align-slef（元素对齐方式）,flex-grow（放大比例）,flex-basis（主轴占据空间）,flex-shrink（缩小比例）,flex（flex-basis | flex-shink | flex-basis）

## 6、常见的兼容性问题？

1. 不同浏览器的标签默认的 margin 和 padding 不一样。

   \*{margin:0;padding:0;}

2. IE6 双边距 bug：块属性标签 float 后，又有横行的 margin 情况下，在 IE6 显示 margin 比设置的大。hack：display:inline;将其转化为行内属性。

3. 渐进识别的方式，从总体中逐渐排除局部。首先，巧妙的使用“9”这一标记，将 IE 浏览器从所有情况中分离出来。接着，再次使用“+”将 IE8 和 IE7、IE6 分离开来，这样 IE8 已经独立识别。

   ```css
    {
     background-color: #f1ee18; /*所有识别*/
     .background-color: #00deff\9; /*IE6、7、8识别*/
     +background-color: #a200ff; /*IE6、7识别*/
     _background-color: #1e0bd1; /*IE6识别*/
   }
   ```

4. 设置较小高度标签（一般小于 10px），在 IE6，IE7 中高度超出自己设置高度。hack：给超出高度的标签设置 overflow:hidden;或者设置行高 line-height 小于你设置的高度。

5. IE 下，可以使用获取常规属性的方法来获取自定义属性,也可以使用 getAttribute()获取自定义属性；Firefox 下，只能使用 getAttribute()获取自定义属性。解决方法:统一通过 getAttribute()获取自定义属性。

6. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。

7. 超链接访问过后 hover 样式就不出现了，被点击访问过的超链接样式不再具有 hover 和 active 了。解决方法是改变 CSS 属性的排列顺序:L-V-H-A ( love hate ): a:link {} a:visited {} a:hover {} a:active {}

## 7、为什么要初始化 CSS 样式

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对 CSS 初始化往往会出现浏览器之间的页面显示差异。

## 8、absolute 的 containing block 计算方式跟正常流有什么不同？

## 9、display:none，opacity=0 与 visibility：hidden 的区别？

1. opacity=0,元素隐藏，不改变布局，如果该元素绑定了事件，那么，点击该区域，也能触发事件（重绘）
2. display:none，把元素隐藏起来，改变布局，`相当于直接删除了该元素`（回流+重绘）
3. visibility=hidden，将元素隐藏起来，不改变布局，但点击该区域，不触发事件（重绘）

## 10、position 跟 display、float 这些特性相互叠加后会怎么样？

1. display 属性规定元素应该生成的框的类型；

2. position 属性规定元素的定位类型；

3. float 属性是一种布局方式，定义元素在哪个方向浮动。

**类似于优先级机制：**

1. position：absolute/fixed 优先级最高，有他们在时，float 不起作用，display 值需要调整。float 或者 absolute 定位的元素，只能是块元素或表格
2. position:relative 和 float 同时设置，都会生效

<font color="red">设置元素 position：absolute/fixed 时，该元素的 display 会自动变成 block。position：relative/static 不改变 display 属性</font>

## 11、为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？

浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上。
浮动带来的问题：

1. 父元素的高度无法被撑开，影响与父元素同级的元素
2. 与浮动元素同级的非浮动元素（内联元素）会跟随其后
3. 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

清除浮动的方式：

1. 父级 div 定义 height
2. 最后一个浮动元素后加空 div 标签 并添加样式 clear:both。
3. 包含浮动元素的父标签添加样式 overflow 为 hidden 或 auto。
4. 使用伪元素:after 清除浮动

```html
//方法一 
// 使用伪元素:after清除浮动 
//定义元素前后的生成内容，这里是定义元素后的空内容 
p { width: 50%; } .wrapper {
background-color: #ededed; } .black { float: left; } .wrapper::after { display:
block; content: ""; clear: both; }
<div class="wrapper">
  <p class="black">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus sit amet
    diam. Duis mattis varius dui. Suspendisse eget dolor.
  </p>
</div>

//方法二 
// 使用额外的标签clear:both
//在浮动元素下面添加一个空标签，在这个标签中设置clear：both； 
p { width: 50%; }
.wrapper { background-color: #ededed; } .black { float: left; } .right { clear:
both; }

<div class="wrapper">
  <p class="black">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus sit amet
    diam. Duis mattis varius dui. Suspendisse eget dolor.
  </p>
  <p class="right"></p>
</div>

//方法三 
// 使用overflow：hidden属性 
//父元素定义overflow:hidden，此时，浏览器会自动检查浮动区域的高度； 
p { width:
50%; } .wrapper { background-color: #ededed; overflow: hidden; } .black { float:
left; }

<div class="wrapper">
  <p class="black">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus sit amet
    diam. Duis mattis varius dui. Suspendisse eget dolor.
  </p>
</div>
```

## 12、**什么是响应式设计？响应式设计的基本原理是什么**？移动端的布局媒体查询

**响应式网站设计**是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。
**基本原理**是通过媒体查询检测不同的设备屏幕尺寸做处理。
页面头部必须有 meta 声明的 viewport。

```html
<meta
  name="’viewport’"
  content="”width"
  ="device-width,"
  initial-scale="1."
  maximum-scale="1,user-scalable"
  ="no”"
/>
```

## 13、CSS 优化、提高性能的方法有哪些？

1. 避免过度约束
2. 避免后代选择符
3. 避免链式选择符
4. 使用紧凑的语法
5. 避免不必要的命名空间
6. 避免不必要的重复
7. 最好使用表示语义的名字。一个好的类名应该是描述他是什么而不是像什么
8. 避免！important，可以选择其他选择器
9. 尽可能的精简规则，你可以合并不同类里的重复规则

## 14、浏览器是怎样解析 CSS 选择器的？

CSS 选择器的解析是从右向左解析的。若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。
而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 Render Tree。

## 15、margin 和 padding 分别适合什么场景使用？

何时使用 margin：

1. 需要在 border 外侧添加空白
2. 空白处不需要背景色
3. 上下相连的两个盒子之间的空白，需要相互抵消时。

何时使用 padding：

1. 需要在 border 内侧添加空白
2. 空白处需要背景颜色
3. 上下相连的两个盒子的空白，希望为两者之和。

兼容性的问题：在 IE5 IE6 中，为 float 的盒子指定 margin 时，左侧的 margin 可能会变成两倍的宽度。通过改变 padding 或者指定盒子的 display：inline 解决。

## 16、元素竖向的百分比设定是相对于容器的高度吗？

当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属性，例如 padding-top , padding-bottom , margin-top , margin-bottom 等，当按百分比设定它们时，依据的也是父容器的宽度，而不是高度。

- 行内元素设置 padding,margin 在垂直方向都无效，不产生边距效果，即不影响布局
- 对于普通元素，margin,padding 的百分比值，无论水平方向还是垂直方向，都是相对于容器宽度计算的
- 绝对定位元素，百分比值相对于第一个定位祖先元素（relative/adsolute/fixed）的宽度计算的

## 17、你对 line-height 是如何理解的？

行高是指一行文字的高度，具体说是两行文字间基线的距离。CSS 中起高度作用的是 height 和 line-height，没有定义 height 属性，最终其表现作用一定是 line-height。
单行文本垂直居中：把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中，其实也可以把 height 删除。
多行文本垂直居中：需要设置 display 属性为 inline-block。

## 18、怎么让 Chrome 支持小于 12px 的文字？

```css
p {
  font-size: 10px;
  -webkit-transform: scale(0.8);
} //0.8是缩放比例
```

## 19、如果需要手动写动画，你认为最小时间间隔是多久，为什么？

多数显示器默认频率是 60Hz，即 1 秒刷新 60 次，所以理论上最小间隔为 1/60＊1000ms ＝ 16.7ms。

## 20、li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

行框的排列会受到中间空白（回车空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为 0，就没有空格了。
解决方法：

1. 可以将<li>代码全部写在一排
2. 浮动 li 中 float：left
3. 在 ul 中用 font-size：0（谷歌不支持）；可以使用 letter-space：-3px

## 21、display:inline-block 什么时候会显示间隙？

1. 有空格时候会有间隙 解决：移除空格
2. margin 正值的时候 解决：margin 使用负值
3. 使用 font-size 时候 解决：font-size:0、letter-spacing、word-spacing

## 22、父 div 高度可变，子 div 一个定高 100px，另一个高度始终填满剩余的父 div 空间

```html
 <style>
      * {
        margin: 0;
        padding: 0;
      }
      .content {
        width: 500px;
        height: 100vh;
        margin: auto;
        background-color: tomato;
        position: relative;
      }
      .one {
        height: 100px;
        background-color: teal;
      }
      .two {
        position: absolute;
        top: 100px;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: thistle;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <div class="one"></div>
      <div class="two"></div>
    </div>
  </body>
```

## 23、png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过 webp？

1. png 是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。
2. jpg 是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在 www 上，被用来储存和传输照片的格式。
3. gif 是一种位图文件格式，以 8 位色重现真色彩的图像。可以实现动画效果.
4. webp 格式是谷歌在 2010 年推出的图片格式，压缩率只有 jpg 的 2/3，大小比 png 小了 45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和 opera 支持。

## 24、style 标签写在 body 后与 body 前有什么区别？

页面加载自上而下 当然是先加载样式。
写在 body 标签后由于浏览器以逐行方式对 HTML 文档进行解析，当解析到写在尾部的样式表（外联或写在 style 标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在 windows 的 IE 下可能会出现 FOUC 现象（即样式失效导致的页面闪烁问题）

## 25、CSS 属性 overflow 属性定义溢出元素内容区的内容会如何处理

- scroll 必会出现滚动条。
- auto 子元素内容大于父元素时出现滚动条。
- visible 溢出的内容出现在父元素之外。
- hidden 溢出隐藏。

## 26、阐述一下 CSS Sprites

将一个页面涉及到的所有图片都包含到一张大图中去，然后利用 CSS 的 background-image，background- repeat，background-position 的组合进行背景定位。

利用 CSS Sprites 能很好地减少网页的 http 请求，从而大大的提高页面的性能；

CSS Sprites 能减少图片的字节。

## 27、介绍一下标准的 CSS 的盒子模型？与低版本 IE 的盒子模型有什么不同的？box-sizing 属性？

**标准盒子模型：**宽度=内容的宽度（content）+ border + padding + margin
**低版本 IE 盒子模型：**宽度=内容宽度（content+border+padding）+ margin

用来控制元素的盒子模型的解析模式，默认为 content-box
context-box：W3C 的标准盒子模型，设置元素的 height/width 属性指的是 content 部分的高/宽
border-box：IE 传统盒子模型。设置元素的 height/width 属性指的是 border + padding + content 部分的高/宽

## 28、 link 标签和 import 标签的区别？

1. 种类，link 时 HTML 的标签，@import 时 CSS 提供的方式

   ```html
   //link语法
   <link rel="stylesheet" href="路径" />

   //import语法
   <style type="text/css">
     @import url(CSS文件路径地址);
   </style>
   ```

2. 加载顺序，link 在页面加载时被加载，@import 在页面全下载完之后在加载

3. 兼容性，link 是 html 标签，没有兼容性，@import 只有 ie5 以上才能支持

4. link 方式样式权重高于@import

5. 相同点：都是外部引用CSS的方式

## 29、了解重排和重绘吗，怎么减少重排和重绘，怎么让文档脱离文本流 ？

重绘的定义：浏览器将受到影响的部分重新绘制在屏幕上的过程。
重排的定义：DOM 的变化影响到了预算内存的几何属性比如宽高，浏览器重新计算元素的几何属性，其他元素的几何属性也会受到影响，浏览器需要重新构造渲染页面的过程。

**造成重排和重绘的原因：**

1. 添加或者删除可见的 DOM 元素

2. 元素尺寸位置的改变

3. 浏览器页面初始化

4. 浏览器窗口大小发生改变，重排一定导致重绘，重绘不一定导致重排

**减少重绘重排的方法**

1. 不在布局信息改变时做 DOM 查询
2. 使用 csstext,className 一次性改变属性

3. 使用 fragment
4. 对于多次重排的元素，比如说动画。使用绝对定位脱离文档流，使其不影响其他元素

**让文档脱离文档流有哪些方法**

- float
- absolute
- fixed

## 30、z-index 的定位方法

我们已经知道固定定位(fixed)和绝对定位(absolute)可以让盒子浮起来

相对定位(relactive)虽然不能让盒子浮起来，但也是可以让图层浮起来

那么既然大家都可以浮起来，就会存在一个问题：

最外层到底显示谁的问题？

在这里我先说一下兄弟盒子的概念

父级盒子在同一个盒子里，并且父级盒子都是（没定位或者是相对定位）

问题答案分成 3 种情况：

1、同一个父级盒子里，依据排序和 z-index 区分

都在同一个父级盒子里，三种定位的图层显示关系

根据在主体区的位置区分：谁的代码在后面，就显示在上面

并且也可以根据 z-index 来调整谁显示在外面

z-index 大的显示在外面

2、不在同一父级盒子，但是父级盒子属于兄弟盒子，也是依据排序和 z-index 区分

不在同一个父级盒子里，但是父级盒子还是属于兄弟盒子

也就是说父级盒子都是（没定位或者是相对定位）

那么还是根据谁代码在后面谁显示在上面

也可以根据 z-index 来改变显示关系

3、不在同一父级盒子，父级盒子也不属于兄弟盒子，显示依据父级盒子的显示来显示，z-index 不起作用

不在同一个父级盒子里，父级盒子已经不是兄弟盒子

也就是说父级盒子被抠出来了（固定定位或者绝对定位）

只要是对面的父级显示在你的父级上面

那么不管你怎么调整 z-index，你始终显示在他的下面
