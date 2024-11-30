## 1、script标签
该标签有8个属性，全都是可选属性

1. async 异步加载脚本
2. crossorigin 配置相关请求的CORS设置
3. defer 延迟到文档被完全解析和显示之后加载
4. src 文件地址
5. type 表示代码块这脚本语言的内容类型(MIME类型)
6. integrity 允许对比接受到的资源和制定的加密签名以验证子资源完整性
7. language和charset 基本不用

**注意：浏览器解析行内脚本的方式决定了它在看到字符串</script>时，会将其当成结束的</script> 标签。想避免这个问题，只需要转义字符“\”**
```javascript
<script> 
function sayScript() { 
    console.log("<\/script>"); 
} 
</script>
```
推荐使用外部文件放置JavaScript代码原因：

- 可维护性
- 缓存：浏览器会根据特定的设置缓存所有外部链接的 JavaScript 文件，这意味着如果两个页面都 用到同一个文件，则该文件只需下载一次。这最终意味着页面加载更快
- 适应未来：通过把 JavaScript 放到外部文件中，就不必考虑用 XHTML 或前面提到的注释黑科技。 包含外部 JavaScript 文件的语法在 HTML 和 XHTML 中是一样的。

**noscript标签**

两种情况下，显示改标签中的内容
1. 浏览器不支持脚本
2. 浏览器对脚本的支持被关闭


## 2、语言基础

1. 区分大小写
2. 标识符：变量，函数，属性，函数参数的名称
    第一个字符必须是字母，下划线，美元符号

 3. 严格模式

     在该模式下，一些不规范的写法和不安全的活动将跑出错误

    

注意：
    1. var定义一个变量在函数中，函数执行完会被销毁，不能在函数外使用

    2. 在函数这写一个变量，不适应var定义，该变量会成为全局变量，不会在函数执行完后销毁，在函数外也能使用（不推荐这种方式定义全局变量，不便于维护，在严格模式下，会抛出异常）

    3. 函数提升优先于变量提升
    
    4. null表示空对象指针，undefined表示未初始
    
    5. number类型进制转换 a = 10 转成为进制 a.toString(2) 

    6. 八进制在严格模式下无效，js引擎会抛出异常
    

**数据类型转换**

1. 三个函数将非数值转换为数值，Number(),parseInt(),parseFloat()
2. Symbol数据类型？？

```javascript
let num1 = parseInt("1234blue"); // 1234
let num1 = parseInt("AF", 16); // 175    16表示16进制数值
let num2 = parseInt("AF"); // NaN
let num1 = parseFloat("1234blue"); // 1234，按整数解析
let num2 = parseFloat("0xA"); // 0
let num4 = parseFloat("22.34.5"); // 22.34   解析第一个小数点
let fooSymbol = Symbol('foo');  //Symbol()函数创建，参数可选
let otherFooSymbol = Symbol('foo');
console.log(genericSymbol == otherGenericSymbol); // false
let myBoolean = new Boolean();
console.log(typeof myBoolean); // "object" 
```


**操作符**

```javascript
let num = 25;
num = +num;   // 一元加放在变量面前，对数值没有任何影响 放在字符串面前，将字符串转成number类型
console.log(num); // 25
// 一元减将数值转为相反数，将字符串转为数值
let s1 = "01";
let s2 = "1.1";
let s3 = "-1.1";
s1 = -s1; // 值变成数值-1
s2 = -s2; // 值变成数值-1.1
s3 = -s3;  // 值变成数值1.1
//指数操作符
Math.pow(2,3) //8
2 ** 3  // 8
9 ** 0.5 //3  开平方
break 语句用于立即退出循环，强制执行循环后的下一条语句。而 continue 语句也用于立即退出循环，但会再次从循环顶部

开始执行

```

## 3、变量、作用域与内存

**注意点：**
1. 基本类型按值访问，引用类型按引用访问
2. 把一个变量赋值给另一个变量，基本类型直接赋值，引用类型把引用地址给这个变量
3. 变量或函数的上下文决定了它们可以访问那些数据，以及他们的行为，生命周期（上下文在其所有代码执行完毕后会被销毁）
4. 使用var声明变量，变量会被自动添加到最接近的上下文。（如果变量未经声明就初始化，会被添加到全局上下文）
5. 声明迭代变量时，var声明的变量会泄露到循环外部，使用let声明可以避免


