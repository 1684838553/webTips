### Body.json()

> Body mixin 的 json() 方法接收一个 Response 流，并将其读取完成。它返回一个 Promise，Promise 的解析 resolve 结果是将文本体解析为 JSON。

```javascript
fetch("./data.json")
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
    const { data, success } = res;
    if (success) {
      console.log(data, "data");
      document.getElementById("name").innerHTML =
        data.records[0].baseResponse.phone;
    }
  });
```
