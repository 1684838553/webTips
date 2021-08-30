function Person(name, age) {
  this.name = name;
  this.age = age;
}
const p = new Person("tom", 3);
console.log(p);

console.log(Object.getPrototypeOf(p));
