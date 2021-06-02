// 不同的导入方式，结果相同
// 这是因为 nodejs 会自动去 node_modules 里相应的文件夹找 index.js 文件
// 以后我们自定义的模块也会放在 node_modules 里,例如下面的自定义模块 db
// 若 db 文件夹下无 index.js 文件 就找不到该模块，报错
// const axios = require('./node_modules/axios/index')
// const axios = require('axios/index')
const axios = require('axios')

console.log(axios.get)
console.log(axios.post)
// 将 index.js文件夹更名试试，将会报错
const db = require('db')
console.log(db)
/* 如果你十分不想将文件命名为 index.js,
   例如这里就是想将文件命名为 db.js
   那么你可以通过配置 package.json 文件来修改默认设置 
   
具体操作方法：
    终端切换到 db.js 文件目录
    执行命令：npm init --yes
    这是会生成 package.json 文件，配置完成

   */
