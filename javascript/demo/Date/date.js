const date = new Date();
console.log(date);

const day = new Date(2020, 6, 7); //2020-07-07 6表示7月
day.setDate(24); // 2020-07-24
day.setDate(32); // 2020-08-01
console.log(day);

const now = new Date();
const s = now.toLocaleDateString(); // 7/22/2021
console.log(s);
const s1 = now.toLocaleDateString("en-ch"); // 22/07/2021
console.log(s1);
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const s2 = now.toLocaleDateString("en-ch", options); // Thursday, 22 July 2021
console.log(s2);
