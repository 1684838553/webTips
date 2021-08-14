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
