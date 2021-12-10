## formData主要是用来做什么的？它的操作方法有哪些？

1. FormData 接口提供了一种表示表单数据的键值对 key/value 的构造方式
2. 请求时请求头格式为 "multipart/form-data"，它会使用和表单一样的格式。

### form-data请求格式


```javascript
  let data = new FormData()
  let userObj = {
      userName:'terry',
      age:12
  }
  data.append('user',JSON.stringify(userObj))
  data.append('one','one')
  data.set('two',10)
  data.get('two') // 10
  data.get('user') // {"userName":"terry","age":12}
  data.has('age') // false
  data.values().next() // {done: false,value: "{\"userName\":\"terry\",\"age\":12}"}
  data.keys().next() // {done: false,value: "user"}
  data.delete('user')
  data.get('user') // null
```
