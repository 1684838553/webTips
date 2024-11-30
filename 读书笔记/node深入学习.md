### 0、使用nodejs的优点

1. 搜索引擎优化seo + 首屏速度优化 = 服务端渲染

2. 服务端渲染 + 前后端同构 = nodejs


### 1、读写文件

```
// 读写文件
var fs = require("fs")
fs.readFile("./assets/file1.txt",(error,data)=>{
    if(error){
        console.log("文件读取失败")
    }else{
        console.log(data.toString())
        fs.writeFile('./assets/file2.txt',data.toString(),error=>{
            console.log(error,1)
        })
    }
})


```

### 2、创建一个服务

#### util文件

```javascript
// 该文件定义一些公共的方法，以便其他模块使用


exports.status = [
    {
        code:200,
        name:'请求成功'
    },
    {
        code:404,
        name:'请求的资源（网页等）不存在'
    },
    {
        code:500,
        name:'内部服务器错误'
    },
    {
        code:301,
        name:'永久重定向'
    }
]

exports.responseState = (code)=>{
    const item = this.status.filter(item=>item.code === code)
    return item.length ? item[0] : {}
}
```

#### server.js

```javascript

// 创建一个web服务器
var http = require('http')
var fs = require('fs')
// 实现模块之间的通信功能
var util = require('./util')

var server = http.createServer()

server.on("request",(request,response)=>{
    console.log('收到客户端的请求，请求路径是：',request.url)
    // 根据不同的路由，相应不同的内容
    const url = request.url
    if(url==='/home'){
        fs.readFile('./assets/data.json',(error,data)=>{
            if(error){
                console.log(error)
                response.end(util.responseState(404).toString())
            }else{
                response.setHeader('Content-Type','text/plain;charset=utf-8')
                response.write(JSON.stringify(util.responseState(200)))
                response.end(data.toString())
            }
        })
    }else if(url === '/text'){
        fs.readFile('./assets/file1.txt',(error,data)=>{
            if(error){
                console.log(error)
            }else{
                // 在http中，Content-Type用来告诉对方我给你发送了什么类型数据
                // 不设置Content-Type会出现中文乱码现象
                response.setHeader('Content-Type','text/plain;charset=utf-8')
                response.end(data.toString())
            }
        })
    }else{
        // 读取二进制图片内容，并返回
        fs.readFile('./assets/pic1.jpg','binary',(error,data)=>{
            if(error){
                console.log(error)
            }else{
                // response.setHeader('Content-Type','images/jpeg')
                response.end(data,'binary')
            }
        })
    }
})

server.listen(3000,()=>{
    console.log('服务器启动成功，端口3000')
})
```

### 3、使用模板引擎

#### temp.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>template</title>
    <style>
        ul,li{
            list-style-type: none;
            padding: 0;
        }

        li{
            padding: 10px 26px;
            cursor: pointer;
            border-top: 1px solid #ededed;
            border-left: 1px solid #ededed;
            border-right: 1px solid #ededed;
        }

        li:last-child{
            border-bottom: 1px solid #ededed;
        }

        li:hover{
            background: #ededed;
        }

        .data{
            display: flex;
        }
        
        .stack,.label{
            flex:1;
        }


    </style>
</head>
<body>
    <ul>
        {{each list.result}}
        <li>
            <h3 class="time">
                {{$value.time}} 
            </h3>
            <div class="data">
                <div class="stack">
                   stackId: {{$value.data.stack_id}}
                </div>
                <div class="label">
                   label: {{$value.data.label}}
                </div>   
            </div>
        </li>      
        {{/each}}
    </ul>
</body>
</html>
```

#### template.js
```javascript
// 在html中使用模板引擎

var fs = require("fs");
var http = require('http')
var template = require("art-template");

var server = http.createServer()

server.on('request',(req,res)=>{
    fs.readFile("./assets/temp.html", function (err, data) {
        if (err) {
          return console.log("文件读取失败");
        }
        fs.readFile("./assets/data.json",(err,list)=>{
            if(err){
                console.log(err)
            }
            var ret = template.render(data.toString(),{
                // 将字符串转化为JSON对象
                list:JSON.parse(list.toString())
            })
            res.setHeader('Content-Type','text/html;charset=utf-8')
            res.end(ret)
        })
    })
})

server.listen(3000,()=>{
    console.log('服务器启动成功')
})

```
