## TS 类型

- boolean
- number
- string
- undefined
- null
- symbol
- void
- 元组
- enum
- any
- unknown
- never
- Array
- object

## 数组和元组的区别

1. 数组是可以存放任何数据类型的有序集合
2. 元组是一个已知长度和每个元素类型的数组

## 元组越界怎么处理

1. 元组越界：元组是一个已知长度和没想数组类型的数组，访问元素超过元组长度，就是元组越界
2. 不能直接使用下标来处理元组越界，可以用 push 方法，push 的元素类型是元组的联合类型，pop 删除元组元素

## any 和 unknown 的区别

1. unknown 是顶级类型，any 是顶级类型，也是底层类型
2. unknown 是类型安全的 any
