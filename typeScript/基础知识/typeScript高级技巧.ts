// 1.数组和元组

//数组是可以存储任意数据类型的有序集合
const arr1: (string | number | boolean)[] = [true, 2, "tom"];
type People = {
  name: string;
  age: number;
};
const arr2: People[] = [{ name: "tom", age: 1 }];

//元组：可理解为一个长度和每一项元素类型都确定的数组
const PepleInfo: [string, number, string] = ["tom", 3, "terry"];

let uncertain: unknown = "Hello"!;
uncertain = 12;
uncertain = { hello: () => "Hello!" };

function foo(a: unknown, b: any) {
  (a as string).split("");
  b.split("");
}

// 2. 在处理元组越界之前，先理解什么是元组越界？
//元组越界：元组是一个已知长度和每个元素数据类型的数组，当访问该元组元素超过元组长度，就是元组越界
//在typescript 2.7之前，访问一个越界的元素，会使用联合类型代替，在此之后，元祖长度被固定，访问元祖越界元素会报错
type FixedArray = [string, number, string];
const arr: FixedArray = ["ff", 1, "ee"];
// arr[3] = "jj";
arr.push("yy");
console.log(arr);
arr.pop();
arr.pop();
console.log(arr);

enum State {}

console.log(State);
