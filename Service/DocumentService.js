var Document = require("../models/Document");

//返回错误信息

const errfun=(err)=>{
    console.log(err);
    return err;
}


//创建新的文章
/**
 * 先判断是否已经存在这样的文章，不存在的话，再创建
 */
exports.create=(data,callback) => {
    if(data._id){
        //编辑保存文章
        Document.findByIdAndUpdate(data._id,{
            title:data.title,
            subtitle:data.subtitle,
            typename:data.typename,
            content:data.content,
            releaseTime:data.releaseTime,
            draft:data.draft
        },{new:true},function(err,doc){
            if(err){errfun(err)}
            if(doc){
                callback({code:'0',msg:'操作成功'});
            }else{
                callback({code:'2',msg:'操作失败'});
            }
        })
    }else{
        //保存一篇新的文章
        Document.findOne({title:data.title},function(err,doc){
            if(err){errfun(err)}
            if(doc){
                return {code:'1',msg:'新建文档已存在，请重新输入'}
            }else{
                new Document({
                    title:data.title,
                    subtitle:data.subtitle,
                    typename:data.typename,
                    content:data.content,
                    releaseTime:data.releaseTime,
                    draft:data.draft
                }).save(function(err,newdoc){
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
 }


 //列举出所有文章

exports.list=(data,callback)=>{ 
    Document.find({draft:data.draft},'title typename releaseTime count',function(err,doc){
        if(err){errfun(err)}
        callback(doc);
    });
}


//查找某篇文章

exports.search=(data,callback)=>{
    Document.findById(data.id,function(err,doc){
        if(err){errfun(err)}
        callback(doc);
    });
}


//删除已有的文章

exports.delete=(data,callback)=>{
    Document.findByIdAndRemove(data.id,function(err,doc){
        if(err){errfun(err)}
        if(doc){
            //doc返回的是查找到的一条需要删除的数据
            callback({code:'0',msg:'删除成功'});
        }else{
            callback({code:'1',msg:'删除失败'});
        }
    })
}