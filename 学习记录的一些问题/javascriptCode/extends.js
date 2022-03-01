function Person(name, age) {
  this.name = name;
  this.age = age;
  console.log(this, "我是构造函数的this");
  this.say = function () {
    console.log("你好，我是" + this.name);
  };
}
Person.prototype.getValue = function () {
  console.log("你好,我是getValue函数");
};

const p = new Person("小明", 23);
console.log(p.say(), p.getValue()); // 你好，我是小明

function Teacher(value, age) {
  //通过call来继承父类中的属性
  Person.call(this, value, age);
}
Teacher.prototype = new Person();

const t1 = new Teacher("你好", 23);
console.log(t1.say());
