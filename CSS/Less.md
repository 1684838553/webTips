- less是css的预处理器

### 环境
1. 在浏览器环境中，如demo001.html
2. 在node中，安装npm install -g less

### 语法
1. 变量
-  使用@来声明一个变量 @pink:pink;
- 作为选择器和属性名，#@{selector}}的形式
- 作为url:@{url}
- 变量的延迟加载

```less
@var:0;
.class{
    @var:1;
    .brass{
        @var:2;
        three:@var; //3
        @var:3;
    }
    one:@var; //1
}
<!-- 在less在有块级作用域 -->
```

2. 嵌套规则
- 普通嵌套规则
- &的使用

3. less中的混合
混合就是将一系列属性从一个规则集引入到另一个规则集的方式

- 普通混合
- 不带输出的混合
- 带参数的混合
- 带参数并且有默认值的混合
- 命名参数
- 匹配模式
- arguments变量
