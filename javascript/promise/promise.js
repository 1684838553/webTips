const { resolve } = require("node:path");

function Promise(callback) {
  var self = this; //promise实例
  self.status = "PENDING";
  self.data = undefined; //promise的值
  self.onResolvedCallback = []; // Promise resolve时的回调函数集
  self.onRejectedCallback = []; // Promise reject时的回调函数集
  callback(resolve, reject); // 执行executor并传入相应的参数

  //resolve
  function resolve(value) {
    if (self.status === "PENDING") {
      self.status = "FULFILLED";
      self.data = value;

      for (let i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value);
      }
    }
  }

  //resolve
  function reject(error) {
    if (self.status === "PENDING") {
      self.status = "REJECTED";
      self.data = error;

      for (let i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](error);
      }
    }
  }
}

//在Promise原型链上定义then
Promise.prototype.then = function (onResolved, onRejected) {
  let self = this;
  let promise2;

  //判断参数是否是函数
  onResolved =
    typeof onResolved === "function" ? onResolved : function (value) {};
  onRejected =
    typeof onRejected === "function" ? onRejected : function (result) {};

  // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
  // 因为考虑到有可能throw，所以我们将其包在try/catch块里
  if (self.self === "resolved") {
    return (promise2 = new Promise(function (resolve, reject) {
      // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果,否则，以它的返回值做为promise2的结果
      try {
        var x = onResolved(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
        resolve(x);
      } catch (e) {
        // 如果出错，以捕获到的错误做为promise2的结果
        reject(e);
      }
    }));
  }

  if (self.self === "rejected") {
    return (promise2 = new Promise(function (resolve, reject) {
      // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果,否则，以它的返回值做为promise2的结果
      try {
        var x = onRejected(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
        reject(x);
      } catch (e) {
        // 如果出错，以捕获到的错误做为promise2的结果
        reject(e);
      }
    }));
  }

  // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
  // 只能等到Promise的状态确定后，才能确实如何处理。
  // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
  // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
  if (self.self === "pending") {
    self.onResolvedCallback.push(function (value) {
      try {
        var x = onResolved(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
      } catch (e) {
        reject(e);
      }
    });

    self.onRejectedCallback.push(function (reason) {
      try {
        var x = onRejected(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
      } catch (e) {
        reject(e);
      }
    });
  }
};

// 为了下文方便，我们顺便实现一个catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};
