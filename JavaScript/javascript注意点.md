[属性描述符](https://segmentfault.com/a/1190000007434923)

### 技巧一

console不仅仅是用来打印日志的工具，掌握一些高级用法，能让你在调试代码时事半功倍

```javascript
// 格式化输出对象，比普通log更清晰
const complexObject = {
    name: '复杂对象',
    data: [
        { id: 1, value: '数据1' },
        { id: 2, value: '数据2' }
    ]
};
console.table(complexObject);
// 计时功能，统计代码执行时间
console.time('代码执行时间');
for (let i = 0; i < 1000000; i++) {}
console.timeEnd('代码执行时间');
// 分组输出日志，方便整理调试信息
console.group('重要逻辑');
console.log('步骤1');
console.log('步骤2');
console.groupEnd();
```
在排查性能瓶颈、定位复杂bug时，这些console高级用法能让你快速找到问题根源，告别“无头苍蝇”式调试！

### 技巧二

`Object.fromEntries()` 轻松将键值对数组转为对象

当从后端接口拿到的数据是[['key1', 'value1'], ['key2', 'value2']]这种键值对数组格式时，想把它转为对象方便使用，传统方法可能需要写一堆循环代码

```javascript
// 假设后端返回的用户信息是键值对数组
const userArray = [
    ['name', 'Tom'],
    ['age', 28],
    ['email', 'tom@example.com']
];
// 使用Object.fromEntries()将键值对数组转为对象
const userObject = Object.fromEntries(userArray);
console.log(userObject); 
// {name: 'Tom', age: 28, email: 'tom@example.com'}
```
