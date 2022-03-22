## [bilibili哈默](https://www.bilibili.com/video/BV1By4y177gX)
### [源码interview-question](https://github.com/1684838553/webpack-demo/tree/main/interview-question004)

### 1. [Webpack生产、开发环境的拆分与合并](https://juejin.cn/post/6938397834320297991)

将生产环境和开发环境的独有配置分理处基础配置文件，再用`webpack-merge`插件合并

**webpack.base.config.js**
```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
}

```

**webpack.dev.config.js**
```javascript
const commonConfig = require('./webpack.base.config')
const { smart: merge } = require('webpack-merge')
const devConfig = {
    mode: "development"
}
// 调用smart方法进行合并
module.exports = merge(commonConfig, devConfig)

```

**webpack.prod.config.js**
```javascript
const commonConfig = require('./webpack.base.config')
const { smart: merge } = require('webpack-merge')
const prodConfig = {
    mode: "production"
}
module.exports = merge(commonConfig, prodConfig)

```


### 2. 如何使用webpack-dev-server

先安装`webpack-dev-server`插件，安装成功后执行`webpack-dev-server`命令， DevServer 就启动了

**webpack_dev_server的常用参数**

[Webpack-dev-server的proxy用法](https://segmentfault.com/a/1190000016314976)

```javascript
const devConfig = {
    mode: "development",
    devServer: {
        port: 8080,
        static: '../dist',
        open: true, // 启动服务器，自动打开浏览器
        compress: true, // 开启gzip压缩
        proxy: {  // 代理配置

        }
    }
}
```

### 3. 处理样式

`webpack`只能直接将`js`文件打包，所以，`css`文件打包需要引入`loader`。

- css-loader
- style-loader
- scss-loader
- postcss-loader
- autoprefixer插件

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', // 将样式插入style标签中
                    'css-loader', // 处理css文件之间的引用关系
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer'
                                    ]
                                ]
                            }
                        }
                    },  // 处理浏览器兼容性，依赖autoprefixer插件
                ]
            }
        ]
    },
}
```
还需要在`package.json`文件中配置 `browserslist`

```json
"browserslist": [
    "> 1%",
    "last 2 versions"
],
```

### 4. [处理图片](https://segmentfault.com/a/1190000040063267)

1. 比较小的图片，转换成base64格式，可以减少http请求

2. 比较大的图片，想file-loader一样，单独打包到img文件夹中，发送请求，防止页面首次渲染太慢


**在 webpack 中打包图片要用到 file-loader 或者 url-loader 加载器，这两个加载器的功能基本一样，但是还是存在一些区别：**

- `file-loader`：能够根据配置项复制使用到的资源到构建之后的文件夹，并且能够更改对应的链接。

- `url-loader`：包含 file-loader 的全部功能，并且能够根据配置将符合配置的文件转换成 Base64 方式引入，将小体积的图片 Base64 引入项目可以减少 http 请求，也是一个前端常用的优化方式。

```javascript
module:{
    rules:[
        {
            test: /\.(png|jpg|gif|svg)$/,
            use:[{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[ext]'
                },
                {
                    // 压缩图片
                    loader:'image-webpack-loader',
                    options: {
                        bypassOnDebug: true,
                    }
                }
            }]
        }
    ]
}
```

### 5. 多入口

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
        other:'./src/other.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',  // 打包后的入口文件文件名
            inject: 'body',  // 规定生成的script标签放置位置
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/other.html',
            filename: 'other.html',
            inject: 'body',
            chunks:['other']
        })
    ]
}
```

### 6. 抽离css

```javascript
const commonConfig = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

const {
    merge
} = require('webpack-merge')

const prodConfig = {
    mode: "production",
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,  // 用MiniCssExtractPlugin.loader代替style-loader
                'css-loader', // 处理css文件之间的引用关系
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    'autoprefixer'
                                ]
                            ]
                        }
                    }
                }, // 处理兼容性，依赖autoprefixer插件
            ]
        }]
    },
    plugins: [
        // 抽离css
        new MiniCssExtractPlugin({
            filename: 'css/main.[contentHash].css'
        }),
    ],
    optimization: {
        minimizer: [
            // 压缩JS
            new TerserWebpackPlugin(),
            // 压缩CSS
            new CssMinimizerWebpackPlugin()
        ]
    }
}
// 调用smart方法进行合并
module.exports = merge(commonConfig, prodConfig)
```

### 7. 抽离公共代码`（生产环境）`

1. 公共模块

`公共模块`的代码不需要重复打包，单独抽出一个`chunk`文件，然后引用

2. 第三方模块

`第三方模块`的代码一般不会轻易改变，不需要在业务代码改变之后重新打包，单独抽离出一个`chunk`，然后引用即可`（可以缓存起来）`

```javascript
const prodConfig = {
    optimization: {
        // 代码分割
        splitChunks: {
            /* 
                all 对同步异步代码都做分割
                async 只对异步代码做分割
                initial 只对同步代码做分割
                同步代码 import loadsh from 'loadsh'
                异步代码 import('loadsh')
            */
            chunks: 'all',
            cacheGroups: {
                // 第三方模块
                vendor: {
                    // 每个组的名字
                    name: 'vendor',
                    // 优先级，优先级越高，越先检测处理
                    // 第三方模块，可能会被作为公共模块来监测处理，通过优先级，达到先被当作第三方模块来检测处理
                    priority: 1,
                    // 检测方法，检测是否来自/node_modules/
                    test: /node_modules/,
                    // 实际开发中，可以写 5 * 1024 ，即5kb
                    // 文件超过minSize设定值，就会进行代码分割
                    minSize: 0,
                    // 检测模块被引用几次
                    // 对于第三方模块而言，引用一次就应该单独打包
                    minChunks: 1
                },
                common: {
                    name: 'common',
                    priority: 0,
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    }
}
```
