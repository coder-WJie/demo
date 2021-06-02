const url = require('url')

let api="http://www.baidu.com?name=zhangsan&age=20"

let result = url.parse(api,true).query
console.log(result)