```javascript
// 全局变量
var a = 1  
const foo = function(){
    // 局部变量，在该函数上下文中
    var b = 2
    // 全局变量
    c = 3
}
foo()
```

### 1.作用域链增强
某些语句会导致在作用域链前端临时添加一个上下文
try/catch语句的catch块 （catch会创建一个新的变量对象，该对象包含要抛出的错误对象的声明）
with语句（向作用域链前端添加一个指定对象）
```javascript
function buildUrl() {
 let qs = "?debug=true";
 // with将location对象作为上下文
 with(location){  
    // href 实际上引用的是location.href
    let url = href + qs;  
 }
    return url;
} 
```
### 2.垃圾回收 
1. 标记清理（主流），先给当前不使用的值加上标记，再回来回收他们的内存
2. 引用计数，记录值被引用多少次（循环引用时会造成内存泄露）


## 4、引用类型 

### 1. 正则表达式
http://wenote.huawei.com/wapp/pages/view/share/s/0T0_E017xx7I2vaPKU0l75tu3qyaWg1bqx7I28XaRT2V3-MN

### 2. 数组

1. Array.from() 将类数组结构转换为数组实例
2. Array.of() 将一组参数转换为数组实例
3. 判断是不是数组 arr instanceof Array 或 Array.isArray()
4. 有keys()   values()    entries()
5. find() findIndex() 这两个方法都从数组的最小索引开始。find()返回 第一个匹配的元素，findIndex()返回第一个匹配元素的索引

```javascript
// Array.from() 将类数组结构转换为数组实例
const m = new Map().set(1, 2)
 .set(3, 4);
console.log(Array.from(m)); // [[1, 2], [3, 4]]
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, x => x**2);
console.log(a2); // [1, 4, 9, 16] 
// Array.of() 将一组参数转换为数组实例
console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4]
console.log(Array.of(undefined)); // [undefined] 

```

```javascript
let arr = [,]
// arr.length == 1
const a = ["foo", "bar", "baz", "qux"];
const aKeys = Array.from(a.keys());
// [0, 1, 2, 3]
const aValues = Array.from(a.values());
// ["foo", "bar", "baz", "qux"]
const aEntries = Array.from(a.entries());
// [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]
const people = [
 {
 name: "Matt",
 age: 27
 },
 {
 name: "Nicholas",
 age: 29
 }
];
people.find((element, index, array) => element.age < 28)
// {name: "Matt", age: 27}
people.findIndex((element, index, array) => element.age < 28)
// 0 
```

### 3. 对象

**开发时选择Object还是Map**

1. 内存占用。固定大小内存，Map大约可以比Object多存储50%键值对
2. 插入性能。涉及大量操作，Map性能更加
3. 查找速度。涉及大量操作，Object性能更加
4. 删除性能。涉及大量操作，Map性能更加

**WeakMap和WeakMap**

1. 弱映射的键只能时引用类型，值没有限制
2. 弱映射的键不属于正式的引用，不会阻止垃圾回收（只要键存在，键值对就会存在于映射中，并被当做值引用，不会被回收）
3. 不可迭代。没有clear()方法
4. 私有变量。弱映射造就了在 JavaScript 中实现真正私有变量的一种新方式。前提很明确：私有变量会存储在弱 映射中，以对象实例为键，以私有成员的字典为值。
5. DOM 节点元数据。在Map中保存节点与节点相关操作，节点在dom树上删除，但映射中还保存对dom的引用，所以该dom还在内存中，除非主动销毁。WeakMap不会出现这中情况，节点从 DOM 树中被删除后，垃圾回收程序就 可以立即释放其内存（假设没有其他地方引用这个对象）
6. set和map都支持顺序迭代
7. 
```javascript
// 创建一个WeakMap
const key1 = {id: 1},
 key2 = {id: 2}, 
 key3 = {id: 3};
const wm1 = new WeakMap([
 [key1, "val1"],
 [key2, "val2"],
 [key3, "val3"]
]);
wm1.get(key1)   // val1
wm1.get(key2)   // val2
wm1.get(key3)   // val3
/*
set()方法初始化了一个新对象并将它用作一个字符串的键。因为没有指向这个对象的其他引用，
所以当这行代码执行完成后，这个对象键就会被当作垃圾回收。然后，这个键/值对就从弱映射中消失
了，使其成为一个空映射。在这个例子中，因为值也没有被引用，所以这对键/值被破坏以后，值本身
也会成为垃圾回收的目标。
*/
const wm1 = new WeakMap();
wm1.set({}, "val");
```

