var button = document.querySelector("button");
var num1 = document.getElementById("num1") as HTMLInputElement;
var num2 = document.getElementById("num2") as HTMLInputElement;

function add(num1: number, num2: number) {
  return num1 + num2;
}

button.addEventListener("click", function () {
  console.log(add(+num1.value, +num2.value));
});

// 在控制台执行tsc main.ts命令
//生成一个新的文件 main.js
