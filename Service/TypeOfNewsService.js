var TypeOfNews = require("../models/TypeOfNews.js");


//创建新的文章类型
/**
 * 先判断是否已经存在这样的文章类型，不存在的话，再创建
 */
 exports.create=(data) => {
    TypeOfNews.findOne({typeName:data.typeName}).exec((err,doc=>{
        if(err){return err};
        //如果没有查找到相同文档类型，则创建
        console.log(doc);
        if(!doc){
            const newType=new TypeOfNews();
            newType.save((err,newType)=>{
                if(err) {return err;}
                return newType;
            });
        }else{
            return {code:'1',msg:'该文档类型已经存在，请输入新的文档类型'}
        }
    }))
 }


//编辑已有文章类型的名字
exports.update=(data)=> {
    TypeOfNews.findByIdAndUpdate(data.id, {$set: { typeName: data.typeName }},{new:true}, (err,doc) => { 
        if(err){console.log(err);}
        return doc;
     });
}


//删除已有的文章类型
exports.delete=(data)=>{
    const deleteitem=TypeOfNews.findByIdAndRemove(data.id);
    return deleteitem;
}



//列举出文章所有的类型
exports.list=()=>{
    const lists=TypeOfNews.all();
    console.log(lists);
}