# Mocha 运行测试脚本
[mochajs github](https://github.com/mochajs/mocha)

[https://mochajs.bootcss.com/](https://mochajs.bootcss.com/)

## add.js

```javascript
function add(x,y){
    return x + y
}
module.exports = add;
```

## add.test.js

```javascript
var add = require('./add.js')
var expect = require('chai').expect

describe('加法函数的测试',function(){
    it('1 加 1 应该的等于2',function(){
        expect(add(1,1)).to.be.equal(2)
    })
})
```

> add.test.js是测试脚本，可以独立运行.`测试脚本里面应该包含一个或多个describe块，每个describe块应包含一个活多个it块`
>
> describe块表示一组相关测试
> 
> it表示测试用例，是测试的最小单位。第一个参数是测试用例的名称，第二个参数是实际执行函数
> 
> `expect(add(1,1)).to.be.equal(2)`是一句断言，判断源码的实际执行结果与预期结果是否一致。不一致，抛出错误。
>
> 断言功能有断言库来实现，Mocha本身不带断言，所以必须先引入断言库`var expect = require('chai').expect`
>
> expect断言的优点很接近自然语言

[Chai.js断言库expect常用API](https://blog.csdn.net/qq_30068487/article/details/82900633)


## before,brforeEach,after,afterEach

- before,brforeEach 有助于在一组测试之前或每次测试之前设置要运行的条件。
- after,afterEach它们还有助于在一组测试或每次测试后清理条件。

- `before`会在第一个用例之前运行，`afeter`会在跑完所有的用例之后运行。
- `beforeEach`会在每一个用例前运行，`afterEach`会在每一个用例结束后运行。

