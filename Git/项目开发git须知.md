## 步骤一：对于新需求，创建一个新的分支

分支名规范

![在这里插入图片描述](https://img-blog.csdnimg.cn/ab23a71ad9014cdc8a86aab2e966e259.png)

### 方法一：本地新建分支，推送到远程

1. 创建分支

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/9d965ae85a1440afa166d56ab2f0440e.png)

2. 切换分支

   - git 命令切换
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/5469ea8ecdc243ceaf83643f92a55e87.png)

   - 图形化
     ![在这里插入图片描述](https://img-blog.csdnimg.cn/ed93c6c3eae74d99a887b0f139df28b3.png)

### 方法二：远程仓库创建分支，本地拉取远程分支

1. 远程仓库创建分支

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/c051bbb7ce604271b7bbacd0d65dd677.png)

   新建分支后
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/b7beeabf118d48029c8f2399097c5ef1.png)

2. 拉取远程分支

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/3a84a68f6344406d9184ed153cc1404e.png)

3. 执行 `git branch -a` 命令，可以查看所有的分支

4. 剩下的步骤紧接方法一，执行`git checkout 分支名`

**注意：本地分支和远程分支的区别**

1. master //本地主分支
2. origin/master //远程主分支

## 步骤二：进行新需求开发

该步骤暂时不需要使用 git

## 步骤三：开发完成，提交代码

1. 本地代码文件夹叫做工作区，先需要把工作区的代码存到暂存区，通过 `git add .`

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/8eea781f52c74568b36449ef8ae4a8f4.png)

   1. 添加一个或多个文件到暂存区：

   `git add [file1] [file2] ...` 添加指定目录到暂存区，包括子目录

   2. `git add [dir]` 添加当前目录下的所有文件到暂存区

   3. `git add .`添加所有修改文件到暂存区

2. 然后将暂存区的代码提交到本地的版本库 通过 `git commit -m '提交信息'`

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/30ee24e6236a4feea9ef8b78931a44ad.png)

3. 最后将本地版本库提交到 github 仓库,`git push`

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/8eea781f52c74568b36449ef8ae4a8f4.png)

## 步骤四：将分支合并到 master
