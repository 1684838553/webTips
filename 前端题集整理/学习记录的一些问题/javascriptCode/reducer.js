const fruits = [
  { name: "apples", quantity: 2 },
  { name: "bananas", quantity: 0 },
  { name: "cherries", quantity: 5 },
];
const thisShitIsBananas = fruits.reduce((accumulator, fruit) => {
  if (fruit.name === "bananas") return fruit;
  return accumulator;
}, []);
console.log(thisShitIsBananas, "thisShitIsBananas");

const users = [
  {
    firstName: "Bob",
    lastName: "Doe",
    age: 37,
  },
  {
    firstName: "Rita",
    lastName: "Smith",
    age: 21,
  },
  {
    firstName: "Rick",
    lastName: "Fish",
    age: 28,
  },
  {
    firstName: "Betty",
    lastName: "Bird",
    age: 44,
  },
  {
    firstName: "Joe",
    lastName: "Grover",
    age: 22,
  },
];

const reduce1 = users.reduce((accumulator, item, index) => {
  if (item.age >= 20 && item.age < 30) {
    const name = item.firstName + " " + item.lastName;
    if (name.length <= 10) {
      accumulator.push(item);
    }
  }
  return accumulator;
}, []);
console.log(reduce1);
