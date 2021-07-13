## 11 | this：从 JavaScript 执行上下文的视角讲清楚 this

1. JavaScript中的this是什么？

   执行上下文：变量环境，词法环境，outer, this，所以，this和执行上下文绑定

   - 全局上下文中的this

     全局上下文中的this是指向window对象的

   - 函数执行上下文中的this

     **设置执行上下文中的 this 来指向其他对象**

     1、通过函数的call，bind,apply方法设置

     ```javascript
     let bar = {
       myName : "极客邦",
       test1 : 1
     }
     function foo(){
       this.myName = "极客时间"
     }
     foo.call(bar)  //foo函数内部的this指向bar对象
     console.log(bar)
     console.log(myName)
     ```

     2、通过对象调用的方法设置

     **1、使用对象来调用其内部的一个方法，该方法的 this 是指向对象本身的。**

     **2、在全局环境中调用一个函数，函数内部的this指向全局变量window。**

     ```javascript
     
     var myObj = {
       name : "极客时间", 
       showThis: function(){
         console.log(this)
       }
     }
     myObj.showThis()  // this指向myObj
     
     
     var myObj = {
       name : "极客时间",
       showThis: function(){
         this.name = "极客邦"
         console.log(this)
       }
     }
     var foo = myObj.showThis
     foo() // this指向window
     ```

     3、在构造函数中设置

     ```javascript
     function CreateObj(){
       this.name = "极客时间"
     }
     var myObj = new CreateObj()
     ```

     **使用new创建myObj，此时，构造函数的this指向谁**

     <font color="red">new一个新对象时，js引擎做了什么？</font>

     ```javascript
       var tempObj = {}
       CreateObj.call(tempObj)
       return tempObj
     ```

     - 创建一个空对象 tempObj
     - 接着调用CreateObj.call方法，接着调用 CreateObj.call 方法，并将 tempObj 作为 call 方法的参数，这样当 CreateObj 的执行上下文创建时，它的 this 就指向了 tempObj 对象；
     - 然后执行 CreateObj 函数，此时的 CreateObj 函数执行上下文中的 this 指向了 tempObj 对象；
     - 最后返回 tempObj 对象



2. this的设计缺陷以及应对方案

   1、嵌套函数中的this不会从外层函数中继承

   **ES6 中的箭头函数并不会创建其自身的执行上下文，所以箭头函数中的 this 取决于它的外部函数。**
   
   ```javascript
   
   var myObj = {
     name : "极客时间", 
     showThis: function(){
       console.log(this)  //this指向myObj
       function bar(){console.log(this)}  // this指向window
       bar()
     }
   }
   myObj.showThis()
   
   // 函数 bar 中的 this 指向的是全局 window 对象，而函数 showThis 中的 this 指向的是 myObj 对象。
   
   //解决方法：1、声明一个变量 self 用来保存 this
   
   var myObj = {
     name : "极客时间", 
     showThis: function(){
       console.log(this)
       var self = this
       function bar(){
         self.name = "极客邦"
       }
       bar()
     }
   }
   myObj.showThis()
   console.log(myObj.name)
   console.log(window.name)
   
   //2、使用 ES6 中的箭头函数来解决这个问题
   
   var myObj = {
     name : "极客时间", 
     showThis: function(){
       console.log(this)
       var bar = ()=>{
         this.name = "极客邦"
         console.log(this)
       }
       bar()
     }
   }
   myObj.showThis()
   console.log(myObj.name)
   console.log(window.name)
   
   //ES6 中的箭头函数并不会创建其自身的执行上下文，所以箭头函数中的 this 取决于它的外部函数。
   ```
   
   2、普通函数中的 this 默认指向全局对象 window
   
   这个问题可以通过设置 JavaScript 的“严格模式”来解决。在严格模式下，默认执行一个函数，其函数的执行上下文中的 this 值是 undefined，这就解决上面的问题了

**思考题：想通过 updateInfo 来更新 userInfo 里面的数据信息，但是这段代码存在一些问题，你能修复这段代码吗？**

```javascript

let userInfo = {
  name:"jack.ma",
  age:13,
  sex:male,
  updateInfo:function(){
    //模拟xmlhttprequest请求延时
    setTimeout(function(){
      this.name = "pony.ma"
      this.age = 39
      this.sex = female
    },100)
  }
}

userInfo.updateInfo()


//方法一：声明一个变量 self 用来保存 this
let userInfo = {
  name: "jack.ma",
  age: 13,
  sex: "male",
  updateInfo: function () {
    //模拟xmlhttprequest请求延时
    let self = this
    setTimeout(function() {
        self.name = "pony.ma";
        self.age = 39;
        self.sex = "female";
    }, 100);
  },
};

userInfo.updateInfo();

setTimeout(() => {
    console.log(userInfo,'1')
  },200)

//方法二：使用箭头函数
let userInfo = {
  name: "jack.ma",
  age: 13,
  sex: "male",
  updateInfo: function () {
    //模拟xmlhttprequest请求延时
    let self = this
    setTimeout(()=> {
        self.name = "pony.ma";
        self.age = 39;
        self.sex = "female";
    }, 100);
  },
};

userInfo.updateInfo();

setTimeout(() => {
    console.log(userInfo,'1')
  },200)

// 修改方法三，其实和方法二的思路是相同的
let userInfo = {
  name:"jack.ma",
  age:13,
  sex:'male',
  updateInfo:function(){
    // 模拟 xmlhttprequest 请求延时
    void function(me) {
      setTimeout(function() {
        me.name = "pony.ma"
        me.age = 39
        me.sex = 'female'
      },100)
    }(this);
  }
}

userInfo.updateInfo()
setTimeout(() => {
  console.log(userInfo)
},200)

let update = function() {
  this.name = "pony.ma"
  this.age = 39
  this.sex = 'female'
}

//方法四: 利用call或apply修改函数被调用时的this值
let userInfo = {
  name:"jack.ma",
  age:13,
  sex:'male',
  updateInfo:function(){
    // 模拟 xmlhttprequest 请求延时
    setTimeout(function() {
      update.call(userInfo);
      // update.apply(userInfo)
    }, 100)
  }
}

userInfo.updateInfo()
setTimeout(() => {
  console.log(userInfo)
},200)


// 方法五: 利用bind返回一个新函数，新函数被调用时的this指定为userInfo
let userInfo = {
  name:"jack.ma",
  age:13,
  sex:'male',
  update: function() {
    this.name = "pony.ma"
    this.age = 39
    this.sex = 'female'
  },
  updateInfo:function(){
    // 模拟 xmlhttprequest 请求延时
    setTimeout(this.update.bind(this), 100)
  }
}

```

`总结`

使用this时，记住以下三点：

1、函数作为对象中的方法调用时，函数中的this就是该对象

2、函数正常调用，严格模式下，this是undefined，非严格模式下，this1指向全局对象

3、嵌套函数中的this不会继承外层函数的this。（箭头函数没有自己的执行上下文，所以，箭头函数的this就是它的外层函数的this）











