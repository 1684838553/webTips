## HTML5和websoket权威指南

### 1、websocket入门

**ws和http相比，具有的优点？**

ws解决了http实时通信的不足之处，可实现双向通信

http通过’轮询‘技术，可以定时发出求情，获取服务器的最新信息。但该方法在低信息率的情况下，将打开或关闭许多不必要的连接。

ws减少了延迟，因为一旦建立ws连接，服务器能在消息可用时发送它们。

### 2、websocket api

websocket由网络协议和websocket api组成

实例化一个websoket对象

```javascript
var ws = new WebSocket('ws://www.websocket.org')
```

websocket是纯事件驱动的。应用程序代码监听ws对象上的事件，一遍处理数据和链接状态的改变。websocket协议也是事件驱动的。

websocket变成遵循异步编程模式，即websocket连接打开，应用程序就简单地监听事件。客户端不需要主动轮询服务器得到更多的消息。要开始监听事件，只要为websocket对象添加回调函数。

#### **2.1 websocket4个不同的事件**

websocket对象调度4个不同的事件：

	1. open
 	2. message
 	3. error
 	4. close

可以用on<事件名>监听这些事件，也可使用addEventListener()方法

```javascript
							Socket.onmessage = function (event: any) {
                //获取服务器返回的消息
                    console.log("接受到消息", event.data);
                    if (JSON.parse(event.data).type === "sendGroup") {
                        let domSend = document.getElementById('send_message_content')
                        domSend!.scrollTop = domSend!.scrollHeight
                    }
                }; 

							 //一旦服务器响应了ws连接请求，open事件触发并建立一个连接。
							 //open事件对应的回调函数称作onopen
								Socket.onopen = function (event) {
                    message.success('连接成功')
                };

								//连接关闭时触发
                Socket.onclose = function (event) {
                    console.log("连接关闭", event)
                };

								//在响应意外故障时触发
                Socket.onerror = function (event) {
                    console.log("socket error", event)
                    // message.error('连接出现错误，请重试！')
                };
```

#### **2.2 websocket处理二进制数据**

除文本外，websocket消息还可以处理二进制数据，这种数据作为Blob消息或ArrayBuffer消息处理。因为设置websocket消息二进制数据类型的应用程序会影响二进制消息，所以必须在读取数据之前决定用于客户端二进制输入数据的类型

```javascript
ws.binaryType = "blob"
ws.onmessage = function (event) {
   //获取服务器返回的消息
   console.log("接受到消息", event.data);
   if (event.data instanceof Blob) {
      var blob = new Blob(event.data)
   }
};

//或
ws.binaryType = "arraybuffer"
ws.onmessage = function (event) {
   //获取服务器返回的消息
   console.log("接受到消息", event.data);
   if (event.data instanceof ArrayBuffer) {
      var a = new Unit8Array(event.data)
   }
};
```

#### **2.3 websocket对象的两个方法**

1. send()

   使用websocket在客户端和服务器之间建立全双工双向连接后，就可以在连接打开时调用send()方法，使用send()方法可从客户端向服务器发送消息。

   ```javascript
   		//登入
       function login() {
           if (!window.WebSocket) {
               return;
           }
           if (globalSocket.readyState == WebSocket.OPEN) {
               var message = {
                   type: "login",
                   token: token
               }
               //使用send()发送消息
               globalSocket.send(JSON.stringify(message));
           } else {
               console.log("登入连接没有开启.");
           }
       }
   ```

   **发送二进制消息**

   ```javascript
   var bolb = new Blob('blob content')
   ws.send(blob)
   
   //或
   var a = new Unit8Array(event.data)
   ws.send(a)
   ```

2. close()

   该方法可关闭websocket连接或终止连接尝试，如果连接已关闭，该方法就什么都不做

   ```javascript
   ws.close()
   ```

#### **2.4 websocket对象特征**

