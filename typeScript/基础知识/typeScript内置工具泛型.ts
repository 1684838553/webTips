interface IUser {
  name: string;
  age: number;
  job: string;
  gender: number;
  status: number;
}

//1、Partial 参数可选
function queryUser(params: Partial<IUser>) {}
queryUser({ name: "" });

//2、Pick 在参数对象中选择某些字段作为该函数参数，不要重新定义
function queryUser1(params: Partial<Pick<IUser, "name" | "job">>) {}
queryUser1({});

//3、Record 对象中必须有 K 中的字段，k的类型为 T
// type Record<K extends keyof any, T> = {
//     [P in K]: T;
// };
type IUser2 = Record<"age" | "status", number | string>;
const user: IUser2 = {
  age: "",
  status: "",
};

// type Exclude<T, U> = T extends U ? never : T;
//4、Exclude T是定义的类型，U被排除掉被排除掉的数据
// 可能只用于常量
type TFoo = Exclude<1 | 2, 1 | 3>;
const a: TFoo = 2;

//Omit<T, K> = Pick<T, Exclude<keyof T, K>>

// 5、关键字 in
enum Status {
  "error",
  "success",
  "default",
}

//用于枚举类型
type StatusMap = {
  [key in Status]: string;
};

let state: StatusMap = {
  0: "0",
  1: "1",
  2: "2",
};

//用于联合类型
type Peoperty = "name" | "age" | "phone";

type PeopertyObject = {
  [key in Peoperty]: string;
};

// obj中的key值为Peoperty中所有值
const obj: PeopertyObject = {
  name: "",
  age: "",
  phone: "",
};

// 使用于基础类型
type StringKey = {
  [key in string]: string;
};

const param: StringKey = {
  1: "name",
};

//等同于
type StringKey1 = {
  [key: string]: string;
};
const param1: StringKey1 = {
  1: "name",
};

type IParams = {
  name: string;
  age: number;
};

type IParams1 = {
  [key in keyof IParams]: IParams[key];
};

// 6 、typeof
const value: number = 10;

const value2: typeof value = 100;

// const value3 = 10;

// const value4: typeof value3 = 100;

const data = {
  value: 123,
  text: "text",
  subData: {
    value: false,
  },
};

type Data = typeof data;

// 7、extends
interface Person {
  name: string;
  age: number;
}

interface Player extends Person {
  // item: 'ball' | 'swing';
}

const A: Player = {
  name: "",
  age: 1,
};

// 8、infer

type A1 = Array<string>;
type MyFunc<T> = T extends infer U ? U : T;
type a1 = MyFunc<A1>;

type MyFunc1<T> = T extends (infer U)[] ? U : T; //解包，返回数组中的类型
type a2 = MyFunc1<A1>;

// 9、as
type B1 = string | number;
function foo(param: B1) {
  return (param as string).indexOf("/") > -1;
}

function foo1(param: B1): param is string {
  return typeof param === "number";
  // return 123
}

var ai = foo1(1);
