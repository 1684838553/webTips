## CSS 动画，过渡和渐变

**transition**需要触发一个事件才会随着时间改变其 CSS 属性；
**animation**在不需要触发任何事件的情况下，也可以显式的随时间变化来改变元素 CSS 属性，达到一种动画的效果
1）动画不需要事件触发，过渡需要。
2）过渡只有一组（两个：开始-结束）关键帧，动画可以设置多个

### 1、CSS 动画 animation

#### CSS 动画优点：

1. 能够非常容易地创建简单动画，你甚至不需要了解 JavaScript 就能创建动画。
2. 动画运行效果良好，甚至在低性能的系统上。渲染引擎会使用跳帧或者其他技术以保证动画表现尽可能的流畅。而使用 JavaScript 实现的动画通常表现不佳（除非经过很好的设计）。
3. 让浏览器控制动画序列，允许浏览器优化性能和效果，如降低位于隐藏选项卡中的动画更新频率。

#### 动画属性

- Animation-delay 设置延时，即从元素加载完成之后到动画序列开始执行的这段时间。

- Animation-direction 设置动画在每次运行完后是反向运行还是重新回到开始位置重复运行。

- Animation-duraation 设置动画一个周期的时长。

- Animation-iteration-count 设置动画重复次数， 可以指定 infinite 无限次重复动画

- Animation-name 指定由[`@keyframes`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)描述的关键帧名称。

- Animation-play-state 允许暂停和恢复动画。

- Animation-timing-function 设置动画速度， 即通过建立加速度曲线，设置动画在关键帧之间是如何变化。 ease ease-in ease-out linear

- Animation-fill-mode 指定动画执行前后如何为目标元素应用样式。

- **Keyframes**

  ```css
  @keyframes slidein {
    from {
      margin-left: 100%;
      width: 300%;
    }
  
    to {
      margin-left: 0%;
      width: 100%;
    }
  }
  ```

#### 示例

```html
 <style>
      .one {
        width: 200px;
        height: 50px;
        background-color: turquoise;
        animation-name: move;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
      @keyframes move {
        0% {
          width: 200px;
        }
        50% {
          width: 500px;
        }
        100% {
          width: 200px;
        }
      }
    </style>
  </head>
  <body>
    <div class="one"></div>
  </body>
```

### 2、过渡 transitions

**CSS transitions** 提供了一种在更改 CSS 属性时控制动画速度的方法。

#### 过渡属性

- Transition-property 指定哪个或哪些 CSS 属性用于过渡。
- Transition-duration 指定过渡的时长
- Tranition-timing-function 指定一个函数，定义属性值怎么变化。(缓动函数)
- Tranition-delay 指定延迟，即属性开始变化时与过渡开始发生时之间的时长。

#### 检测过渡是否完成

propertyName 字符串，指示已完成过渡的属性。

elapsedTime 浮点数，指示当触发这个事件时过渡已运行的时间（秒）。这个值不受 [`transition-delay`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-delay) 影响。

```javascript
el.addEventListener("transitionend", updateTransition, true);
```

#### 示例

```html
<style>
      .one {
        width: 200px;
        height: 200px;
        background-color: turquoise;
        /* transition-property: width background-color;
        transition-duration: 3s 2s;
        -webkit-transition-property: width background-color transform;
        -webkit-transition-duration: 3s 2s 1s; */
        -webkit-transition: width 3s, background-color 2s, transform 1s;
        transition: width 3s, background-color 2s, transform 1s;
      }
      .one:hover {
        background-color: tomato;
        width: 300px;
        opacity: 0.5;
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
      }
    </style>
  </head>
  <body>
    <div class="one"></div>
  </body>
```

### 3、渐变

渐变可以在任何使用 `<image>` 的地方使用，例如在背景中。

#### 线性渐变

**linear-gradient**最少两个参数

不需要让你设置的颜色在默认位置终止。 你可以通过给每个颜色设置0，1%或者2%或者其他的绝对数值来调整它们的位置。如果你将位置设置为百分数， `0%` 表示起始点, 而100%表示终点

```css
.horizontal-gradient {
  background: linear-gradient(to right, blue, pink);
}

// 第一个参数类型： to right（方向），70deg , to bottom right , red
// 第二个参数类型：颜色 ， lime 28px ， red 77% ， 10% 或 100px(渐变中心)
// 第n个参数类型：颜色 ， lime 28px ， red 77%
```

#### 径向渐变(从中心向外辐射)

**radial-gradient**像线性渐变一样，可以使用百分比或绝对长度来定位每个径向色标

```css
.horizontal-gradient {
  width: 500px;
  height: 200px;
  background: radial-gradient(red, blue);
}

.horizontal-gradient {
  width: 500px;
  height: 200px;
  background: radial-gradient(red 10px, yellow 30%, #1e90ff 50%);
}
```

#### 边框和字体渐变

- **字体渐变**

`background-clip` 设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。

**属性值：**

1. border-box  背景延伸至边框外沿（但是在边框下层）
2. padding-box 背景延伸至内边距外沿。不会绘制到边框处。
3. content-box 背景被裁剪至内容区外沿。
4. text  背景被裁剪成文字的前景色。

`-webkit-text-fill-color`指定文本字符的填充颜色。如果未设置此属性，则使用颜色属性的值。

```css
.one {
  font-size: 48px;
  background-image: linear-gradient(to left top, red, blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
 
<span class="one"> 字体渐变 </span>
```

- **边框渐变**

`border-image`它替换元素的常规边框。

参数：url  , linear-gradient()

`border-image-slice`将边框图片切成9份，四个角四个边，和一个中心区域。被切割的9个部分分布在边框的9个区域。

`border-image-source` 属性可以给定一个url作为边框图像

```css
.two {
  font-size: 48px;
  border: 10px solid transparent;
  border-image: linear-gradient(to left top, red, blue);
  border-image-slice: 10;
}

 <div class="two">字体渐变</div>
```



### 4、JS 和 CSS 动画的区别

1. 功能涵盖面，js 比 css 大
2. 实现/重构难度不一，css3 比 js 更加简单，性能跳优方向固定
3. 对帧速表现不好的低版本浏览器，css3 可以做到自然降级
4. css3 动画有天然事件支持
5. css3 有兼容性问题
