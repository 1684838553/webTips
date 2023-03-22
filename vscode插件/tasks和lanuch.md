## vscode 配置文件

[code debug](https://github.com/WebFreak001/code-debug/blob/master/src/gdb.ts)

### tasks.josn

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "cmake",
      "type": "shell",
      "command": "cmake",
      "options": {
        "cwd": "${workspaceFolder}/build",
        "env": {
          // ${config:SettingKey} 动态获取设置页面配置的值
          "path": "${config:SettingKey};${env.path}"
        }
      },
      // 执行前所做的工作
      "dependsOn": ["Build"]
    }
  ]
}
```

### lanuch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "(gdb) 启动",
      "type": "cppdbg",
      "request": "launch",
      "program": "${workspaceFolder}/build/solider_cmake",
      "args": [],
      "stopAtEntry": false,
      "cwd": "${workspaceFolder}",
      "environment": [],
      "externalConsole": false,
      "MIMode": "gdb",
      // lanuch.json 执行前所做的工作
      "preLaunchTask": "Build",
      "miDebuggerPath": "/usr/bin/gdb"
    }
  ]
}
```
