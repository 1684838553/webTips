const p = new Promise((resolve, reject) => {
  resolve({});
});
p.then((res) => {
  console.log(res); //{}
});
