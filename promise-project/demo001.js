// 对已完成的promise执行then
console.log("start");
let p = new Promise((resolve) => {
  setTimeout(() => {
    console.log("the promise resoved");
    resolve("hello world");
  }, 1000);
});
setTimeout(() => {
  p.then((res) => {
    console.log(res);
  });
}, 2000);
