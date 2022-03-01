## git rebase 

[git rebase](https://www.cnblogs.com/yxhblogs/p/10527271.html)

```
git rebase -i HEAD~2
git push -f
```

1. 第一次修改，不需要显示的commit提示 前面的pick改为s
2. 第二次修改，不需要显示的commit提示 前面的pick前面加#,注释掉

## git commit --amend

```
git commit --amend --author="xx <xx@cc.com>"
## git commit --amend --author="drunk <000000@qq.com>"
```

## git reset (已经commit的代码回退)

版本回退

```
git reset --hard HEAD~1
```

等于

```
git log

git reset --hard 8b26dce5a8b9c4c66d9929bdeb7a840988cc12a1
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
