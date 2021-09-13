const map = new Map([
  ["name", "tom"],
  ["age", 12],
  ["gender", "female"],
  ["address", "china"],
]);
map.set("ee", "gg");
console.log(map.get("name"));
console.log(map.keys());

map.forEach((key, value) => {
  console.log(key, value);
});

{
  function Person(name, age) {
    console.log(this, "this");
    this.name = name;
    this.age = age;

    this.say = () => {
      console.log(this.name + "的年纪" + this.age);
    };
  }
  const p = new Person("tom", 12);
  console.log(p.say());
}

{
  function Person(name) {
    this.name = name;
    this.say = function () {
      setTimeout(
        function () {
          console.log("hello " + this.name);
        }.bind(this),
        1000
      );
    };
  }
  var person = new Person("axuebin");
  person.say();
}

{
  Promise.resolve().then(function promise1() {
    console.log("promise1");
  });
  setTimeout(function setTimeout1() {
    console.log("setTimeout1");
    Promise.resolve().then(function promise2() {
      console.log("promise2");
    });
  }, 0);

  setTimeout(function setTimeout2() {
    console.log("setTimeout2");
  }, 0);
}
