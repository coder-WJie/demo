// md5包 
var md5 = require('md5')
// md5 对 12345 加密
console.log(md5('123456'))

// 安装时注意  npm install md5 --save 
// 后面加上 --save 会将依赖加到 package.json 文件里
// 不加的话  当你使用 cnpm install md5 时 不会将依赖加到 package.json文件里
// 这样别人clone你的项目时，将无法运行，因为他并不知道你引入了这个依赖