# 防抖与节流

- 防抖和节流都是为了阻止操作高频触发，从而实现性能优化。

## 防 抖（debounce）

### 概念

- 防抖是指当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次。（防止用户频繁触发一个事件，只执行该事件的最后一次。）

### 应用

1. 文本编辑器实时保存，当无任何更改操作一秒后进行保存。
2. 页面 resize 事件，常见于需要做页面适配的时候，需要根据最终呈现的页面情况进行 dom 渲染。
3. input 框搜索联想，用户输入间隔大于某个值（如 1s），就当做用户输入完成，发送请求展示下拉列表。

---

## 节 流（throttle）

### 概念

- 节流是指当持续触发事件时，每隔一段时间事件处理函数才会执行一次。

### 应用

1. scroll 事件，如每隔 200ms 获取一次滚动条位置信息等。
2. input 框搜索联想，用户持续输入时每隔一秒发送一次请求展示下拉列表 (具体使用哪种方案看业务需求)。

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        text-align: center;
        font-size: 50px;
      }
    </style>
  </head>
  <body>
    <div>259296</div>
    <div style="vertical-align: top">
      651265
      <input type="text" />
    </div>
    <script>
      let input = document.querySelector("input");
      let timer = null;
      input.oninput = function () {
        // 事件触发次数由延时器的个数决定
        clearTimeout(timer);
        timer = setTimeout(() => {
          console.log(input.value);
        }, 1000);
      };

      input.oninput = function () {
        // 事件触发次数由延时器的个数决定
        if (timer) {
          return;
        }

        timer = setTimeout(() => {
          console.log(input.value);
          timer = null;
        }, 1000);
      };
    </script>
  </body>
</html>

```
### backToTop.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .button {
        position: fixed;
        bottom: 200px;
        right: 50px;
        display: none;
      }
      button {
        width: 100px;
        height: 62px;
        cursor: pointer;
        font-size: 18px;
        font-weight: 500;
      }
    </style>
  </head>
  <body>
    <div style="margin: 15px auto; width: fit-content">
      <button onclick="debounce()" style="margin-right: 10px">防抖</button>
      <button onclick="throttle()">节流</button>
    </div>

    <div style="height: 5000px"></div>

    <button class="button">回到顶部</button>
    <script>
      let button = document.querySelector(".button");
      let timer1 = null;
      let timer2 = null;
      window.onscroll = function () {
        let scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;

        console.log("滚动条位置:" + scrollTop);

        if (scrollTop >= 2500) {
          button.style.display = "block";
        } else {
          button.style.display = "none";
        }
      };

      button.onclick = function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      };

      function debounce() {
        window.onscroll = function () {
          clearTimeout(timer1);
          timer1 = setTimeout(() => {
            let scrollTop =
              document.body.scrollTop || document.documentElement.scrollTop;

            console.log("滚动条位置:" + scrollTop);

            if (scrollTop >= 2500) {
              button.style.display = "block";
            } else {
              button.style.display = "none";
            }
          }, 1200);
        };
      }

      function throttle() {
        window.onscroll = function () {
          if (timer2) {
            return;
          }
          timer2 = setTimeout(() => {
            let scrollTop =
              document.body.scrollTop || document.documentElement.scrollTop;

            console.log("滚动条位置:" + scrollTop);

            if (scrollTop >= 2500) {
              button.style.display = "block";
            } else {
              button.style.display = "none";
            }
            timer2 = null;
          }, 1000);
        };
      }
    </script>
  </body>
</html>
```
