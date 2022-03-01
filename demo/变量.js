// {
//   const arr = [1, 2];
//   // arr = [2, 3];
//   arr.push(2);
//   console.log(arr);
//   console.log(toString(undefined));
// }

// {
//   var a = 10;
//   var b = ++a;
//   console.log(a, b);
// }

// {
//   var a = 1;
//   function foo() {
//     var a = 2;
//     function inner() {
//       console.log(this.a);
//     }
//     inner();
//   }

//   foo();
// }
// {
//   const str = " 111   11  ";
//   console.log(str.trim());
// }

// {
//   const list = [
//     {
//       name: "tom",
//       value: 0,
//     },
//     {
//       name: "tom1",
//       value: 2,
//     },
//     {
//       name: "tom2",
//       value: 1,
//     },
//   ];

//   const getSelectValue = (list, name) => {
//     const data = list.filter((item) => item.name === name);
//     if (data.length) {
//       return data[0].value;
//     } else {
//       return name;
//     }
//   };

//   console.log(getSelectValue(list, "tom"), getSelectValue(list, "pp"));
// }
// {
//   var mySymbol = Symbol("oo");
//   console.log(mySymbol);

//   const obj = {
//     name: "tom",
//   };
//   for (let i in obj) {
//     console.log(i);
//   }
//   for (let i of obj) {
//     console.log(i);
//   }
// }

// {
//   Number.prototype.say = () => {
//     console.log("hello");
//   };
//   const a = 1;
//   a.say();
// }

{
  //   const getYearNumber = (data) => {
  //     if (data) {
  //       const mun = data.getFullYear() - new Date()
  //       return mun;
  //     } else {
  //       return 0;
  //     }
  //   };

  //data +1

  function getAgeByPid(strBirthday) {
    var birthYear = strBirthday.substr(0, 4);
    var birthMonth = strBirthday.substr(4, 2);
    var birthDay = strBirthday.substr(6, 2);

    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate() - 1;

    if (nowYear == birthYear) {
      returnAge = 0; //同年 则为0岁
    } else {
      var ageDiff = nowYear - birthYear; //年之差
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay; //日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          var monthDiff = nowMonth - birthMonth; //月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge; //返回周岁年龄
  }
  console.log(getAgeByPid("20030905"));
}
