### float:left对比position:absolute

相同点：

- 脱离文档流，也就是将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位。

- 包裹性：也就是都会让元素

  ```
  inline-block
  ```

  化。等同于没有高度与宽度的

  ```
  inline-block
  ```

  元素。

  - 对于块状元素默认的宽度为`100%`，若设置为了绝对定位则宽度由内容决定
  - 对于内联元素原本设置`width`属性无效，若设置了浮动则可以设置`width`值

- 破坏性：都会导致父级高度塌陷。但若是设置了绝对定位的话，其父级即使设置为`float:left;`也还是不能解决高度塌陷的问题。

不同点：

- 虽然它们都会脱离文档流，但是使用`float`脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。而对于使用`position:absolute`脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。

### float:left对比inline-block

- **文档流**：浮动会脱离文档流，且使得被覆盖的元素的文字内容会环绕在周围；而`inline-block`不会脱离文档流也就不会覆盖其它元素。浮动也会引发父级高度塌陷问题。
- **水平位置**：不能给有浮动元素的父级设置`text-align:center`使得子集浮动元素居中，而`inline-block`却可以。
- **垂直对齐**：`inline-block`元素沿着默认的基线对齐(`baseline`)，若是两个元素的`font-size`不同则可能会看到一高一低，你可以通过设置`vertical-align: top或者bottom;`来使得它们基于顶线或者底线对齐(注意这个是设置到元素本身而不是设置到它们的父级)。而浮动元素紧贴顶部，不会有这个问题。
- **空白**：`inline-block`包含`html`空白节点。如果你的`html`中一系列元素每个元素之间都换行了，当你对这些元素设置`inline-block`时，这些元素之间就会出现空白。而浮动元素会忽略空白节点，互相紧贴。

针对第三点，垂直对齐可以看下面👇这个案例：

默认情况下：

*css代码为：*

```
.sub {
  background: hotpink;
  display: inline-block;
}
```

设置了`vertial-align: top;`后：

*css代码为：*

```
.sub {
  background: hotpink;
  display: inline-block;
  vertical-align: top;
}
```



### 如何解决inline-block空白问题？

原本的代码为：

```
<style>
.sub {
  background: hotpink;
  display: inline-block;
}
</style>
<body>
  <div class="super">
    <div class="sub">
      孩子
    </div>
    <div class="sub">
      孩子
    </div>
    <div class="sub">
      孩子
    </div>
  </div>
</body>
```

效果为：

图片1

可以看到每个`孩子`之间都会有一个空白。`inline-block`元素间有空格或是换行，因此产生了间隙。

解决办法：

- **(1) 删除html中的空白**：不要让元素之间换行：

  ```
  <div class="super">
    <div class="sub">
      孩子
    </div><div class="sub">
      孩子
    </div><div class="sub">
      孩子
    </div>
  </div>
  ```

- **(2) 设置负的边距**：你可以用负边距来补齐空白。但你需要调整`font-size`，因为空白的宽度与这个属性有关系。例如下面这个例子：

  ```
  .sub {
    background: hotpink;
    display: inline-block;
    font-size:16px;
    margin-left: -0.4em;
  }
  ```

- **(3) 给父级设置font-size: 0**：不管空白多大，由于空白跟`font-size`的关系，设置这个属性即可把空白的宽度设置为0。但是如果你的子级有字的话，也得单独给子级设置字体大小。

- **(4) 注释**：

  ```
  <div class="super">
    <div class="sub">
      孩子
    </div><!--
    --><div class="sub sub2">
      孩子
    </div><!--
    --><div class="sub">
      孩子
    </div>
  </div>
  ```

### 脱离文档流是不是指该元素从DOM树中脱离?

并不会，DOM树是HTML页面的层级结构，指的是元素与元素之间的关系，例如包裹我的是我的父级，与我并列的是我的兄弟级，类似这样的关系称之为层级结构。

而文档流则类似于排队，我本应该在队伍中的，然而我脱离了队伍，但是我与我的父亲，兄弟，儿子的关系还在。

### relative的定位规则

- 相对于该元素在文档中的初始位置进行定位。通过 “left”、”top”、”right” 以及 “bottom” 属性来设置此元素相对于自身位置的偏移。
- 如果他原来在常规流的默认位置改变了，那他也会跟着变位置，永远围着整个body自己原来的那一小块老地方转。所以说相对定位没有脱离文档流。

### 脱离文档流是会呈现什么样的效果呢？

脱离文档流，也就是**将元素从普通的布局排版中拿走**，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位。

而在`CSS`中，使用`float`和设置`position:absolute`都会使得元素脱离文档流。只不过它两的区别是：

使用`float`脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。而对于使用`position:absolute`脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。

### 常规流(文档流)是个怎样的排列关系

将窗体自上而下分成一行一行,并在每行中按从左至右的挨次排放元素。

### inline-block的使用场景

1. 要设置某些子元素在一行或者多行内显示，尤其是排列方向一致的情况下，应尽量用`inline-block`。
2. 希望若干个元素平行排列，且在父元素中居中排列，此时可以用`inline-block`，且给父元素设`text-align: center`。
3. `inline-block`可以用一排`a {display: inline-block}`实现横向导航栏，无论是居左的导航栏还是居右的都适用。

对于第一种和第三种情况虽然都可以使用`float`来实现，不过`inline-block`会比它好一些，原因如下：

- 浮动会脱离文档流，导致父元素高度塌陷

### 设置了绝对定位的元素相对于谁进行定位？

