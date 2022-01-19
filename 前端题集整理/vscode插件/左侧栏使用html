## pageage.json

```
{
	"contributes": {
		"commands": [{
			"command": "Jdrunk-Plugin.showTreeWebview",
			"title": "刷新",
			"icon": {
				"dark": "./resource/icon/refresh.svg",
				"light": "./resource/icon/refresh.svg"
			}
		}],
		"viewsContainers": {
			"activitybar": [{
				"id": "myPluginProject",
				"title": "Jdrunk",
				"icon": "./resource/icon/logo.svg"
			}]
		},
		"views": {
			"myPluginProject": [{
					"id": "jdrunk.webview",
					"name": "Jdrunk",
					"type": "webview"
				},
				{
					"id": "jdrunk.cat",
					"name": "喵咪"
				}
			]
		},
		"menus": {
			"view/title": [{
				"command": "Jdrunk-Plugin.refresh",
				"group": "navigation",
				"icon": "$(output)"
			}]
		}
	},
}
```

## treeNode.ts

```typescript
import * as vscode from 'vscode';
import { UtilService } from './util';
import { MsgType } from './types/interface';
import { reloadViewProvider } from './treeReload';

export class ViewProvider implements vscode.WebviewViewProvider {
    constructor(private readonly context: vscode.ExtensionContext) { }

    public static readonly viewType = 'jdrunk.webview'

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
    ) {
        webviewView.webview.options = {
            enableScripts: true,
        }

        webviewView.webview.html = UtilService.getWebViewContent(this.context, 'resource/view/treeNode.html')

        webviewView.webview.onDidReceiveMessage(async (msg: MsgType) => {
            switch (msg.command) {
                case 'openWebview':
                    vscode.commands.executeCommand('Jdrunk-Plugin.showTreeWebview')
                    return;
                case 'addData':
                    const inputResult = await vscode.window.showInputBox({ prompt: '请输入' })
                    webviewView.webview.postMessage({ command: 'addData', text: inputResult })
                    return;
            }
        })
    }
}
```

## extension.ts

```typescript
import * as vscode from 'vscode';
import { createJdrunkWebview } from './jdrunkWebview';
import { reloadViewProvider } from './treeReload';

export function activate(context: vscode.ExtensionContext) {
	vscode.commands.executeCommand('setContext', 'plugin-isLogin', false);
	vscode.commands.registerCommand('Jdrunk-Plugin.login', () => {
		vscode.commands.executeCommand('setContext', 'plugin-isLogin', true);
	})

	context.subscriptions.push(
		vscode.commands.registerCommand('Jdrunk-Plugin.showTreeWebview', () => {
			createJdrunkWebview(context);
		})
	)
	
	const provider = new ViewProvider(context)
   vscode.window.registerWebviewViewProvider(ViewProvider.viewType, provider)
}

export function deactivate() { }

```

## treeNode.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *,
        html,
        body,
        ul,
        li {
            padding: 0;
            margin: 0;
        }

        ul,
        li {
            list-style: none;
        }

        .btnContainer {
            text-align: center;
        }

        .btn {
            width: 90%;
            padding: 4px 7px;
            background-color: dodgerblue;
            border-radius: 3px;
            border-style: none;
            color: #fff;
        }

        .btn:hover {
            opacity: 0.9;
        }

        .create {
            float: right;
            display: none;
            cursor: pointer;
            color: dodgerblue;
        }

        .list {
            margin: 10px;
        }

        .list:hover .create {
            display: inline;
        }

        .addList {
            margin: 10px;
        }

        .list-item {
            padding: 4px;
            text-align: center;
            border: 1px solid #ededed;
            border-bottom: none;
        }

        .list-item:last-child {
            border-bottom: 1px solid #ededed;
        }
    </style>
</head>

<body>
    <div class="list">
        这是一条数据 <span class="create">刷新</span>
    </div>
    <div class="btnContainer">
        <button class="btn">ADD Data</button>
    </div>
    <ul class="addList">
        <li class="list-item">这是一个数据列表</li>
    </ul>
    <script>
        const vscode = acquireVsCodeApi();

        function postMessageToVscode(command, text = '') {
            vscode.postMessage({
                command,
                text
            })
        }

        function getDom(className) {
            return document.querySelector(className);
        }

        const createDom = getDom('.create')
        createDom.addEventListener('click', () => {
            postMessageToVscode('openWebview')
        })

        const btnDom = getDom('.btn')
        btnDom.addEventListener('click', () => {
            postMessageToVscode('addData')
        })

        function craeteLi(data) {
            const ul = getDom('.addList')
            ul.innerHTML += `<li class="list-item">${data}</li>`
        }

        window.addEventListener('message', (e) => {
            const msg = e.data
            if (msg.command === 'addData') {
                craeteLi(msg.text)
            }
        })
    </script>
</body>

</html>
```
