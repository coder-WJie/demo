const obj={
    get:function(){
        // get方法获取数据
        console.log('get方法获取数据')
    },
    post:function(){
        console.log('post方法获取数据')
    }
}

// 方法间关联性不强，可一个一个导出
// exports.get=get:function(){
//     // get方法获取数据
//     console.log('get方法获取数据')
// }
// exports.post=function(){
//     // get方法获取数据
//     console.log('post方法获取数据')
// }

// 方法都在一个对象内
module.exports=obj
