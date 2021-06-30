### margin

#### margin 与容器尺寸

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

#### 百分比 margin 的计算规则

> margin,padding 的百分比值，无论水平方向还是垂直方向，都是相对于容器宽度计算的（普通元素）
> 绝对定位元素，百分比值相对于第一个定位祖先元素（relative/adsolute/fixed）的宽度计算的

#### 正确看待 css 的 margin 重叠

> 发生场景：
>
> 1. block 水平元素
> 2. 不考虑 writing-mode,只发生在垂直方向(margin-top/margin-bottom)

- 1、什么是 margin 合并

- 2、三种场景

1. 相邻的兄弟元素

2. 父级和第一个/最后一个子元素
3. 空的 block 元素

- 3、margin 合并的意义
