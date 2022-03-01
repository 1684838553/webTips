### 1. 边框

+ 半透明边框

```css
 border: 10px solid rgba(0, 0, 0, 0.2);
```
> 透明边框，边框虽然看不到，但边框还是存在，对布局有影响

+ 多重边框

`box-shadow`: 支持逗号分隔语法，可以创建任意数量的投影。
```css
border: 10px solid rgba(0, 0, 0, 0.2);
background-color: white;
box-shadow: 0 0 0 10px #655, 0 0 0 15px deeppink;
```
> 投影的行为跟边框不完全一致，因为它不会影响布局，而且也不会受到 box-sizing 属性的影响

+ outline

通过 `outline-offset` 属性来控制它跟元素边缘之间的间距，这个属性甚至可以接受负值

```css
 outline: 5px solid yellow;
 outline-offset: 10px;
```

### 2. 灵活的背景定位

+ background

```css
 background: url(pear.svg) no-repeat #58a;
 background-position: right 20px bottom 10px;
 background-origin：content-box;
```

> no-repeat 不填充 ， #58a 背景色
> 
> background-position 在偏移量前面指定关键字
>
> background-origin:contenet-box / border-box; 在 background-position 属
性中使用的边角关键字将会以background-origin属性值的边缘作为基准

+ calc()

### 3. 边框内圆角

```css
background: tan;
border-radius: .8em;
padding: 1em;
box-shadow: 0 0 0 .6em #655;
outline: .6em solid #655;
```
> `outline`不会跟着元素的圆角走（故而显示直角），`box-shadow`会跟着元素圆角走，`box-shadow` 会刚好填补描边和容器圆角之间的空隙

### 4、条纹背景

+ background-size 调整背景尺寸

```css
/* 水平条纹 linear-gradient第二个色标位置值为0，那它的位置会被浏览器调整为前一个色标的值 */
background: linear-gradient(#fb3 30%, #58a 70%);
background-size: 100% 100px;

/* 垂直条纹 to right */
background: linear-gradient(to right, #fb3 50%, #58a 0);
background-size: 30px 100%;

/* 斜向条纹 45deg */
background: linear-gradient(45deg, #fb3 50%, #58a 0);
background-size: 30px 30px;
```
