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
// 可能只只用于常量
type TFoo = Exclude<1 | 2, 1 | 3>;
const a: TFoo = 2;
