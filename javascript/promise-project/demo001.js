// // 对已完成的promise执行then
// console.log("start");
// let p = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("the promise resoved");
//     resolve("hello world");
//   }, 1000);
// });
// setTimeout(() => {
//   p.then((res) => {
//     console.log(res);
//   });
// }, 2000);

// console.log("here we go");

// new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("hello");
//   }, 1000);
// })
//   .then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve("china");
//       });
//     });
//   })
//   .then((value) => {
//     console.log(value + " china");
//   });

// let p = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("the promise fulfilled");
//     resolve("hello");
//   }, 1000);
// });

// setTimeout(() => {
//   p.then((value) => {
//     console.log(value);
//   });
// }, 3000);

// let p = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("the promise fulfilled");
//     resolve("hello");
//   }, 1000);
// })
//   .then((value) => {
//     console.log(value);
//     console.log("everyone");
//     (function () {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           console.log("cat");
//           resolve("drunk");
//         }, 2000);
//       });
//     })();
//     return false;
//   })
//   .then((value) => {
//     console.log(value + " china");
//   });

// let p = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve({});
//   }, 1000);
// }).then((res) => {
//   console.log(res);
// });
