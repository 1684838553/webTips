function Person(name, age) {
  this.name = name;
  this.age = age;
}
const p = new Person("tom", 3);
console.log(p);

console.log(p.__proto__ === Person.prototype); //true

Object.prototype.myInstanceof = function (obj, param) {
  const leftVaule = obj.prototype;
  let rightVaule = param.__proto__;
  while (true) {
    if (rightVaule === null) {
      return false;
    }
    if (rightVaule === leftVaule) {
      return true;
    }
    rightVaule = rightVaule.__proto__; //原型链 没有return之前一直沿着原型链判断
  }
};

console.log(myInstanceof(Array, [])); // true
