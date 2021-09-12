## 上传文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>上传文件</title>
</head>
<body>
    <input type="file" id="file">
    <img>
    <script>
      const dom =   document.querySelector('#file')
      dom.addEventListener('change',function(e){
          const file = e.target.files[0]
         const reader = new FileReader()
         reader.readAsDataURL(file)  //base64 字符串形式
         reader.addEventListener('load',function(res){
            console.log(res,2)
            document.querySelector('img').src = res.target.result
         })
      })
    </script>
</body>
</html>
```