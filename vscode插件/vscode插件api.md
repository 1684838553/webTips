## 1、获取当前工作区文件路径

```javascript
function getCurrentFolder(){
    return vscode.workspace.workspaceFolders
} 
```

## 2、打开弹窗，选择文件地址

```javascript
let disposable = vscode.commands.registerCommand('extension.sayHello', function (option:vscode.OpenDialogOptions) {
    vscode.window.showOpenDialog(
        // 可选对象
        {
            ...option,
            canSelectFiles:true, // 是否可选文件
            canSelectFolders:false, // 是否可选文件夹
            canSelectMany:true, // 是否可以选择多个
            defaultUri:vscode.Uri.file("/D:/"), // 默认打开本地路径
            openLabel:'按钮文字说明'
        }).then(function(msg){
            console.log(msg.path);
    })
});
```

## 3、将项目加载到vscode工作区

```javascript
 // 添加 {forceNewWindow: true} 参数，打开新窗口，没有该参数，在当前窗口加载
 vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(folderPath), {forceNewWindow: true});
```

## vscode.commands.executeCommand

```javascript
 // 设置的变量可以判断package.json文件里的when语句
 vscode.commands.executeCommand('setContext', 'show', true);
 
 // 执行vscode内置命令
 vscode.commands.executeCommand('git.init')
```

## 4、node读取文件
```javascript
  // 异步读取文件
  fs.readFile('./text.txt','utf-8',(err,data)=>{

  })
 
 // 同步读取文件
 const data = fs.readFileSync('./text.txt','utf-8')
```

## 5、vscode插件存取数据
```javascript
// vscode全局读取某个字段
context.globalState.get(key);

// vscode在当前工作区读取某个字段
context.workspaceState.get(key);

// vscode全局更新某个字段
context.globalState.update(key,value);

// vscode在当前工作区更新某个字段
context.workspaceState.update(key,value);
```
