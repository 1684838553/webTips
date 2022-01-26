### 1. 尽量减少代码重复

+ 当某些值相互依赖时，应该把它们的相互关系用代码表达出来。

```css
font-size: 20px;
line-height: 1.5;
```

把半透明的黑色或白色叠加在主色调上，即可产生主色调的亮色和暗色变体，解决要根据按钮的亮面和暗面相对于主色调 #58a 变亮和变暗的程度来分别推导出其他颜色各自的亮色和暗色版本问题

```css
padding: 0.3em 0.8em;
border: 1px solid rgba(0, 0, 0, 0.1);
background: #58a linear-gradient(hsla(0, 0%, 100%, 0.2),
        transparent);
border-radius: 0.2em;
box-shadow: 0 0.05em 0.25em rgba(0, 0, 0, 0.5);
color: white;
text-shadow: 0 -.05em 0.05em rgba(0, 0, 0, 0.5);
```

+ `currentColor` 与当前文本颜色保持一致

+ `inherit` 可以用在任何 CSS 属性中

```css
input, select, button { font: inherit; }
```
### 2. 媒体查询

+ 避免不必要的媒体查询的操作

    + 使用百分比长度来取代固定长度。如果实在做不到这一点，也应该尝试使用与视口相关的单位（vw、vh、vmin 和 vmax），它们的值解析为视口宽度或高度的百分比。

    + 当你需要在较大分辨率下得到固定宽度时，使用 max-width 而不是width，因为它可以适应较小的分辨率，而无需使用媒体查询。

    + 不要忘记为替换元素（比如 img、object、video、iframe 等）设置一个 max-width，值为 100%。

    + 假如背景图片需要完整地铺满一个容器，不管容器的尺寸如何变化，background-size: cover 这个属性都可以做到。但是，我们也要时刻牢记——带宽并不是无限的，因此在移动网页中通过 CSS 把一张大图缩小显示往往是不太明智的。

    + 当图片（或其他元素）以行列式进行布局时，让视口的宽度来决定列的数量。弹性盒布局（即 Flexbox）或者 display: inline-block加上常规的文本折行行为，都可以实现这一点。

    + 在使用多列文本时，指定column-width（ 列 宽 ）而不是指定column-count（列数），这样它就可以在较小的屏幕上自动显示为单列布局。