## 5、JSON

JSON语法支持3种值。
- 简单值，string,number,null, boolean(undefined不行)
- 对象
- 数组

**JSON与对象（数组）**

不同之处：
1. json没有变量声明
2. json最后没有分号

```javascript
// 对象
let object = {
 "name": "Nicholas",
 "age" : 29
}; 
// JSON
{
 "name": "Nicholas",
 "age": 29
} 
```

**序列化**

```javascript
// 语法 
/* value JSON字符串的值 
   replacer 如果是函数，序列化过程中每个属性都会被转换处理；
            是数组，在该数组中的属性名才会被序列化出来；
            
   space 指定缩进用的空白字符串
*/
JSON.stringify(value[, replacer [, space]])
```

```javascript
let book = {
 title: "Professional JavaScript",
 authors: [
     "Nicholas C. Zakas",
     "Matt Frisbie"
 ],
 edition: 4,
 year: 2017
};
let jsonText = JSON.stringify(book, ["title", "edition"]);
// {"title":"Professional JavaScript","edition":4}
let jsonText1 = JSON.stringify(book, (key, value) => {
 switch(key) {
     case "authors":
        return value.join(",")
     case "year":
        return 5000;
     case "edition":
        return undefined;  // 该属性返回undefined，忽略该属性
     default:
        return value;
 }
});
/*
{"title":"Professional JavaScript","authors":"Nicholas C. Zakas,Matt
Frisbie","year":5000} 
*/
let jsonText2 = JSON.stringify(book, null, "--" );
/*
{
--"title": "Professional JavaScript",
--"authors": [
----"Nicholas C. Zakas",
----"Matt Frisbie"
--],
--"edition": 4,
--"year": 2017
} 
*/
```

**解析**

```javascript
// 语法 
/* text 要操作的值 
            
   reviver 转换器, 用来修改解析生成的原始值
*/
JSON.parse(text[, reviver])
```

```javascript
let book = {
 title: "Professional JavaScript",
 authors: [
 "Nicholas C. Zakas",
 "Matt Frisbie"
 ],
 edition: 4,
 year: 2017,
 releaseDate: new Date(2017, 11, 1)
};
let jsonText = JSON.stringify(book);
let bookCopy = JSON.parse(jsonText,
 (key, value) => key == "releaseDate" ? new Date(value) : value);
 
 ```
 
## 6、客户端存储
### 1. cookie

**遵守规则**

1. 不超过300个cookie
2. 每个cookie不超过4096个字节（4kb）
3. 每个域不超过20个cookie
4. 每个域不超过8kb


**注意：大多数浏览器对cookie的限制是不超过4kb**

**Cookie的构成**

1. 名称，唯一标识
2. 值，必须经过URL编码
3. 域，cookie的有效域
4. 路径，请求 URL 中包含这个路径才会把 cookie 发送到服务器
5. 过期时间，默认情况下， 浏览器会话结束后会删除所有 cookie
6. 安全标志，：设置之后，只在使用 SSL 安全连接的情况下才会把 cookie 发送到服务器

服务端在相应http时，发送Set-Cookie，浏览器存储这些信息，请求时在请求头上携带Cookie
取得子 cookie 有两个方法：get()和 getAll()

```javascript
Set-Cookie: name=value
Cookie: name=value 
// JS中的cookie
document.cookie = "name=Nicholas"; 
document.cookie = encodeURIComponent("name") + "=" +
 encodeURIComponent("Nicholas");
// 子cookie:为绕过浏览器对每个域 cookie 数的限制
name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5 
```
### 2. webStorage
### 3. IndexedDB

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src='https://code.jquery.com/jquery-3.2.1.min.js'></script>
    <title>IndexedDB</title>
