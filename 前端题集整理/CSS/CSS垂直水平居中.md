# 布局
[常见的布局方式](https://juejin.cn/post/6844903574929932301#heading-19)

## 一、水平居中

### (1)文本/行内元素/行内块级元素

原理：text-align只控制行内内容(文字、行内元素、行内块级元素)如何相对他的块父元素对齐

#parent{
    text-align: center;
}


优点：简单快捷，容易理解，兼容性非常好
缺点：只对行内内容有效；属性会继承影响到后代行内内容；如果子元素宽度大于父元素宽度则无效，只有后代行内内容中宽度小于设置text-align属性的元素宽度的时候，才会水平居中

###  (2)单个块级元素

原理：根据规范介绍得很清楚了，有这么一种情况：在margin有节余的同时如果左右margin设置了auto，将会均分剩余空间。另外，如果上下的margin设置了auto，其计算值为0

#son{
    width: 100px; /*必须定宽*/
    margin: 0 auto;
}


优点：简单；兼容性好
缺点：必须定宽，并且值不能为auto；宽度要小于父元素，否则无效

###  (3)多个块级元素 

原理：text-align只控制行内内容(文字、行内元素、行内块级元素)如何相对他的块父元素对齐

#parent{
    text-align: center;
}
.son{
    display: inline-block; /*改为行内或者行内块级形式，以达到text-align对其生效*/
}


优点：简单，容易理解，兼容性非常好
缺点：只对行内内容有效；属性会继承影响到后代行内内容；块级改为inline-block换行、空格会产生元素间隔

###  (4)使用绝对定位实现

原理：子绝父相，top、right、bottom、left的值是相对于父元素尺寸的，然后margin或者transform是相对于自身尺寸的，组合使用达到水平居中的目的

#parent{
    height: 200px;
    width: 200px;  /*定宽*/
    position: relative;  /*父相*/
    background-color: #f00;
}
#son{
    position: absolute;  /*子绝*/
    left: 50%;  /*父元素宽度一半,这里等同于left:100px*/
    transform: translateX(-50%);  /*自身宽度一半,等同于margin-left: -50px;*/
    width: 100px;  /*定宽*/
    height: 100px;
    background-color: #00ff00;
}


优点：使用margin-left兼容性好；不管是块级还是行内元素都可以实现
缺点：代码较多；脱离文档流；使用margin-left需要知道宽度值；使用transform兼容性不好（ie9+）

###  (5)任意个元素(flex) 
原理：就是设置当前主轴对齐方式为居中。说不上为什么，flex无非就是主轴侧轴是重点，然后就是排列方式的设置，可以去看看文末的flex阅读推荐
#parent{
    display: flex;
    justify-content: center;
}


优点：功能强大；简单方便；容易理解
缺点：PC端兼容性不好，移动端（Android4.0+）

 **本章小结**

对于水平居中，我们应该先考虑，哪些元素有自带的居中效果，最先想到的应该就是 text-align:center 了，但是这个只对行内内容有效，所以我们要使用 text-align:center 就必须将子元素设置为 display: inline; 或者 display: inline-block; ；
其次就是考虑能不能用margin: 0 auto; ，因为这都是一两句代码能搞定的事，实在不行就是用绝对定位去实现了。
移动端能用flex就用flex，简单方便，灵活并且功能强大，无愧为网页布局的一大利器！

## 二、垂直居中

###  (1)单行文本/行内元素/行内块级元素

原理：line-height的最终表现是通过inline box实现的，而无论inline box所占据的高度是多少（无论比文字大还是比文字小），其占据的空间都是与文字内容公用水平中垂线的。

#parent{
    height: 150px;
    line-height: 150px;  /*与height等值*/
}


优点：简单；兼容性好
缺点：只能用于单行行内内容；要知道高度的值

###  (2)多行文本/行内元素/行内块级元素 

原理同上

#parent{  /*或者用span把所有文字包裹起来，设置display：inline-block转换成图片的方式解决*/
    height: 150px;
    line-height: 30px;  /*元素在页面呈现为5行,则line-height的值为height/5*/
}


优点：简单；兼容性好
缺点：只能用于行内内容；需要知道高度和最终呈现多少行来计算出line-height的值，建议用span包裹多行文本

###  (3)图片

原理：vertical-align和line-height的基友关系

