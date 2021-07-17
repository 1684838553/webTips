### 1、产生跨域的原因

1. 浏览器限制。请求跨域时，浏览器会做一些校验
2. 跨域。ip，协议，端口不一样
3. ajax请求。其他请求时，不会出现跨域问题。例如，使用img的src加载

### 2、解决思路

浏览器：指定参数，让浏览器不做校验，对客户端进行修改，价值不大

ajax:使用jsonp,动态创建script标签

跨域：被调用方（允许跨域），调用方（做代理，请求时和服务器的域名一样）

1.  浏览器禁止检查

   > 命令行参数启动 chrome.exe–disable-web-security -user-data-dir=e:\forbidden-check

2. jsonp方式

   - JSONP是什么

   - 使用jsonp,后台要修改什么
   - jsonp的实现原理