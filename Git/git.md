## git rebase 

[git rebase](https://www.cnblogs.com/yxhblogs/p/10527271.html)

```
git rebase -i HEAD~2
git push -f
```

1. i -> 第一次修改，第二个commit提示 前面的pick改为s ->  Esc ->  :wq
2. i -> 第二次修改，不需要显示的commit提示 前面的pick前面加#,注释掉 ->  Esc ->  :wq

## git reset HEAD~ --soft 撤销已经commit的代码，保留原状

## git commit --amend

```
git config user.name "1684838553" 
git config user.email "1684838553@qq.com"

git commit --amend --author="xx <xx@cc.com>"
## git commit --amend --author="drunk <000000@qq.com>"
// 修改最后一次commit提交的信息
git commit --amend --message="message"

// 强制推送
git push --force
```

## git reset (已经commit的代码回退)

版本回退

```
git reset --hard HEAD~1
```

等于

```
git log

git reset --hard 8b26dce5a8b9c4c66d9929bdeb7a840988cc12a1  谨慎使用
git reset --soft HEAD~1 回退到某个版本
```

## 解决git status显示中文文件名乱码问题

```
git config --global core.quotepath false
```

## 解决云端与本地的仓库不同，例如：不同的分支、或不同的仓库等。
```
git add .
git commit -a -m "initial commit"
git pull origin master --allow-unrelated-histories
// ====
git fetch origin master
git checkout master
git branch --set-upstream-to=origin/master master
git pull --rebase origin master
git add .
git commit - m "aa"
git push
```

## github下fork后同步更新代码

```
1. 添加上游仓库
git remote add upstream 上游git地址

2. 拉取上游变动
git fetch upstream

3. 合并
git rebase upstream/master

4. 更新自己远端仓库分支
git push origin master

```

## git多用户之间的切换

配置多个用户的git
```
1. 新建一个目录，在当前目录下新建一个.my-gitconfig文件，这个文件里面配置用户名和邮箱
[user]
	name = 1684838553
	email = 1684838553@qq.com
2. 在全局配置中，配置includeif属性
[includeif "gitdir:D:/Study/"]
	path = D:/Study/.my-gitconfig
即，在Study目录下面，用的是1684838553账号提交代码
```

## 解决冲突

```
1. 合并最新代码到当前分支
git pull --rebase origin master

2. // 在项目中打开git bash
git rebase --continue

3. 提交
git push -f
```

## 拉取master分支代码到当前分支

```
git pull --rebase origin master
```

## 版本回退，已经push的代码

```
使用git log命令，查看分支提交历史，确认需要回退的版本
使用git reset --hard commit_id命令，进行版本回退
git push -f
```

## You have not concluded your merge (MERGE_HEAD exists).
```
git merge --abort

git reset --merge
```

## git设置大小写敏感和仓库文件共存问题

在Git仓库中，需要将src/Commom改成src/common, 可以先执行下面第一个步骤，git仓库将会检查到文件名的大小写改变。如果不执行第二步直接提交，远程仓库会同时存在修改前后的目录。执行第二部，会将修改前的目录删除。

```
1、项目中设置git命令`git config core.ignorecase false`
2、项目中删除同名文件或文件夹git `rm --cached src/Commom -r`
3、提交
```

