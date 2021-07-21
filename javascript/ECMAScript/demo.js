// const s = new Set();
// s.add(+0).add(-0);
// s.entries();
// console.log(s); // Set(0) {}

//求差集
const s1 = new Set([1, 2, 3, 4]);
const s2 = new Set([3, 4, 5, 6]);
const s3 = new Set([...s1].filter((item) => !s2.has(item)));
const s4 = new Set([...s2].filter((item) => !s1.has(item)));
console.log([...s3, ...s4]);

//WeakSet
const s = new WeakSet();
const o = [1, 2, 3, 4];
s.add(o);
console.log(s.size);

//map

let m = new Map(); //键值比对象强大，对象只能是字符串和Symbol，Map的键可以为任意类型数据
let obj = {
  name: "immoc",
};
let a = 3;
m.set(obj, "es6").set(a, "es2015");
let b = m.has(obj);
m.delete(obj);
let c = m.has(obj);
console.log(m, b, c);

let map = new Map([
  //传入如下的数据结构，打印出Map(2) { 'name' => 'immoc', 'age' => 5 }
  ["name", "immoc"],
  ["age", 5],
]);
// map.clear()
console.log(map.get("age")); // 5
map.set("name", "张三"); //会覆盖掉开始的name值
console.log(map);

map.forEach((value, key) => {
  console.log(value, key);
});

for (let [value, key] of map) {
  //for ... of 遍历，获取键值对
  console.log(value, key);
}

for (let key of map.keys) {
  //for ... of 遍历，获取键值键或值
  console.log(value, key);
}

//WeakMap
let wm = new WeakMap();
const o1 = { name: 2 };
wm.set(o1, 1);
console.log(wm, wm.length);
