### 1、var let const 区别

### 2、var 挂载在 window 下，let,const 挂载在哪里

### 3、var a ,a 的区别

### 4、浏览器环境中，window.a = 1 ,a= 1,var a = 1 的区别

### 5、了解以下两端代码的不同点

```javascript
let obj = { a: 1 };
let a = obj; // obj = {a:1}  a = {a:1}
obj = { a: 2 }; // obj = {a:2}  a = {a:1}

let obj = { a: 1 };
let a = obj; // obj = {a:1}  a = {a:1}
obj.a = 2; // obj = {b:2}  a = {a:2}
```