#parent{
    height: 150px;
    line-height: 150px;
    font-size: 0;
}
img#son{vertical-align: middle;} /*默认是基线对齐，改为middle*/


优点：简单；兼容性好
缺点：需要添加font-size: 0; 才可以完全的垂直居中；不过需要主要，html#parent包裹img之间需要有换行或空格

###  (4)单个块级元素 

html代码:
<div id="parent">
    <div id="son"></div>
</div>

#### (4-1) 使用tabel-cell实现: 
原理：CSS Table，使表格内容对齐方式为middle

#parent{
    display: table-cell;
    vertical-align: middle;
}


优点：简单；宽高不定；兼容性好（ie8+）
缺点：设置tabl-cell的元素，宽度和高度的值设置百分比无效，需要给它的父元素设置display: table; 才生效；table-cell不感知margin，在父元素上设置table-row等属性，也会使其不感知height；设置float或position会对默认布局造成破坏，可以考虑为之增加一个父div定义float等属性；内容溢出时会自动撑开父元素

####  (4-2) 使用绝对定位实现:

/*原理：子绝父相，top、right、bottom、left的值是相对于父元素尺寸的，然后margin或者transform是相对于自身尺寸的，组合使用达到水平居中的目的*/

#parent{
    height: 150px;
    position: relative;  /*父相*/
}
#son{
    position: absolute;  /*子绝*/
    top: 50%;  /*父元素高度一半,这里等同于top:75px;*/
    transform: translateY(-50%);  /*自身高度一半,这里等同于margin-top:-25px;*/
    height: 50px;
}

/*优缺点
- 优点：使用margin-top兼容性好；不管是块级还是行内元素都可以实现
- 缺点：代码较多；脱离文档流；使用margin-top需要知道高度值；使用transform兼容性不好（ie9+）*/

或

/*原理：当top、bottom为0时,margin-top&bottom会无限延伸占满空间并且平分*/

#parent{position: relative;}
#son{
    position: absolute;
    margin: auto 0;
    top: 0;
    bottom: 0;
    height: 50px;
}

/*优缺点
- 优点：简单;兼容性较好(ie8+)
- 缺点：脱离文档流*/

#### (4-3) 使用flex实现: 
原理：flex设置对齐方式罢了，请查阅文末flex阅读推荐
#parent{
    display: flex;
    align-items: center;
}

或

#parent{display: flex;}
#son{align-self: center;}

或
/*原理：这个尚未搞清楚，应该是flex使margin上下边界无限延伸至剩余空间并平分了*/
#parent{display: flex;}
#son{margin: auto 0;}


优点：简单灵活；功能强大
缺点：PC端兼容性不好，移动端（Android4.0+）

###  (5)任意个元素(flex) 

原理：flex设置对齐方式罢了，请查阅文末flex阅读推荐

#parent{
    display: flex;
    align-items: center;
}

或

#parent{
    display: flex;
}
.son{
    align-self: center;
}

或 

#parent{
    display: flex;
    flex-direction: column;
    justify-content: center;
}


优点：简单灵活；功能强大
缺点：PC端兼容性不好，移动端（Android4.0+）

 ★本章小结：

对于垂直居中，最先想到的应该就是 line-height 了，但是这个只能用于行内内容；
其次就是考虑能不能用vertical-align: middle; ，不过这个一定要熟知原理才能用得顺手，建议看下vertical-align和line-height的基友关系 ；
然后便是绝对定位，虽然代码多了点，但是胜在适用于不同情况；
移动端兼容性允许的情况下能用flex就用flex

## 水平垂直居中

### (1)行内/行内块级/图片

原理：text-align: center; 控制行内内容相对于块父元素水平居中,然后就是line-height和vertical-align的基友关系使其垂直居中，font-size: 0; 是为了消除近似居中的bug

#parent{
    height: 150px;
    line-height: 150px;  /*行高的值与height相等*/
    text-align: center;
    font-size: 0;   /*消除幽灵空白节点的bug*/
}
#son{
    /*display: inline-block;*/  /*如果是块级元素需改为行内或行内块级才生效*/
    vertical-align: middle;
}


优点：代码简单；兼容性好（ie8+）
缺点：只对行内内容有效；需要添加font-size: 0; 才可以完全的垂直居中；不过需要注意html中#parent包裹#son之间需要有换行或空格；熟悉line-height和vertical-align的基友关系较难

