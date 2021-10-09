// const sourceObjectArray = [
//   { name: "小明", id: 1 },
//   { name: "小红", id: 2 },
//   { name: "小莉", id: 3 },
//   { name: "小明", id: 1 },
//   { name: "小红", id: 2 },
// ];
// let targetObjectArray = [];

// sourceObjectArray.forEach((item) => {
//   const findItem = targetObjectArray.find((child) => item.id === child.id);
//   if (!findItem) targetObjectArray.push(item);
// });

// console.log(targetObjectArray, "targetObjectArray");

const sourceObjectArray2 = [
  { name: "小明", id: 1 },
  { name: "小红", id: 2 },
  { name: "小莉", id: 3 },
  { name: "小明", id: 1 },
  { name: "小红", id: 2 },
  { name: "小黑", id: 2 },
];

const getUniqune = (tempArr, key) => {
  let temp = new Map();
  let list = [];
  tempArr.forEach((item, index) => {
    const setItem = key ? JSON.stringify(item[key]) : JSON.stringify(key);
    console.log(setItem, index);
    if (!temp.get(setItem)) {
      temp.set(setItem, item);
      console.log(temp, temp.size, list, index);
      list.push(item);
    }
  });
  console.log(temp);
  temp.clear();
  return list;
};
// console.log(getUniqune(sourceObjectArray2, "id"));

function newSetDeDuplicationPack(source, key) {
  let target = [];
  let targetSet = new Set();
  source.forEach((item) => {
    const setItem = key ? JSON.stringify(item[key]) : JSON.stringify(item);

    if (!targetSet.has(setItem)) {
      target.push(item);
      targetSet.add(setItem);
    }
  });

  targetSet.clear();

  return target;
}

console.log(getUniqune(sourceObjectArray2, "id"));
