var MaskWord = ["敏感词1", "敏感词2", "敏感词3"];
var str = "llllllll敏感词3rrrrr敏感词1gggg敏感词2";

function maskWordsStr(str, wordList) {
  wordList.forEach((item) => {
    var reg = new RegExp(item, "g");
    str = str.replace(reg, `<font color='red'>${item}</font>`);
  });
  return str;
}
console.log(maskWordsStr(str, MaskWord));

const arr = [
  {
    id: 3,
  },
  {
    id: 6,
  },
  {
    id: 1,
  },
];

const a = arr.sort((a, b) => {
  return a.id - b.id;
});
console.log(a);
