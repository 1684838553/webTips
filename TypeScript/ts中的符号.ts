// 1、!非空断言操作符

const aa: number | undefined = undefined;
const b: number = aa!;
console.log(b);

// 2、?.运算符
const a1 = null;
console.log(a1?.name); // 加了?，输出undefined,不加?,报错

// 3、??空值合并运算符
const bar = null ?? "china";
console.log(bar); //左侧为null或undefined时，返回右侧操作数

// ??与||的区别在于，一些特殊的值，左侧为"",NaN,0时，||返回右侧操作数，??返回左侧操作数
const baz = 0 ?? "hello";
console.log(baz);

// 3.1 短路
function AA() {
  console.log("A was called");
  return undefined;
}
function BB() {
  console.log("B was called");
  return false;
}
function CC() {
  console.log("C was called");
  return "foo";
}

// console.log(AA() ?? CC());
console.log(BB() ?? CC());

// 3.2 不能与&&或||操作符共用
// 若空值合并运算符 ?? 直接与 AND（&&）和 OR（||）操作符组合使用 ?? 是不行的。会抛出异常
// 但当使用括号来显式表明优先级时是可行的

(null || undefined) ?? "foo"; // 返回 "foo"

// 4、?: 可选属性
interface IPerson {
  name?: string; //name属性为可选
}

// 4.1 Partial<T>
interface IParam {
  name: string;
  age: string;
  address?: string;
}
type IParam1 = Partial<IParam>;

// 实现方式
// type Partial<T> = {
//   [P in keyof T]?: T[P];  //遍历T中的属性
// };

// 4.2 Required<T>
type IParam2 = Required<IParam>; //使IParam中所有属性必选，包括可选属性

// 实现方式
// type Required<T> = {
//   [P in keyof T]-?: T[P];  //通过 -? 移除了可选属性中的 ?，使得属性从可选变为必选的
// };

type IParam3 = {
  [key in keyof IParam]: IParam[key]; //直接遍历，可选属性还是可选，不会变成必选
};

// 5、&运算符
// 5.1 同名基础类型属性的合并
interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string;
}

type XY = X & Y;
type YX = Y & X;

// let p: XY = {
//   c: "", // c 类型警告，为never类型
//   d: "",
// };

//为什么接口 X 和接口 Y 混入后，成员 c 的类型会变成 never 呢？
//这是因为混入后成员 c 的类型为 string & number，即成员 c 的类型既可以是 string 类型又可以是 number 类型。
//很明显这种类型是不存在的，所以混入后成员 c 的类型为 never。

// let q: YX = {
//   c: "", // 同上
//   d: "",
// };

// 5.2 同名非基础类型属性的合并
interface D {
  d: boolean;
}
interface E {
  e: string;
}
interface F {
  f: number;
}

interface A {
  x: D;
}
interface B {
  x: E;
}
interface C {
  x: F;
}

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: "semlinker",
    f: 666,
  },
};

console.log("abc:", abc);

// 6、 | 分隔符
type EventNames = "click" | "scroll" | "mousemove";

// 类型保护 in关键词
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
let params = {
  name: "",
  startDate: new Date(),
  privileges: ["1"],
};
printEmployeeInformation(params);

// 类型保护 typeof关键词
function getType(name) {
  if (typeof name === "string") {
    return name;
  }
  throw new Error("类型错误");
}
getType(1);

// 类型保护 instanceof关键词
function Person(name) {
  this.name = name;
}

const p1 = new Person("china");
if (p1 instanceof Person) {
  console.log("p1是我的实例");
}

//类型保护 类型谓词 is
function isNumber(x: any): x is number {
  return typeof x === "number";
}
