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

inline（默认）--内联
none--隐藏
block--块显示
table--表格显示
list-item--项目列表
inline-block

## 3、position 的值？

Static(默认) 按照正常文档流进行排列

relative(相对定位) 不脱离文本流，参考自身静态位置进行定位

Relative（相对定位）脱离文本流，参考最近的一个定位元素或视口

fixed（固定定位）参考对象是视口

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