###  (2)table-cell 

原理：CSS Table，使表格内容垂直对齐方式为middle,然后根据是行内内容还是块级内容采取不同的方式达到水平居中

#parent{
    height: 150px;
    width: 200px;
    display: table-cell;
    vertical-align: middle;
    /*text-align: center;*/   /*如果是行内元素就添加这个*/
}
#son{
    /*margin: 0 auto;*/    /*如果是块级元素就添加这个*/
    width: 100px;
    height: 50px;
}


优点：简单；适用于宽度高度未知情况；兼容性好（ie8+）
缺点：设置tabl-cell的元素，宽度和高度的值设置百分比无效，需要给它的父元素设置display: table; 才生效；table-cell不感知margin，在父元素上设置table-row等属性，也会使其不感知height；设置float或position会对默认布局造成破坏，可以考虑为之增加一个父div定义float等属性；内容溢出时会自动撑开父元素

###  (3)button作为父元素 

原理：button的默认样式，再把需要居中的元素表现形式改为行内或行内块级就好

button#parent{  /*改掉button默认样式就好了,不需要居中处理*/
    height: 150px;
    width: 200px;
    outline: none;  
    border: none;
}
#son{
    display: inline-block; /*button自带text-align: center,改为行内水平居中生效*/
}

优点：简单方便，充分利用默认样式
缺点：只适用于行内内容；需要清除部分默认样式；水平垂直居中兼容性很好，但是ie下点击会有凹陷效果！

###  (4)绝对定位 

原理：子绝父相，top、right、bottom、left的值是相对于父元素尺寸的，然后margin或者transform是相对于自身尺寸的，组合使用达到几何上的水平垂直居中

#parent{
    position: relative;
}
#son{
    position: absolute;
    top: 50%;
    left: 50%;
    /*定宽高时等同于margin-left:负自身宽度一半;margin-top:负自身高度一半;*/
    transform: translate(-50%,-50%); 
}

优点：使用margin兼容性好；不管是块级还是行内元素都可以实现
缺点：代码较多；脱离文档流；使用margin需要知道宽高；使用transform兼容性不好（ie9+）

###  (5)绝对居中 

原理：当top、bottom为0时,margin-top&bottom设置auto的话会无限延伸占满空间并且平分；当left、right为0时,margin-left&right设置auto的话会无限延伸占满空间并且平分

#parent{
    position: relative;
}
#son{
    position: absolute;
    margin: auto;
    width: 100px;
    height: 50px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

优点：无需关注宽高；兼容性较好(ie8+)
缺点：代码较多；脱离文档流

###  (6)flex 

原理：flex设置对齐方式罢了，请查阅文末flex阅读推荐

#parent{
    display: flex;
}
#son{
    margin: auto;
}

或

#parent{
    display: flex;
    justify-content: center;
    align-items: center;
}

或

#parent{
    display: flex;
    justify-content: center;
}
#son{
    align-self: center;
}

优点：简单灵活；功能强大
缺点：PC端兼容性不好，移动端（Android4.0+）

###  (7)视窗居中 

原理：vh为视口单位，视口即文档可视的部分，50vh就是视口高度的50/100，设置50vh上边距再

#son{
	/*0如果去掉，则会多出滚动条并且上下都是50vh的margin。如果去掉就给body加上overflow:hidden;*/
    margin: 50vh auto 0;  
    transform: translateY(-50%);
}


优点：简单；容易理解；两句代码达到屏幕水平垂直居中
缺点：兼容性不好（ie9+，Android4.4+）

**本章小结**

一般情况下，水平垂直居中，我们最常用的就是绝对定位加负边距了，缺点就是需要知道宽高，使用transform倒是可以不需要，但是兼容性不好（ie9+）；
其次就是绝对居中，绝对定位设置top、left、right、bottom为0，然后margin:auto; 让浏览器自动平分边距以达到水平垂直居中的目的；
如果是行内/行内块级/图片这些内容，可以优先考虑line-height和vertical-align 结合使用，不要忘了还有text-align ，这个方法代码其实不多，就是理解原理有点困难，想要熟练应对各种情况还需好好研究；
移动端兼容性允许的情况下能用flex就用flex。
