### grid 布局

[CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
[CSS Grid 完整指南](https://css-tricks.com/snippets/css/complete-guide-grid/)

> Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。

#### 1.重要术语

```html
<div class="container">
  <div class="item"></div>
  <div class="item">
    <p class="sub-item"></p>
  </div>
  <div class="item"></div>
</div>
```

1. 网格容器

   > 应用的元素`display: grid`。它是所有网格项的直接父项。在这个例子中`container`是网格容器。

2. 网格项

   > 网格容器的孩子（即*直接*后代）。这里的`item`元素是网格项，但`sub-item`不是。

3. 网格线

   > 构成网格结构的分界线。它们可以是垂直的（“列网格线”）或水平的（“行网格线”）并且位于行或列的任一侧。这里的黄线是列网格线的一个例子

4. 网格单元

   > 两个相邻行和两个相邻列网格线之间的空间。它是网格的一个“单位”。这是行网格线 1 和 2 以及列网格线 2 和 3 之间的网格单元格。

5. 网格轨道

   > 两条相邻网格线之间的空间。您可以将它们视为网格的列或行。这是第二行和第三行网格线之间的网格轨道。

6. 网格区域

   > 由四条网格线包围的总空间。一个网格区域可以由任意数量的网格单元组成。这是行网格线 1 和 3 以及列网格线 1 和 3 之间的网格区域

#### 2.grid 属性

1. display:grid;

   > 指定一个容器采用网格布局。
   > grid inline-grid(指定容器是行内元素)

2. grid-template-columns 属性，grid-template-rows 属性

   > grid-template-columns 属性 ,定义列宽和列数
   > grid-template-rows 属性，定义行高和行数

   ```css
   .container {
     display: grid;
     grid-template-columns: 33.33% 33.33% 33.33%;
     grid-template-rows: 33.33% 33.33% 33.33%;
   }
   ```

   2.1`repeat`

   可以使用`repeat()`函数，简化重复的值。上面的代码用`repeat()`改写如下。

   ```css
   .container {
     display: grid;
     height: 100vh;
     /* grid-template-columns: 100px 100px 100px;
     grid-template-rows: 100px 100px 100px; */
     grid-template-columns: repeat(3, 33.33%);
     grid-template-rows: repeat(3, 33.33%);
   }
   ```

   <font color="red" >`repeat()`接受两个参数，第一个参数是重复的次数（上例是 3），第二个参数是所要重复的值。</font>

   <font color="red" >repeat()重复某种模式也是可以的。</font>

   ```css
   grid-template-columns: repeat(2, 100px 20px 80px); //定义了6列
   //第一列宽度 100px 第二列 20px 第三列 80px 再往后重复这个宽度
   ```

   2.2 auto-fill 关键字

   ```css
   grid-template-columns: repeat(auto-fill, 100px);
   ```

   单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用`auto-fill`关键字表示自动填充。

   2.3 fr 关键字

   为了方便表示比例关系，网格布局提供了`fr`关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为`1fr`和`2fr`，就表示后者是前者的两倍。

   ```css
   grid-template-columns: 1fr 1fr;
   ```

   `fr`可以与绝对长度的单位结合使用，这时会非常方便。

   ```css
   grid-template-columns: 150px 1fr 2fr;
   //3列 第一列 150px 第二列是第三列的一半
   ```

   2.4 minmax()

   `minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

   ```css
   grid-template-columns: 1fr 1fr minmax(100px, 1fr);
   //列宽最小值100px 最大值 1fr
   ```

   2.5 auto 关键字

   `auto`关键字表示由浏览器自己决定长度。

   ```css
   grid-template-columns: 100px auto 100px;
   // 第二列列宽自适应
   ```

   2.6 <font color="red" >网格线的名称</font>

   `grid-template-columns`属性和`grid-template-rows`属性里面，还可以使用方括号，指定每一根网格线的名字，方便以后的引用。

   ```css
   .container {
     display: grid;
     grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
     grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
   }
   ```

   上面代码指定网格布局为 3 行 x 3 列，因此有 4 根垂直网格线和 4 根水平网格线。方括号里面依次是这八根线的名字。

   网格布局允许同一根线有多个名字，比如`[fifth-line row-5]`。

   2.7 <font color="red" >布局实例</font>

   `grid-template-columns`属性对于网页布局非常有用。两栏式布局只需要一行代码。

   ```css
   .wrapper {
     display: grid;
     grid-template-columns: 70% 30%;
   }
   ```

   上面代码将左边栏设为 70%，右边栏设为 30%。

   传统的十二网格布局，写起来也很容易。

   ```css
   grid-template-columns: repeat(12, 1fr);
   ```

3. grid-row-gap 属性， grid-column-gap 属性， grid-gap 属性

   > grid-row-gap 属性设置行与行之间的间距
   >
   > grid-column-gap 属性设置列与列之间的间距
   >
   > grid-gap 属性是`grid-column-gap`和`grid-row-gap`的合并简写形式,如果`grid-gap`省略了第二个值，浏览器认为第二个值等于第一个值。

4. grid-template-areas 属性

   一个区域由单个或多个单元格组成。`grid-template-areas`属性用于定义区域。

   ```css
   .container {
     display: grid;
     grid-template-columns: 100px 100px 100px;
     grid-template-rows: 100px 100px 100px;
     grid-template-areas:
       "a b c"
       "d e f"
       "g h i";
   }
   //上面代码先划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格。
   //如果某些区域不需要利用，则使用"点"（.）表示。
   ```

   > 注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为`区域名-start`，终止网格线自动命名为`区域名-end`。
   >
   > 比如，区域名为`header`，则起始位置的水平网格线和垂直网格线叫做`header-start`，终止位置的水平网格线和垂直网格线叫做`header-end`。

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>grid-row-gap 属性， grid-column-gap 属性， grid-gap 属性</title>
       <style>
         .container {
           display: grid;
           grid-template-columns: repeat(3, 100px);
           grid-template-rows: repeat(3, 100px);
           /* 设置行与列之间的间隔 */
           grid-row-gap: 20px;
           grid-column-gap: 20px;
           grid-template-areas:
             "a b c"
             "d e f"
             "g h i";
         }
         .item {
           background-color: cyan;
           border: 1px solid currentColor;
         }
         .item-1 {
           grid-area: e;
           background-color: blueviolet;
         }
       </style>
     </head>
     <body>
       <div class="container">
         <div class="item item-1">ggg</div>
         <div class="item"></div>
         <div class="item"></div>
         <div class="item"></div>
         <div class="item"></div>
         <div class="item"></div>
         <div class="item"></div>
         <div class="item"></div>
         <div class="item"></div>
       </div>
     </body>
   </html>
   ```

   ![image-20210613014618284](/Users/apple/Library/Application Support/typora-user-images/image-20210613014618284.png)

5. grid-auto-flow 属性

   > 相当于 flex-direction 属性，设置主轴，在 grid 中，grid-auto-flow 默认容器中元素先占满第一行，即先行后列
   >
   > <font color='red'>该属性有 4 个属性值，column，row,row dense(设为`row dense`，表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。) , column dense</font>

   ```css
   grid-auto-flow: column;
   //先列后行
   ```

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8" />
       <meta name="viewport" content="width=device-width" />
       <title>grid-auto-flow</title>
       <style>
         #container {
           display: grid;
           grid-template-columns: 100px 100px 100px;
           grid-template-rows: 100px 100px 100px;
           grid-auto-flow: row;
         }

         .item {
           font-size: 4em;
           text-align: center;
           border: 1px solid #e5e4e9;
         }

         .item-1 {
           background-color: #ef342a;
           /* 设置网格线，3列有4条网格线 */
           grid-column-start: 1;
           grid-column-end: 3;
         }

         .item-2 {
           background-color: #f68f26;
           grid-column-start: 1;
           grid-column-end: 3;
         }

         .item-3 {
           background-color: #4ba946;
         }

         .item-4 {
           background-color: #0376c2;
         }

         .item-5 {
           background-color: #c077af;
         }

         .item-6 {
           background-color: #f8d29d;
         }

         .item-7 {
           background-color: #b5a87f;
         }

         .item-8 {
           background-color: #d0e4a9;
         }

         .item-9 {
           background-color: #4dc7ec;
         }
       </style>
     </head>
     <body>
       <div id="container">
         <div class="item item-1">1</div>
         <div class="item item-2">2</div>
         <div class="item item-3">3</div>
         <div class="item item-4">4</div>
         <div class="item item-5">5</div>
         <div class="item item-6">6</div>
         <div class="item item-7">7</div>
         <div class="item item-8">8</div>
         <div class="item item-9">9</div>
       </div>
     </body>
   </html>
   ```

   ![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032513.png)

   上图 grid-auto-flow: row;

   ![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032514.png)

   上图 grid-auto-flow: row dense;

6. justify-items 属性，align-items 属性，place-items 属性（<font color="red">单元格上的位置</font>）

   > `justify-items`属性设置单元格内容的水平位置（左中右），`align-items`属性设置单元格内容的垂直位置（上中下）。
   >
   > `place-items`属性是`align-items`属性和`justify-items`属性的合并简写形式。

   > 属性值：start,center,end,stretch：拉伸，占满单元格的整个宽度

7. justify-content 属性， align-content 属性， place-content 属性（<font color="red">容器上的位置</font>）

   ```css
   place-content: <align-content> <justify-content>;
   ```

   > `justify-content`属性是整个内容区域在容器里面的水平位置（左中右），`align-content`属性是整个内容区域的垂直位置（上中下）。

   ```css
   .container {
     justify-content: start(起始) | end（结束） | center（居中） | stretch（拉伸，沾满容器）
       | space-around（每个项目两侧的间隔相等。所以，项目之间的间隔比项目与容器边框的间隔大一倍。）
       | space-between(项目间隔相等，与容器边框没有间隔) | space-evenly(项目间隔相等，与容器边框也有间隔);
     align-content: start | end | center | stretch | space-around |
       space-between | space-evenly;
   }
   ```

8. `grid-auto-columns`属性和`grid-auto-rows`属性

   > `grid-auto-columns`属性和`grid-auto-rows`属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与`grid-template-columns`和`grid-template-rows`完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

   ```css
   .container {
     display: grid;
     grid-template-columns: 100px 100px 100px;
     grid-template-rows: 100px 100px 100px;
     grid-auto-rows: 50px;
   }
   ```

   ![img](https://www.wangbase.com/blogimg/asset/201903/bg2019032525.png)

#### 3.项目属性

1. grid-column-start 属性， grid-column-end 属性， grid-row-start 属性， grid-row-end 属性

   > 项目的位置是可以指定的，具体方法就是指定项目的四个边框，分别定位在哪根网格线
   >
   > 使用这四个属性，如果产生了项目的重叠，则使用`z-index`属性指定项目的重叠顺序。

2. grid-column 属性， grid-row 属性

   > `grid-column`属性是`grid-column-start`和`grid-column-end`的合并简写形式，`grid-row`属性是`grid-row-start`属性和`grid-row-end`的合并简写形式。

   ```css
   .item {
     grid-column: <start-line> / <end-line>;
     grid-row: <start-line> / <end-line>;
   }

   .item-1 {
     grid-column: 1 / 3;
     grid-row: 1 / 2;
   }
   /* 等同于 */
   .item-1 {
     grid-column-start: 1;
     grid-column-end: 3;
     grid-row-start: 1;
     grid-row-end: 2;
   }
   ```

3. grid-area 属性

   > `grid-area`属性指定项目放在哪一个区域。

   ```css
   .item-1 {
     grid-area: e;
   }

   .item {
     grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
   }
   ```

4. justify-self 属性， align-self 属性， place-self 属性

   > `justify-self`属性设置单元格内容的水平位置（左中右），跟`justify-items`属性的用法完全一致，但只作用于单个项目。
   >
   > `align-self`属性设置单元格内容的垂直位置（上中下），跟`align-items`属性的用法完全一致，也是只作用于单个项目。

   ```css
   .item {
     justify-self: start | end | center | stretch;
     align-self: start | end | center | stretch;
   }
   ```
