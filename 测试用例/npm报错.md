# 证书失效

执行npm link 时，报以下错误
![image](https://user-images.githubusercontent.com/41181666/197445168-f7435629-3777-4f31-9feb-91e09ddb0107.png)

```
npm set strict-ssl false
set NODE_TLS_REJECT_UNAUTHORIZED=0  // 临时环境变量
```
