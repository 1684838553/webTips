var temp = [2, 4, 3];
var total = temp.reduce((sum, item) => {
  console.log(sum, item);
  return sum + item;
});
console.log(total);
