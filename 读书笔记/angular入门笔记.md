## 一、组件指南
[组件食用指南](https://www.cnblogs.com/danvic712/p/angular-components-guide.html)

### 组件与模板

1. 组件概念
2. 组件绑定语法
3. 数据绑定
4. 属性，样式绑定
5. 事件绑定

### 指令

1. 属性型指令
2. 结构型指令

### 管道

1. 模板表达式中的特殊运算符
2. 常用的管道函数

### 组件之间的通信

1. 输入属性与输出属性
2. 子组件获取父组件信息
3. 父组件获取子组件信息
4. 非父子组件之间的通信

### 组件的生命周期钩子函数

**angular生命周期钩子一共8个**

####  钩子函数执行顺序

1. 初始化页面

constructor -> ngOnChange()  (父组件给子组件传值)  -> ngOnInit() -> ngOnCheck() -> ngAfterContentChecked() -> ngAfterViewInit() -> ngAfterViewChecked()

2. 父组件给子组件传值改变

ngOnChange() -> ngOnCheck() -> ngAfterContentChecked() -> ngAfterViewChecked()

3. 卸载组件

ngOnDestroy()

#### 生命周期钩子函数

implements 实现，可以实现多个接口，用逗号分隔开

1. ngOnChanges()  父组件调用子组件，如果子组件绑定过输入属性，在ngOnInit()之前及属性值发生改变时，都会调用

2. ngOnInit()  初始化指令和组件，可在该生命周期钩子中请求服务端数据

3. ngDoCheck()

4. ngAfterContentInit()

5. ngAfterContentChecked()

6. ngAfterViewInit() 在该生命周期钩子中，能够直接操作dom

7. ngAfterViewChecked()

8. ngOnDestroy() 在 Angular 销毁指令或组件之前立即调用。例如，退出某个页面，保存该页面的数据


### 插槽

1. 单插槽
2. 多插槽
3. 有条件的插槽

```
<app-content>
    <p>你好，我是一个段落</p>

    <h6 header>你好，我是一个标题</h6>
</app-content>

<ng-content></ng-content>
<ng-content select="[header]"></ng-content>
```

### 二、问题：

1. 变量定义是，public和private的区别

### 三、处理异步
```
//在app.modules.js
import { HttpClientModule} from '@angular/common/http'
@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule   
  ],
})
import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less']
})
export class ContentComponent implements OnInit {

  constructor(public http:HttpClient) { }

  public list:Array<any> = []

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.http.get('assets/data.json').subscribe((res:any)=>{
      console.log(res,'我是异步请求结果')
      this.list = res
    })
  }

  postData(){
    const httpOptions = {headers:new HttpHeaders({"content-Type":'application/json'}) }
    const api = ''
    this.http.post(api,{"userName":'张三'},httpOptions).subscribe((res:any)=>{
      console.log(res,'发送一个post请求')
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less']
})
export class ContentComponent implements OnInit {

  constructor(public http:HttpClient) { }

  public list:Array<any> = []

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.http.get('assets/data.json').subscribe((res:any)=>{
      console.log(res,'我是异步请求结果')
      this.list = res
    })
  }

  postData(){
    const httpOptions = {headers:new HttpHeaders({"content-Type":'application/json'}) }
    const api = ''
    this.http.post(api,{"userName":'张三'},httpOptions).subscribe((res:any)=>{
      console.log(res,'发送一个post请求')
    })
  }

}
```



angular
前端安全
js原理
JSON必知必会
http
nodejs
小程序

