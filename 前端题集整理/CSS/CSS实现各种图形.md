# CSS 实现各种图形

### 1、三角形

[css 实现各种图形](https://www.webhek.com/post/40-css-shapes.html)

**三角形实现原理：**

1. 宽度 width 为 0；height 为 0；
2. 有一条横竖边（上下左右）的设置为 border-方向：长度 solid red，这个画的就是底部的直线。其他边使用 border-方向：长度 solid transparent。
3. 有两个横竖边（上下左右）的设置，若斜边是在三角形的右边，这时候设置 top 或 bottom 的直线，和右边的斜线。若斜边是在三角形的左边，这时候设置 top 或 bottom 的直线，和左边的斜线。

```css
#triangle-up {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}

//transparent 透明色

#triangle-topright {
  width: 0;
  height: 0;
  border-top: 100px solid red;
  border-left: 100px solid transparent;
}
```

### 2、正方形

```css
//方法一
.squre {
  width: 50%;
  height: 50vw;
  background: #ccc;
}
//方法二
.squre1 {
  width: 20%;
  /* padding百分比相对父元素宽度计算 */
  padding-bottom: 20%;
  /* 避免被内容撑开多余的高度 */
  height: 0;
  background-color: burlywood;
}
```

### 3、0.5px 的直线

```css
//方法一
.line {
  border-bottom: 1px solid black;
  transform: scaleY(0.5);
}
//方法二
.line {
  height: 1px;
  background: -webkit-linear-gradient(90deg, #000 50%, transparent 50%);
}
```

### 4、不用 border，实现 1px 高的线

```css
.one{
   height: 1px;
   background-color: tomato;
}

<div class="one"></div>
```
