## [CustomEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)

```typescript
this.targetEmitter.emit('onClose', params);
target.dispatchEvent(
  new CustomEvent('onClose', {
      param,
      composed: true
  })
);
```

## [dispatchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)


```typescript
let isClick = false;
target.addEventListener('click', ()=>{
   isClick = true;
})
// dispatchEvent 派发事件并调用 （同步）
target.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
}));
```
