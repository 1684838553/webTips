const a = " kkk   ";
console.log(a.trim(), a.trim().length);

function Parent(name) {
  this.name = name;
}
function Child() {
  this.sex = "boy";
  Parent.call(this, "child1");
}
var child1 = new Child();
console.log(child1);

Parent.prototype.sayName = function () {
  console.log("tim");
};
function Child1() {}
Child1.prototype = new Parent("pp");
const c = new Child1();
console.log(c.name, "p");

{
  function Parent(name) {
    this.name = name;
  }
  function Child() {
    this.sex = "boy";
    // this.name = "tom";
    Parent.call(this, "child");
    this.name = "terry";
  }
  var child1 = new Child();
  console.log(child1);
  console.log(child1.name);
}
