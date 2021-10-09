## JS 对象数组去重

[JS 对象数组去重](https://juejin.cn/post/6998856870869860383)

1. find

```javascript
const sourceObjectArray = [
  { name: "小明", id: 1 },
  { name: "小红", id: 2 },
  { name: "小莉", id: 3 },
  { name: "小明", id: 1 },
  { name: "小红", id: 2 },
];
let targetObjectArray = [];

sourceObjectArray.forEach((item) => {
  const findItem = targetObjectArray.find(
    (child) => JSON.stringify(child) === JSON.stringify(item)
  );
  if (!findItem) targetObjectArray.push(item);
});
```

2. Map

```javascript
function newMapDeDuplicationPack(source, key) {
  let target = [];
  let targetMap = new Map();
  source.forEach((item) => {
    const setItem = key ? JSON.stringify(item[key]) : JSON.stringify(item);

    if (!targetMap.get(setItem)) {
      target.push(item);
      targetMap.set(setItem, item);
    }
  });

  targetMap.clear();

  return target;
}
```

2. Set

```javascript
function newSetDeDuplicationPack(source, key) {
  let target = [];
  let targetSet = new Set();
  source.forEach((item) => {
    const setItem = key ? JSON.stringify(item[key]) : JSON.stringify(item);

    if (!targetSet.has(setItem)) {
      target.push(item);
      targetSet.add(setItem);
    }
  });

  targetSet.clear();

  return target;
}
```
