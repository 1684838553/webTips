## 关于 TypeScript 的一些问题

#### 1、元组和数组的区别

```typescript
//数组是可以存储任意数据类型的有序集合
const arr1: (string | number | boolean)[] = [true, 2, "tom"];
type People = {
  name: string;
  age: number;
};
const arr2: People[] = [{ name: "tom", age: 1 }];

//元组：可理解为一个长度和每一项元素类型都确定的数组
const PepleInfo: [string, number, string] = ["tom", 3, "terry"];

//一般来说，数组可以存放相同数据类型的数据，元组存放不同数据类型数据
const arr3: string[] = ["1", "2"];
```

#### 2、元组越界是怎么处理

```typescript
// 在处理元组越界之前，先理解什么是元组越界？
//元组越界：元组是一个已知长度和每个元素数据类型的数组，当访问该元组元素超过元组长度，就是元组越界
//在typescript 2.7之前，访问一个越界的元素，会使用联合类型代替，在此之后，元祖长度被固定，访问元祖越界元素会报错
type FixedArray = [string, number, string];
const arr: FixedArray = ["ff", 1, "ee"];
// arr[3] = "jj";

//处理数组越界
arr.push("yy"); // 使用push时，不会报元组越界错误，push的元素必须是元组的联合类型
console.log(arr);
arr.pop(); // pop删除元组中的元素，不会报错
arr.pop();
console.log(arr);
```

#### 3、any 和 unknown 的区别

```typescript
//译者:any 和 unknown 的最大区别是, unknown 是 top type (任何类型都是它的 subtype) , 而 any 即是 top type, 又是 bottom type (它是任何类型的 subtype ) ,这导致 any 基本上就是放弃了任何类型检查.

//顶级类型是所有其他类型的超类型。

// any unknown 是顶级类型， never是最底层的类型
//unknown 是类型安全的any。任何东西都可以分配给unknown,但我们需要有条件的检测类型
```

#### 4、什么是 never 以及 使用场景?never 以及 void 区别

```typescript
// never类型是typeScript中的底层类型。
// never表示一个永远不会发生的类型

// 应用场景：
// 一个从来不会有返回值的函数（如：如果函数内含有 while(true) {}）；
// 一个总是会抛出错误的函数（如：function foo() { throw new Error('Not Implemented') }，foo 的返回类型是 never）；

// 你也可以将它用做类型注解：
let foo: never; // ok

// never 类型仅能被赋值给另外一个 never：

let foo: never = 123; // Error: number 类型不能赋值给 never 类型

// ok, 作为函数返回类型的 never
let bar: never = (() => {
  throw new Error("Throw my hands in the air like I just dont care");
})();

// never以及void区别?
// never 表示一个从来不会优雅的返回的函数时，你可能马上就会想到与此类似的 void，然而实际上，void 表示没有任何类型，never 表示永远不存在的值的类型。

// 当一个函数返回空值时，它的返回值为 void 类型，但是，当一个函数永不返回时（或者总是抛出错误），它的返回值为 never 类型。void 类型可以被赋值（在 strictNullChecking 为 false 时），但是除了 never 本身以外，其他任何类型不能赋值给 never。
// never 没有返回值
// void 没有返回值，默认返回值为undefined
```

#### 5、枚举值是字符串和数字的区别

**1、数字枚举**

**2、字符串枚举**

**3、常量枚举：是使用 `const` 关键字修饰的枚举**

`常量枚举会使用内联语法，不会为枚举类型编译生成任何 JavaScript。不能实现反向映射`

**4、异构枚举：异构枚举的成员值是数字和字符串的混合**

<font color="red">字符串和数字的区别：</font>

- 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。在数字枚举中，第一个成员默认初始值为 0，其余成员初始值自动加 1
- <font color="red">数字枚举相对字符串枚举多了 “反向映射”(在异构枚举中该差异也存在),</font>数字枚举除了支持 **从成员名称到成员值** 的普通映射之外，它还支持 **从成员值到成员名称** 的反向映射。

```typescript
enum State {
  a,
  b = 3,
  c,
}

console.log(State["a"], State["b"], State["c"]); // 0 3 4

enum State {
  a,
  b = "string",
  c = 11, //c要初始化，不然报错
}

console.log(State["a"], State["b"], State["c"]); // 0 string 11
```

#### 7、interface 和 type 区别

**相同点：**

1. 都可以描述一个对象或函数

   ```typescript
   //对象
   interface User {
     name: string;
     age: number;
   }

   //函数
   interface setUser {
     (name: string, age: number): void;
   }

   //对象
   type Person = {
     name: string;
     age: number;
   };

   //函数
   type setPerson = (name: string, age: number) => void;
   ```

2. 都允许拓展

   ```typescript
   // 1. interface extends interface
   interface User1 extends User {
     address: string;
   }
   
   // 2. type extends type
   type Person1 = Person & { address: string };
   
   // 3. interface extends type
   type Person2 = {
     address: string;
   };
   
   interface User2 extends Person2 {
     address: string;
   }
   
   // 4. type extends interface
   type User3 = Person2 & User;
   ```

**不同点：**

