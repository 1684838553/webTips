# TypeScript开发实战

### 1、泛型约束

1. 泛型不能用于类的静态成员
2. 函数和类可以轻松地支持多种类型，增强程序的扩展性
3. 不必写多条函数重载，冗长的联合类型声明，增强代码可读性
4. 灵活控制类型之间的约束

```typescript
// 泛型

class Log<T> {
    run(value: T) {
        console.log(value);
        return value;
    }
}

const log1 = new Log<number>();
log1.run(1);
// 传字符串类型报错
log1.run('1');

// 没有定义泛型，run可以传参数任何
const log2 = new Log();
log2.run('1');

// 泛型约束
interface Length {
    length: number;
}

function log<T>(value: T): T {
    // T上不一定存在length属性，报错
    console.log(value, value.length);
    return value;
}

// 加一个泛型约束，避免报错
function logs<T extends Length>(value: T): T {
    console.log(value, value.length);
    return value;
}

logs([1])
logs('q')
logs({ length: 1})
// number类型没有length属性，报错
logs(1)


```

### 2、类型保护

四种保护机制

1. typeof
2. in
3. instanceof
4. 类型谓词

```typescript
enum Type {
    Strong,
    Week
}

class Java {
    helloJava() {
        console.log('hello Java');
    }
    java: any;
}

class JavaScript {
    helloJavaScript() {
        console.log('hello JavaScript');
    }
    javaScript: any;
}

// 类型谓词
function isJava(lang: Java | JavaScript): lang is Java {
    return (lang as Java).helloJava !== undefined;
}

function getLanguage(type: Type, x: string | number) {
    const lang = type === Type.Strong ? new Java() : new JavaScript();

    // instanceof
    if (lang instanceof Java) {
        lang.helloJava();
    } else {
        lang.helloJavaScript()
    }

    // in
    if ('java' in lang) {
        lang.helloJava();
    } else {
        lang.helloJavaScript();
    }

    // typeof
    if (typeof x === 'string') {
        x.length;
    } else {
        x.toFixed(2);
    }

    // 类型谓词
    if (isJava(lang)) {
        lang.helloJava();
    } else {
        lang.helloJavaScript();
    }
}
```

### 3、命名空间

1. 命名空间可以拆分，写在多个文件中
2. 命名空间最好在全局模块使用

```typescript
// 定义
namespace Shape {
    export function square(x: number) {
        return x * x;
    }
}

// 使用
Shape.square(3)
```

### 4、tsconfig.josn文件配置

[tsconfig官网文档]: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

配置文件之间可以继承

```typescript
// tsconfig.base.json
{
    // 编译器需要编译的单个文件的列表
    "files": [
        "src/a.ts"
    ],
    // 编译器需要编译的文件或目录, 编译 src 目录下的文件夹
    "include": [
        "src"
    ],
    // 排除编译该目录下的文件夹
    "exclude": [
        "src/lib"
    ]
}

// tsconfig.json
{
    // 继承 tsconfig.base.json 文件中的配置
    "extends": "./tsconfig.base.json",
    // 覆盖 tsconfig.base.json 文件中的 exclude 配置
    "exclude": [],
    "compilerOptions": {
        /**
          增量编译：
          1. 增量编译只会编译更改的文件，而不是整个项目，这可以大大提高构建速度。
          2. 增量编译只会报告更改文件中的错误，而不是整个项目，这使得错误处理更加精确。
          3. 增量编译可以支持热更新，即在不重启服务器的情况下，只更新更改的部分
        */
        "incremental": true,   // 增量编译
        "tsBuildInfoFile": "./tsbuildFile",   // 增量编译文件的存储位置

        "target": "ES5",   // 目标语言的版本
        "module": "CommonJS",   // 生成代码的模块标准

        /**
          在AMD模块中，使用require函数来引用其他模块
        */
        // "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在 AMD 模块中
        "lib": ["dom", "es5", "ES2019.Array"],    // TS 需要引入的类库，即声明文件

        "allowJs": true,   // 允许编译 JS 文件（包括js, jsx）
        "checkJs": true,   // 允许在 JS 文件中报错，通常与 allowJs 一起使用

        "outDir": "./out",  // 指定输出目录
        "rootDir": "./src",  // 指定输入文件的目录（用于输出，指定目录结构）

        "declaration": true,  // 生成声明文件
        "declarationDir": "./types",  // 声明文件的路径
        // "emitDeclarationOnly": true,  // 只生成声明文件

        /**
          sourceMap 和 inline sourceMap：
          1. 都是用于JavaScript源代码调试的工具，但它们的工作方式有所不同
          2. sourcemap 将映射信息保存在单独的文件中，而 inline sourceMap 则将映射信息嵌入到代码中
        */
        "sourceMap": true,  // 生成目标文件的 sourceMap
        // "inlineSourceMap": true,  // 生成目标文件的 inline sourceMap
        "declarationMap": true,  // 生成声明文件的 sourceMap

        "typeRoots": [],   // 声明文件目录， 默认 node_modules/@types
        "types": [],  // 声明文件包

        "removeComments": true,  // 删除注释

        "noEmit": false,  // 为 true 时，编译不输出文件
        "noEmitOnError": true,  // 发生错误时不输出文件

        "noEmitHelpers": false,  // 例如类继承时，不生成 helper 函数，需要额外安装 ts-helper
        "importHelpers": false,  // 通过 ts-lib 引入 helper 函数，文件必须是模块

        /**
          类型检查相关的配置项
        */
        "strict": true,  // 开启所以严格的类型检查
        "alwaysStrict": true,  // 在代码中注入 "use strict"
        "noImplicitAny": true,  // 不允许隐式的 any
        "strictNullChecks": true,  // 不允许把 null, undefined 复制给其它类型变量
        "strictFunctionTypes": true,  // 不允许函数参数双向协变
        "strictPropertyInitialization": false,  // 类的实例属性必须初始化
        "strictBindCallApply": false,  // 严格检查 bind/call/apply 检查
        "noImplicitThis": false, // 不允许 this 有隐式的 any 类型

        /**
          函数相关配置
        */
        "noUnusedLocals": true,  // 检查只声明，未使用的局部变量
        "noUnusedParameters": true,  // 检查未使用的函数参数
        "noFallthroughCasesInSwitch": true,  // 防止 switch 语句贯穿，没有break, 代码自上向下全部执行
        "noImplicitReturns": true, // 每个分支都要有返回值

        "esModuleInterop": false,  // 允许 export = 导出， 有 import from 导入
        "allowUmdGlobalAccess": false,  // 允许在模块中访问 UMD 全局变量
        "moduleResolution": "node",  // 模块解析策略
        "baseUrl": "./",  // 解析非相对模块的基地址
        "paths": {  // 路径映射， 相对于 baseURL
            "jquery": ["node_modules/jquery/dist/jquery.slim.min.js"]
        },
        "rootDirs": ["src", "out"],  // 将多个目录放在一个虚拟目录下，用于运行时

        "listEmittedFiles": false,  // 打印输出的文件
        "listFiles": false  // 打印编译的文件 （包括引用的声明文件）
    }
}
```

### 5、编译工具 webpack

### 6、代码检查工具

1. tsLint: 执行规则的方式存在一些架构问题，从而影响了性能，而修复这些问题会破会现有的规则
2. esLint：性能更好，并且社区用户通常拥有eslint的规则配置