</head>
<body>
    <button id="btn">添加数据</button>
    <button id="btn1">添加数据1</button>
    <button id="search">查询数据</button>
    <button id="del1">删除数据1</button>
    <script>
        $(function(){
            const user1 = {
                name:'猫陛下',
                age:3,
                email:'drunkcat@example.com',
                userId:'000001'
            }
            const user2 = {
                name:'陛下',
                age:3,
                email:'drunkcat@example.com',
                userId:'000002'
            }
            var data;
            var request = window.indexedDB.open('test_db')
            var db;
            request.onerror = function(){
                console.error('数据库打开错误')
            }
            request.onsuccess = function(e){
                db = e.target.result
            }
            request.onupgradeneeded = function(e){
                db = e.target.result
                if(!db.objectStoreNames.contains('user')){
                    objectStore = db.createObjectStore('user',{keyPath:'userId'})
                    objectStore.createIndex('name','name',{unique:false})
                    objectStore.createIndex('age','age',{unique:false})
                    objectStore.createIndex('email','email',{unique:false})
                    objectStore.createIndex('userId','userId',{unique:true})
                }
            }
            $('#btn').click(function(e){
                add('user',user1)
            })
            $('#btn1').click(function(e){
                add('user',user2)
            })
            $('#search').click(function(e){
                read('user','000001')
            })
            $('#del1').click(function(e){
                remove('user','000002')
            })
            function add(tableName,data){
                var request = db.transaction([tableName],'readwrite')
                    .objectStore(tableName)
                    .add(data)
                
                request.onsuccess = function(e){
                    console.info('数据写入成功')
                }
                request.onerror = function(e){
                    console.error('数据写入失败')
                }
            }
            function read(tableName,id){
                var transaction = db.transaction([tableName])
                var objectStore = transaction.objectStore(tableName)
                var request = objectStore.get(id)
                request.onsuccess = function(e){
                    console.log(request.result)
                }
            }
            function remove(tableName,id){
                var transaction = db.transaction([tableName],'readwrite')
                .objectStore(tableName)
                .delete(id)
                request.onsuccess = function(e){
                    console.info('数据删除成功')
                }
            }
        })
    </script>
</body>
</html>
```

## 7、DOM

1. 每个dom节点都有一个 childNodes 属性，其中包含一个 NodeList 的实例。NodeList 是一个类数组 对象，用于存储可以按位置存取的有序节点
    -   node.previousSibling   返回当前节点的前一个兄弟节点，没有返回null
    -  node.nextSibling  返回当前节点的后一个兄弟节点，没有返回null

    - node.appendChild

    - node.insertBefore

    - node.replaceChild(new,old) 替换一个节点

    - node.removeChild()  删除某个节点

    - node.cloneNode() 接受一个布尔值为参数，表示是否深复制
2. 每个元素都有零个或多个属性，通常用于为元素或其内容附加更多信息

    - getAttribute

    - setAttribute

    - removeAttribute
        
```javascript        
let div = document.getElementById("myDiv");
div.getAttribute("id")   
// "myDiv"
div.setAttribute("class", "ft");
div.removeAttribute("class");
        
```  

**dom编程**
        
```javascript  
// 动态脚本
let script = document.createElement("script");
script.src = "foo.js";
document.body.appendChild(script); 
```

3. nodeList是基于DOM文档的实时查询


```javascript
let divs = document.getElementsByTagName("div");
for (let i = 0; i < divs.length; ++i){
 let div = document.createElement("div");
 document.body.appendChild(div);
} 
// 会导致无限循环
```

**MutationObserver**
可以在 DOM 被修改时异步执行回调

新建的MutationObserver实例不会关联DOM的任何部分，需要使用observe()方法关联该实例和dom

MutationObserver对观察目标是弱引用，所以不会妨碍垃圾回收程序回收目标节点。观察目标对MutationObserver有强引用。 目标节点从 DOM 中被移除，随后 被垃圾回收，则关联的 MutationObserver 也会被垃圾回收。

```javascript
let observer = new MutationObserver(
    () => console.log('DOM was mutated!')
);
```

```javascript
<h2>这是一个title</h2>
<script>
    // 回调并非与实际的 DOM 变化同步执行
    let observer = new MutationObserver(
        // 每个回调都会收到一个 MutationRecord 实例的数组
        // 信息包括发生了什么变化，以及 DOM 的哪一部分受到了影响
        MutationRecord=>console.log(MutationRecord)
    )
    observer.observe(document.body,{attributes:true})
    document.body.className = 'title'
    /*
        多次调用 observe()方法，
        可以复用一个 MutationObserver 对象观察多个不同的目标节点
    */
    observer.observe(document.getElementsByTagName('h2'),{attributes:true})
    document.getElementsByTagName('h2').className = 'title'
    /* 
        一般，被观察元素不被垃圾回收，使用disconnect方法，
        不仅会停止此后事件变化的，也会抛弃已加入任务队列要异步执行的回调
    */
    observer.disconnect();
    /*
        调用 disconnect()并不会结束 MutationObserver 的生命。
        还可以重新使用这个观察者，再将 它关联到新的目标节点。
    */
    observer.observe(document.body,{attributes:true})
    document.body.className = 'title'
    /*
        调用 MutationObserver 实例的 takeRecords()方法可以清空记录队列，
        取出并返回其中的所有 MutationRecord 实例
    */
    observer.takeRecords()
