## 1、BFC

### 什么是 BFC

BFC 全称 Block Formatting Context 即`块级格式上下文`，简单的说，BFC 是页面上的一个隔离的独立容器，不受外界干扰或干扰外界
[css 中的 BFC](https://x-front-team.github.io/2017/02/19/CSS%E4%B8%AD%E7%9A%84BFC/)

### 如何触发 BFC

- `float`不为 none
- `overflow`的值不为 visible
- `position` 为 absolute 或 fixed
- `display`的值为 inline-block 或 table-cell 或 table-caption 或 grid 或 flex

### BFC 的渲染规则是什么

- BFC 是页面上的一个隔离的独立容器，不受外界干扰或干扰外界
- 计算 BFC 的高度时，浮动子元素也参与计算（即内部有浮动元素时也不会发生高度塌陷）
- BFC 的区域不会与 float 的元素区域重叠
- BFC 内部的元素会在垂直方向上放置
- BFC 内部两个相邻元素的 margin 会发生重叠

### BFC 的应用场景

- **清除浮动**：BFC 内部的浮动元素会参与高度计算，因此可用于清除浮动，防止高度塌陷 (解决子元素浮动导致父元素高度塌陷问题)
- **避免某元素被浮动元素覆盖**：BFC 的区域不会与浮动元素的区域重叠
- **阻止外边距重叠**：属于同一个 BFC 的两个相邻 Box 的 margin 会发生折叠，不同 BFC 不会发生折叠 ( 解决 margin 塌陷问题)

### 双边距重叠问题（外边距折叠）

**定义：**多个相邻（兄弟或者父子关系）普通流的块元素垂直方向 marigin 会重叠
**结果：**

1. 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
2. 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
3. 两个外边距一正一负时，折叠结果是两者的相加的和。

## 2、IFC

### 什么是 IFC

Inline Formatting Contexts，也就是“内联格式化上下文”。

### 如何触发 IFC

- 块级元素中仅包含内联级别元素

### IFC 布局规则

- 子元素水平方向横向排列，并且垂直方向起点为元素顶部。

- 子元素只会计算横向样式空间，【padding、border、margin】，垂直方向样式空间不会被计算，【padding、border、margin】。

- 在垂直方向上，子元素会以不同形式来对齐（vertical-align）

  ```html
  <div>
    <img src="" height="100" width="100" alt="" />
    <span class="text">这是一段文本1</span>
  </div>

  div { height: 100px; background-color: aqua; text-align: center;
  vertical-align: bottom; }
  ```

- 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和与其中的浮动来决定。

- IFC 中的“line box”一般左右边贴紧其包含块，但 float 元素会优先排列。

- IFC 中的“line box”高度由 CSS 行高计算规则来确定，同个 IFC 下的多个 line box 高度可能会不同。

- 当 inline-level boxes 的总宽度少于包含它们的 line box 时，其水平渲染规则由 text-align 属性值来决定。

- 当一个“inline box”超过父元素的宽度时，它会被分割成多个 boxes，这些 boxes 分布在多个“line box”中。如果子元素未设置强制换行的情况下，“inline box”将不可被分割，将会溢出父元素。

### 注意点：

1. 行内元素设置 padding,margin 在垂直方向都无效，不产生边距效果，即不影响布局

## 3、GFC

## 4、FFC
