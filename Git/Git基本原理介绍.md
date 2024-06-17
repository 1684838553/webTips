[视频文档 B站](https://www.bilibili.com/video/BV1Wv411z7LG/?p=5&spm_id_from=pageDriver)

[学习笔记](https://blog.csdn.net/hancoder/article/details/120748968)

**git diff**

![image](https://github.com/1684838553/webTips/assets/41181666/ec96802e-2378-4b02-be61-48f2ddab91db)

**删除无用对象**

```
1. git -c gc.reflogExpire=0 -c gc.reflogExpireUnreachable=0 \
  -c gc.rerereresolved=0 -c gc.rerereunresolved=0 \
  -c gc.pruneExpire=now gc "$@"

2. git fsck

3. git prune
```

**git submodule**

1. 命令 `git submodule add 仓库地址`

  直接执行 `git pull`, 默认不会将子模块的代码一起拉下来，使用以下命令

2. 初始化并更新子模块 命令 `git submodule update --init --recursive`

3. 更新子模块 命令 `git submodule update --recursive`

4. 拉取子模块远程代码 命令 `git submodule update --remote`

![image](https://github.com/1684838553/webTips/assets/41181666/6c212d2a-5f2e-482f-a12f-1222664d2c58)

![image](https://github.com/1684838553/webTips/assets/41181666/a11d6464-0e0e-4d19-b200-cfbd403d8eef)

**git worktree**

用于管理工作目录。工作目录是一个目录，其中包含了 git 项目的所有文件，可以用来编辑和构建项目

1. `git worktree add dirName branchName`  添加新的工作目录
2. ` git worktree remove dirName` 
3. `git worktree list`  查看

![image](https://github.com/1684838553/webTips/assets/41181666/4bccea06-410f-4d4a-957e-a19788026222)

![image](https://github.com/1684838553/webTips/assets/41181666/43e2da25-301a-4b41-ac6b-c4e5e072aa22)

**git format-patch**

1. git format-patch -2  最后两个commit生成patch文件

2. git format-patch commindId   选中的commit生成patch文件

3. git apply patch文件的路径   应用

![image](https://github.com/1684838553/webTips/assets/41181666/985991ab-3df5-48a8-984c-a5f0df4fb6d7)

![image](https://github.com/1684838553/webTips/assets/41181666/bca822a4-9a7d-4d83-a1e2-f6377a2fde8f)

