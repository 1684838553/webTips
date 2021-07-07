### margin

#### 1、margin 与容器尺寸

1. 元素尺寸

   > 1. 可视尺寸 clientWidth(标准)
   > 2. 占据尺寸 outerWidth

   - 修改 div 水平方向的 margin，可视的宽度变大，修改垂直方向的 margin，div 的高度不变，位置改变

   **writing-mode**

   利用以上特性，实现什么功能
   答：两栏布局，一侧能够自适应，如 demo001 两栏布局

2. margin 与占据尺寸

   滚动容器实现上下留白

   如果容器可以滚动，在 ie 和火狐浏览器中，会忽略 padding-bottom 属性，谷歌不会

   原因：谷歌浏览器是子元素超过 content box 尺寸触发滚动条显示,ie 和火狐是超过 padding box 尺寸触发滚动条显示

   **滚动条留白底部不推荐使用 padding,推荐使用 margin**

3. margin 与可视尺寸
   已知 nth-of-type 在 ie8 中不兼容，如何实现除最后一个子元素外，都设置 margin-right
   答：给父元素设置 margin-right:-20px，增加容器的可用宽度,此时，ul 宽度相当于 100%+20px,如 demo003

#### 2、百分比 margin 的计算规则

> margin,padding 的百分比值，无论水平方向还是垂直方向，都是相对于容器宽度计算的（普通元素）
> 绝对定位元素，百分比值相对于第一个定位祖先元素（relative/adsolute/fixed）的宽度计算的

#### 3、正确看待 css 的 margin 重叠

> 发生场景：
>
> 1. block 水平元素
> 2. 不考虑 writing-mode,只发生在垂直方向(margin-top/margin-bottom)

- 1、什么是 margin 合并

- 2、三种场景

**重叠后 margin 的长度**

> 正正取大值（两者之间取最大值）
> 正负值相加
> 负负取负值（两者之间取绝对值最大的值）

1. 相邻的兄弟元素

2. 父级和第一个/最后一个子元素
   **重叠条件**

   - margin-top 重叠

   > 1、父元素非块状格式化上下文元素 设置 overflow:hidden,成为块级格式化上下文元素
   > 2、父元素没有 border-top 设置
   > 3、父元素没有 padding-top 设置
   > 4、父元素和第一个子元素之间没有 inline 元素分隔

   - margin-bottom 重叠

   > 1、父元素非块状格式化上下文元素
   > 2、父元素没有 border-bottom 设置
   > 3、父元素没有 padding-bottom 设置
   > 4、父元素和第一个子元素之间没有 inline 元素分隔
   > 5、父元素没有 height,min-height,max-height 限制

3. 空的 block 元素
   **重叠条件**

   > 1、元素没有 border 设置
   > 2、元素没有 padding 设置
   > 3、元素里面没有 inline 元素分隔
   > 4、没有 height,min-height,max-height

- 3、margin 合并的意义
  > 1、连续段落或列表之类，如果没有 margin 重叠，首尾项间距会和其他兄弟标签 1：2 关系，排版不自然
  > 2、web 中任何地方嵌套或直接放入任何裸 div，都不会影响原来的布局
  > 3、遗落的空任意多个<p>元素，不要影响原来的阅读排版

#### 4、margin 的 auto

1. 前提：块元素

2. 场景：给一个 div 设置宽度为 500px，该行还有剩余空间，auto 就是为了这个剩余空间设置的

   > `auto 是为了分配剩余空间的`

   ```
   div{
      width:500px;
      margin-right:100px;
      margin-left:auto;
   }

   //网页中的显示是 ： 空白 500px的div 100px的右边距
   ```

3. 为什么容器定高，元素定高，margin:auto 0 无法垂直居中？

   > 原因：子元素不设置高度也无法自动将高度设置为父元素高度，不会填充，那么不存在剩余空间，无法分配

   ```
   .father{
      height:200px;
   }
   .son{
      height:100px;
      margin:auto;
   }
   ```

4. 怎么实现垂直居中

- 设置 writing-mode(改变页面中流的方向)，修改后，可以垂直居中，无法水平居中

  ```
  .father{
     height:200px;
     width:100%;
     writing-mode:vertical-lr;
  }
  ```

- absolute 和 margin 居中

  ```
  .father{
     height:200px;
     position:relative;
  }
  .son{
     position:absolute;
     width:500px;
     margin:auto;
     top:0;
     left:0;
     right:0;
     bottom:0;
  }
  ```

#### 5、margin 负值下的两端对齐

实例：demo003margin 与内部尺寸.html demo002(dom 顺序与视觉不符)

> 实现等高布局，可以使用 padding-bottom

#### 6、margin 失效情形解析

1. inline 水平垂直的垂直 margin 无效

   > 前提：非替换元素 img 正常书写模式，文档流没有改变

2. margin 可以用在任何元素，display:table-cell/table-row(和 table 有关)的除外

3. 绝对定位元素非定位方位的 margin 值”无效“（有些微影响）

#### 7、margin-start 和 margin-end

1. 正常的流向，margin-start 等同于 margin-left，两者重叠不累加
2. 如果水平流是葱油往左，margin-start 等同于 margin-right
3. 在垂直流下（writing-mode:vertical-\*）,margin-start 等同于 margin-top
