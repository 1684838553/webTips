## 虚拟 DOM

### 什么是虚拟 dom

一个能表示 DOM 树的对象，通常含有标签名、标签上的属性、事件监听和子元素，以及其他属性

### DOM 操作慢（相对于原生 js）?虚拟 DOM 快？ （不一定）

1. 虚拟 DOM 比真实 dom 快

- 减少 DOM 操作。虚拟 DOM 将多次 DOM 操作合并为一次操作
- DOM diff 可以省掉多余的 DOM 操作，新增时，直接在添加一条数据

2. 可以跨平台

### 获取虚拟 DOM

```javascript
const vNode = {
  key: null,
  props: {
    children: [
      {
        type: "span",
      },
      {
        type: "span",
      },
    ],
    className: "red",
    onClick: () => {},
  },
  ref: null,
  type: "div",
};
```

- react
  React.createElement
- Vue
  在 render 函数中得到 h

## 缺点

需要额外的创建函数，如 createElement 或 h

## DOM diff
