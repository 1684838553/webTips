function parseQueryString(url) {
  var obj = {};
  var keyvalue = [];
  var key = "",
    value = "";
  var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  for (var i in paraString) {
    keyvalue = paraString[i].split("=");
    key = keyvalue[0];
    value = keyvalue[1];
    obj[key] = value;
  }
  return obj;
}

const url =
  "http://192.168.2.43:8002/#/courseManage/questionBankAdd?type=0&name=tom&age=12";
console.log(parseQueryString(url));
