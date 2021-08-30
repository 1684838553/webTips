### 1、获取数组最后一个元素的方法

```javascript
const arr = [1, 3, 3, 3, 4];

//方法一
const a = arr.slice(-1)[0];

//方法二
const b = arr[arr.length - 1];

//方法三
const c = arr.at(-1);
```
