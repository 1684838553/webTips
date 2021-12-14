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

# 创建型设计模式

## 1、工厂模式

1. 简单工厂模式：即静态工厂模式，由一个工厂对象决定创建某一种产品对象类的实力。`主要用来创建某一种产品对象类的实例`

2. 工厂方法模式：通过对产品类的抽象时期创建业务主要负责用于创建多类产品的实例

3. 抽象工厂模式：通过对类的工厂抽象使其业务用于对产品类簇的创建，而不负责创建某一类产品的实例


```javascript
// 简单工厂模式
function createPop(type,text){
    var o = new Object()
    o.content = text;
    o.show = function(){}
    if(type === 'alert'){

    }
    if(type === 'confirm'){
        
    }
    return o
}


// 安全模式创建的工厂类
var Factory = function(type,content){
    if(this instanceof Factory){
        var s = new this[type](content)
        return s
    }else{
        return new Factory(type,content)
    }
}
// 工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
    Java:function(content){
        this.content = content
        (function(content){
            var div = document.createElement('div')
            div.innerHTML = content
            div.style.border = "1px solid red"
            document.getElementById('content').appendChild(div)
        })
    },
    UI:function(content){
        // ...
    },
    // ...
}
var data = [
    {type:'javascript',content:'.....'}
]
for(let i = 0;i<data.length;i++){
    Factory(data[i].type,data[i].content)
}


// 抽象工厂模式

```

## 2、建造者模式

> 建造者模式：将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示

```javascript

// 建造者模式
// 创建一个人类
var Human = function(param){
    this.skill = param?.skill || '保密'
    this.hobby = param?.skill || '保密'
}
Human.prototype = {
    getSkill:function(){
        return this.skill
    },
    getHobby:function(){
        return this.hobby
    }
}
// 实例化姓名类
var Named = function(name){
    var that = this
    ;(function(name,that){
        that.wholeName = name
        if(name.indexOf(' ')>-1){
            that.FirstName = name.slice(0,name.indexOf(' '))
            that.sencondName = name.slice(name.indexOf(' '))
        }
    })(name,that)
}
// 实例化职业
var Work = function(work){
    var that = this
    ;(function(work,that){
        switch(work){
            case 'code':{
                that.work = "工程师"
                that.workDescript = "每天沉醉于编程"
                break
            }
            case 'code':{
                that.work = "设计师"
                that.workDescript = "设计更似一种艺术"
                break
            }
            default:
                that.work = work
                that.workDescript = "无相关描述"
        }
    })(work,that)
}
// 应聘者建造者
var Person = function(name,work){
    var p = new Human()
    p.name = new Named(name)
    p.work = new Work(work)
    return p
}
var person = new Person('xiao ming','code')
console.log(person,person.name)

// Human {skill: "保密", hobby: "保密", name: Named, work: Work} 
// Named {wholeName: "xiao ming", FirstName: "xiao", sencondName: " ming"}
```

## 3、原型模式

> 原型模式：用原型实例指向创建对象的类，使用于创建新的对象的类共享原型对象的属性和方法

**原型对象是一个共享对象，不论是父类的实例对象或子类的继承，都是对它的一个指引，所以原型对象才会被共享。**

```javascript
var LoopImages = function(imgArr,container){
    this.imagesArray = imgArr
    this.container = container
}
LoopImages.prototype = {
    // 创建轮播图片
    createImage:function(){} , 
    // 切换下一张图片
    changeImage:function(){
        console.log('changeImage')
    }
}
var m = new LoopImages()
console.log(m.changeImage())  // changeImage
// 上下滑动切换类
var SlideLoopImage = function(imgArr,container){
    LoopImages.call(this,imgArr,container)
}
SlideLoopImage.prototype = new LoopImages()
//重写继承的切换下一张图片方法
SlideLoopImage.prototype.changeImage = function(){
    console.log('slideLoopImage')
}
var s = new SlideLoopImage()
console.log(s.changeImage())  // slideLoopImage

```

## 4、单例模式

> 单例模式：只允许实例化一次的对象类

**命名空间：**

1. 让代码更易懂

2. 可以用命名空间来约束每个人定义的变量来解决代码冲突的问题

```javascript
// 单例模式
var Ming = {
    g:function(id){
        return document.getElementById(id)
    },
    css:function(id,key,value){
        this.g(id).style[key] = value
    }
}
Ming.css('file','color','red')
```

**使用单例模式管理静态变量**

```javascript
var Conf = (function(){
    //私有变量
    var conf = {
        MAX_NUM:100,
        MIn_NUM:1,
        COUNT:1000
    }
    //返回取值器对象
    return {
        // 取值器方法
        get:function(name){
            return conf[name] ? conf[name] : null
        }
    }
})()
var count = Conf.get('COUNT')
console.log(count)  // 1000
```

# 结构型设计模式

