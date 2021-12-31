1. 父组件向子组件传值
@input 属性绑定，父组件向子组件传递数据

```javascript
// 父组件
<app-child [name]="childname" ></app-child>

// 子组件中
@input public name:string = ''
```

2. 子组件向父组件传值
@output 事件绑定 子组件向父组件传递数据同时触发事件
```javascript
// 父组件
<app-child (childEmit)= "getData($event)"></app-child>
<button (click)="getData()">获取子组件传来的数据</button>
getData(data){
    this.value = data
}

// 子组件中
@output public childEmit:EventEmitter<string> = new EventEmitter<string>()

```
3. service

单例模式，其实就是一个变量，需要双向触发
```
import { Injectable } from "@angular/core"
@Injectable()
export class AppService{
    public name = ''
}


// 父组件
import {AppService} from './AppService'

constructor(private appService:AppService){
}

getData(){
    console.log(this.appService.name)
}
```

4. @childView

5. subject 发布订阅

```
import { Injectable } from "@angular/core"
@Injectable()
export class AppService{
    public name = ''  
}


// 父组件
import {AppService} from './AppService'

constructor(private appService:AppService){
    this.sub = this.service.getMessage.subscribe()
}

ngOnDestory(){
    this.sub
}

getData(){
    console.log(this.appService.name)
}
```

6. sessionStorage,localStorage
