### 说一说你对HTML5语义化的理解

语义化意味着顾名思义，HTML5的语义化指的是合理正确的使用语义化的标签来创建页面结构，如 header,footer,nav，从标签上即可以直观的知道这个标签的作用，而不是滥用div。

#### 语义化的优点有:

1. 代码结构清晰，易于阅读，利于开发和维护。（去掉或丢失样式的时候能够让页面呈现出清晰的结构）
2. 方便其他设备解析（如屏幕阅读器）根据语义渲染网页。
3. 有利于搜索引擎优化（SEO），搜索引擎爬虫会根据不同的标签来赋予不同的权重
4. 便于团队开发和维护，语义化增强可读性。


#### 语义化标签主要有：

- title：主要用于页面的头部的信息介绍
- header：定义文档的页眉
- nav：主要用于页面导航
- main：规定文档的主要内容。对于文档来说应当是唯一的。它不应包含在文档中重复出现的内容，比如侧栏、导航栏、版权信息、站点标志或搜索表单。
- article：独立的自包含内容
- h1~h6：定义标题
- ul: 用来定义无序列表
- ol: 用来定义有序列表
- address：定义文档或文章的作者/拥有者的联系信息。
- canvas：用于绘制图像
- dialog：定义一个对话框、确认框或窗口
- aside：定义其所处内容之外的内容。<aside> 的内容可用作文章的侧栏。
- section：定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。
- figure：规定独立的流内容（图像、图表、照片、代码等等）。figure 元素的内容应该与主内容相关，但如果被删除，则不应对文档流产生影响。
- details：描述文档或者文档某一部分细节
- mark：义带有记号的文本。
  
 ```html
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
    </style>
</head>
<body>
    <header style="background-color: coral;height: 60px;">
        <h2>这是一个title</h2>
    </header>
    <nav style="background-color: brown;height: 40px;">
        摘要：这是一个语义化标签的页面
    </nav>
    <div style="display: flex;height: 300px;">
        <aside style="width: 200px;background-color: aqua;">左侧栏</aside>
        <article style="background-color: blueviolet;flex: 1;">内容</article>
    </div>
    <footer style="background-color: darkmagenta;height: 80px;">
        底部
    </footer>
</body>
</html>
 ```
