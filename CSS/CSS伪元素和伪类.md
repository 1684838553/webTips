## 1、伪元素和伪类的区别？

### 什么是伪类？（一种选择器）

**伪类是选择器的一种，它用于选择处于特定状态的元素**，比如当它们是这一类型的第一个元素时，或者是当鼠标指针悬浮在元素上面的时候。它们表现得会像是你向你的文档的某个部分应用了一个类一样，帮你在你的标记文本中减少多余的类，让你的代码更灵活、更易于维护。

- :last-child
- :only-child
- :hover
- ...

### 什么是伪元素？（表现得是像你往标记文本中加入全新的 HTML 元素）

**伪元素以类似方式表现，不过表现得是像你往标记文本中加入全新的 HTML 元素一样**，而不是向现有的元素上应用类。伪元素开头为双冒号`::`。

> **备注：**一些早期的伪元素曾使用单冒号的语法，所以你可能会在代码或者示例中看到。现代的浏览器为了保持后向兼容，支持早期的带有单双冒号语法的伪元素。

```css
// ::first-line伪元素选择器会值得信赖地做到这件事——即使单词/字符的数目改变，它也只会选中第一行。
article p::first-line {
    font-size: 120%;
    font-weight: bold;
}
<article>
    <p>Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo
            melon azuki bean garlic.</p>

    <p>Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard
            greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.</p>
</article>


//  ::after,::before定义的元素，不存在于dom之中，只存在在页面之中
span::after {
  content: "Content in the box in my HTML page.";
}
span::before {
  content: "Content in the box in my HTML page.11";
}
<span> Content in the box in my HTML page.</span>  // Content in the box in my HTML page.11 Content in the box in my HTML page. Content in the box in my HTML page.
```

### 伪类和伪元素一起使用

```css
article p:first-child::first-line {
  font-size: 120%;
  font-weight: bold;
}
```

### 伪类和伪元素

#### 伪类

- :active
- :checked
- :hover
- :link
- :visited
- :nth-child
- :first-child
- :last-child
- [:not()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not)

#### 伪元素

- ::after
- ::before
- ::first-letter 匹配元素的第一个字母。
- ::first-line 匹配包含此伪元素的元素的第一行。
- ::grammer-error 匹配文档中包含了浏览器标记的语法错误的那部分。
- ::selection 匹配文档中被选择的那部分。
- ::spelling-error 匹配文档中包含了浏览器标记的拼写错误的那部分。

## 2、::before 和 :after 中双冒号和单冒号有什么区别？解释一下这 2 个伪元素的作用？

1. 单冒号(:)用于 CSS3 伪类，双冒号(::)用于 CSS3 伪元素。
2. ::before 就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于 dom 之中，只存在在页面之中。

:before 和 :after 这两个伪元素，是在 CSS2.1 里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着 Web 的进化，在 CSS3 的规范里，伪元素的语法被修改成使用双冒号，成为::before ::after
