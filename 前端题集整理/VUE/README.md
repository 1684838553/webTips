### 1. 点击返回到上一个页面，但这时候之前的搜索记录和翻页就消失了，用户体验不好。

**解决方案**

[Vue路由返回恢复页面状态](https://www.cnblogs.com/skuld-yi/p/15004664.html)

### 2. 在vue项目中使用fetch

```javascript
export const getJSONData = async () => {
    return await fetch('./data.json').then(res => res.json())
}

const { data } = await getJSONData()
console.log(data, 'data')
```

### 3. [JS宏任务和微任务](https://www.cnblogs.com/skuld-yi/p/14614421.html)
