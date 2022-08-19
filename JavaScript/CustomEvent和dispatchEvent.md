## [CustomEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)

```typescript
this.targetEmitter.emit(eventType, params);
target.dispatchEvent(
  new CustomEvent(eventType, {
      param,
      composed: true
  })
);
```

## [dispatchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent)


```typescript
target.addEventListener('click', ()=>{
   // 回调函数
})
// dispatchEvent 派发事件并调用 （同步）
target.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
}));
```
