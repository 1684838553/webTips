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

## git reset

版本回退

```
git reset --hard HEAD~1
```
