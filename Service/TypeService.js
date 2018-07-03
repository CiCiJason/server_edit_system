var Type = require("../models/Type.js");

//返回错误信息

const errfun=(err)=>{
    console.log(err);
    return err;
}


//创建新的文章类型
/**
 * 先判断是否已经存在这样的文章类型，不存在的话，再创建
 */
 exports.create=(data,callback) => {
    Type.findOne({typename:data.typename},function(err,doc){
        if(err){errfun(err)}
        if(doc){
            return {code:'1',msg:'新建文档类型已存在，请重新输入'}
        }else{
            new Type({typename:data.typename}).save(function(err,newdoc){
                if(err) {errfun(err)}
                if(newdoc){
                    callback({code:'0',msg:'创建成功'});
                }else{
                    callback({code:'2',msg:'创建失败'});
                }
            });
        }
    });
 }


//编辑已有类型的名字

exports.update=(data,callback)=> {
    Type.findById(data._id,function(err,doc){
        if(err) {errfun(err)}
        if(doc){
            if(doc.typename==data.newtype){
                callback({code:'1',msg:'新编辑文档类型名称与原名称一致，请重新输入'});
            }else{
                Type.findByIdAndUpdate(data._id, {$set: { typename: data.newtype }},{new:true}, (err,doc) => { 
                    if(err){console.log(err);}
                    if(doc){
                        callback({code:'0',msg:'修改成功'});
                    }
                 });
            }
        }else{
            callback({code:'2',msg:'不存在这样的文档类型，请重新输入'});
        }
    });
}


//删除已有的文章类型

exports.delete=(data,callback)=>{
    Type.findByIdAndRemove(data._id,function(err,doc){
        if(err){errfun(err)}
        if(doc){
            //doc返回的是查找到的一条需要删除的数据
            callback({code:'0',msg:'删除成功'});
        }else{
            callback({code:'1',msg:'删除失败'});
        }
    })
}


//列举出文章所有的类型

exports.list=(data,callback)=>{ 
    if(data.all=='all'){
        Type.find({},function(err,doc){
            if(err){errfun(err)}
            callback(doc);
        })
    }
    if(data.all=='typename'){
        Type.find({},'typename',function(err,doc){
            if(err){errfun(err)}
            callback(doc);
        })
    }
}