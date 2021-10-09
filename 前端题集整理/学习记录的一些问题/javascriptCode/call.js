Function.prototype.mycall = function (context) {
  console.log(this, arguments);
  const arg = [...arguments].slice(1);
  context.fn = this;
  const result = context.fn(...arg);
  delete context.fn;
  return result;
};

const obj = {
  name: "1",
};

let name = "2";

function say(a, b) {
  console.log(this.name, a, b, "我是say函数");
}

say.mycall(obj, 1, 2, 3);

// say.call(null, 1, 2, 5);

Function.prototype.myApply = function (context) {
  console.log(this, context, arguments, "this");
  context.fn = this;
  const arg = [...arguments].slice(1)[0];
  console.log(arg);
  context.fn(...arg);
  delete context.fn;
};
const obj = {
  name: "1",
};
function say(a, b) {
  console.log(this.name, a, b, "我是say函数");
}
say.myApply(obj, [1, 2]);
