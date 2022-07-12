// uniapp https://uniapp.dcloud.net.cn/api/request/websocket.html

// 定义socket地址
const SOCKET_URL = "socket地址";

uni.connectSocket({
  url: SOCKET_URL,
  header: {
    "content-type": "application/json",
  },
  method: "GET",
  success: (data) => {
    console.log(data);
  },
});

uni.onSocketOpen(function (res) {
  console.log("WebSocket连接已打开！");
  sendSocketMessage({
    type: "bing",
    msg: "mac",
  });
});
uni.onSocketError(function (res) {
  console.log("WebSocket连接打开失败，请检查！");
});
uni.onSocketMessage(function (res) {
  console.log("收到服务器内容：" + res.data);
  // 监听服务器返回的消息
  if (res.type === "bing") {
  } else if (res.type === "ping") {
    // 心跳返回的消息
  }
});

function sendSocketMessage(msg) {
  if (socketOpen) {
    uni.sendSocketMessage({
      data: msg,
    });
  } else {
    socketMsgQueue.push(msg);
  }
}

let setInterval = null;
setInterval =
  (() => {
    sendSocketMessage({ type: "ping" });
  },
  50 * 1000);

// ====== 请求二维码图片base64参数 =====
import request from "./request";
// 请求方法 路径 参数
let codeUrl = "";
request("POST", "/piano/login/getQrcode.html", { mac: "mac地址" })
  .then((res) => {
    // res.code 1000

    if (res.code === 1000) {
      codeUrl = res.data;
    }
  })
  .catch((res) => {
    // 请求失败的回调
  });
