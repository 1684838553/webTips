### 1、安装atom

下载地址如下：https://github.com/atom/atom/releases/tag/v1.60.0
AtomSetup-x64.exe 或 atom-windows.zip 为windows系统
atom-mac.zip 为mac

### 2、设置atom的环境变量

桌面Atom图标→右击→属性→查看安装位置。我的安装位置是在：C:\Users\28329\AppData\Local\atom

设置环境变量流程如下
2.1、右键我的电脑-属性
2.2、win10一般会打开设置，点击最右侧的高级系统设置
2.3、环境变量选中Path这一行，点击编辑
2.4、然后点击新增，在path后面添加下面的路径点确定

C:\Users\28329\AppData\Local\atom\bin

2.5、然后按住win键 + R -> 弹出窗口输入cmd打开端口
2.6、cmd端口中输入 apm ls 回车
2.7、如果没有安装插件会显示：Community Packages (0)，这样就说明apm可以正常使用

### 3、下载seti-ui至本地
3.1、setiui的git地址：https://github.com/jesseweed/seti-ui.git
3.2、进入项目文件夹进行 npm i安装
3.3、项目文件夹终端输入 apm link . 然后输入 atom --dev . 就可以运行起来了







