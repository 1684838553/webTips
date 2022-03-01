## 题目：flex 的 flex 属性的伸缩长度如何计算？

[聊聊 Flexbox 布局中的 flex 的演算法](https://segmentfault.com/a/1190000017115802)

### 一、计算步骤(放大系数之和大于 1)：

```html
<style>
  #flexul {
    display: flex;
    width: 750px;
  }
  #flexul li {
    list-style-type: none;
  }
  .one {
    width: 50px;
    background: red;
    flex: 1 1 0%;
  }
  .two {
    width: 80px;
    background: green;
    flex: 2 1 auto;
  }
  .three {
    width: 50px;
    background: yellow;
    flex: 1 1 0%;
  }
  .four {
    background: blue;
    flex: 2 1 200px;
  }
</style>

<ul id="flexul">
  <li class="one">第一个li</li>
  <li class="two">我是第二个li</li>
  <li class="three">的第三个li</li>
  <li class="four">布局中的第四个li</li>
</ul>
```

##### 1、主轴的父容器的尺寸：750px;

子元素的总基准：0% + auto + 0% + 200px = 0 + 80 + 0 + 200 = 280px;

0% 即宽度是 0；auto 对应主尺寸。

剩余的空间：750 - 280 = 470；

##### 2、伸缩放大系数和：

1+2+1+2 = 6；

剩余空间的分配：470\*（1/6）= 78.3

470\*(2/6)=156.6

##### 3、各项目的最终宽度：

0+78.3 = 78.3

80+156.6 = 236.6

0+78.3 = 78.3

200+156.6=356.6



### 二、计算步骤(放大系数之和小于 1)：

```html
<style>
  #flexul {
    display: flex;
    width: 750px;
  }
  #flexul li {
    list-style-type: none;
  }
  .one {
    width: 50px;
    background: red;
    flex: 0.1 1 0%;
  }
  .two {
    width: 80px;
    background: green;
    flex: 0.2 1 auto;
  }
  .three {
    width: 50px;
    background: yellow;
    flex: 0.1 1 0%;
  }
  .four {
    background: blue;
    flex: 0.2 1 200px;
  }
</style>

<ul id="flexul">
  <li class="one">第一个li</li>
  <li class="two">我是第二个li</li>
  <li class="three">的第三个li</li>
  <li class="four">布局中的第四个li</li>
</ul>
```

##### 1、主轴的父容器的尺寸：750px;

子元素的总基准：0% + auto + 0% + 200px = 0 + 80 + 0 + 200 = 280px;

0% 即宽度是 0；auto 对应主尺寸。

剩余的空间：750 - 280 = 470；

##### 2、伸缩放大系数和：

0.1+0.2+0.1+0.2 = 0.6 < 1

##### 3、各项目的最终宽度：

0+470*0.1 = 47

80+470*0.2 = 174

0+470*0.1 = 47

200+470*0.2= 294



### 三、计算步骤(缩小系数之和大于 1)：

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  li {
    list-style-type: none;
  }
  .ul1 {
    width: 750px;
    display: flex;
  }
  .one1 {
    background-color: aqua;
    flex: 1 1 150px;
  }
  .two1 {
    flex: 1 2 350px;
    background-color: yellowgreen;
  }
  .three1 {
    flex: 1 3 400px;
    background-color: tomato;
  }
</style>
<ul class="ul1">
  <li class="one1">第一个li</li>
  <li class="two1">我是第二个li</li>
  <li class="three1">的第三个li</li>
</ul>
```

##### 1、主轴的父容器的尺寸：750px;

子元素的总基准：150px + 350px + 400px = 900px

不足空间：900-750 = 150px

##### 2、伸缩放大系数和：

1+2+3 = 6；

**权重**：150  * 1+350 *  2 + 400 \* 3 = 2050

分别收缩

150（不足空间）*1 *150（flex-basis）/2050(权重) = 11

150（不足空间）*2 *350（flex-basis）/2050(权重) = 51.2

150（不足空间）*3 *400（flex-basis）/2050(权重) = 87.8

##### 3、各项目的最终宽度：

150-11 = 139

350 - 51.2 = 298.8

400 - 109.8 = 312.2



### 四、计算步骤(缩小系数之和小于 1)：

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  li {
    list-style-type: none;
  }
  .ul1 {
    width: 750px;
    display: flex;
  }
  .one1 {
    background-color: aqua;
    flex: 1 0.1 150px;
  }
  .two1 {
    flex: 1 0.2 350px;
    background-color: yellowgreen;
  }
  .three1 {
    flex: 1 0.3 400px;
    background-color: tomato;
  }
</style>
<ul class="ul1">
  <li class="one1">第一个li</li>
  <li class="two1">我是第二个li</li>
  <li class="three1">的第三个li</li>
</ul>
```

##### 1、主轴的父容器的尺寸：750px;

子元素的总基准：150px + 350px + 400px = 900px

不足空间：900-750 = 150px

##### 2、伸缩放大系数和：

0.1+0.2+0.3 = 0.6；

  缩放大小 150px * 0.6 = 90px

权重 0.1 * 150  + 0.2 * 350 + 0.3 * 400 = 205  

分别收缩

90（缩放大小）*0.1 *150（flex-basis）/205(权重) = 6.6

90（缩放大小）*0.2 *350（flex-basis）/205(权重) = 30.7

90（缩放大小）*0.3 *400（flex-basis）/205(权重) = 52.7

##### 3、各项目的最终宽度：

150-6.6 = 143.4

350 - 30.7 = 319.3

400 - 52.7= 347.3
