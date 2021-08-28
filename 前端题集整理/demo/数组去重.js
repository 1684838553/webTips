const uniqueKeyInArr = (arr) => {
  const res = new Map();
  return arr.filter((item) => !res.has(item.key) && res.set(item.key, 1));
};

const arr = [
  {
    key: "aa",
  },
  {
    key: "ww",
  },
  {
    key: "ww",
  },
  {
    key: "aa",
  },
];
console.log(uniqueKeyInArr(arr));