## 5、外观模式

> 外观模式:为一组复杂的子系统借口提供一个更高级的统一接口，通过这个接口是的对子系统接口的访问更容易。

```javascript
 // 外观模式实现 监听
function addEvent(dom,type,fn){
    if(dom.addEventListener){
        console.log('click1',dom.addEventListener)
        dom.addEventListener(type,fn,false)
    } else if(dom.attachEvent){
        dom.attachEvent(`on${type}`,fn)
    }else{
        dom[`on${type}`] = fn
    }
}

// 获取样式
function getStyle(obj,style){
   /* 
        Window.getComputedStyle()方法返回一个对象，该对象在应用活动样式表并
        解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值
   */
    if(window.getComputedStyle){
        return window.getComputedStyle(obj,null)[style]
    }else{
        // ie
        return obj.currentStyle[style]
    }
}
```

## 6、适配器模式

> 适配器模式：将一个类（对象）的接口（方法或属性）转化为另一个接口，以满足用户需求，使类（对象）之间接口的不兼容问题通过适配器得意解决。

```javascript
// 框架适配
// 定义框架
var A = A || {}
A.g = function(id){
    return document.getElementById(id)
}
A.on = function(dom,type,fn){
    if(dom.addEventListener){
        dom.addEventListener(type,fn,false)
    } else if(dom.attachEvent){
        dom/attachEvent(`on${type}`,fn)
    }else{
        dom[`on${type}`] = fn
    }
}

// 窗口加载完成事件
A.on(window,'load',function(){
    
})


// 参数适配
// 函数参数过多，以参数对象传入
function doSomeThing(obj){
    var _ad = {
        name:'语言',
        title:'设计模式',
        age:23
    }
    for(var i in _ad){
        _ad[i] = obj[i] || _ad[i]
    }
}


// 数据适配
var arr = ['java','book','后端编程语言','8月1日']
function arrToObj(arr){
    return {
        name:arr[0],
        type:arr[1],
        title:arr[2],
        data:arr[3]
    }
}
var a = arrToObj(arr)
```

## 7、代理模式 ??

> 代理模式：由于一个对象不能直接引用另一个对象，所以需要通过代理对象在这两个对象之间起到中介作用。

1. 解决跨域问题：
    
    - img的src属性
    - JSONP

```javascript
// 代理模板
<iframe src="" name="proxyIframe" id="proxyIframe" frameborder="0"></iframe>
<form action="http://localhost:3000?callback=callback" method="post" target="proxyIframe">
    <input type="text" name="callback" value="callback">
    <input type="text" name="proxy" value="http://localhost:3000">
    <input type="submit" value="提交">
</form>
<script>
    function callback(data){
        console.log('成功接收数据',data)
    }
</script>

// server
const url = require('url');
const http = require('http');

http.createServer((req, res)=>{
    const person = {
        name:'terry',
        age:12,
        gender:'meal',
    }
    const callback = url.parse(req.url,true).query.callback
    res.writeHead(200)
    res.end(`${callback}(${JSON.stringify(person)})`)
}).listen(3000, '127.0.0.1');
```

## 8、装饰者模式

> 装饰者模式:在不改变原对象的基础上，通过对其进行包装拓展（添加属性或方法）使原有对象可以满足用户的更复杂需求

**在不了解原有功能的基础上对功能拓展，这是对原有功能的一种增强与拓展**

```javascript
var decorator = function(dom,fn){
    // 判断事件源是否绑定事件
    if(typeof dom.onclick === 'function'){
        // 缓存事件源原有回调函数
        var oldClickFn = dom.onclick
        dom.onclick = function(){
            // 事件源原有回调函数
            oldClickFn()
            //执行事件源新增回调函数
            fn()
        }
    } else {
        dom.onclick = fn
    }
    // 做其他事情
}
```

## 9、桥接模式

> 桥接模式：在系统沿着多个维度变化的同时，又不增加其复杂度并已达到解耦。(事件与业务逻辑之间的桥梁)


1. 普通代码

```javascript
var spans = document.getElementsByTagName('span')
spans[0].onmouseover = function(){
    this.style.color = 'red'
    this.style.background = '#ddd'
}
spans[0].onmouseout = function(){
    this.style.color = '#333'
    this.style.background = '#f5f5f5'
}

spans[1].onmouseover = function(){
    this.style.color = 'red'
    this.style.background = '#eee'
}
spans[1].onmouseout = function(){
    this.style.color = '#333'
    this.style.background = '#f6f6f6'
}

```

2. 使用桥接模式的代码
```javascript
function changeColor(dom,color,bg){
    dom.style.color = color
    dom.style.background = bg
}
spans[0].onmouseover = function(){
   changeColor(this,'red','#ddd')
}
spans[0].onmouseout = function(){
     changeColor(this,'#333','#f4f4f4')
}
```
