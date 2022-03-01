### 1. 泛型接口

```typescript
interface GenAdder<T>{(arg1:T,arg2:T):T}

let addFunc:GenAdder<string>

addFunc('1','2')

addFunc(1,2)   // 报错，函数参数类型错误
```

### 2. 泛型类

```typescript
class Adder {
    add:<T>(arg1:T,arg2:T) => T
}

const adder = new Adder()    // const adder = new Adder<string>()
adder.add = function add<T>(arg1:T,arg2:T){
    return arg1 + arg2   // 会提示报错，参数类型不确定，如果参数类型未undefined或null,就会报错，谨慎定义T
}
```

### 3. 泛型约束

```typescript
interface ILength{
    length:number
}

// 如果T没有继承ILength，arg.length会报错，因为参数如果是布尔型，就没有length属性
function getLength<T extends ILength>(arg:T):T{
    console.log(arg.length)
    return arg
}

// T继承ILength后
getLength<boolean>(false)   // 传递的翻泛型类型报错，布尔值没有length属性
getLength<string>('tom')

function getProperty<T,K>(obj:T,key:K){
    return obj[key]  // key不一定是obj的属性名，会提示
}

function getProperty1<T,K extends keyof T>(obj:T,key:K){
    return obj[key]
}

// keyof
const people = {
    name:'tom',
    age:12
}

let keys:keyof typeof people
```
