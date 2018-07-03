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
    //updatePart.lastEditPerson = req.session.accountname;
    if (typeof (data.draft) != 'undefined') {
        updatePart.draft = data.draft;
    }
    if (typeof (data.top) != 'undefined') {
        updatePart.top = data.top;
    }
    updatePart.lastEditTime = new Date().toISOString();

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
                    accountname: req.session.accountname
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

exports.list = (data, callback) => {
    Document.find( data , 'title typename releaseTime count top', { sort: {  'top': -1 ,'releaseTime': -1} }, function (err, doc) {
        if (err) { errfun(err) }
        callback(doc);
    });
}


//查找某篇文章

exports.search = (data, callback) => {
    Document.findById(data._id, function (err, doc) {
        if (err) { errfun(err) }
        if (doc) {
            Document.findByIdAndUpdate(data._id, { count: ++doc.count }, { new: true }, function (err1, newdoc) {
                if (err1) { errfun(err) }
                callback(newdoc);
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