</script>
```

**Selectors API**

- querySelector() 
- querySelectorAll() 匹配所有符合条件的节点
- matches() 接受一个CSS选择器参数，如果元素匹配则返回true，否则返回false

```javascript
var el = document.getElementById("foo");
if (el.matches("div")) {
    alert("Match!");
}
```

**元素遍历**

1. childElementCount 返回子元素个数（不包含文本节点和注释）
2. firstElementChild 
3. lastElementChild 
4. previousElementSibling 前一个
5. nextElementSibling  后一个

        
```javascript  
let parentElement = document.getElementById('parent');
let currentChildNode = parentElement.firstChild;      
``` 

**注意点：**
1. classList 属性的几个方法 add(value)  contains(value)返回boolean值 remove(value)  toggle(value) 切换类，有就删除，没有就添加
2. 文档加载document.readyState属性有两个值，loading文档正在加载，complete文档加载完成
3. innerText属性 outerText属性
4. 滚动 scrollIntoView()是唯一一个所有浏览器都支持的方法
5. cssText是一次性修改元素多个样式最快捷的方式，因为所有变化会同时生效


```javascript
<style>
    .red{
        color: red;
    }
</style>
   
<div id="foo">hello world</div>
<script>
const dom = document.getElementById('foo')
dom.addEventListener('click',()=>{
    dom.classList.toggle('red')
})
dom.innerText = '<div id="foo">hello world</div>'
dom.style.cssText="width:500px"
console.log( dom.style.cssText) // width: 500px;
</script>
```

**事件**

1. HTML事件

2. DOM0事件,事件绑定，同一个dom多次绑定事件，执行最后一次绑定事件，前面的被覆盖掉了

3. DOM2事件,事件监听，可以绑定多个，按顺序执行

4. IE事件

5. 跨浏览器事件

```javascript

// HTML事件
<script>
 function showMessage() {
 console.log("Hello world!");
 }
</script>
<input type="button" value="Click Me" onclick="showMessage()"/>
   
// DOM0事件 事件绑定
let btn = document.getElementById("myBtn");
btn.onclick = function() {
 console.log("Clicked");
};  
btn.onclick = null; // 移除事件处理程序
// 同一个dom多次绑定事件，执行最后一次绑定事件，前面的被覆盖掉了


// DOM2事件 事件监听
let btn = document.getElementById("myBtn");
btn.addEventListener("click", () => {
 console.log(this.id);
}, false);  // true表示捕获 false表示冒泡（默认值）
// 可以绑定多个，按顺序执行
/* 
    通过 addEventListener()添加的事件处理程序只能使用 removeEventListener()并传入与添
    加时同样的参数来移除。这意味着使用 addEventListener()添加的匿名函数无法移除
*/
let btn = document.getElementById("myBtn");
let handler = function() {
 console.log(this.id);
};
btn.addEventListener("click", handler, false);
btn.removeEventListener("click", handler, false); // 有效果！


// IE事件
/*
    1. 第一个参数是onClick
    2. this指向window
    3. 给同一个按钮添加了两个不同的事件处理程序,会反向执行代码，先执行后面的
    4. detachEvent可以移除事件处理程序，用法同事件监听一样
*/
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function() {
 console.log("Clicked");
});
```

6. 事件类型


    1）用户界面事件 
    
         常用的几个：
         
        - load 

        - unload  页面完全卸载后触发

        - error  window上当JavaScript报错时触发

        - resize  窗口缩放时触发

        - scroll  滚动条元素滚动时触发

    2）HTML5事件

          常用的几个：

        - beforeunload 在页面即将从浏览器中卸载时触发

        - DOMContentLoaded  在 DOM 树构建完成后立即触发,页面没有完全加载

        - readystatechange  提供文档或元素加载状态的信息

             uninitialized：对象存在并尚未初始化。 
            
             loading：对象正在加载数据。 
            
             loaded：对象已经加载完数据。
            
             interactive：对象可以交互，但尚未加载完成。 
            
             complete：对象加载完成。
