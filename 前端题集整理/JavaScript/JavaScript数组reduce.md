## Array.reduce()方法的使用

- callback参数
  - accumulator 累计器
  - currentValue 当前值
  - currentIndex 当前索引
  - array 当前数组

- reduce返回值 函数累计处理的结果

### 题目一：用户

```javascript
const users = [
    {
        firstName: 'Bob',
        lastName: 'Doe',
        age: 37,
    }, {
        firstName: 'Rita',
        lastName: 'Smith',
        age: 21,
    }, {
        firstName: 'Rick',
        lastName: 'Fish',
        age: 28,
    }, {
        firstName: 'Betty',
        lastName: 'Bird',
        age: 44,
    }, {
        firstName: 'Joe',
        lastName: 'Grover',
        age: 22,
    }
];
```

从这个数组中衍生得到一个新数组。**`新数组每一项由20-30岁的用户组成，并且这些用户的全名（first name ＋ 空格 ＋ last name）需要小于10个字符。`**

```javascript
// 方法一
function getUsersInfo(user){
    return user.filter(item=>item.age >= 20 && item.age <= 30).map(item=> `${item.firstName} ${item.lastName}`).filter(item=>item.length < 10)
}
console.log(getUsersInfo(users))

// 方法二
const isInTwenties = item=>item.age >= 20 && item.age < 30
const makeFullName = item=> `${item.firstName} ${item.lastName}`
const isNeedFullName = item=>item.length < 10
function getUserInfo1(user){
    return user.filter(isInTwenties).map(makeFullName).filter(isNeedFullName)
}
console.log(getUserInfo1(users))

// 方法三
const getUserInfo2 = users.reduce(
    (acc,val)=>{
        const fullName = makeFullName(val)
        if(isInTwenties(val) && isNeedFullName(fullName)){
            acc.push(fullName)
        }
        return acc
    },[]
)
console.log(getUserInfo2)
```

**`将user中每个人的全名输出，并且以换行区分。`**
```javascript
const everyonesName = users.reduce(
    (acc, user,index) =>  `${acc}${user.firstName} ${user.lastName}\n`,
    ''
);

console.log(everyonesName)
```

### 题目二：找出来我最不喜欢吃的banana

```javascript
const fruits = [
    { name: 'apples', quantity: 2 },
    { name: 'bananas', quantity: 0 },
    { name: 'cherries', quantity: 5 }
];

const getFruit = fruits => {
   return fruits.find(item=>item.name === 'bananas')
}
console.log(getFruit(fruits))

const getFruits = fruits.reduce((acc,item)=>{
    if(item.name === 'bananas') return item
    return acc
})
console.log(getFruits)
```

### 题目三:求和

```javascript
let arr = [1,2,3,4]
const sum = arr.reduce((acc,val)=> acc+val,0)
console.log(sum)

var  arr = [];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
})
// 报错，"TypeError: Reduce of empty array with no initial value"
// 数组为空时，不设置叠加起初始值会报错，所以，最好给一个初始值
```

### 题目四：计算数组中每个元素出现的次数

```javascript
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
const nameNum = names.reduce((acc,val)=>{
    if(val in acc){
        acc[val]++
    }else{
        acc[val] = 1
    }
    return acc
},{})
console.log(nameNum)
```

### 题目五：数组去重

```javascript
let uniqueArr = [1,2,3,4,4,1]
const unique = uniqueArr.reduce((acc,val)=>{
    if(!acc.includes(val)){
        acc.push(val)
    }
    return acc
},[])
console.log(unique)
```

### 题目六：多维数组转一维数组

```javascript
let arr1 = [[0, 1], [2, 3], [4,[5,6,7]]]
const getNewArr = function(arr){
    return  arr.reduce((acc,val)=> acc.concat(Array.isArray(val) ? getNewArr(val) : val),[])
}
console.log(getNewArr(arr1))
```

### 题目七：对象属性求和

```javascript
var result = [
    {
        subject: 'math',
        score: 10
    },
    {
        subject: 'chinese',
        score: 20
    },
    {
        subject: 'english',
        score: 30
    }
];

const res = result.reduce((acc,val)=>  acc += val.score,0)
console.log(res)
```
