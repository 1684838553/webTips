## 介绍一下标准的 CSS 的盒子模型？与低版本 IE 的盒子模型有什么不同的？

1. 标准盒子 content-box = content+padding + margin+border
2. ie 盒子 border-box = content(content+padding + border) + margin

## box-sizing

设置盒子类型，border-box 和 content-box

## CSS 选择器有哪些？哪些属性可以继承？（不清晰）

1.  id 选择器
2.  类选择器
3.  标签选择器
4.  相邻元素选择器
5.  子选择器
6.  后代选择器
7.  伪类选择器
8.  通配属选择器
9.  属性选择器

font 开头的属性，颜色，透明度 opacity

## CSS 优先级算法如何计算？

1. id 100
2. class 10
3. 元素标签 1000
4. 元素 1

## CSS3 新增伪类有那些?（不清晰）

1. last-of-tyoe
2. first-of-type
3. nth-child()
4. only-child
5. only-of-type

## 如何居中 div？如何居中一个浮动元素？如何让绝对定位的 div 居中？

## display 有哪些值？说明他们的作用?

1. none 隐藏
2. block 块元素
3. inline-block
4. inline 内联
5. table-cell 表格
6. list-item

## position 的值？

1. static 默认
2. relative 相对自身定位，不脱离文档流
3. absolute 绝对定位（相对最近的父定位元素或视口），脱离文档流
4. fiexd 固定定位（相对于视口），脱离文档流
5. sticky 粘性定位（相对最近滚动父元素或块级父元素），不脱离文档流

## CSS3 有哪些新特性？（不清晰）

RGBA 和透明度
background-image background-origin(content-box/padding-box/border-box) background-size background-repeat
word-wrap（对长的不可分割单词换行）word-wrap：break-word
文字阴影：text-shadow： 5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）
font-face 属性：定义自己的字体
圆角（边框半径）：border-radius 属性用于创建圆角
边框图片：border-image: url(border.png) 30 30 round
盒阴影：box-shadow: 10px 10px 5px #888888
媒体查询：定义两套 css，当浏览器的尺寸变化时会采用不同的属性

## 请解释一下 CSS3 的 flexbox（弹性盒布局模型）,以及适用场景？

弹性布局即伸缩盒布局，适合在移动端使用

容器上的属性

1. flex-direction
2. flex-wrap
3. flex-flow
4. jusitify-content
5. align-items
6. align-content

元素上的属性

1. order
2. flex-grown
3. flex-shrink
4. flex-basis
5. flex
6. align-self

## 用纯 CSS 创建一个三角形的原理是什么？

设置元素高和宽为 0，设置边框样式

width:0;
heighe:0;
border-right:30px solid transparent;
border-left:30px solid transparent;
border-bottom:30px solid red;

## css 常见的兼容性问题

## 样式为什么要初始化

因为浏览器的兼容性问题，不同浏览器默认样式不同，为了达到页面统一

## absolute 的 containing block 计算方式跟正常流有什么不同

## display:none 与 visibility：hidden 的区别？

1. display:none 隐藏元素，不占据原有空间(回流和重绘)
2. visibility:hidden 隐藏元素，占据原有空间（重绘）

## position 跟 display、overflow、float 这些特性相互叠加后会怎么样

## 对 BFC 规范(块级格式化上下文：block formatting context)的理解

1.  BFC 是有绝对定位元素，浮动元素，非块元素的块级元素以及 overflow 不为 hidden 的块级盒子，形成的一个 bfc

2.  触发条件

    - position 为 absolute 或 fixed
    - display 为 inline-block,table-cell，flex,inline-flex
    - overflow不为visible
    - 根元素

3. BFC特性

    - BFC形成的区域不受外界的影响
    - BFC中浮动元素也参与高度计算
    - BFC内部元素会发生margin重叠
    - BFC不受浮动元素影响

4. 解决问题

    - margin重叠问题，在同一个BFC内部元素发生margin重叠，相邻BFC不发生margin重叠
    - 高度塌陷问题，BFC中浮动元素也参与高度计算
    - 避免元素被浮动元素覆盖
