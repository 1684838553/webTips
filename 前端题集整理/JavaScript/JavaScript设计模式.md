[JavaScript设计模式](https://kingyinliang.github.io/PDF/JavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.pdf)

# 面向对象的编程

## 灵活的语言

```javascript
function checkName(){
}

// 另一种形式
var checkName = function(){
}

// 用对象收编变量
var CheckObject = {
    checkName:function(){

    }
}

// 对象的另一个形式
var CheckObject = function(){}
CheckObject.checkName = function(){}

// 函数返回对象
var CheckObject = function(){
    return {
        checkName:function(){

        }
    }
}

// 类
var CheckObject = function(){
    this.checkName=function(){

    }
}

// 或
var CheckObject = function(){}
CheckObject.prototype.checkName = function(){}
```

### 我问你答

1. 真假对象一节中如何实现链式调用？

**this指向当前对象CheckObject**

```javascript
// 方法一
var CheckObject = {
    checkName:function(){
        console.log(1,this)
        return this
    },
    checkEmail:function(){
        console.log(2,this)
        return this
    }
}
CheckObject.checkName().checkEmail()

// 方法二
var CheckObject = function(){}
CheckObject.prototype = {
    checkName:function(){
        console.log(1,this)
        return this
    },
    checkEmail:function(){
        console.log(2,this)
        return this
    }
}
var a = new CheckObject()
a.checkName().checkEmail()

```

2. 试着定义一个可以为函数添加多个方法的addMethod方法

```javascript
// 方法一
Function.prototype.addMethod = function(name,fn){
    this[name] = fn
}
var methods = function(){}
methods.addMethod('checkName',()=>{
    console.log(1,this)
})
methods.addMethod('checkEmail',()=>{
    console.log(2,this)
})
methods.checkName()

// 方法二 链式调用
Function.prototype.addMethod = function(name,fn){
    this[name] = fn
    return this
}
var methods = function(){}
methods.addMethod('checkName',function(){
    // 这里不要用箭头函数
    console.log(1,this)
    return this
}).addMethod('checkEmail',function(){
    console.log(2,this)
    return this
})
methods.checkName().checkEmail()
```

3. 试着定义一个既可为函数原型添加方法有可为其自身添加方法的addMethod方法

### 面向对象编程

[JavaScript继承](https://github.com/1684838553/webTips/blob/master/%E5%89%8D%E7%AB%AF%E9%A2%98%E9%9B%86%E6%95%B4%E7%90%86/JavaScript/JavaScript%E7%BB%A7%E6%89%BF.md)

### 多态

> 多态：同一种方法多种调用方式

```javascript
function add(){
    var arg = arguments
    var len = arg.length

    switch(len){
        case 0: return 10
        case 1: return 10 + arg[0]
        case 2: return arg[0] + arg[1]
    }
}
console.log(add())  // 10
console.log(add(1))  // 11
console.log(add(10,3))  // 13
```
