var Type = require("../models/Type.js");

//返回错误信息

const errfun = (err) => {
    console.log(err);
    return err;
}


//创建新的文章类型
/**
 * 先判断是否已经存在这样的文章类型，不存在的话，再创建
 */
exports.create = (req, callback) => {
    const data=req.body;
    Type.findOne({ typename: data.typename }, function (err, doc) {
        if (err) { errfun(err) }
        if (doc) {
            return { code: '1', msg: '新建文档类型已存在，请重新输入' }
        } else {
            new Type({ typename: data.typename ,accountname:req.session.accountname,editaccountname:req.session.accountname}).save(function (err, newdoc) {
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


//编辑已有类型的名字

exports.update = (req, callback) => {
    const data=req.body;
    Type.findById(data._id, function (err, doc) {
        if (err) { errfun(err) }
        if (doc) {
            if (doc.typename == data.newtype) {
                callback({ code: '1', msg: '新编辑文档类型名称与原名称一致，请重新输入' });
            } else {
                // Type.findByIdAndUpdate(data._id, { $set: { typename: data.newtype, lastEditTime: new Date().toISOString() ,editaccountname:req.session.accountname} }, { new: true }, (err1, doc2) => {
                //     if (err1) { console.log(err2); }
                //     if (doc2) {
                //         callback({ code: '0', msg: '修改成功' });
                //     }
                // });
                doc.update({typename: data.newtype, lastEditTime: new Date().toISOString() ,editaccountname:req.session.accountname}, (err1, doc2) => {
                    if (err1) { console.log(err2); }
                    callback({ code: '0', msg: '修改成功' });
                });
            }
        } else {
            callback({ code: '2', msg: '不存在这样的文档类型，请重新输入' });
        }
    });
}


//删除已有的文章类型

exports.delete = (data, callback) => {
    Type.findByIdAndRemove(data._id, function (err, doc) {
        if (err) { errfun(err) }
        if (doc) {
            //doc返回的是查找到的一条需要删除的数据
            callback({ code: '0', msg: '删除成功' });
        } else {
            callback({ code: '1', msg: '删除失败' });
        }
    })
}


//列举出文章所有的类型

exports.list = (data, callback) => {
    if (data.all == 'all') {
        Type.find({}, function (err, doc) {
            if (err) { errfun(err) }
            callback(doc);
        })
    }
    if (data.all == 'typename') {
        Type.find({}, 'typename', function (err, doc) {
            if (err) { errfun(err) }
            callback(doc);
        })
    }
}