1. type 可以而 interface 不行

   - type 可以声明基本类型别名，联合类型，元组等类型
   - type 语句中还可以使用 typeof 获取实例的 类型进行赋值<font color="red">type可以对类型进行赋值，interface能对类型进行声明</font>
   - 其他骚操作

   ```typescript
   // 1.type 可以声明基本类型别名，联合类型，元组等类型
   type a = string
   interface Cat {
     miao()
   }
   interface Dog {
     wang()
   }
   type b = Cat | Dog
   type PetList = [Dog,Cat]
   
   // 当你想获取一个变量的类型时，使用 typeof
   let div = document.createElement('div');
   type B = typeof div
   
   // 其他骚操作
   type StringOrNumber = string | number;  
   type Text = string | { text: string };  
   type NameLookup = Dictionary<string, Person>;  
   type Callback<T> = (data: T) => void;  
   type Pair<T> = [T, T];  
   type Coordinates = Pair<number>;  
   type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
   
   ```

2. interface 可以而 type 不行

   - interface 能够`声明合并`

   ```typescript
   
   interface User {
     name: string
     age: number
   }
   
   interface User {
     sex: string
   }
   
   /*
   User 接口为 {
     name: string
     age: number
     sex: string 
   }
   */
   
   ```

#### 8、类型守卫是什么以及有哪些

类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内

`in`,`typeof`,`instanceof`,`is`

[05ts 中类型保护](./05ts中类型保护.md)

#### 9、Object、object 、{} 的区别

```typescript
// object,表示非原始数据类型
let a:object;
a= {}
a = 1  //error

// Object,它是所有 Object 类的实例的类型
// 1. Object 接口定义了 Object.prototype 原型对象上的属性
interface Object {
  constructor: Function;
  toString(): string;
  toLocaleString(): string;
  valueOf(): Object;
  hasOwnProperty(v: PropertyKey): boolean;
  isPrototypeOf(v: Object): boolean;
  propertyIsEnumerable(v: PropertyKey): boolean;
}
// 2. ObjectConstructor 接口定义了 Object 类的属性。
interface ObjectConstructor {
  /** Invocation via `new` */
  new(value?: any): Object;
  /** Invocation via function calls */
  (value?: any): any;
  readonly prototype: Object;
  getPrototypeOf(o: any): any;
  // ···
}

declare var Object: ObjectConstructor;

// 3. {} 类型描述了一个没有成员的对象,访问该对象任意属性，ts会产生一个编译错误。但是，可以使用在 Object 类型上定义的所有属性和方法
const obj = {};
// Error: Property 'prop' does not exist on type '{}'.
obj.prop = "semlinker";
```



#### 10、什么是接口，使用场景

```typescript
interface IParam {}
```

<font color="red">**定义**：接口是一系列抽象方法的声明，是一些**方法特征的集合**</font>

<font color="red">**作用**：对 js 进行约束，通过定义一个接口，约定了变量，类，函数等按照什么格式进行声明</font>

**使用场景：**在声明一个**对象**、**函数**或者**类**时，先定义接口，确保其数据结构的一致性。

在多人协作时，定义接口尤为重要。

#### 11、什么是泛型

<font color="red">设计泛型的**关键目的**是在成员之间提供有意义的约束</font>，这些成员可以是：类的实例成员、类的方法、函数参数和函数返回值。

<font color="red">泛型（Generics）是允许同一个函数接受不同类型参数的一种模板。</font>相比于使用 any 类型，使用泛型来创建可复用的组件要更好，因为泛型会保留参数类型。

**1、泛型语法**

> T 充当类型
>
> K(Key)：表示对象中的键类型
>
> V(Value)：表示对象中的值类型
>
> E(Element)：表示元素类型
>
> U:新的类型变量

```typescript
function identity<T, U>(value: T, message: U): T {
  console.log(message);
  return value;
}

console.log(identity<Number, string>(68, "Semlinker"));
```

**2、泛型接口**

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

let bar: GenericIdentityFn<number>;
bar = (a: number) => {
  return a;
};
bar(0);
```

**3、泛型类**

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

**4、泛型工具类**

typeof , keyof , in , infer , extends , Partial , Required , Omit ...

[TypeScript 内置工具泛型](https://github.com/chenxiaochun/blog/issues/67)

[typeScript 内置工具泛型 demo](./typeScript内置工具泛型.md)

#### 12、函数重载

**TypeScript** 函数与 JavaScript 函数的区别

| TypeScript     | JavaScript         |
| -------------- | ------------------ |
| 含有类型       | 无类型             |
| 箭头函数       | 箭头函数（ES2015） |
| 函数类型       | 无函数类型         |
| 必填和可选参数 | 所有参数都是可选的 |
| 默认参数       | 默认参数           |
| 剩余参数       | 剩余参数           |
| 函数重载       | 无函数重载         |

`函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。`

<font color="red">利用参数的类型和数量的差异创建同名函数，只能在 ts 中，不能在 js 中实现</font>

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  // type Combinable = string | number;
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

在以上代码中，我们为 add 函数提供了多个函数类型定义，从而实现函数的重载。在 TypeScript 中除了可以重载普通函数之外，我们还可以重载类中的成员方法。

`方法重载是指在同一个类中方法同名，参数不同（参数类型不同、参数个数不同或参数个数相同时参数的先后顺序不同），调用时根据实参的形式，选择与它匹配的方法执行操作的一种技术。`所以类中成员方法满足重载的条件是：在同一个类中，方法名相同且参数列表不同。下面我们来举一个成员方法重载的例子：

```typescript
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: string, b: number): string;
  add(a: number, b: string): string;
  add(a: Combinable, b: Combinable) {
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    return a + b;
  }
}

const calculator = new Calculator();
const result = calculator.add("Semlinker", " Kakuqo");
```

这里需要注意的是，当 TypeScript 编译器处理函数重载时，它会查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。另外在 Calculator 类中，`add(a: Combinable, b: Combinable){ }` 并不是重载列表的一部分，因此对于 add 成员方法来说，我们只定义了四个重载方法。
