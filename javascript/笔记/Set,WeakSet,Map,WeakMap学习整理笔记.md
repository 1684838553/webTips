[WeakSet,WeakMap 学习视频](https://www.youtube.com/watch?v=MQsUiqVCJMc)

### WeakSet 和 Set 的不同点（Map 和 WeakMap 不同点一样）

1. WeakSet 只能存对象，Set 可以存任意类型的值
2. WeakSet 不能遍历，Set 能遍历
3. WeakSet 是弱引用

### WeakSet

1. new WeakSet([iterable]); //只能保存对象

2. WeakSet 持弱引用：集合中对象的引用为弱引用。 如果没有其他的对 WeakSet 中对象的引用，那么这些对象会被当成垃圾回收掉。 这也意味着 WeakSet 中没有存储当前对象的列表。 正因为这样，WeakSet 是不可枚举的。

3. 属性
   - add(value)
   - delete(value)
   - has(value)

### Set

1. 可存储任意类型的值

2. 是值的集合，键-值 相等

3. +0 和-0， NaN 之间被视为相等

4. 属性

   - size()
   - add(value)
   - delete(value)
   - has(value)
   - clear()
   - entries()
   - values()
   - keys()
   - forEach()

### WeakMap

1. WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

2. 属性

   - delete(value)
   - has(value)
   - get(value)
   - set(object,value)

### Map

1. Map 对象保存键值对，并且能够记住键的原始插入顺序。键和值可以使任意数据类型
2. 可用 forEach 和 for ... of 进行遍历
3. +0 和-0， NaN 之间被视为相等
4. 属性

   - size(value)
   - get(value) //参数为 Map 的键
   - set(a,b) //a 为键，b 为值
   - delete(value)
   - has(value)
   - entries()
   - values()
   - keys()
   - clear()

   ```javascript
   let map = new Map([
     //传入如下的数据结构，打印出Map(2) { 'name' => 'immoc', 'age' => 5 }
     ["name", "immoc"],
     ["age", 5],
   ]);

   console.log(map.get("age")); // 5
   map.set("name", "张三"); //会覆盖掉开始的name值
   console.log(map);

   map.forEach((value, key) => {
     console.log(value, key);
   });

   for (let [value, key] of map) {
     //for ... of 遍历，获取键值对
     console.log(value, key);
   }

   for (let key of map.keys) {
     //for ... of 遍历，获取键值键或值
     console.log(value, key);
   }
   ```

**<font color="red"> Object 和 Map 的比较</font>**

|          |                                        Map                                         |                                                                        Object                                                                         |
| :------: | :--------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
| 意外的键 |                  `Map` 默认情况不包含任何键。只包含显式插入的键。                  | 一个 `Object` 有一个原型, 原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。**可以用 `Object.create(null)` 来创建一个没有原型的对象，不常见** |
| 键的类型 |                     可以是任意数据类型，对象，函数，数组等都行                     |                                                                     String,Symbol                                                                     |
| 键的顺序 | `Map` 中的 key 是有序的。因此，当迭代的时候，一个 `Map` 对象以插入的顺序返回键值。 |                                                                    对象是无序集合                                                                     |
|   Size   |                                   获取键值对个数                                   |                                                           `Object` 的键值对个数只能手动计算                                                           |
|   迭代   |                                     可直接迭代                                     |                                                        需要以某种方式获取它的键然后才能迭代。                                                         |
|   性能   |                         在频繁增删键值对的场景下表现更好。                         |                                                      在频繁添加和删除键值对的场景下未作出优化。                                                       |

```

```
