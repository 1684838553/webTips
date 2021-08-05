## 关于 TypeScript 的一些问题

### 一、数据类型

1. 元组和数组的区别

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
   const arr3:string[] = ['1','2']
   
   ```

2. 元组越界是怎么处理

   ```typescript
   // 在处理元组越界之前，先理解什么是元组越界？
   //元组越界：元组是一个已知长度和每个元素数据类型的数组，当访问该元组元素超过元组长度，就是元组越界
   //在typescript 2.7之前，访问一个越界的元素，会使用联合类型代替，在此之后，元祖长度被固定，访问元祖越界元素会报错
   type FixedArray = [string, number, string];
   const arr: FixedArray = ["ff", 1, "ee"];
   // arr[3] = "jj";
   
   //处理数组越界
   arr.push("yy");  // 使用push时，不会报元组越界错误，push的元素必须是元组的联合类型
   console.log(arr);
   arr.pop(); // pop删除元组中的元素，不会报错
   arr.pop();
   console.log(arr);
   ```

3. any 和 unknown 的区别

   ```typescript
   //译者:any 和 unknown 的最大区别是, unknown 是 top type (任何类型都是它的 subtype) , 而 any 即是 top type, 又是 bottom type (它是任何类型的 subtype ) ,这导致 any 基本上就是放弃了任何类型检查.
   
   //unkown 是类型安全的any。任何东西都可以分配给unkown,但我们需要有条件的检测类型
   ```

4. 什么是 Never 以及 使用场景?never以及void区别

5. 枚举值是字符串和数字的区别

   ```typescript
   enum State {
       a,
       b = 3,
       c
   }
   
   console.log(State['a'],State['b'],State['c'])  // 0 3 4
   
   enum State {
     a,
     b = "string",
     c = 11,  //c要初始化，不然报错
   }
   
   console.log(State["a"], State["b"], State["c"]);  // 0 string 11
   ```

6. 枚举值不初始化的时候值时什么

7. interface 和 type 区别

8. 类型守卫是什么以及有哪些

9. Object、object 、{} 的区别

10. 什么是接口，使用场景，

11. 什么是泛型

### 二、泛型

### 三、接口

### 四、函数