1. readyState

   websocket对象通过制度特性readyState报告其连接状态

   ​													**readyState特性、取值和状态描述**

   |       特性常量       | 取值 |     状态     |
   | :------------------: | :--: | :----------: |
   | WebSocket.CONNECTING |  0   |   正在连接   |
   |    WebSocket.OPEN    |  1   |  连接已建立  |
   |  WebSocket.CLOSEING  |  2   | 连接正在关闭 |
   |   WebSocket.CLOSED   |  3   |  连接已关闭  |

2. bufferedAmount

   检查发往服务器的缓冲数据量，特别是在客户端应用程序服务器发送大量数据时。send()是立即生效的，但数据在互联网上的传输确不是如此。

   ```javascript
   var THRESHOLD = 10240
       var ws = new WebSocket('ws://echo.websocket.org')
       ws.onopen = function(){
         setInterval(function(){
           if(ws.bufferedAmount < THRESHOLD){
             ws.send(getApplicationState())
           }
         },1000)
       }
   ```

   限制应用向服务器发送数据的速率，从而避免网络饱和。

3. protocol

   protocol特性告诉你他定的websocket上使用的协议

#### **2.5 websocket支持**

并不是所有浏览器都支持websocket，在使用前检测该浏览器是否支持websocket

```javascript
if(window.WebSocket){
      console.log('the browser supports WebSocket')
    }else{
      console.log('the browser does not supports WebSocket')
    }
```

### 3、websocket协议

websocket是定义服务器和客户端如何通过web通信的一种网络协议。协议是通信的议定规则。

web是使用统一资源定位符（url）链接的超文本文档系统。

http协议的使用，使浏览器能通过url寻找服务器资源，但是服务器端应用程序确无法主动地向客户端发送资源。即客户端只能发送请求，服务器端只能相应请求，这一特点使客户端和服务器之间不能双向通信

解决方法是使用轮询等技术，定时发送请求

​											**TCP,HTTP和WebSocket的对比**

|   特性   |     TCP      |   HTTP   |    WebSocket     |
| :------: | :----------: | :------: | :--------------: |
|   寻址   | IP地址和端口 |   URL    |       URL        |
| 并发传输 |    全双工    |  半双工  |      全双工      |
|   内容   |    字节流    | MIME消息 | 文本和二进制消息 |
| 消息定界 |      否      |    是    |        是        |
| 连接定向 |      是      |    否    |        是        |

**字节流**是指传输过程中，传输数据的最基本单位是字节的流，一个不包含边界数据的连续流；字节流是由字节组成的，主要用在处理二进制数据。

tcp/ip 三次握手，服务器端和客户端能相互通信，实现全双工

#### 3.1 WebSocket消息格式

WebSocket连接时，客户端和服务器端可在任何时候相互发送消息。这些消息在网络上用标记消息之间边界并包括简洁的类型信息的二进制语法表示。这些二进制手表标记另一个单位——帧

帧是可以合并组成消息的部分数据

帧是消息，消息在线路上的表示称为”组帧“

帧的特征：

1. 操作码

   每条WebSocket消息都有一个指定消息载荷类型的操作码。操作码由帧头的第一个字节中最后4bit组成，取数字值

   | 操作码 | 消息载荷类型 |               描述               |
   | :----: | :----------: | :------------------------------: |
   |   1    |     文本     |       消息的数据类型为文本       |
   |   2    |    二进制    |     消息的数据类型为二进制的     |
   |   8    |     关闭     | 客户端或服务器向对方发送关闭握手 |
   |   9    |     ping     |   客户端或服务器向对方发送ping   |
   |   10   |     pong     |   客户端或服务器向对方发送pong   |

2. 长度

3. 解码文本

4. 屏蔽

   帧头第二个字节的第一位表示该帧是否进行了屏蔽，WebSocket协议要求客户端拼比发送的所有帧。如有屏蔽，所有的掩码将占据帧头扩展长度部门后的4个字节。

5. 多帧消息