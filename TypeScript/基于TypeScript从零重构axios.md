### 一、需求分析

[项目地址](https://github.com/1684838553/ts-axios)

#### 1、Features

1. 在浏览器端使用 XMLHttpRequest 对象
2. 支持Promise API
3. 支持请求和响应拦截器
4. 支持请求数据和响应数据的转换
5. 支持请求的取消
6. JSON数据自动转换
7. 客户端防止XSRF

#### 2、拉取初始化项目

```
git clone https://github.com/alexjoverm/typescript-library-starter.git YOURFOLDERNAME
cd YOURFOLDERNAME

# Run npm install and write your library name when asked. That's all!
npm install
```

#### 3、连接远程仓库

```
git remote -v  检查git
git remote add origin git地址

git pull origin master
git add .
npm run commit //提交
git push origin master
```

### 二、正常情况下，数据处理（请求数据和响应数据）

#### 1、处理请求URL参数

```javascript
axios({
	methods:'get',
	url:url,
	param:{
    a:1,
    b:2
	}
})

// 参数为数组，对象，Date类型，特殊字符支持，空值忽略，丢弃url中的哈希标记，保留url已有参数
```

#### 2、处理请求body数据

```typescript
const toString = Object.prototype.toString

// val is Date 类型保护
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

//判断是普通对象，而不是blob等
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
```

#### 3、处理请求header

```typescript
//判断是普通对象，而不是blob等
export function isPlainObject(val: any): val is Object {
  return Object.prototype.toString.call(val) === '[object Object]'
}

//处理大小写不匹配问题 ， 如'Content-Type' 和 'content-type')
function normalizeHeadername(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeadername(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
}

```

#### 4、获取响应数据

##### XMLHttpRequest.readyState

| 值   | 状态               | 描述                                                |
| ---- | ------------------ | --------------------------------------------------- |
| `0`  | `UNSENT`           | 代理被创建，但尚未调用 open() 方法。                |
| `1`  | `OPENED`           | `open()` 方法已经被调用。                           |
| `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
| `3`  | `LOADING`          | 下载中； `responseText` 属性已经包含部分数据。      |
| `4`  | `DONE`             | 下载操作已完成。                                    |

#### 5、处理响应header

```typescript
// 用request.getAllResponseHeaders()获取的数据为可换行的字符串，把它转为对象
export function parseHeaders(headers: string): any {
  //创建一个没有原型链的对象
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  // \r回车符  \n换行符
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (value) {
      value = value.trim()
    }
    parsed[key] = value
  })
  return parsed
}
```

#### 6、处理响应data

```typescript
//处理响应data
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // 为普通字符串，原样输出
    }
  }
  return data
}
```

### 三、错误处理

#### 1、网络错误,网络超时，非200状态码

```typescript
    //网络错误 onerror
    request.onerror = function handleError() {
      reject(new Error('Network Error'))
    }

    //网络超时错误 ontimeout
		//在请求头设置超时时长
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }

    //状态码非200
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status code ${response.status}`))
      }
    }
```

#### 2、错误信息增强

```typescript
import { AxiosRequestConfig, AxiosResponse } from '../types'

// 构造AxiosError类
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.isAxiosError = true
    this.code = code
    this.request = request
    this.response = response

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  const error = new AxiosError(message, config, code, request, response)
  return error
}


//在xhr文件中
 //状态码非200
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(`Request failed with status code ${response.status}`, config, null, request)
        )
      }
    }
```

### 四、请求所用的方法

Get,post,put,options...

### 五、拦截器的实现

#### 1、请求拦截器

#### 2、响应拦截器

```typescript
// 拦截器
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected: RejectedFn
}
export default class InterceptorsManager<T> {
  private Interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.Interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
    this.Interceptors.push({
      resolved,
      rejected
    })
    return this.Interceptors.length - 1
  }

  forEach(fn: (Interceptor: Interceptor<T>) => void): void {
    this.Interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.Interceptors[id]) {
      this.Interceptors[id] = null
    }
  }
}

```

