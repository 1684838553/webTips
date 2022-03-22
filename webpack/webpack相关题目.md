## [webpack面试题](http://blog.itpub.net/70007325/viewspace-2793603/)

### [冰雨的个人博客](https://bingyu123.gitee.io/blog/web/advanced/webpack/)

### 问：[Webpack 配置中用过哪些 Loader ？都有什么作用？](https://blog.csdn.net/wgf1997/article/details/112857555)

1. css-loader  
`允许将css文件通过require的方式引入，并返回css代码`

2. style-loader  
`将css添加到DOM的内联样式标签style里`

3. less-loader  
`处理less`

4. sass-loader  
`处理sass`

5. postcss-loader  
`postcss-loader是一个辅助性loader，它是针对css3中新增样式属性而存在的，它可以将css样式文件中的css3样式属性在挂载到页面上时，自动在新样式属性前添加上像-webkit-，-moz-这样的厂商前缀`

6. file-loader  
`分发文件到output目录并返回相对路径`

7. url-loader  
`和file-loader类似，但是当文件小于设定的limit时可以返回一个Data Url`

8. html-minify-loader  
`压缩HTML`

9. babel-loader  
`用babel来转换ES6文件到ES5`

### 问：[Webpack 配置中用过哪些 Plugin ？都有什么作用？](https://juejin.cn/post/6844903918862860301)

1. HtmlWebpackPlugin  
该插件将为您生成一个 HTML5 文件，其中使用script标签将所有 webpack 捆绑包包含在正文中。`实现了自动生成html入口文件和引用js文件的功能`

2. MiniCssExtractPlugin  
本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载

3. CssMinimizerWebpackPlugin  
这个插件使用 cssnano 优化和压缩 CSS。仅在生产环境开启 CSS 优化。如果还想在开发环境下启用 CSS 优化，请将 optimization.minimize 设置为 true

4. regeneratorRuntime插件  
`regeneratorRuntime`是webpack打包生成的全局辅助含糊，有babel生成，用于兼容async/await语法。`regeneratorRuntime is not defined`这个错误是未能正确配置babel

5. TerserWebpackPlugin  
该插件使用 terser 来压缩 JavaScript。

6. [webpack-merge](https://www.npmjs.com/package/webpack-merge)  
提供了一个merge连接数组和合并对象创建新对象的函数

7. [BundleAnalyzerPlugin](https://www.npmjs.com/package/webpack-bundle-analyzer)  
了解捆绑包中的真正内容，找出哪些模块构成了其最大的尺寸， 查找错误到达的模块

### 问：Loader 和 Plugin 有什么区别？

**`webpack只认识javascript`**

1. `loader`本质是一个函数，该函数将接收到的内容进行转换，返回转换后的结果。`Plugin`基于事件流框架`Tapable`,可以扩展Webpack功能`（在webpack生命周期中会广播出许多时间，Plugin可监听这些事，在合适的时机通过webpack提供api改变输出结果）`。

2. `loader`在`module.rules`中配置，作为模块的规则解析，类型为数组。`Plugin`在`plugins`中单独配置，类型为数组，每一项是一个Plugin的实力，参数通过构造函数传入。

### 问：[如何编写 Loader ? 介绍一下思路？](https://segmentfault.com/a/1190000040146131)

#### Loader链式调用

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
};

//这是一个典型的 less 处理场景，针对 .less 后缀的文件设定了：less、css、style 三个 loader 协作处理资源文件，按照定义的顺序，
//Webpack 解析 less 文件内容后先传入 less-loader；less-loader 返回的结果再传入 css-loader 处理；css-loader 的结果再传入 style-loader；
//最终以 style-loader 的处理结果为准
```

### 问：如何编写 Plugin ? 介绍一下思路？

### 问：Webpack optimize 有配置过吗？可以简单说说吗？

### 问：Webpack 层面如何性能优化？

### 问：Webpack 打包流程是怎样的？

### 问：tree-shaking 实现原理是怎样的？

### 问：Webpack 热更新（HMR）是如何实现？

### 问：Webpack 打包中 Babel 插件是如何工作的？

### 问：Webpack 和 Rollup 有什么相同点与不同点？

### 问：Webpack5 更新了哪些新特性？
