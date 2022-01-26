[vue 50 个知识点](https://mp.weixin.qq.com/s/h2H-36iVeoyXsorZChwxyQ)

## vue 的 nextTick

[Vue NextTick获取更新后的DOM](https://www.cnblogs.com/skuld-yi/p/15838944.html)

this.nextTick(callback)

Vue 视图更新是异步的，视图不会立刻更新，而且是批量的，同一事件循环中的所有数据变化完成之后，再统一进行视图更新

作用：处理 vue 中 DOM 的异步更新

简单理解：当数据更新时，在 dom 渲染之后，会自动执行 callback 函数

触发时机：
在同一事件循环中的数据变化后，DOM 完成更新，立即执行 nextTick(callback)内的回调。

```javascript
//改变数据
vm.message = "changed";
//想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.log(vm.$el.textContent); // 并不会得到'changed'
//这样可以，nextTick里面的代码会在DOM更新后执行 Vue.nextTick(function(){
console.log(vm.$el.textContent); //可以得到'changed' })
```

![https://segmentfault.com/img/bV17xC?w=423&h=512](https://segmentfault.com/img/bV17xC?w=423&h=512)
