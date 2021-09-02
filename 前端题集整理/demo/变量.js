{
  const arr = [1, 2];
  // arr = [2, 3];
  arr.push(2);
  console.log(arr);
  console.log(toString(undefined));
}

{
  var a = 10;
  var b = ++a;
  console.log(a, b);
}

{
  var a = 1;
  function foo() {
    var a = 2;
    function inner() {
      console.log(this.a);
    }
    inner();
  }

  foo();
}
{
  const str = " 111   11  ";
  console.log(str.trim());
}

{
  const list = [
    {
      name: "tom",
      value: 0,
    },
    {
      name: "tom1",
      value: 2,
    },
    {
      name: "tom2",
      value: 1,
    },
  ];

  const getSelectValue = (list, name) => {
    const data = list.filter((item) => item.name === name);
    if (data.length) {
      return data[0].value;
    } else {
      return name;
    }
  };

  console.log(getSelectValue(list, "tom"), getSelectValue(list, "pp"));
}
{
  var mySymbol = Symbol("oo");
  console.log(mySymbol);

  const obj = {
    name: "tom",
  };
  for (let i in obj) {
    console.log(i);
  }
  for (let i of obj) {
    console.log(i);
  }
}

{
  Number.prototype.say = () => {
    console.log("hello");
  };
  const a = 1;
  a.say();
}
