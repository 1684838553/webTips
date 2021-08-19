// const a = [1, 2, 3, 4];

// a[-1] = "a";
// console.log(a[-1], a.length);

//实现 arr[-1] = arr[arr.length - 1]
function createArr(...ele) {
  let handler = {
    //target 目标数组 key 下标
    get(target, key) {
      let index = Number(key);
      if (index < 0) {
        index = String(target.length + index);
      }
      return Reflect.get(target, index);
    },
  };
  let target = [...ele];
  return new Proxy(target, handler);
}

var arr1 = createArr(1, 2, 3);
console.log(arr1[0]);
console.log(arr1[-2]);

const transArr = Array(10)
  .join(",")
  .split(",")
  .map((v, i) => {
    return i;
  });
console.log(transArr[0]);

const b = Array(10)
  .fill()
  .map((v, i) => i);
console.log(b[0]);