绝对定位元素相对的元素是它**最近的一个祖先，该祖先满足：position的值必须是：relative、absolute、fixed，若没有这样的祖先则相对于body进行定位**。偏移值由其top、bottom、left、right值确定。

(绝对定位常见误区：我们之前总是听到的答案是绝对定位的盒子是相对于离它最近的一个设置为`relative`的盒子进行定位的，其实这是不对的，应该说是**相对于离它最近的一个已定位的盒子进行定位**；只不过我们实际开发中总是用`relative`配合`absolute`来用，所以就让我们潜意识的认为是前一种答案)

### 绝对定位的元素决定其定位的父级如果设置了padding或者border它是怎样定位的？

如果祖先元素是块级元素：

- `border`会影响子级的定位
- `padding`不会影响

```html
<style>
  body, html {
    margin: 0;
    height: 100%;
  }
  .super {
    text-align: right;
    position: relative;
    width: 200px;
    height: 200px;
    background-color: red;
    padding: 50px;
    border: 50px solid yellowgreen;
  }
  .sub {
    position: absolute;
    background-color: royalblue;
    width: 100px;
    height: 100px;
    top: 10px;
    left: 10px;
  }
</style>
<body>
  <div class="super">
    我是父级
    <div class="sub">
      我是子级
    </div>
  </div>
</body>

```

### 绝对定位和非绝对定位时元素的宽高百分比是如何计算的？

- 绝对定位的元素其宽高的百分比是相对于父级的`padding-box`计算的
- 非绝对定位的元素则是相对于父级的`content-box`计算

如下两个案例：

*案例一：子级为绝对定位元素：*

```
<style>
  body, html {
    margin: 0;
    height: 100%;
  }
  .super {
    text-align: right;
    position: relative;
    width: 200px;
    height: 200px;
    background-color: red;
    padding: 50px;
    border: 50px solid yellowgreen;
  }
  .sub {
    position: absolute;
    background-color: royalblue;
    width: 50%;
    height: 50%;
  }
</style>
<body>
  <div class="super">
    我是父级
    <div class="sub">
      我是子级
    </div>
  </div>
</body>
```

效果：子级宽高为：`(父级的width(200) + 父级的左右padding(100)) / 2 = 150px`

[![img](https://camo.githubusercontent.com/52b5f949617e768068dce537d3d09443f067e6c6c3d7882da832a99106cd87db/68747470733a2f2f6865786f2d626c6f672d313235363131343430372e636f732e61702d7368656e7a68656e2d6673692e6d7971636c6f75642e636f6d2f637373322e706e67)](https://camo.githubusercontent.com/52b5f949617e768068dce537d3d09443f067e6c6c3d7882da832a99106cd87db/68747470733a2f2f6865786f2d626c6f672d313235363131343430372e636f732e61702d7368656e7a68656e2d6673692e6d7971636c6f75642e636f6d2f637373322e706e67)

*案例二：子级为绝对定位元素*

效果：子级宽高为：`父级的width(200) / 2 = 100px`

[![img](https://camo.githubusercontent.com/6d1ead89dd7e7a94d4db7322e9b93d25287a24a32f990f25fcbd05ce4d323f33/68747470733a2f2f6865786f2d626c6f672d313235363131343430372e636f732e61702d7368656e7a68656e2d6673692e6d7971636c6f75642e636f6d2f637373332e706e67)](https://camo.githubusercontent.com/6d1ead89dd7e7a94d4db7322e9b93d25287a24a32f990f25fcbd05ce4d323f33/68747470733a2f2f6865786f2d626c6f672d313235363131343430372e636f732e61702d7368656e7a68656e2d6673692e6d7971636c6f75642e636f6d2f637373332e706e67)

### margin: auto为什么能实现垂直居中?

普通的流体元素它的`margin: auto`的填充规则：

- 若一侧是定值，一侧是`auto`，则`auto`为剩余空间的大小
- 若两侧都为`auto`，则会平分剩余空间

若是我们给普通的块状水平元素设置了`position: absolute`之后，且其对立方向属性同时有具体的数值时，例如设置了`top: 0; bottom: 0;`，流体特性就发生了，此时它就会按普通流体元素的`margin: auto`填充规则来进行填充。所以`margin: auto`可以实现垂直居中。

### line-height为什么可以垂直居中？

可以实现垂直居中的原因是CSS的行距上下等分机制，实际上line-height等于height也只是近似垂直居中，文字会向下偏移1px-2px的距离，但并不容易察觉。

[![img](https://github.com/LinDaiDai/niubility-coding-js/raw/master/2020%E9%9D%A2%E8%AF%95%E7%B3%BB%E5%88%97/resource/css4.png)](https://github.com/LinDaiDai/niubility-coding-js/blob/master/2020面试系列/resource/css4.png)

### position: fixed什么时候会失效？

我们知道，设置了`position: fixed`固定定位属性的元素会脱离文档流，达到“超然脱俗”的境界。 也就是说此时给这种元素设置`top, left, right, bottom`等属性是根据**浏览器窗口**定位的，与其上级元素的位置无关。

但是有一种情况例外：

若是设置了`position: fixed`属性的元素，它的祖先元素设置了`transform`属性则会导致固定定位属性失效。 只要你的`transform`设置的不是`none`，都会影响到`position: fixed`，因为此时就会相对于祖先元素指定坐标，而不是浏览器窗口。

注意，这个特性表现，目前只在Chrome浏览器/FireFox浏览器下有。IE浏览器，包括IE11, `fixed`还是`fixed`的表现。
