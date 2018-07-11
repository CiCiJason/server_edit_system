var Document = require("../models/Document");

//返回错误信息

const errfun = (err, callback) => {
    console.log(err);
    return err;
}


//创建新的文章
/**
 * 先判断是否已经存在这样的文章，不存在的话，再创建
 */
// exports.create = (data, callback) => {
//     const updatePart = {};

//     if (data.title) { updatePart.title = data.title }
//     if (data.subtitle) { updatePart.subtitle = data.subtitle }
//     if (data.content) { updatePart.content = data.content }
//     if (data.typename) { updatePart.typename = data.typename }
//     if (data.releaseTime) { updatePart.releaseTime = data.releaseTime }
//     updatePart.lastEditPerson = req.session.accountname;
//     updatePart.top = data.top;
//     updatePart.draft = data.draft;
//     updatePart.lastEditTime = new Date().toISOString();

//     if (data._id) {
//         //修改文章
//         Document.findByIdAndUpdate(data._id, updatePart, { new: true }, function (err, doc) {
//             if (err) { errfun(err) }
//             if (doc) {
//                 callback({ code: '0', msg: '操作成功' });
//             } else {
//                 callback({ code: '2', msg: '操作失败' });
//             }
//         })
//     } else {
//         //保存一篇新的文章
//         Document.findOne({ title: data.title }, function (err, doc) {
//             if (err) { errfun(err) }
//             if (doc) {
//                 callback({ code: '1', msg: '新建文档已存在，请重新输入' });
//             } else {
//                 new Document({
//                     title: data.title,
//                     subtitle: data.subtitle,
//                     typename: data.typename,
//                     content: data.content,
//                     releaseTime: data.releaseTime,
//                     draft: data.draft,
//                     accountname: req.session.accountname
//                 }).save(function (err, newdoc) {
//                     if (err) { errfun(err) }
//                     if (newdoc) {
//                         callback({ code: '0', msg: '创建成功' });
//                     } else {
//                         callback({ code: '2', msg: '创建失败' });
//                     }
//                 });
//             }
//         });
//     }
// }
exports.create = (req, callback) => {
    const updatePart = {};
    const data = req.body;

    if (data.title) {
        updatePart.title = data.title;
        updatePart.subtitle = data.subtitle;
        updatePart.content = data.content;
        updatePart.typename = data.typename;
        updatePart.releaseTime = data.releaseTime;
    }
    if (typeof (data.draft) != 'undefined') {
        updatePart.draft = data.draft;
    }
    if (typeof (data.top) != 'undefined') {
        updatePart.top = data.top;
    }
    updatePart.lastEditTime = new Date().toISOString();
    updatePart.lastEditPerson = req.session.accountname;

    if (data._id) {
        //修改文章
        Document.findByIdAndUpdate(data._id, updatePart, { new: true }, function (err, doc) {
            if (err) { errfun(err) }
            if (doc) {
                callback({ code: '0', msg: '操作成功' });
            } else {
                callback({ code: '2', msg: '操作失败' });
            }
        })
    } else {
        //保存一篇新的文章
        Document.findOne({ title: data.title }, function (err, doc) {
            if (err) { errfun(err) }
            if (doc) {
                callback({ code: '1', msg: '新建文档已存在，请重新输入' });
            } else {
                new Document({
                    title: data.title,
                    subtitle: data.subtitle,
                    typename: data.typename,
                    content: data.content,
                    releaseTime: data.releaseTime,
                    draft: data.draft,
                    accountname: req.session.accountname,
                    lastEditPerson:req.session.accountname
                }).save(function (err, newdoc) {
                    if (err) { errfun(err) }
                    if (newdoc) {
                        callback({ code: '0', msg: '创建成功' });
                    } else {
                        callback({ code: '2', msg: '创建失败' });
                    }
                });
            }
        });
    }
}


//列举出所有文章

exports.listdraft = (req, callback) => {
    const data=req.query;
    data.accountname=req.session.accountname;
    Document.find( data , 'title typename releaseTime count top', { sort: {  'top': -1 ,'releaseTime': -1} }, function (err, doc) {
        if (err) { errfun(err) }
        callback(doc);
    });
}

//加入分页之后

exports.list=(req,callback)=>{
    const queryConf=JSON.parse(req.query.queryConf);
    queryConf.typename=='all'? delete queryConf.typename:queryConf.typename;
    const callbackObj={};
    Document.count(queryConf,function (err,counts) {
        if(err)errfun(err)
        if(counts){
            const page=JSON.parse(req.query.page);
            const limit=page.itemPerPage;
            const currentPage=page.currentPage||1;
            const skip=limit*currentPage-limit;
            Document.find(queryConf,'title typename releaseTime count top',{sort: {  'top': -1 ,'releaseTime': -1},skip:skip,limit:limit},function(err1,doc1){
                if(err1)errfun(err1)
                callbackObj.totalItems=counts;
                callbackObj.documents=doc1;
                callback(callbackObj);
            })
        }else{
            //信息条数为0
            callbackObj.totalItems=counts;
            callbackObj.documents=[];
            callback(callbackObj);
        }
    })
}


//查找某篇文章

exports.search = (data, callback) => {
    Document.findById(data._id,'title subtitle typename releaseTime content', function (err, doc) {
        if (err) { errfun(err) }
        if (doc) {
            Document.findByIdAndUpdate(data._id, { count: ++doc.count }, { new: true }, function (err1, newdoc) {
                if (err1) { errfun(err) }
                callback(doc);
            })
        } else {
            callback(doc);
        }
    });
}


//删除已有的文章

exports.delete = (data, callback) => {
    Document.findByIdAndRemove(data._id, function (err, doc) {
        if (err) { errfun(err) }
        if (doc) {
            //doc返回的是查找到的一条需要删除的数据
            callback({ code: '0', msg: '删除成功' });
        } else {
            callback({ code: '1', msg: '删除失败' });
        }
    })
}