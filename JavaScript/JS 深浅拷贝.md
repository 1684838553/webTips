> [一文看懂 JS 深浅拷贝，彻底告别踩坑](https://juejin.cn/post/7517917118408900627)
>

### 什么是拷贝？为什么要拷贝？

拷贝，就是复制一个对象，让新对象和原对象“长得一模一样”。但“复制”分为两种：浅拷贝和深拷贝。

1. 浅拷贝：只复制第一层属性，如果属性是引用类型（如对象、数组），复制的是“引用地址”。

2. 深拷贝：递归复制所有层级，嵌套对象也会被完整复制，新旧对象互不影响。

3. 为什么要拷贝呢？

    在 JS 中，为了避免直接修改原数据带来的副作用。这时候我们就需要复制这个对象，来操作复制的对象


### JS 中的数据类型

理解拷贝，先要知道 JS 的数据类型：

1. 基本类型：`number、string、boolean、null、undefined、symbol、bigint（存储在栈内存）`

2. 引用类型：`object、array、function、date、regexp 等（存储在堆内存）`

基本类型直接存值，引用类型存的是“地址”

### 浅拷贝：复制表面，引用共享

只需要复制一层属性，不关心嵌套对象是否联动

常见实现方式

1. Object.assign({}, obj)

2. 数组解构 [...arr]

3. arr.slice()

4. [].concat(arr)

5. Object.create(obj)

例子说明

```javascript
const obj1 = {
  name: "小华",
  info: { age: 18 }
};

const obj2 = Object.assign({}, obj1);

obj2.name = "小鱼";
obj2.info.age = 20;

console.log(obj1); // { name: "小华", info: { age: 20 } }

// name 是基本类型，修改 obj2.name 不影响 obj1
// info 是对象，浅拷贝只复制了引用，obj2.info.age 改变会影响 obj1.info.age
```

### 深拷贝：彻底分离，互不影响

1. JSON.parse(JSON.stringify(obj))

简单粗暴，但有缺陷：不能识别 bigin(会报错)，不能拷贝 function、symbol、undefined，也无法处理循环引用

```javascript
const obj1 = {
  name: "小华",
  info: { age: 18 }
};
const obj2 = JSON.parse(JSON.stringify(obj1));
obj2.info.age = 20;
console.log(obj1); // { name: "小华", info: { age: 18 } }

// obj2 完全独立，修改嵌套属性不会影响 obj1
```

2. structuredClone(obj)

新标准，支持更多类型，但兼容性有限。
手写递归深拷贝

```javascript
function deepCopy(obj) {
    let newObj = {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 先判断 obj[key] 值的类型
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                // 如果是对象
                newObj[key] = deepCopy(obj[key])
            } else {  
                // 如果不是对象
                newObj[key] = obj[key]
            }
        }
    }
    return newObj
}

const arr1 = [1, 2, { a: 3 }];
const arr2 = deepCopy(arr1);
arr2[2].a = 100;
console.log(arr1); // [1, 2, { a: 3 }]

// 改变了 arr2 中 {a: 3} 的值，但是原数组 arr1 的值不变
```

### 常见误区与注意点

1. 浅拷贝只复制一层，嵌套对象还是“共用”。

2. 深拷贝要递归，但要注意循环引用、特殊类型（如 Date、函数等）。

3. JSON.parse(JSON.stringify(obj)) 不能拷贝 function、undefined、symbol，也会丢失特殊对象。

4. structuredClone 支持更全，但老浏览器不兼容。

