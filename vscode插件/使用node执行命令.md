### 语法

```javascript
// exec() 方法返回最大的缓冲区，并等待进程结束，一次性返回缓冲区的内容。Buffer

child_process.exec(command[, options], callback)
```
1. command： 字符串， 将要运行的命令，参数使用空格隔开
2. options ：对象，可以是：
      - cwd ，字符串，子进程的当前工作目录
      - env，对象 环境变量键值对
      - encoding ，字符串，字符编码（默认： 'utf8'）
      - shell ，字符串，将要执行命令的 Shell（默认: 在 UNIX 中为/bin/sh， 在 Windows 中为cmd.exe， Shell 应当能识别 -c开关在 UNIX 中，或 /s /c 在 Windows 中。 在Windows 中，命令行解析应当能兼容cmd.exe）
      - timeout，数字，超时时间（默认： 0）
      - maxBuffer，数字， 在 stdout 或 stderr 中允许存在的最大缓冲（二进制），如果超出那么子进程将会被杀死 （默认: 200*1024）
      - killSignal ，字符串，结束信号（默认：'SIGTERM'）
      - uid，数字，设置用户进程的 ID
      - gid，数字，设置进程组的 ID
3. callback ：回调函数，包含三个参数error, stdout 和 stderr。

```javascript
const child_process = require('child_process');

child_process.exec('命令',{cwd,'工作目录'},(err,data)=>{
  if(err !== null){
    console.log(err)
  }else{
    console.log(data)
  }
}

// 可以new一个promise,将结果用resolve返回
```
