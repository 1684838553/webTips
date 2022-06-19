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


## 用纯 CSS 创建一个三角形的原理是什么？

设置元素高和宽为 0，设置边框样式

```javascript
width:0;
heighe:0;
border-right:30px solid transparent;
border-left:30px solid transparent;
border-bottom:30px solid red;
```

## 样式为什么要初始化

因为浏览器的兼容性问题，不同浏览器默认样式不同，为了达到页面统一

## absolute 的 containing block 计算方式跟正常流有什么不同


 
