## 介绍一下标准的 CSS 的盒子模型？与低版本 IE 的盒子模型有什么不同的？

1. 标准盒子 content-box = content+padding + margin+border
2. ie 盒子 border-box = content(content+padding + border) + margin

## box-sizing

设置盒子类型，border-box 和 content-box

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

## [伪元素和伪类的区别](https://github.com/1684838553/webTips/blob/master/CSS/CSS%E4%BC%AA%E5%85%83%E7%B4%A0%E5%92%8C%E4%BC%AA%E7%B1%BB.md)

1. 伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如，`:before`

2. 伪类用于某个元素处于某种状态，为其添加对应样式，该状态是根据用户行为而动态变化。`:link :visited :hover :active :focus`

3. **本质上一个是元素，一个是类**

## ::after 和::before 的区别是什么

1. `::after`在被选元素的内容之后插入内容

2. `::before`在被选元素的内容之前插入内容

3. 默认，两者都是行内元素，但是可以使用 display 改变这一点

4. 两者都是某元素的兄弟节点

## CSS 有哪些单位

`px , % , em , rem , vw , vh `

任意浏览器的默认字体大小都是16px，所以在浏览器字体大小保持默认的状态下

em和rem都是相对长度单位，不同的是em是相对于父级元素的字体尺寸，而rem只相对于HTML的根元素。

特点：

1. px 绝对单位，页面按精确像素展示

2. em 相对单位，基准点为父节点字体的大小

3. rem 相对单位，相对根节点html的字体大小来计算

4. vh vw 相对于页面市口来计算

## 防抖和节流怎么实现

## 什么是 1px 像素问题，怎么解决

`多倍的设计图设计了1px的边框，在手机上缩小呈现时，由于CSS只支持显示1px大小，导致边框太粗的效果`

- 解决方法：`transform:scale(0.5)`

## 居中为什么使用 transform,而不是 margin

在浏览器渲染时，`margin`会引起页面的回流和重绘，而`transform`却不会。`transform`比`margin`更省时间

## SEO

`SEO`是搜索引擎优化；利用搜索引擎的规则，提高网站在有关搜索引擎内的自然排名。`目的是`，为网站提供生态式的自我营销解决方案，让其在行业内占据领先地位，获得品牌收益

1. 合理地title，description，keywords

2. 语义化html代码

3. 重要的HTML代码放在前面

4. 重点内容不要用js输出，爬虫不会执行js获取内容

5. 少用iframe,搜索引擎不会抓取iframe中的内容

6. 非装饰性图片必须要加alt

## 禁止移动端缩放

`<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=0">`

## 实现单行／多行文本溢出的省略样式

1. 单行文本溢出

 ```css
 overflow: hidden;
 width:400px;
 text-overflow: ellipsis;
 white-space: nowrap;
 ```
2. 多行文本溢出
 ```css
 width: 400px;
 -webkit-line-clamp: 2;
 display: -webkit-box;
 -webkit-box-orient: vertical;
 overflow: hidden;
 text-overflow: ellipsis;
 ```


 
