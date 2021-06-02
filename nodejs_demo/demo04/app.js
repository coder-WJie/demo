
const fs = require('fs')

// 检测路径是目录还是文件
fs.stat('./html',(err,data)=>{
    if(err){
        console.log(err)
        return 
    }
    console.log(`html是文件：${data.isFile()}`)
    console.log(`html是目录：${data.isDirectory()}`)
})

fs.stat('./package.json',(err,data)=>{
    if(err){
        console.log(err)
        return 
    }
    console.log(`是文件：${data.isFile()}`)
    console.log(`是目录：${data.isDirectory()}`)
})