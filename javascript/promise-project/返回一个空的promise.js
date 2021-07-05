const p = new Promise((resolve, reject) => {
  resolve(1);
});
p.then((res) => {
  console.log(res); //1
});
