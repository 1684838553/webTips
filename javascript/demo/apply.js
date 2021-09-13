// 第一步：定义myApply函数
// 第二步：传参
// 第三步：this传null，undefined或不传,指向window
// 第四步：
Function.prototype.myApply = function (context) {
  //   console.log(context, this);
  // context 是绑定对象 this是需要调用的方法
  context.fn = this;
  context.fn();
  delete context.fn();
};

var obj = {
  name: "tom",
  say: function () {
    console.log(this.name);
  },
};

var obj1 = {
  name: "terry",
};

obj.say.myApply(obj1);
