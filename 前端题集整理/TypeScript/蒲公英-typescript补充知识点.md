## 初始化Typescript项目

```
npm i --save-dev typescript
```

## class和interface之间的区别

1. `class`在编译成`js`后不会被移除，`interface`会被移除
2. `class`包含真是的业务逻辑
3. `class`不能重复声明，`interface`可以

4. `type`是类型消息的别名

```typescript
interface Teacher{
    age:number
    name:string
    say:()=>void
}

type Student = Teacher

type TeacherKey = keyof Teacher   // 获取Teacher所有key的枚举

// 函数类型实例
type Adder = (x:number,y:number) => number

interface Math {
    adder1:Adder;
    adder2(x:number,y:number):number
}

const add1:Adder = function(x:number,y:number):number {
    return x + y
}


// function 中的类型不用写，能推导出来
const add2:Adder = function(x,y) {
    return x + y
}


// 泛型示例
const children:Array<string> = ['Tom']

class SpiderMan<T> extends Student {
    private friends:Array<T> = []

    consrtuctor(public firstName:string,public lastName:string){
        super(firstName,lastName)
    }

    getFriends():Array<T>{
        return this.friends
    }

    addFriend(friend:T):Array<T> {
        this.friends.push(friend)
    }
}

const p1 = new SpiderMan<Student>('aa','bb')

```
