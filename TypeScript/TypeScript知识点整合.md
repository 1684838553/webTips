`Code Runner插件`

## 1. TypeScript 断言

1. 类型断言 <> as
2. 非空判断
3. 赋值断言

## 2. 关键字

1. keyof
2. in
3. typeof
4. extends
5. infer  `条件类型推断`
6. is    [ts中的is](https://segmentfault.com/a/1190000022883470)

```typescript
// infer
type Flatten<Type>  = Type extends Array<infer Item> ? Item : Type
type StrArr = Flatten<string[]> // Item在推断为String

// is 
// 返回值做类型保护和直接返回的区别
function isString(test: any): test is string {
    return typeof test === 'string'
}

function isString1(test: any): boolean {
    return typeof test === 'string'
}

function example(foo: any){
    if(isString(foo)){
        // 如下代码编译时会出错，运行时也会出错，因为 foo 是 string 不存在toExponential方法
        console.log(foo.toExponential(2));
    }

    if(isString1(foo)){
        // foo 为 any，编译正常。但是运行时会出错，因为 foo 是 string 不存在toExponential方法
        console.log(foo.toExponential(2));
    }

    // 编译不会出错，但是运行时出错
    console.log(foo.toExponential(2));
}
```

## 3. 类型保护

1. in
2. typeof
3. instanceof
4. is

## 4. 泛型

1. 泛型接口
2. 泛型类
3. 泛型约束

## 5. ts特殊符号

1. !
2. ?.
3. ?? `空值合并运算符`
4. || `??与||的区别在于，一些特殊的值，左侧为"",NaN,0时，||返回右侧操作数，??返回左侧操作数`
5. ?: `可选属性`
6. |  `并集`
7. `-`  `移除`
8. &  `交集`

```typescript
const aa: number | undefined = undefined;
const b: number = aa!;

const obj = {}
obj?.name

type User = 'name' | 'age' | 'address'

type Required1<T> = {
    [P in keyof T]-?: T[P]
}

type Bar = 'name' | 'age'
const bar: Bar = 'age'  // 'name' 'age'

type Baz = 'name' & 'age'  // never

```

## 6. ts内置泛型工具

1. Partial
2. Pick
3. Record
4. Exclude
5. Omit
6. Required
7. Readonly

```typescript

// Partial
type Partial1<T> = {
    [P in keyof T]?: T[P]
}

// Pick
type Pick1<T, K extends keyof T> = {
    [P in K]: T[P]
}

// K 键 T 值
type Record1<K extends keyof any, T> = {
    [P in K]: T
}

// Exclude
type Exclude1<T, U> = T extends U ? never : T

// Omit
type Omit1<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P]
}

type Omit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>


// Required
type Required1<T> = {
    [P in keyof T]-?: T[P]
}

// Readonly
type Readonly1<T> = {
    readonly [P in keyof T]: T[P]
}
```

