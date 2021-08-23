// 新建一个块级作用域
{
  const a = {
    a: 2,
    b: 4,
    c: 8,
    d: 12,
  };
  console.log(Object.entries(a));
  const obj = Object.entries(a).filter(([key, value]) => value > 2);
  //Object.fromEntries() 方法把键值对列表转换为一个对象。
  console.log(Object.fromEntries(obj));

  function getData() {
    const b = {};
    for (let key in a) {
      if (a[key] > 4) {
        b[key] = a[key];
      }
    }
    return b;
  }
  console.log(getData(), "pp");
}

{
  const str1 = "hello";
  console.log(str1.padStart(10, "y")); // 'yyyyyhello'
  String.prototype.myPadStart = function (strLength, str = " ") {
    if (!strLength) {
      throw new Error("字符串预期长度不能为空");
    }
    //目标字符串
    const taragetStr = String(this);
    const taragetStrLength = String(this).length;
    if (taragetStrLength <= strLength) {
      return taragetStr;
    } else {
      //可拼接字符串长度
      const concatLength = strLength - taragetStrLength;
      //拼接字符串长度
      const strLength = str.length;
      let num = concatLength / strLength;
      let overNum = concatLength % strLength;

      function concatStr(taragetStrLength, str) {
        taragetStr = str + taragetStr;
        return taragetStr;
      }

      //   function* (){

      //   }
    }

    console.log(this, String(this), "this");
    return "---";
  };
  console.log(str1.myPadStart(4));
}
